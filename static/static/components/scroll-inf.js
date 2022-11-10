/* eslint-disable */
import transport from "../system/transport.js";
import { setPost } from "../system/posts.js";
// Create a class for the element
class Scrollinf extends HTMLElement {
  constructor() {
    super();
    this.search = "";
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    const div = document.createElement("div");
    const card = document.createElement("h1");
    // const card = document.createElement('post-component');

    div.setAttribute("class", "row");
    container.setAttribute("class", "card-container");
    card.setAttribute("class", "card posts-title ");

    const style = document.createElement("style");

    // card.innerHTML = 'Posts';

    style.textContent = `
        .card-container {
          display:flex;
          flex-direction:column;
          height: 300px;
          align-items: center;
        }
        h1 {
          margin: 0.1px;
        }
        .row {
          display:flex;
          flex-wrap:wrap;
        }
        .card {
          flex: 0 1 32%;
          padding 0.9rem;
          background: white;
          padding: 0.1rem;
          transform: translateX(100px);
          transition: 150ms;
          opacity: 0;
        }



        .card.show {
          transform: translateX(0);
          opacity: 1;
        }

    `;
    shadow.appendChild(style);
    // console.log(style.isConnected);
    shadow.appendChild(container);
    container.appendChild(div);
    container.appendChild(card);
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const userId = this.getAttribute("user");
    const search = this.getAttribute("search");
    // console.log({searchscr: !!search});

    if (search) {
      // ee.emit('e1', { msg: text });
      this.search = search;
    }

    const title = shadow.querySelector(".posts-title");

    title.textContent = "All posts";

    if (userId) title.textContent = "Users' posts";

    this.updateElement();
  }

  static get observedAttributes() {
    return ["search"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "search") {
      this.search = newValue;
      // console.log({'this.search': this.search});
      this.updateElement();
    }
  }

  async updateElement() {
    const shadow = this.shadowRoot;
    const cards = shadow.querySelectorAll(".card");
    const container = shadow.childNodes[1];
    const div = container.childNodes[0];
    const apiCall = await window.api.entity.getEntity("article");
    if (apiCall.Error)
      return (container.innerHTML = `<h1>${apiCall.Error}</h1>`);
    // console.log({src: this.search});
    // `console`.log({divs: div.childElementCount, posts: apiCall.data.length});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle("show", entry.isIntersecting)
        );
      },
      { threshold: 0.3 }
    );

    const lastCardObserver = new IntersectionObserver((entires) => {
      const lastCard = entires[0];
      if (!lastCard.isIntersecting) return;
      if (div.childElementCount === apiCall.data.length) return;
      loadNewCards();
      lastCardObserver.unobserve(lastCard.target);
      lastCardObserver.observe(shadow.querySelector(".card:last-child"));
    }, {});

    lastCardObserver.observe(shadow.querySelector(".card:last-child"));

    cards.forEach((card) => observer.observe(card));

    const loadNewCards = () => {
      apiCall.data.forEach((post) => {
        setPost(post);
        const card = document.createElement("post-component");

        card.classList.add("card");
        card.classList.add("cardelement");
        card.setAttribute("id", post.postId);
        observer.observe(card);
        div.append(card);
        // if(this.search){
        //     postElement.setAttribute('search', this.search)
        // }
        container.append(div);
      });
    };
  }
}

// Define the new element
customElements.define("scroll-inf", Scrollinf);
