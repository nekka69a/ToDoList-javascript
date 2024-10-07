import { changeView } from "./router.js";
import { disconnectUser } from "./auth.js";

/**
 * Sign out the current user and redirects them to the login page.
 */

const logout = () => {
  const submitLogout = document.querySelector(".div-logout");

  if (!submitLogout) {
    return;
  }
  submitLogout.addEventListener("click", (event) => {
    event.preventDefault();
    disconnectUser()
      .then(() => {
        changeView("login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
};

export default logout;
