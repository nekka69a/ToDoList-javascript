import { signUpUser } from "./auth.js";
import { showAlert } from "./ui-helpers.js";

/**
 * Handle the registration
 * Create a new user with their email and password, adds the user to the Firestore database
 * @param {Event} event - The form submission event.
 */

const handleRegister = (event) => {
  event.preventDefault();
  const emailInput = document.getElementById("mail-register-input");
  const passwordInput = document.getElementById("password-register-input");

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    showAlert("Veuillez remplir tous les champs !");
    return;
  }
  signUpUser(email, password);
};

/**
 *Function that we handle event click for RegisterButton
 */

const handleClickRegister = () => {
  const submitRegister = document.querySelector(".register-submit");
  if (!submitRegister) {
    return;
  }
  submitRegister.addEventListener("click", handleRegister);
};

export { handleRegister, handleClickRegister };
