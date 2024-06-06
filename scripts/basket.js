//Il n’a l’air de rien comme ça mais c’est la magie des modules : on isole les comportements.
//Nous commençons par importer une fonction initCart depuis notre module cart.js.

import { initCart } from "./cart.js";
let myDb = null;
//Nous appelons ensuite cette fonction dès que le DOM a fini de se charger.
window.addEventListener("DOMContentLoaded", (event) => {
  initCart();
});
window.onbeforeunload = function (event) {
  // Your logic here (e.g., display a warning message)
  setStateConnected();
};

const btnretour = document.getElementById('btnContAchat');
if (btnretour) {

  btnretour.addEventListener('click', () => {
    //window.location.href = 'catalogue.html';
    document.location.href = "catalogue.html";
  });
}

const btnvaliate = document.getElementById('btnValidCart');
if (btnvaliate) {

  btnvaliate.addEventListener('click', () => {
    alert('a venir...');
  });
}