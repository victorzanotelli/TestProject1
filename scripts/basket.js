//Il n’a l’air de rien comme ça mais c’est la magie des modules : on isole les comportements.
//Nous commençons par importer une fonction initCart depuis notre module cart.js.

import { initCart } from "./cart.js";
let myDb = null;
//Nous appelons ensuite cette fonction dès que le DOM a fini de se charger.
window.addEventListener("DOMContentLoaded", (event) => {
  initCart();
});
