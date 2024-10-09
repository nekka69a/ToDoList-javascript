import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config.js";
import { changeView } from "./router.js";
import { showAlert } from "./ui-helpers.js";

/**
 * Create a new user
 * @param {String} email --The email address of the user
 * @param {String} password --The password of the user
 * @returns {void}
 */

const signUpUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      changeView("dashboard");
    })
    .catch((error) => {
      showAlert("Veuillez entrer des identifiants valides !");
      console.error(error);
    });
};

/**
 *
 * @param {String} email -- The email address of the user
 * @param {String} password -- The password address of the user
 * @returns {void}
 */

const signInUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      changeView("dashboard");
    })
    .catch((error) => {
      showAlert("Veuillez entrer des identifiants valides !");
      console.error(error);
    });
};

/**
 * Asynchronously gets the current authenticated user
 * @returns {Promise<User | null>} -- The user object if logged in, otherwise null
 */

const getUser = async () =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      },
      reject,
    );
  });

/**
 * Disconnect User
 */

const disconnectUser = () => signOut(auth);

export { signUpUser, signInUser, getUser, disconnectUser };
