import { auth } from "./firebase-config.js";
import logout from "./logout.js";
import { getUser } from "./auth.js";

/**
 * Returns the currently authenticated user.
 * @returns {Object|null} The currently authenticated user, or null if no user is authenticated.
 */

const getAuthenticatedUser = () => auth.currentUser;

const displayCurrentUserName = (email) => {
  const user = getUser();

  if (email) {
    const userName = document.querySelector(".username");
    if (user) {
      const paragraph = document.createElement("p");
      paragraph.innerHTML = `Welcome ${email}`;
      userName.appendChild(paragraph);
    }
  } else {
    console.warn("Email user not found");
  }
};

/**
 * This function generates a logout button for the user and displays it on the dashboard.
 * It also retrieves the user's tasks from the database.
 * @param {Object} user - The user object.
 */

const generateLogoutButton = async () => {
  const user = await getUser();
  const divLogout = document.querySelector(".div-logout");
  if (user) {
    const paragrah = document.createElement("p");
    paragrah.innerHTML = "Deconnexion";
    divLogout.addEventListener("click", logout);
    divLogout.appendChild(paragrah);
  }
  displayCurrentUserName(user ? user.email : null);
};

export { getAuthenticatedUser, generateLogoutButton, displayCurrentUserName };
