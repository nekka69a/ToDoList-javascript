import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
    console.log(errorMessage);
  }
};

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

export { handleSubmitLogin, logout };
