import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config.js";
import {
  getAuthenticatedUser,
  generateLogoutButton,
  displayCurrentUserName,
} from "./ui-helpers.js";
import { handleClickRegister } from "./register.js";
import { handleClickLogin } from "./login.js";
import {
  initializeAddNewTaskListener,
  initializeDragAndDropColumns,
  updateDisplayedTasks,
} from "./dashboard.js";
import { changeView } from "./router.js";
import initializeProtectionRouterListener from "./middleware.js";

/**
 * Initialize event listeners for the register, login, and logout buttons.
 * Initializes task generation and drag and drop functionality if the user is logged in.
 */

const setUpEventListener = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const authenticatedUser = getAuthenticatedUser();
      displayCurrentUserName(user.email);
      updateDisplayedTasks(authenticatedUser.uid);
      initializeAddNewTaskListener();
      initializeDragAndDropColumns();
      generateLogoutButton(authenticatedUser);
    } else {
      console.log("User is not signed in");
    }
  });
};

/**
 * Initializes the UI components and event listeners
 */

const init = () => {
  handleClickRegister();
  handleClickLogin();
  initializeProtectionRouterListener();
  changeView();
  setUpEventListener();
};

export default init;
