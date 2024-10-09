import { signInUser } from "./auth.js";
import { showAlert } from "./ui-helpers.js";

// ==========✨ Importations nécessaires pour le fonctionnement de l'application ✨==========

/**
 * This function handles the login process when the login form is submitted.
 * It signs in the user with their email and password, and redirects them to the dashboard if successful.
 * @param {Event} event - The form submission event.
 */
const handleSubmitLogin = (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("mail-input");
  const passwordInput = document.getElementById("password-input");

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    showAlert("Identifiants incorrects ! Veuillez réessayer");
    return;
  }

  signInUser(email, password);
};

// ==========🔄 Fonctions de gestion des événements de connexion 🔄==========

/**
 * Function that handles the click event for the login button.
 */
const handleClickLogin = () => {
  const submitLogin = document.querySelector(".login-submit");
  if (!submitLogin) {
    return;
  }
  submitLogin.addEventListener("click", handleSubmitLogin);
};

// ==========🚀 Exportations des fonctions 🚀==========

export { handleSubmitLogin, handleClickLogin };
