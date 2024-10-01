import { signInUser } from "./auth.js";

/**
 * This function handles the login process when the login form is submitted.
 * It signs in the user with their email and password, and redirects them to the dashboard if successful.
 * @param {Event} event - The form submission event.
 */

const handleSubmitLogin = (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("mail-input");
  const passwordInput = document.getElementById("password-input");
  const errorMsg = document.querySelector(".error-msg-login");

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    errorMsg.textContent = "Veuillez remplir tous les champs.";
    return;
  }
  signInUser(email, password);
};

export default handleSubmitLogin;
