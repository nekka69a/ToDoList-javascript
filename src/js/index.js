import app from "./ui.js";

const startApp = async () => {
  console.log("j'en ai marre");
  app();
};

// Une fois que le DOM est complètement chargé, démarre l'appli

document.addEventListener("DOMContentLoaded", startApp);
