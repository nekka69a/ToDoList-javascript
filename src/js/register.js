import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config.js";

/**
 * Handle the registration
 * Create a new user with their email and password, adds the user to the Firestore database
 * @param {Event} event - The form submission event.
 */

const handleRegister = async (event) => {
  event.preventDefault();
  const email = document.getElementById("mail-register-input");
  const password = document.getElementById("password-register-input");
  const errorMsg = document.querySelector(".error-msg");

  if (!email || !password) {
    errorMsg.textContent = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);

    window.location.href = "dashboard.html";
  } catch (error) {
    const errorMessage = error.message;
    errorMsg.textContent = "Une erreur s'est produite. Veuillez réessayer.";
    console.error(errorMessage);
  }
};

export { handleRegister };
