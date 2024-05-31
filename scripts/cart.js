// init the cart with either data from session storage or the demo data
// source https://gaellan.github.io/javascript/2022/08/30/ecommerce-cart-with-js-modules.html
function initCart() {
  if (getCart() === null) {
    // if cart session storage doesn't exist create it
    saveCart(fakeCart);
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

let fakeCart = {
  totalPrice: 59,
  itemCount: 3,
  items: [
    {
      id: 12,
      imageUrl: "https://picsum.photos/id/1025/50/50",
      price: 23,
      amount: 1,
    },
    {
      id: 23,
      imageUrl: "https://picsum.photos/id/823/50/50",
      price: 17,
      amount: 1,
    },
    {
      id: 42,
      imageUrl: "https://picsum.photos/id/742/50/50",
      price: 19,
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
  let productList = document.querySelector("body > main");
  let ulToRemove = document.querySelector("body > main > ul");

  productList.removeChild(ulToRemove);
  // class="basket-container"
  // create the new ul
  let newUl = document.createElement("ul");


  // create the lis
  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].amount > 0) {
      let item = cart.items[i];
      let li = document.createElement("li");
      li.appendChild(createCartItem(item)); // append them
      newUl.appendChild(li);
    }
  }

  productList.appendChild(newUl);

  // update cart total price
  let totalPrice = document.getElementById("cart-total-price");
  totalPrice.innerText = "Total : " + cart.totalPrice + " €";

  loadListeners();
}

//createCartItem()
// create one cart item to be injected in the html
function createCartItem(item) {
  let containerSection = document.createElement("div");
  containerSection.classList.add("cart-Line");

  let img = document.createElement("img");

  img.classList.add("cart-col");
  img.classList.add("cart-Col-img");
  img.setAttribute("alt", "image du produit " + item.id);
  img.setAttribute("src", item.imageUrl);
  containerSection.appendChild(img);


  let productInfodiv = document.createElement("span");
  // creating the product info
  let productInfo = document.createElement("h3");

  let productNameContent = document.createTextNode("Nom du produit " + item.id);
  productInfo.appendChild(productNameContent);
  //let productNameContent = document.createTextNode("Nom du produit " + item.id);
  productInfodiv.appendChild(productInfo)

  productInfodiv.classList.add("cart-Col-name");
  containerSection.appendChild(productInfodiv);




  // creating the product actions
  //let productActions = document.createElement("section");
  //productActions.classList.add("cart-product-actions");

  //let buttonsSection = document.createElement("section");

  let removeButton = document.createElement("button");
  removeButton.setAttribute("data-product-id", item.id);
  removeButton.classList.add("cart-col");
  removeButton.classList.add("cart-Col-minus");
  removeButton.classList.add("btn");
  let minus = document.createTextNode("-");
  removeButton.appendChild(minus);
  containerSection.appendChild(removeButton);


  let amountSpan = document.createElement("span");
  amountSpan.classList.add("cart-col");
  amountSpan.classList.add("cart-Col-price");
  let amountContent = document.createTextNode(item.amount);
  amountSpan.appendChild(amountContent);
  /*amountSpan.classList.add("cart-col");
  amountSpan.classList.add("cart-Col-price");*/
  containerSection.appendChild(amountSpan);

  let addButton = document.createElement("button");
  addButton.setAttribute("data-product-id", item.id);
  addButton.classList.add("cart-col");
  addButton.classList.add("cart-Col-add");
  addButton.classList.add("btn");
  let plus = document.createTextNode("+");
  addButton.appendChild(plus);
  containerSection.appendChild(addButton);


  let productPrice = document.createElement("p");
  productPrice.setAttribute("data-product-id", item.id);


  let productPriceSpan = document.createElement("span");
  let productPriceSpanContent = document.createTextNode(
    "" + item.amount * item.price
  );
  productPriceSpan.appendChild(productPriceSpanContent);
  productPriceSpan.classList.add("cart-col");
  productPriceSpan.classList.add("cart-Col-montT");
  containerSection.appendChild(productPriceSpan);

  //buttonsSection.appendChild(removeButton);

  /*
    let amountSpan = document.createElement("span");
    let amountContent = document.createTextNode(item.amount);
    amountSpan.appendChild(amountContent);
  
    let addButton = document.createElement("button");
    addButton.setAttribute("data-product-id", item.id);
    addButton.classList.add("cart-btn");
    addButton.classList.add("cart-button-add");
    let plus = document.createTextNode("+");
    addButton.appendChild(plus);
  
    buttonsSection.appendChild(removeButton);
    buttonsSection.appendChild(amountSpan);
    buttonsSection.appendChild(addButton);
  
    productActions.appendChild(buttonsSection);
  
    let productPrice = document.createElement("p");
    productPrice.setAttribute("data-product-id", item.id);
    productPrice.classList.add("cart-product-price");
  
    let productPriceSpan = document.createElement("span");
    let productPriceSpanContent = document.createTextNode(
      "" + item.amount * item.price
    );
    productPriceSpan.appendChild(productPriceSpanContent);
  
  
  
    containerSection.appendChild(productActions);
    containerSection.appendChild(productPriceSpan);
    containerSection.appendChild(productPrice);
  */
  return containerSection;
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

  cart.totalPrice = price;
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
