/* eslint-disable max-len */
// import { socket, api } from "../system/scaffold.js";
// import { ee } from '../system/events.js';
// import { routers } from '../system/routing.js'

// class Login extends HTMLElement {
//   constructor() {
//     super();
//     this.event = ee;
//     this.socket = socket;
//     this.innerHTML = `
//     <div class="container">
//     <form class="form" id="login" action="./dashboard.html">
//         <h1 class="form__title">Login</h1>
//         <div class="form__message form__message--error"></div>
//         <div class="form__input-group">
//             <input type="text" class="form__input" id="username" autofocus placeholder="Username or email">
//             <div class="form__input-error-message"></div>
//         </div>
//         <div class="form__input-group">
//             <input type="password" class="form__input" id="password" autofocus placeholder="Password">
//             <div class="form__input-error-message"></div>
//         </div>
//         <button class="form__button" type="submit">Continue</button>
//         <p class="form__text">
//             <a href="#" class="form__link">Forgot your password?</a>
//         </p>
//         <p class="form__text">
//             <a class="form__link" href="/signin" id="linkCreateAccount">Don't have an account? Create account</a>
//         </p>
//     </form>
//     <form class="form form--hidden" id="createAccount" >
//         <h1 class="form__title">Create Account</h1>
//         <div class="form__message form__message--error"></div>
//         <div class="form__input-group">
//             <input type="text" id="signupUsername" class="form__input" autofocus placeholder="Username">
//             <div class="form__input-error-message"></div>
//         </div>
//         <div class="form__input-group">
//             <input type="text" id="signupEmail" class="form__input" autofocus placeholder="Email Address">
//             <div class="form__input-error-message"></div>
//         </div>
//         <div class="form__input-group">
//             <input type="password" id="spassword" class="form__input" autofocus placeholder="Password">
//             <div class="form__input-error-message"></div>
//         </div>
//         <div class="form__input-group">
//             <input type="password" id="cspassword" class="form__input" autofocus placeholder="Confirm password">
//             <div class="form__input-error-message"></div>
//         </div>
//         <button class="form__button" type="submit">Continue</button>
//         <p class="form__text">
//             <a class="form__link" href="./index.html" id="linkLogin">Already have an account? Sign in</a>
//         </p>
//     </form>
// </div>
//     `;

//     function setFormMessage(formElement, type, message) {
//         const messageElement = formElement.querySelector(".form__message");
//         messageElement.textContent = message;
//         messageElement.classList.remove("form__message--success", "form__message--error");
//         messageElement.classList.add(`form__message--${type}`);
//       }

//     function setInputError(inputElement, message) {
//         inputElement.classList.add("form__input--error");
//         inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
//       }

//     function clearInputError(inputElement) {
//         inputElement.classList.remove("form__input--error");
//         inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
//       }
//     const loginForm = document.querySelector("#login");
//     const createAccountForm = document.querySelector("#createAccount");
//     const login = document.querySelector("#username");
//     const password = document.querySelector("#password");
//     const signupUsername = document.querySelector("#signupUsername");
//     const signupEmail = document.querySelector("#signupEmail");
//     const spassword = document.querySelector("#spassword");
//     const cspassword = document.querySelector("#cspassword");

//     // this.socket.addEventListener('open', async () => {

//     document.querySelector("#linkCreateAccount").addEventListener("click", e => {
//       e.preventDefault();
//       loginForm.classList.add("form--hidden");
//       createAccountForm.classList.remove("form--hidden");
//       });

//     document.querySelector("#linkLogin").addEventListener("click", e => {
//       e.preventDefault();
//       loginForm.classList.remove("form--hidden");
//       createAccountForm.classList.add("form--hidden");
//     });

//     loginForm.addEventListener("submit", async e => {
//       e.preventDefault();
//       let log = login.value;
//       let pass = password.value;

//       const packet = {
//         login: log,
//         password: pass
//       };

//       if (log === '' || pass === '') return setFormMessage(loginForm, "error", "Invalid username/password combination");
//       // const ping = await api.ping.send()
//       const token = 'i97S5o4ZOFqrEjC0MoRY0W89CFHt9QZ5udQogfUcgHcfobWuGKHyA6K0jyw5fe3f';
//       const phone = '5112345678'
//       const user = await api.users.get(phone, token );

//       const data = await api.storage.set('user', user);

//       const get = await api.storage.get('user');

//       console.log(get.Error);
//         // this.event.emit('smth', user);

//         console.log(user.Error);

//         routers.goTo('settings');
//         // window.location.href = '/dashboard';

//       });

//     createAccountForm.addEventListener("submit", e => {
//       e.preventDefault();
//       let log = signupUsername.value;
//       let email = signupEmail.value;
//       let pass = spassword.value;
//       let pass2 = cspassword.value;

//       const packet = {
//         log,
//         email,
//         pass,
//         pass2
//       };
//       if (log === '' || email === '' || pass === '') return setFormMessage(createAccountForm, "error", "Invalid username/password combination");
//       if (pass !== pass2) return setFormMessage(createAccountForm, "error", "Password is not match");

//       setFormMessage(createAccountForm, "success", "Registration completed succssefully. The page will aoutomatically redirected");
//       window.setTimeout(() => window.location.href = '/signin', 2000);

//       console.log(packet);
//     })

//     document.addEventListener("DOMContentLoaded", () => {
//       document.querySelectorAll(".form__input").forEach(inputElement => {
//         inputElement.addEventListener("blur", e => {
//           target = e.target
//           if (target.id === "signupUsername" && target.value.length > 0 && target.value.length < 3) {
//             setInputError(inputElement, "Username must be at least 10 characters in length");
//           };

//         });

//         inputElement.addEventListener("input", e => {
//           clearInputError(inputElement);
//         });
//       });
//     });
//   }
// }

//   window.customElements.define('login-form', Login);
