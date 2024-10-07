// import { changeView } from "./router.js";
import init from "./ui.js";

const startApp = async () => {
  init();
};

document.addEventListener("DOMContentLoaded", startApp);
