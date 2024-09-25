import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase-config.js";

/**
 * This function handles the login process when the login form is submitted.
 * It signs in the user with their email and password, and redirects them to the dashboard if successful.
 * @param {Event} event - The form submission event.
 */

const handleSubmitLogin = async (event) => {
  event.preventDefault();
  const emailInput = document.getElementById("mail-input");
  const passwordInput = document.getElementById("password-input");
  const errorMsg = document.querySelector(".error-msg");
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    const errorMessage = error.message;
    errorMsg.textContent = "Veuillez entrer des identifiants valides !";
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
