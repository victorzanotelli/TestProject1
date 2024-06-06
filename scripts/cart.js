// init the cart with either data from session storage or the demo data
// source https://gaellan.github.io/javascript/2022/08/30/ecommerce-cart-with-js-modules.html

//import { getTheFakeBd } from "./fakeProducts.js";
//const TheFakeBdd = localStorage.getItem('myFakeBdd');;
const mybdproduct = getProducts();
function initCart() {
  console.log(mybdproduct.products.length);

  if (getCart() === null) {
    // if cart session storage doesn't exist create it
    saveCart(fakeCart);
  }

  // myDb = sessionStorage.getItem("bdd");
  // if (myDb == null) {
  //   // initFakeProducts();
  //   myDb = sessionStorage.getItem("bdd");
  //   console.log(myDb);
  // } else console.log("Failed to load bdd");

  renderCart();
}

export { initCart };

//La fonction getCart() va nous permettre de récupérer l’état actuel du panier que nous stockons
// dans le sessionStorage :
// retrieve the cart from session storage
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart"));
}
function getProducts() {
  return JSON.parse(sessionStorage.getItem("bdd"));
}

//La fonction saveCart() va nous permettre de sauvegarder l’état actuel du panier que nous stockons>>
// update the cart in session storage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

//fakeCart fakeCart est un objet représentant notre panier et son contenu
//que nous utilisons pour faire notre démonstration. Dans un vrai site il serait relié,
//via des appels à fetch au panier réel de notre client-e.

// function buildFakeCart() {
//   let bd = getTheFakeBd();
//   console.log(bd);
//   let fakeProductCart = {
//     totalPrice: 59,
//     itemCount: 4,
//     items: [bd[0], bd[1], bd[3], bd[6]],
//   };
//   return fakeProductCart;
// }
let fakeCart = {};
let fakeCart1 = {
  totalPrice: 59,
  itemCount: 4,
  items: [
    {
      id: 12,
      Url: "https://picsum.photos/id/1025/50/50",
      name: "portable 34532 Tochi",
      price: 487,
      amount: 1,
    },
    {
      id: 23,
      Url: "https://picsum.photos/id/823/50/50",
      name: "portable 4587 Del",
      price: 358,
      amount: 1,
    },
    {
      id: 42,
      Url: "https://picsum.photos/id/742/50/50",
      name: "portable 893 Del spiron",
      price: 487,
      amount: 1,
    },
    {
      id: 44,
      Url: "https://picsum.photos/200/300?random=1",
      name: "portable V game Boef",
      price: 789,
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
  if (cart.items) {
    newUl.classList.add("tableau");
    // create the lis

    if (cart.items.length !== 0) {
      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].amount > 0) {
          let item = cart.items[i];

          newUl.appendChild(createCartItem("lg", item));
          productList.appendChild(newUl);
        } else {
          cart.items.slice(i, 1);
        }
      }
      if (therIsReduc() === 0.8) {
        newUl.appendChild(createCartItem("reduc", null));
      }
      newUl.appendChild(createCartItem("fo", null));
    } else {
      newUl.innerHTML = "Votre panier est vide";
      productList.appendChild(newUl);
    }
    computeCartTotal(); //
    cart = getCart();
    let totalPrice = document.getElementById("cart-total-price");
    totalPrice.innerText = cart.totalPrice + " €";
    saveCart(cart);
    // update cart total price
  }
  loadListeners();
}

function new_element_col(cls) {
  let vdiv = document.createElement("div");
  //let clsBasic = "crt-col";
  //vdiv.classList.add(clsBasic);
  vdiv.classList.add(cls);

  return vdiv;
}

function crt_img(url, id, cls) {
  let vdiv = new_element_col(cls);

  let img = document.createElement("img");
  img.setAttribute("alt", "produit " + id);
  img.setAttribute("src", url);
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

function crt_action(item, amount, cls) {
  let vdiv = new_element_col(cls);
  vdiv.appendChild(crt_btn(item, "cart-Col-add", "+"));
  vdiv.appendChild(crt_text(amount, "qt"));
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

function crt_price(amount, price, cls, id) {
  let vdiv = new_element_col(cls);

  let productPriceSpan = document.createElement("span");
  if (id !== "") {
    productPriceSpan.setAttribute("id", id);
  }
  let productPriceSpanContent = document.createTextNode(
    "" + (amount * price).toFixed(2)
  );

  productPriceSpan.appendChild(productPriceSpanContent);

  vdiv.appendChild(productPriceSpan);

  return vdiv;
}

//createCartItem()
// create one cart item to be injected in the html
function createCartItem(type, item) {
  let li = document.createElement("li");

  switch (type) {
    case "lg":
      li.classList.add("cols");
      console.log(item);
      li.appendChild(crt_img(item.url, item.id, "col1"));
      li.appendChild(crt_text(item.name, "col2"));
      li.appendChild(crt_action(item, item.amount, "col3"));
      li.appendChild(crt_price(item.amount, item.price, "col4", ""));

      break;
    case "fo":
      li.classList.add("fooCols");
      li.appendChild(crt_text("Total :", "Col_LabTotal"));
      li.appendChild(crt_price(1, "€€€", "Col_TotalPrice", "cart-total-price"));
      break;
    case "reduc":
      li.classList.add("fooReduc");
      li.appendChild(crt_text("Réduction membre :", "Col_LabTotal"));
      li.appendChild(crt_text("20%", "col4"));

      break;
  }
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
  let reduc = therIsReduc();
  if (!isNaN(reduc)) cart.totalPrice = (price * reduc).toFixed(2);
  else {
    cart.totalPrice = price.toFixed(2);
  }
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

function therIsReduc() {
  let reduc = 1;
  let connect = isConnected();
  if (connect) {
    reduc = 0.8;
  }
  return reduc;
}
function isConnected() {
  return JSON.parse(sessionStorage.getItem("connect"));
}
