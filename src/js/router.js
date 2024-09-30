const redirect = (view, isFromIndex) => {
  const currentFullPath = window.location.pathname;
  const currentRoute = currentFullPath.split("/").pop();

  const baseURL = currentFullPath.replace(`/${currentRoute}`, "");

  if (isFromIndex) {
    const newPath = `${baseURL}/view/${view}.html`;
    window.location.href = newPath;
    return;
  }

  const newPath = `${baseURL}/${view}.html`;
  window.location.href = newPath;
};

const changeView = (view, isFromIndex) => {
  if (view === "login") {
    // rediriger vers login
    redirect("login", isFromIndex);
  }

  if (view === "register") {
    // rediriger vers register
    redirect("register", isFromIndex);
  }
};

window.changeView = changeView;

export default changeView;
