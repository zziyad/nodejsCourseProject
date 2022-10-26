/* eslint-disable */
import transport from '../system/transport.js';

class Logout extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = /*html*/`
            <button>Logout</button>
        `;

        let btn = this.querySelector("button");

        // State
        btn.onclick = () => {
          // const apiCall = await transport.send('signin', 'authorize', obj);
          console.log('Logging out');

        };
    }
}


customElements.define("log-out", Logout);
