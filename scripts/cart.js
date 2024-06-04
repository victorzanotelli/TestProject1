// init the cart with either data from session storage or the demo data
// source https://gaellan.github.io/javascript/2022/08/30/ecommerce-cart-with-js-modules.html

import { getTheFakeBd } from "./fakeProducts.js";
//const TheFakeBdd = localStorage.getItem('myFakeBdd');;
function initCart() {
  if (getCart() === null) {
    // if cart session storage doesn't exist create it
    saveCart(buildFakeCart());
  }

  renderCart();
}

export { initCart };

//La fonction getCart() va nous permettre de récupérer l’état actuel du panier que nous stockons
// dans le sessionStorage :
// retrieve the cart from session storage
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart"));
}

//La fonction saveCart() va nous permettre de sauvegarder l’état actuel du panier que nous stockons>>
// update the cart in session storage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

//fakeCart fakeCart est un objet représentant notre panier et son contenu
//que nous utilisons pour faire notre démonstration. Dans un vrai site il serait relié,
//via des appels à fetch au panier réel de notre client-e.


function buildFakeCart() {
  let bd = getTheFakeBd();
  console.log(bd);
  let fakeProductCart = {
    totalPrice: 59,
    itemCount: 4,
    items: [bd[0], bd[1], bd[3], bd[6]]
  }
  return fakeProductCart;
}


let fakeCart = {
  totalPrice: 59,
  itemCount: 4,
  items: [
    {
      id: 12,
      imageUrl: "https://picsum.photos/id/1025/50/50",
      name: "portable 34532 Tochi",
      price: 23,
      amount: 1,
    },
    {
      id: 23,
      imageUrl: "https://picsum.photos/id/823/50/50",
      name: "portable 4587 Del",
      price: 17.5,
      amount: 1,
    },
    {
      id: 42,
      imageUrl: "https://picsum.photos/id/742/50/50",
      name: "portable 893 Del spiron",
      price: 19,
      amount: 1,
    },
    {
      id: 44,
      imageUrl: "https://picsum.photos/200/300?random=1",
      name: "portable V game Boef",
      price: 100,
      amount: 1,
    },
  ],
};

// this cart is for demonstration purposes only,
// it should be replaced by the real thing

//renderCart()
//c’est la fonction qui va nous permettre d’afficher notre panier et ses produits.
//Elle va remplir notre HTML avec le HTML qui correspond aux produits du panier.

// display the cart
function renderCart() {
  // retrieve the cart
  let cart = getCart();

  // remove the ul
  let productList = document.querySelector("body > main >  aside > section");
  let ulToRemove = document.querySelector("body > main > aside > section > ul");

  productList.removeChild(ulToRemove);
  // class="basket-container"
  // create the new ul
  let newUl = document.createElement("ul");
  newUl.classList.add("tableau");
  // create the lis
  if (cart.items.length !== 0) {
    for (let i = 0; i < cart.items.length; i++) {
      let css_b = "cart-Col";
      // ici //
      if (cart.items[i].price > 0) {
        let item = cart.items[i];

        newUl.appendChild(createCartItem(item));
        productList.appendChild(newUl);
        let totalPrice = document.getElementById("cart-total-price");
        totalPrice.innerText = "Total : " + cart.totalPrice + " €";
      }
    }
  }
  else {

    newUl.innerHTML = "Votre panier est vide";
    productList.appendChild(newUl);
    //let totalPrice = document.getElementById("cart-total-price");
    //totalPrice.innerText = "Total : " + cart.totalPrice + " €";
  }
  console.log("nb product", getTheFakeBd());



  // update cart total price


  loadListeners();
}

function new_element_col(cls) {
  let vdiv = document.createElement("div");
  //let clsBasic = "crt-col";
  //vdiv.classList.add(clsBasic);
  vdiv.classList.add(cls);

  return vdiv;
}

function crt_img(item, cls) {
  let vdiv = new_element_col(cls);

  let img = document.createElement("img");
  img.setAttribute("alt", "image du produit " + item.id);
  img.setAttribute("src", item.imageUrl);
  vdiv.appendChild(img);
  //vdiv.classList.add("img-w");
  return vdiv;
}

