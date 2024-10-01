import init from "./ui.js";

const startApp = async () => {
  init();
};

// Une fois que le DOM est complètement chargé, démarre l'appli

document.addEventListener("DOMContentLoaded", startApp);
