'use strict';

const transport = {};

transport.http = (url) => (structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = (...args) => new Promise((resolve, reject) => {
        fetch(`${url}/api/${name}/${method}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
      api[name][method] = (...args) => new Promise((resolve) => {
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
    socket.addEventListener('open', () => resolve(api));
  });
};

const scaffold = (url) => {
  const protocol = url.startsWith('ws:') ? 'ws' : 'http';
  return transport[protocol](url);
};

(async () => {
  const api = await scaffold('http://localhost:8001')({
    user: {
      create: ['record'],
      read: ['id'],
      update: ['id', 'record'],
      delete: ['id'],
      find: ['mask'],
    },
    country: {
      read: ['id'],
      delete: ['id'],
      find: ['mask'],
    },
    talks: {
      say: ['message'],
    },
    entity: {
      getEntity: ['name']
    },
    read: {
      readFile: ['id']
    }
  });
 
  

const createForm = async (entity, id) => {
  const schema = await api.entity.getEntity(entity);
  const instance = await api.read.readFile(id);
  console.log(schema);
  const block = document.createElement('div');
  block.setAttribute('class', 'block__row');
  const inputs = {};
  for (const field in schema[entity]) {
    const definition = schema[entity][field]
    const input = document.createElement('div');
    input.setAttribute('class', field);
    const blockContent = document.createElement('div');
    blockContent.setAttribute('class', 'block__content');
    const outPut = document.createElement(definition.control);
    console.log({ definition });
    if (definition.control === 'button') {
      outPut.onclick = () => console.log('Hello from button');
    }
    outPut.innerHTML = instance[field];
    blockContent.appendChild(outPut)
    input.appendChild(blockContent);
    block.appendChild(input);
  }
  // const button = document.createElement('button');
  // button.innerHTML = 'Save';
  // block.appendChild(button);
  document.body.appendChild(block);


}
createForm('post', 3000);

})();
