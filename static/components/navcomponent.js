/* eslint-disable */
let imgUrl;
// import { posts } from '../system/posts.js'
import { navigateTo } from '../js/routing.js';
// import { ee } from '../system/event.js'

class NavComponent extends HTMLElement {
  constructor(){
    super();
    const shadow = this.attachShadow({mode: 'open'})
    const wrapper = document.createElement('div');
    const searchDiv = document.createElement('div');
    const logoDiv = document.createElement('div');
    const linksDiv = document.createElement('div');
    const icon = document.createElement('span');
    const img = document.createElement('img');
    const search = document.createElement('input');
    this.searchType = 'post'

    img.setAttribute('href', '/');
    wrapper.setAttribute('class', 'main-menu');
    searchDiv.setAttribute('class', 'search-menu');
    linksDiv.setAttribute('class', 'link-menu');
    logoDiv.setAttribute('class', 'logo-menu');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);


    wrapper.appendChild(logoDiv);
    wrapper.appendChild(linksDiv);
    wrapper.appendChild(searchDiv);
    logoDiv.appendChild(icon);
    icon.appendChild(img);


    if(this.hasAttribute('img')) {
        imgUrl = this.getAttribute('img');
    } else {
        imgUrl = '../img/favicon.png';
    }

    img.src = imgUrl;


    this.links = [
        {href: '/', name: 'Home', class: 'home-link'},
        {href: '/posts', name: 'Posts', class: 'posts-link'},
        {href: '/settings', name: 'Settings', class: 'setting-link'},
    ]

    const style = document.createElement('style');


    style.textContent = `
    .main-menu {
        text-align: center;
        display:flex;
        }

        .logo-menu {
            flex: 1 0 20%;
        }
        .link-menu {
            flex: 1 0 40%;
            display: inline-flex;
        }

        .search-menu{
            flex: 1 0 40%;
        }
        .global-search {
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 4px 20px;
            width: 30%;
            margin: 0 50px;
        }

        .global-search:placeholder{
            color: #aaa;
        }
        `;
        shadow.appendChild(style);
        shadow.appendChild(wrapper);

        this.links.forEach(link => {
            const l = document.createElement('nav-link')
            l.setAttribute('class', `main-link ${link.class}`)
            l.setAttribute('href', link.href)
            l.setAttribute('text', link.name)
            linksDiv.appendChild(l)
        });

    search.setAttribute('class', 'global-search');

    search.addEventListener('keyup', (e) => {
        console.log('Search');
        // e.stopPropagation();
        // if(e.key === 'Enter') {
        //     e.preventDefault()
        //     const text = e.target.value;
        //     if (text) if(this.searchType === 'post') ee.emit('e1', { text });
        // }
    });


    searchDiv.appendChild(search);
  }

  async updateSearch() {
    // ee.on('e2', (data) => {
    //   console.log(data, '<-----------');
    // });
    const shadow = this.shadowRoot;
      const input = shadow.querySelector('input');
      const search = this.getAttribute('search');
      input.value = search;
      if(this.searchType === 'post') input.setAttribute('placeholder', 'Search post...');
      if(this.searchType === 'user') input.setAttribute('placeholder', 'Search user...');
  }

  connectedCallback(){
      const shadow = this.shadowRoot;
    //   const searchText = this.getAttribute('search')
      this.searchType = this.getAttribute('type');
    //   ? this.getAttribute('type') : appConstants.search.types.post

    //   if(searchText){
    //       const input = shadow.querySelector('input')
    //       input.value = searchText
    //   }

      const {pathname: path} = new URL(window.location.href)
      const link = this.links.find((l) => l.href === path)

      if(link) {
          const linkElement = shadow.querySelector(`.${link.class}`)
          linkElement.setAttribute('selected', 'true')
      }
  }


  static get observedAttributes(){
      return ['search', 'type']
  }

  attributeChangedCallback(name, oldValue, newValue){
    //   if(name === 'search') this.updateSearch();

      if(name === 'type') {
          this.searchType = newValue
          this.updateSearch()
      }
  }
}

customElements.define('main-nav', NavComponent)
