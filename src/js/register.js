import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase-config.js";

/**
 * Handle the registration
 * Create a new user with their email and password, adds the user to the Firestore database
 * @param {Event} event - The form submission event.
 */

const handleSubmit = async (event) => {
  event.preventDefault();
  const email = document.getElementById("mail-register-input");
  const password = document.getElementById("password-register-input");
  try {
    const authCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value,
    );

    const docRef = doc(db, "users", authCredential.user.uid);
    await setDoc(docRef, {
      email: email.value,
    });

    window.location.href = "dashboard.html";
  } catch (error) {
    const errorMessage = error.message;
    console.error(errorMessage);
  }
};

export { handleSubmit };