function crt_text(textvalue, cls) {
  let vdiv = new_element_col(cls);
  let productInfodiv = document.createElement("span");
  // creating the product info
  let productInfo = document.createElement("p");
  //productInfo.classList.add("cart");
  let productNameContent = document.createTextNode(textvalue);
  productInfo.appendChild(productNameContent);
  productInfodiv.appendChild(productInfo);
  vdiv.appendChild(productInfodiv);
  return vdiv;
}

function crt_action(item, cls) {
  let vdiv = new_element_col(cls);
  vdiv.appendChild(crt_btn(item, "cart-Col-add", "+"));
  vdiv.appendChild(crt_text(item.amount, "qt"));
  vdiv.appendChild(crt_btn(item, "cart-Col-minus", "-"));
  return vdiv;
}

function crt_btn(item, cls, ct) {
  let btn = document.createElement("button");
  btn.setAttribute("data-product-id", item.id);
  btn.classList.add(cls);

  let txt = document.createTextNode(ct);
  btn.appendChild(txt);
  return btn;
}

function crt_price(item, cls) {
  let vdiv = new_element_col(cls);

  let productPriceSpan = document.createElement("span");

  let productPriceSpanContent = document.createTextNode(
    "" + (item.amount * item.price).toFixed(2)
  );
  productPriceSpan.appendChild(productPriceSpanContent);
  vdiv.appendChild(productPriceSpan);
  return vdiv;
}

//createCartItem()
// create one cart item to be injected in the html
function createCartItem(item) {
  let li = document.createElement("li");
  li.classList.add("cols");
  li.appendChild(crt_img(item, "col1"));
  li.appendChild(crt_text(item.name, "col2"));
  li.appendChild(crt_action(item, "col3"));
  li.appendChild(crt_price(item, "col4"));

  return li;
}

// loadListeners() est la fonction qui va nous permettre d’écouter les clics
//sur tout nos boutons d’ajout ou retrait de quantité d’articles dans le panier.
function loadListeners() {
  let addButtons = document.getElementsByClassName("cart-Col-add");
  let removeButtons = document.getElementsByClassName("cart-Col-minus");

  for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", addItem);
    removeButtons[i].addEventListener("click", removeItem);
  }
}

//addItem() est la fonction qui permet d’augmenter de 1 la quantité d’un produit dans le panier :
function addItem(event) {
  let id = event.target.getAttribute("data-product-id");
  let itemKey = findItem(id);
  let cart = getCart();

  if (itemKey !== null) {
    cart.items[itemKey].amount += 1;
    saveCart(cart);
    computeCartTotal();
    renderCart();
  }
}

//Nous récupérons l’id du produit concerné en utilisant l’attribut data-product-id de notre bouton.
//Comment savons nous quel bouton a été cliqué ? En utilisant l’attribut event.target
//de l’évenement que nous envoie notre listener.
//Nous recherchons ensuite dans les produits de notre panier l’index auquel se trouve celui
//que nous voulons modifier en utilisant une fonction findItem() que nous avons créée.

// get the item key in the cart.items array
function findItem(id) {
  let cart = getCart();

  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id === parseInt(id)) {
      return i;
    }
  }

  return null;
}

//computeCartTotal()
//computeCartTotal met le prix total du panier à 0, puis parcourt la liste
//des produits puis ajoute pour chaque produit quantité x prix au prix total puis sauvegarde le panier.
// update the total price of the cart
function computeCartTotal() {
  let cart = getCart();
  let price = 0;

  for (let i = 0; i < cart.items.length; i++) {
    price += cart.items[i].price * cart.items[i].amount;
  }

  cart.totalPrice = price.toFixed(2);
  saveCart(cart);
}

// removeItem()
// removeItem fonctionne exactement comme addItem
// sauf que l’on fait - 1 au lieu de + 1 :
// update the item amount to - 1
function removeItem(event) {
  let id = event.target.getAttribute("data-product-id");
  let itemKey = findItem(id);
  let cart = getCart();

  if (itemKey !== null) {
    cart.items[itemKey].amount -= 1;
    saveCart(cart);
    computeCartTotal();
    renderCart();
  }
}
