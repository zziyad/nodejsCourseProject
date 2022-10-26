/* eslint-disable*/
// import transport from '../system/transport.js';
// import { ee } from '../system/event.js';


class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.block = '';
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'form-block');
    wrapper.innerHTML = `
    <div class="container">
    <form class="form" id="login">
        <h1 class="form__title">Login</h1>
        <div class="form__message form__message--error"></div>
        <div class="form__input-group">
            <input type="text" class="form__input" id="username" autofocus placeholder="Username or email">
            <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
            <input type="password" class="form__input" id="password" autofocus placeholder="Password">
            <div class="form__input-error-message"></div>
        </div>
        <button class="form__button" type="submit">Continue</button>
        <p class="form__text">
            <a href="#" class="form__link">Forgot your password?</a>
        </p>
        <p class="form__text">
            <a class="form__link" href="/" id="linkCreateAccount">Don't have an account? Create account</a>
        </p>
    </form>
    <form class="form form--hidden" id="createAccount" >
        <h1 class="form__title">Create Account</h1>
        <div class="form__message form__message--error"></div>
        <div class="form__input-group">
            <input type="text" id="signupUsername" class="form__input" autofocus placeholder="Username">
            <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
        <input type="text" id="signupFirsName" class="form__input" autofocus placeholder="First name">
        <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
        <input type="text" id="signupLastName" class="form__input" autofocus placeholder="Last name">
        <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
        <input type="text" id="signupMobile" class="form__input" autofocus placeholder="Mobile number">
        <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
            <input type="text" id="signupEmail" class="form__input" autofocus placeholder="Email Address">
            <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
            <input type="password" id="spassword" class="form__input" autofocus placeholder="Password">
            <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
            <input type="password" id="cspassword" class="form__input" autofocus placeholder="Confirm password">
            <div class="form__input-error-message"></div>
        </div>
        <button class="form__button" type="submit">Continue</button>
        <p class="form__text">
            <a class="form__link" href="./index.html" id="linkLogin">Already have an account? Sign in</a>
        </p>
    </form>
</div>
    `;



    const style = document.createElement('style');
    style.textContent = `

    .container {
      width: 400px;
      max-width: 400px;
      margin: 1rem;
      padding: 2rem;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      background: #ffffff;
  }

  .form-block {
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .container,
  .form__input,
  .form__button {
      font: 500 1rem 'Quicksand', sans-serif;
  }

  .form--hidden {
      display: none;
  }

  .form > *:first-child {
      margin-top: 0;
  }

  .form > *:last-child {
      margin-bottom: 0;
  }

  .form__title {
      margin-bottom: 2rem;
      text-align: center;
  }

  .form__message {
      text-align: center;
      margin-bottom: 1rem;
  }

  .form__message--success {
      color: #4bb544;
  }

  .form__message--error {
      color: #cc3333;
  }

  .form__input-group {
      margin-bottom: 1rem;
  }

  .form__input {
      display: block;
      width: 100%;
      padding: 0.75rem;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid #dddddd;
      outline: none;
      background: #eeeeee;
      transition: background 0.2s, border-color 0.2s;
  }

  .form__input:focus {
      border-color: #009579;
      background: #ffffff;
  }

  .form__input--error {
      color: #cc3333;
      border-color: #cc3333;
  }

  .form__input-error-message {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #cc3333;
  }

  .form__button {
      width: 100%;
      padding: 1rem 2rem;
      font-weight: bold;
      font-size: 1.1rem;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      outline: none;
      cursor: pointer;
      background: #009579;
  }

  .form__button:hover {
      background: #007f67;
  }

  .form__button:active {
      transform: scale(0.98);
  }

  .form__text {
      text-align: center;
  }

  .form__link {
      color: var(--color-secondary);
      text-decoration: none;
      cursor: pointer;
  }

  .form__link:hover {
      text-decoration: underline;
  }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    function setFormMessage(formElement, type, message) {
      const messageElement = formElement.querySelector(".form__message");
      messageElement.textContent = message;
      messageElement.classList.remove("form__message--success", "form__message--error");
      messageElement.classList.add(`form__message--${type}`);
    }

  function setInputError(inputElement, message) {
      inputElement.classList.add("form__input--error");
      inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
    }

  function clearInputError(inputElement) {
      inputElement.classList.remove("form__input--error");
      inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
    }
  const loginForm = shadow.querySelector("#login");
  const createAccountForm = shadow.querySelector("#createAccount");
  const login = shadow.querySelector("#username");
  const password = shadow.querySelector("#password");
  const signupUsername = shadow.querySelector("#signupUsername");
  const signupFirsName = shadow.querySelector("#signupFirsName");
  const signupLastName = shadow.querySelector("#signupLastName");
  const signupMobile = shadow.querySelector("#signupMobile");

  const signupEmail = shadow.querySelector("#signupEmail");
  const spassword = shadow.querySelector("#spassword");
  const cspassword = shadow.querySelector("#cspassword");

  // this.socket.addEventListener('open', async () => {

    shadow.querySelector("#linkCreateAccount").addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.add("form--hidden");
    createAccountForm.classList.remove("form--hidden");
    });

    shadow.querySelector("#linkLogin").addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
  });

  loginForm.addEventListener("submit", async e => {
    e.preventDefault();
    let log = login.value;
    let pass = password.value;


    if (log === '' || pass === '') return setFormMessage(loginForm, "error", "Invalid username/password combination");

    const obj = {
      login: log,
      password: pass,
    }

    const schema = await window.api.entity.getEntity('post');
    console.log({ obj, schema });

    // const apiCall = await transport.send('signin', 'authorize', obj);
    // console.log({ apiC: apiCall.reqq });
    // if (apiCall.status === 'logged') {
    //   console.log('apiCall.token', apiCall);
    //   setFormMessage(loginForm, "succses", `${apiCall}`);
    //   // localStorage.setItem('metarhia.session.token', apiCall.token);
    //   window.location.href = '/dashboard';
    // } else {
    //   setFormMessage(loginForm, "error", `${apiCall.Error}`);

    // }


    // console.log({packet});
      // window.location.href = '/dashboard';

    });

  createAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let log = signupUsername.value;
    let ln = signupLastName.value;
    let fn = signupFirsName.value;
    let mob = signupMobile.value;
    let email = signupEmail.value;
    let pass = spassword.value;
    let pass2 = cspassword.value;


    if (log === '' || email === '' || pass === '') return setFormMessage(createAccountForm, "error", "Missing field");
    if (pass !== pass2) return setFormMessage(createAccountForm, "error", "Password is not match");

    const data = {
      login: log,
      firstName: fn,
      lastName: ln,
      phone: mob,
      email: email,
      password: pass,
      role: 'ADMIN',
    };


    // const apiCall = await transport.send('register', 'authorize', data);
    console.log(apiCall);
    if (apiCall.status === 'success') {
      setFormMessage(createAccountForm, "success", "Registration completed succssefully. The page will aoutomatically redirected");
      window.setTimeout(() => window.location.href = '/', 2000);
    } else {
      // setFormMessage(createAccountForm, "error", `${apiCall}`);
      setFormMessage(createAccountForm, "error", 'Error');
    }
  })

  shadow.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".form__input").forEach(inputElement => {
      inputElement.addEventListener("blur", e => {
        target = e.target
        if (target.id === "signupUsername" && target.value.length > 10 && target.value.length < 3) {
          setInputError(inputElement, "Username must be at least 10 characters in length");
        };

      });

      inputElement.addEventListener("input", e => {
        clearInputError(inputElement);
      });
    });
  });

  }

  // connectedCallback() {
  //   const shadow = this.shadowRoot;
  //   this.block = this.getAttribute('block');

  //   const wrapper = shadow.querySelector('.form-block');
  //   const title = shadow.querySelector('.title');
  //   title.textContent = `Form ${this.block}`;
  //   const okButton = shadow.querySelector('.ok-button');
  //   const cancelButton = shadow.querySelector('.cancel-button');

  //   // const inputText = shadow.querySelector('.input-text');
  //   // const inputPassword = shadow.querySelector('.input-password');

  //   okButton.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     // const md = shadow.querySelector('modal-dialog');
  //     // md.innerHTML = `
  //     // <div slot="title">Information</div>
  //     // <div slot="message">
  //     //   <div>ok</div>
  //     //   <div>Form ${this.block}</div>
  //     //   <div>Intut text: ${inputText.value}</div>
  //     //   <div>Input password: ${inputPassword.value}</div>
  //     // </div>
  //     // `;

  //     // md.setAttribute('is-opened', 'true');
  //     // md.setAttribute('dialog-type', dialogTypes.info);
  //     console.log('dfoihiooooooooooo');
  //   });

  //   cancelButton.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     // const md = shadow.querySelector('modal-dialog');
  //     // md.innerHTML = `
  //     // <div slot="title">Warning</div>
  //     // <div slot="message">
  //     // <div>Cancel</div>
  //     //   <div>Form ${this.block}</div>
  //     //   <div>Intut text: ${inputText.value}</div>
  //     //   <div>Input password: ${inputPassword.value}</div>
  //     // </div>
  //     // `;
  //     // md.setAttribute('is-opened', 'true');
  //     // md.setAttribute('dialog-type', dialogTypes.warning);
  //     console.log('dddddddddddddddddddoooooooooooooooo');
  //   });

  //   //adding modal dialog
  //   const modalDialog = shadow.createElement('modal-dialog');
  //   modalDialog.innerHTML = ``;

  //   modalDialog.addEventListener(defaultEvents.okEvent, (event) => {
  //     event.stopPropagation();
  //     alert('It was "Ok" button');
  //     modalDialog.setAttribute('is-opened', 'false');
  //   });
  //   modalDialog.addEventListener(defaultEvents.cancelEvent, (event) => {
  //     event.stopPropagation();
  //     alert('It was "Cancel" button');
  //     modalDialog.setAttribute('is-opened', 'false');
  //   });

  //   wrapper.appendChild(modalDialog);
  // }
}

customElements.define('login-form', LoginForm);
