/* eslint-disable */

class PostComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    `;
    const wrapper = document.createElement("div");
    const div1 = document.createElement("div");
    div1.setAttribute("class", "card mt-4");
    const div2 = document.createElement("div");
    div2.setAttribute("class", "card-body");
    const h4 = document.createElement("h4");
    h4.setAttribute("class", "card-title");
    h4.innerHTML = "instance.title";
    const div3 = document.createElement("div");
    div3.setAttribute("class", "card-subtitle text-muted mb-2");
    const div4 = document.createElement("div");
    div4.setAttribute("class", "card-text mb-2");
    div4.innerHTML = "schema.createdAt.now";
    const a1 = document.createElement("a");
    a1.setAttribute("href", `${"instance.slug"}.html`);
    a1.setAttribute("class", "btn btn-primary");
    a1.innerHTML = "Read More";
    const a2 = document.createElement("a");
    a2.setAttribute("href", `${"instance.slug"}.html`);
    a2.setAttribute("class", "btn btn-info");
    a2.innerHTML = "Edit";
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("class", "d-inline");
    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "btn btn-danger");
    button.innerHTML = "Delete";
    div2.appendChild(h4);
    div2.appendChild(div3);
    div2.appendChild(div4);
    div2.appendChild(a1);
    div2.appendChild(a2);
    form.appendChild(button);
    div2.appendChild(form);
    div1.appendChild(div2);
    wrapper.appendChild(div1);

    // wrapper.innerHTML = `
    //    <div class="post-t">
    //         <div class="post-title"></div>
    //         <div class="post-text"></div>
    //         <div class="post-user">
    //             <user-avatar small="true"></user-avatar>
    //             <div class="user-name"></div>
    //         </div>
    //   </div>
    //     `;

    // const style = document.createElement('style');

    // style.textContent = `
    //        .
    //        .post-block{
    //            border-radius: 10px;
    //            margin: 10px;
    //            padding: 10px;
    //        }

    //        .post-block .post-title{
    //            padding: 10px;
    //            font-weight: bold;
    //        }

    //        .post-block .post-text{
    //             margin-bottom: 20px;
    //             padding: 10px;
    //             font-family: fantasy;
    //             max-height: 150px;
    //             overflow: hidden;
    //             cursor: pointer;
    //        }
    //        .post-block .post-user{
    //             display:flex;
    //             justify-content:center;
    //             align-items:center;
    //             padding: 10px;
    //             font-family: arial;
    //             background-color: #ccc;
    //             cursor: pointer;

    //        }

    //        .user-avatar{
    //            margin-right: 10px;
    //        }

    //        .highlight{
    //            background-color: #ffdd4b;
    //        }
    //        .hide {
    //         display: none;

    //        }
    //     `;
    // shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  // connectedCallback() {
  //   const shadow = this.shadowRoot;
  //   const id = this.getAttribute('id');
  //   const post = getPost(id);

  //   const cards = shadow.querySelector('.post-t')
  //   const title = shadow.querySelector('.post-title');
  //   const text = shadow.querySelector('.post-text');

  //     title.textContent = post.title;
  //     text.textContent = post.texts;

  //     ee.on('e1', (data) => {
  //       let txt = data.text;
  //       const isVisible = post.text.includes(txt) || post.title.includes(txt);
  //       text.innerHTML = highlightText(post.text, txt);
  //       title.innerHTML = highlightText(post.title, txt);

  //       cards.classList.toggle('hide', !isVisible)
  //       // console.log(post.text.includes(txt));

  //     });

  //   text.addEventListener('click', (e) => {
  //     e.stopPropagation();
  //     //goto post
  //     //const url =
  //     //goTo(url)
  //   });

  //   const user = shadow.querySelector('.post-user');
  //   const userAvatar = shadow.querySelector('user-avatar');
  //   userAvatar.setAttribute('user-name', post.accountId.firstName);

  //   const userName = shadow.querySelector('.user-name');
  //   //debugger
  //   userName.textContent = post.accountId.firstName;

  //   user.addEventListener('click', (e) => {
  //     e.stopPropagation();
  //     //goto user
  //     //const url =
  //     //goTo(url)
  //   });

  // };
}

customElements.define("post-comp", PostComponent);
