import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js";

const handleSubmitLogin = async (event) => {
  event.preventDefault();
  const email = document.getElementById("mail-input").value;
  const password = document.getElementById("password-input").value;
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = userCredential;
    alert("Connexion...");
    window.location.href = "dashboard.html";
  } catch (error) {
    const errorMessage = error.message;
    alert(errorMessage);
  }
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      window.location.href = "login.html"; // Rediriger vers la page de connexion
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

export { handleSubmitLogin, logout };
