import init from "./ui.js";

const startApp = () => {
  console.log("j'en ai marre");
  init();
};

// Une fois que le DOM est complètement chargé, démarre l'appli

document.addEventListener("DOMContentLoaded", startApp);
