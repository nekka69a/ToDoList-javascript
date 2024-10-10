import { auth } from "./firebase-config.js";
import logout from "./logout.js";
import { getUser } from "./auth.js";

// ==========✨ Importations nécessaires pour le fonctionnement de l'application ✨==========

/**
 * Returns the currently authenticated user.
 * @returns {Object|null} The currently authenticated user, or null if no user is authenticated.
 */
const getAuthenticatedUser = () => auth.currentUser;

// 👤 Fonctions de gestion de l'utilisateur 👤

/**
 * Displays the current user's name.
 * @param {string} email - The email of the user.
 */
const displayCurrentUserName = async (email) => {
  const user = await getUser();

  if (!email) {
    return;
  }

  const userName = document.querySelector(".username");
  if (user) {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `Welcome ${email}`;
    userName.appendChild(paragraph);
  }
};

/**
 * This function generates a logout button for the user and displays it on the dashboard.
 * It also retrieves the user's tasks from the database.
 * @param {Object} user - The user object.
 */
const generateLogoutButton = async () => {
  const user = await getUser();
  if (!user) {
    return;
  }
  const divLogout = document.querySelector(".div-logout");
  if (user) {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = "Deconnexion";
    divLogout.addEventListener("click", logout);
    divLogout.appendChild(paragraph);
  }
  displayCurrentUserName(user ? user.email : null);
};

// ==========🔄 Fonctions de gestion du loader 🔄==========

/**
 * Set a loader inside the containerClass.
 * @param {string} containerClass - The class of the container to add the loader.
 * @param {boolean} isLoading - Whether to show or hide the loader.
 * @returns {void}
 */
const setLoader = (containerClass, isLoading) => {
  const container = document.querySelector(containerClass);

  if (!container) {
    return;
  }

  if (isLoading) {
    const loader = document.createElement("div");
    loader.className = "loader";
    loader.style.textAlign = "center";
    container.appendChild(loader);
  } else {
    const loader = container.querySelector(".loader");
    if (loader) {
      loader.remove();
    }
  }
};

// ==========📢 Fonctions de gestion des alertes 📢==========

/**
 * Show an alert message for 5 seconds.
 * @param {string} message - The message to show inside the alert.
 */
const showAlert = (message) => {
  const errorContainer = document.getElementById("error-msg-container");
  const alertMsg = document.querySelector(".alert-msg");

  alertMsg.textContent = message;
  errorContainer.style.display = "block";

  setTimeout(() => {
    errorContainer.style.display = "none";
  }, 5000);
};

// ==========🚀 Exportations des fonctions 🚀==========

export {
  getAuthenticatedUser,
  generateLogoutButton,
  displayCurrentUserName,
  setLoader,
  showAlert,
};
