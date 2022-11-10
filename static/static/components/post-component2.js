/* eslint-disable */
import { highlightText } from "../common/utils.js";
import { getPost } from "../system/posts.js";
import { ee } from "../system/event.js";

class PostComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "post-block");

    wrapper.innerHTML = `
       <div class="post-t">
            <div class="post-title"></div>
            <div class="post-text"></div>
            <div class="post-user">
                <user-avatar small="true"></user-avatar>
                <div class="user-name"></div>
            </div>
      </div>
        `;

    const style = document.createElement("style");

    style.textContent = `
           .
           .post-block{
               border-radius: 10px;
               margin: 10px;
               padding: 10px;
           }

           .post-block .post-title{
               padding: 10px;
               font-weight: bold;
           }

           .post-block .post-text{
                margin-bottom: 20px;
                padding: 10px;
                font-family: fantasy;
                max-height: 150px;
                overflow: hidden;
                cursor: pointer;
           }
           .post-block .post-user{
                display:flex;
                justify-content:center;
                align-items:center;
                padding: 10px;
                font-family: arial;
                background-color: #ccc;
                cursor: pointer;

           }

           .user-avatar{
               margin-right: 10px;
           }

           .highlight{
               background-color: #ffdd4b;
           }
           .hide {
            display: none;

           }
        `;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const id = this.getAttribute("id");
    const post = getPost(id);

    const cards = shadow.querySelector(".post-t");
    const title = shadow.querySelector(".post-title");
    const text = shadow.querySelector(".post-text");

    title.textContent = post.title;
    text.textContent = post.texts;

    ee.on("e1", (data) => {
      let txt = data.text;
      const isVisible = post.text.includes(txt) || post.title.includes(txt);
      text.innerHTML = highlightText(post.text, txt);
      title.innerHTML = highlightText(post.title, txt);

      cards.classList.toggle("hide", !isVisible);
      // console.log(post.text.includes(txt));
    });

    text.addEventListener("click", (e) => {
      e.stopPropagation();
      //goto post
      //const url =
      //goTo(url)
    });

    const user = shadow.querySelector(".post-user");
    const userAvatar = shadow.querySelector("user-avatar");
    userAvatar.setAttribute("user-name", post.accountId.firstName);

    const userName = shadow.querySelector(".user-name");
    //debugger
    userName.textContent = post.accountId.firstName;

    user.addEventListener("click", (e) => {
      e.stopPropagation();
      //goto user
      //const url =
      //goTo(url)
    });
  }
}

customElements.define("post-component", PostComponent);
