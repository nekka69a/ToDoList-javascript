import { generateLogoutButton } from "./ui-helpers.js";
import { handleClickRegister } from "./register.js";
import { handleClickLogin } from "./login.js";
import {
  initializeAddNewTaskListener,
  initializeDragAndDropColumns,
} from "./dashboard.js";
import { changeView } from "./router.js";
import initializeProtectionRouterListener from "./middleware.js";

/**
 * Initializes the UI components and event listeners
 */

const init = () => {
  changeView();
  handleClickRegister();
  handleClickLogin();
  initializeProtectionRouterListener();
  initializeAddNewTaskListener();
  initializeDragAndDropColumns();
  generateLogoutButton();
};

export default init;
