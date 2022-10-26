import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() {
        return `
        <main-nav></main-nav>
            <h1>Welcome back </h1>

            <login-form></login-form>

        `;
    }
}