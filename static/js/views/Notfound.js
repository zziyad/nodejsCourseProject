/* eslint-disable  */
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
        <main-nav type="post"></main-nav>

            <h1>404</h1>
            <p>Lost in time!</p>
        `;
    }
}