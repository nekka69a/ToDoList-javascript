import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config.js";
import {
  getAuthenticatedUser,
  generateNewTask,
  generateLogoutButton,
  updateDragAndDropData,
  updateDisplayedTasks,
  displayCurrentUserName,
} from "./ui-helpers.js";
import { handleRegister } from "./register.js";
import { handleSubmitLogin, logout } from "./login.js";

/**
 *Function that we handle event click for RegisterButton
 */

const handleClickRegister = async () => {
  const submitRegister = document.getElementById("register-submit");
  submitRegister.addEventListener("click", await handleRegister);
};

/**
 *Function that we handle event click for LoginButton
 */

const handleclickLogin = async () => {
  const submitLogin = document.getElementById("login-submit");
  submitLogin.addEventListener("click", await handleSubmitLogin);
};

/**
 *Function that we handle event click for logoutButton
 */

const handleClickLogout = async () => {
  const submitLogout = document.querySelector(".div-logout");
  submitLogout.addEventListener("click", await logout);
};

/**
 * Initialize event listeners for the register, login, and logout buttons.
 * Initializes task generation and drag and drop functionality if the user is logged in.
 */

const setUpEventListener = () => {
  /**
   * Initialize task generation for the todo, doing, and done lists.
   */

  const initializeTaskGeneration = () => {
    generateNewTask(".todo-button", ".todo-list", "todo");
    generateNewTask(".doing-button", ".doing-list", "doing");
    generateNewTask(".done-button", ".done-list", "done");
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const authenticatedUser = getAuthenticatedUser();
      displayCurrentUserName(user.email);
      updateDisplayedTasks(authenticatedUser.uid);
      initializeTaskGeneration();
      updateDragAndDropData();
      generateLogoutButton(authenticatedUser);
    } else {
      console.log("User is not signed in");
    }
  });

  handleClickRegister();
  handleclickLogin();
  handleClickLogout();
};

/**
 * Initializes the UI components and event listeners
 */

const init = () => {
  setUpEventListener();
};

export default init;
