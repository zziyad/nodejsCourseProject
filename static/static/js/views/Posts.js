import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Posts");
  }

  async getHtml() {
    return `
        <main-nav></main-nav>
                    <h1>Posts</h1>
            <post-comp></post-comp>


        `;
  }
}
