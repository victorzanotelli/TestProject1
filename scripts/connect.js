function setStateConnected() {
  const is = isConnected();
  console.log("connected", is);
  if (is) {
    const fbtnCon = document.getElementById("btn-connect");

    if (isConnected()) {
      fbtnCon.textContent = "Déconnexion";
      //fbtnCon.setAttribute("href", "javascript:funcDeco()");
      fbtnCon.addEventListener("click", funcDeco);
    } else {
      fbtnCon.textContent = "Connexion";
      fbtnCon.setAttribute("href", "connexion.html");
      fbtnCon.removeEventListener(funcDeco);
    }
  }
}
function isConnected() {
  return sessionStorage.getItem("connect");
}
setStateConnected();

function funcDeco(event) {
  event.preventDefault();
  alert("Vous êtes déconnecté...");
  sessionStorage.setItem("connect", false);
  setStateConnected();
}
