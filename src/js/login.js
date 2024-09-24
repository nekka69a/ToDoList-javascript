import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * This function handles the login process when the login form is submitted.
 * It signs in the user with their email and password, and redirects them to the dashboard if successful.
 * @param {Event} event - The form submission event.
 */

const handleSubmitLogin = async (event) => {
  event.preventDefault();
  const email = document.getElementById("mail-input").value;
  const password = document.getElementById("password-input").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    const errorMessage = error.message;
    console.error(errorMessage);
  }
};

/**
 * Sign out the current user and redirects them to the login page.
 */

const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

export { handleSubmitLogin, logout };
