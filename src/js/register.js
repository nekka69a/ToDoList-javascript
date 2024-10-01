import { signUpUser } from "./auth.js";

/**
 * Handle the registration
 * Create a new user with their email and password, adds the user to the Firestore database
 * @param {Event} event - The form submission event.
 */

const handleRegister = (event) => {
  event.preventDefault();
  const emailInput = document.getElementById("mail-register-input");
  const passwordInput = document.getElementById("password-register-input");
  const errorMsg = document.querySelector(".error-msg-register");

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    errorMsg.textContent = "Veuillez remplir tous les champs.";
    return;
  }
  signUpUser(email, password);
};

export default handleRegister;
