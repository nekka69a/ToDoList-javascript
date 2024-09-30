import { signOut } from "firebase/auth";
import { auth } from "./firebase-config.js";

/**
 * Sign out the current user and redirects them to the login page.
 */

const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

export default logout;
