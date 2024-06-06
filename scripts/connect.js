function setStateConnected() {
  let is = isConnected();

  const fbtnCon = document.getElementById("btn-connect");

  if (is) {
    fbtnCon.innerText = "Déconnexion";

    fbtnCon.addEventListener("click", funcDeco);
  } else {
    fbtnCon.innerText = "Connexion";
    fbtnCon.setAttribute("href", "connexion.html");
    //fbtnCon.removeEventListener(funcDeco);
  }
}
function isConnected() {
  return JSON.parse(sessionStorage.getItem("connect"));
}
setStateConnected();

function funcDeco(event) {
  event.preventDefault();
  alert("Vous êtes déconnecté...");
  sessionStorage.setItem("connect", JSON.stringify(false));

  document.location.href = "index.html";
}
