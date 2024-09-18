import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

// Fonction pour ajouter un utilisateur à Firestore
// async function addUserToFirestore(user) {
//   try {
//     const docRef = doc(db, "users", user.uid);
//     await setDoc(docRef, {
//       email: user.email,
//     });
//     console.log("User added to Firestore:", user);
//   } catch (error) {
//     console.error("Error adding user to Firestore:", error);
//   }
// }

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
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  }
};

const handleClickRegister = () => {
  const submitRegister = document.getElementById("register-submit");
  submitRegister.addEventListener("click", handleSubmit);
  console.log("de cette appli");
};

export { handleClickRegister };
