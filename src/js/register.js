import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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
    console.log(authCredential.user);

    const docRef = doc(db, "users", authCredential.user.uid);
    await setDoc(docRef, {
      email: email.value,
    });

    alert("Création du compte...");
    window.location.href = "dashboard.html";
  } catch (error) {
    const errorMessage = error.message;
    console.error(errorMessage);
  }
};

export { handleSubmit };
