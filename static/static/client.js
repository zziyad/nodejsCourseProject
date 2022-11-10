"use strict";
// import './components/index.js';
import { router, navigateTo } from "./js/routing.js";

const transport = {};

transport.http = (url) => (structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = (...args) =>
        new Promise((resolve, reject) => {
          fetch(`${url}/api/${name}/${method}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ args }),
          }).then((res) => {
            if (res.status === 200) resolve(res.json());
            else reject(new Error(`Status Code: ${res.status}`));
          });
        });
    }
  }
  return Promise.resolve(api);
};

transport.ws = (url) => (structure) => {
  const socket = new WebSocket(url);
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = (...args) =>
        new Promise((resolve) => {
          const packet = { name, method, args };
          socket.send(JSON.stringify(packet));
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            resolve(data);
          };
        });
    }
  }
  return new Promise((resolve) => {
    socket.addEventListener("open", () => resolve(api));
  });
};

const scaffold = (url) => {
  const protocol = url.startsWith("ws:") ? "ws" : "http";
  return transport[protocol](url);
};

document.addEventListener("DOMContentLoaded", async () => {
  const api = await scaffold("http://localhost:8003")({
    user: {
      create: ["record"],
      read: ["id"],
      update: ["id", "record"],
      delete: ["id"],
      find: ["mask"],
    },
    country: {
      read: ["id"],
      delete: ["id"],
      find: ["mask"],
    },
    talks: {
      say: [],
    },
    entity: {
      getEntity: ["name"],
    },
    read: {
      readFile: ["id"],
    },
    article: {
      index: ["article"],
      new: ["article"],
      edit: ["id"],
      getArticle: ["id"],
    },
    posts: {
      getAll: [],
    },
    mainPage: {
      index : []
    }
  });

  window.api = api;

  // const sqlTest = await api.talks.say();

  // console.log({ sqlTest});
  
  window.addEventListener("popstate", router);

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});