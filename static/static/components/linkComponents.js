/* eslint-disable */

import { navigateTo } from "../js/routing.js";

class LinkComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const link = document.createElement("a");
    const style = document.createElement("style");

    this.selected = false;

    style.textContent = `
       a {
        display: block;
        padding: 12px 18px;
        text-decoration: none;
        color: #040752;
        font-weight: 500;
       }

       a:hover {
        background: rgba(238, 240, 238, 0.495);
       }
    `;

    shadow.appendChild(style);
    shadow.appendChild(link);
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const childNodes = shadow.childNodes;

    const href = this.getAttribute("href");
    const link = shadow.querySelector("a");
    link.href = href;
    link.textContent = this.getAttribute("text");
    link.addEventListener("click", this.onClick);
  }

  onClick(e) {
    e.preventDefault();
    if (!this.selected) {
      const { pathname: path } = new URL(e.target.href);
      navigateTo(path);
    }
  }

  static get observedAttributes() {
    return ["selected"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "selected") this.updateStyle(JSON.parse(newValue));
  }

  updateStyle(selected) {
    if (selected) {
      const shadow = this.shadowRoot;
      const style = shadow.querySelector("style");
      this.selected = true;
      style.textContent = `
        a {
          display: block;
          padding: 12px 18px;
          text-decoration: none;
          color: #040752;
          font-weight: 700;
         }

         a:hover {
          background: rgba(238, 240, 238, 0.495);
         }
        `;
    }
  }
}

customElements.define("nav-link", LinkComponent);
