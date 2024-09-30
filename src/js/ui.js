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
import changeView from "./router.js";

/**
 *Function that we handle event click for RegisterButton
 */

const handleClickRegister = () => {
  const submitRegister = document.querySelector(".register-submit");
  if (!submitRegister) {
    return;
  }
  submitRegister.addEventListener("click", handleRegister);
};

/**
 *Function that we handle event click for LoginButton
 */

const handleclickLogin = () => {
  const submitLogin = document.querySelector(".login-submit");
  if (!submitLogin) {
    return;
  }
  submitLogin.addEventListener("click", handleSubmitLogin);
};

/**
 *Function that we handle event click for logoutButton
 */

const handleClickLogout = () => {
  const submitLogout = document.querySelector(".div-logout");
  submitLogout.addEventListener("click", logout);
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
  changeView();
  setUpEventListener();
};

export default init;
