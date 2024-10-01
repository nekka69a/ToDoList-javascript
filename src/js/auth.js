import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase-config.js";
import changeView from "./router.js";

/**
 * Create a new user
 * @param {String} email --The email address of the user
 * @param {String} password --The password of the user
 * @returns {void}
 */

const signUpUser = (email, password) => {
  const errorMsg = document.querySelector(".error-msg-register");
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      changeView("dashboard");
    })
    .catch((error) => {
      const errorMessage = error.message;
      errorMsg.textContent = "Une erreur s'est produite. Veuillez réessayer.";
      console.error(errorMessage);
    });
};

/**
 *
 * @param {String} email -- The email address of the user
 * @param {String} password -- The password address of the user
 * @returns {void}
 */

const signInUser = (email, password) => {
  const errorMsg = document.querySelector(".error-msg-login");
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      changeView("dashboard");
    })
    .catch((error) => {
      const errorMessage = error.message;
      errorMsg.textContent = "Veuillez entrer des identifiants valides !";
      console.error(errorMessage);
    });
};

export { signUpUser, signInUser };
