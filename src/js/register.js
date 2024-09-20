import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fonction pour gérer l'événement de clic sur le bouton de soumission
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
    alert(errorMessage);
  }
};

export { handleSubmit };
