document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.filter');
  let catalogItems = document.querySelectorAll('.catalog-item');
  const filterMenu = document.querySelector('.filter-menu');
  const toggleFiltersButton = document.getElementById('toggle-filters');
  const clearFiltersButton = document.getElementById('clear-filters');
  const cartItemsList = document.getElementById('cart-items');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  let currentProduct = null;

  console.log('%cscripts\card.js:10 catalogItems', 'color: #007acc;', catalogItems);
  function init() {
    sessionStorage.setItem("mykey", "myvalue");
    clearFiltersButton.style.display = "none";

  }

  function loadCard() {
    let cardContent = "";
    for (let i = 0; i < bdd.products.length; i++) {

      cardContent += "<div id=" + bdd.products[i].id + " class=\"catalog-item\" data-category=\"" + bdd.products[i].brand + "\" data-price=\"" + bdd.products[i].priceRange + "\">";
      cardContent += "<div id=" + bdd.products[i].id + " class=\"product-name\">" + bdd.products[i].name + "</div>";
      cardContent += "<div id=" + bdd.products[i].id + " class=\"product-img\"><img src=\"" + bdd.products[i].img + "\" alt=\"" + bdd.products[i].name + "\"></div>";
      cardContent += "<div id=" + bdd.products[i].id + " class=\"product-desc\"><p>" + bdd.products[i].desc + "</p></div>";
      cardContent += "<div id=" + bdd.products[i].id + " class=\"product-price\"><div>Prix : </div><div>" + bdd.products[i].price + "€</div></div></div>";

    }

    // console.log("html" + cardContent);
    document.getElementById("catalog").innerHTML = cardContent;
    catalogItems = document.querySelectorAll('.catalog-item');
    catalogItems.forEach(function (element) {
      element.addEventListener("click", function (e) {
        displayModal(e.currentTarget.id);
      });
    });
  }

  init();
  loadCard();

  toggleFiltersButton.addEventListener('click', () => {
    if (filterMenu.style.display === 'none' || filterMenu.style.display === '') {
      filterMenu.style.display = 'flex';
      toggleFiltersButton.textContent = "Masquer les filtres";
    } else {
      filterMenu.style.display = 'none';
      toggleFiltersButton.textContent = "Afficher les filtres";
    }
  });

  clearFiltersButton.addEventListener('click', () => {
    filters.forEach(filter => filter.checked = false);
    filterCatalog();
  });

  filters.forEach(filter => {
    filter.addEventListener('change', () => {
      filterCatalog();
    });
  });

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const item = e.target.parentElement;
      addToCart(item);
    });
  });

  function filterCatalog() {
    const activeFilters = Array.from(filters).filter(filter => filter.checked).map(filter => filter.dataset.filter);
    catalogItems = document.querySelectorAll('.catalog-item');
    console.log('%cscripts\card.js:63 catalogItems', 'color: #007acc;', catalogItems);
    catalogItems.forEach(item => {
      const itemCategories = item.dataset.category.split(' ');
      const itemPrices = item.dataset.price.split(' ');
      const isCategoryMatch = activeFilters.some(filter => itemCategories.includes(filter));
      const isPriceMatch = activeFilters.some(filter => itemPrices.includes(filter));

      console.log('%cscripts\card.js:69 itemCategories', 'color: #007acc;', itemCategories);

      if (activeFilters.length === 0) {
        clearFiltersButton.style.display = "none";
      }
      else {
        clearFiltersButton.style.display = "flex";
      }


      if (isCategoryMatch || isPriceMatch || activeFilters.length === 0) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function addToCart(item) {
    const itemName = item.firstChild.textContent.trim();
    const cartItem = document.createElement('li');
    cartItem.textContent = itemName;
    cartItemsList.appendChild(cartItem);
  }

  function displayModal(id_prod) {
    modalEl.style.display = "block";
    const item = bdd.products.filter(element => {
      return element.id == id_prod
    });

    currentProduct = item[0];

    document.querySelector(".company_txt").innerHTML = currentProduct.brand;
    document.querySelector(".modal_product_img").innerHTML = "<img src =\"" + currentProduct.img + "\" alt = \"\" />";
    document.querySelector(".modal_product_name").innerHTML = currentProduct.name;
    document.querySelector(".producat_des").innerHTML = currentProduct.desc;
    document.querySelector(".normal_price").innerHTML = "Prix unitaire : " + currentProduct.price + "€";
    document.querySelector(".total_price").innerHTML = "Prix total : " + currentProduct.price + "€";
  }

  const normalPrice = document.querySelector(".normal_price");
  let totalPrice = document.querySelector(".total_price");
  const modalEl = document.querySelector(".modal");
  const qtyLabel = document.querySelector(".qty_label");
  //btns
  const btnAddCart = document.querySelector(".add_cart");
  const qty = document.querySelector(".qty_numbers");
  const increa = document.querySelector(".increament");
  const decr = document.querySelector(".decreament");
  //imgs
  const closeModal = document.querySelector(".close_icon");


  //btn cart to increament number
  increa.addEventListener("click", () => {
    let nb = parseInt(qty.textContent);
    nb++;
    totalPrice.innerHTML = "Prix total : " + currentProduct.price * nb + "€";
    normalPrice.innerHTML = "Prix unitaire : " + currentProduct.price + "€";
    qty.textContent = nb;
  });

  //btn cart to increament number
  decr.addEventListener("click", () => {
    let nb = parseInt(qty.textContent);
    if (nb === 1) {
      nb = 1;
    } else {
      nb--;
    }

    totalPrice.innerHTML = "Prix total : " + currentProduct.price * nb + "€";
    normalPrice.innerHTML = "Prix unitaire : " + currentProduct.price + "€";
    qty.textContent = nb;

  });


  //add to carts
  btnAddCart.addEventListener("click", () => {
    let cart_prod_id = currentProduct.id;
    let cart_prod_img = currentProduct.img;
    let cart_prod_name = currentProduct.name;
    let cart_prod_price = currentProduct.price;
    let cart_prod_qty = parseInt(qty.textContent);
    console.log('%cscripts\card.js:166 ajout panier"', 'color: #007acc;', "ajout panier");
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart != null) {
      console.log('%cscripts\card.js:174 "recuperation du panier"', 'color: #007acc;', "recuperation du panier");

      if (cart.items.find((e) => e.id == currentProduct.id) != undefined) {
        console.log("produit deja présent dans le panier");
        for (let index = 0; index < cart.items.length; index++) {
          if (cart_prod_id == cart.items[index].id)
            cart.items[index].amount += cart_prod_qty;
        }

      } else {
        console.log("produit non present dans le panier");
        cart.items.push({ id: cart_prod_id, url: cart_prod_img, name: cart_prod_name, price: cart_prod_price, amount: cart_prod_qty });
      }

    }
    else {
      console.log('%cscripts\card.js:186 "initialisation du panier"', 'color: #007acc;', "initialisation du panier");
      cart = {
        totalPrice: 0,
        itemCount: 0,
        items: [],
      }
      cart.items.push({ id: cart_prod_id, url: cart_prod_img, name: cart_prod_name, price: cart_prod_price, amount: cart_prod_qty });
      updateQtyLbl();
    }
    console.log('%cscripts\card.js:202 cart updated = ', 'color: #007acc;', cart);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    modalEl.style.display = "none";
    qty.innerHTML = 1;
    updateQtyLbl();
    
  });

  function updateQtyLbl(){
    let cart = JSON.parse(sessionStorage.getItem("cart"));
      let cpt =0;
      if(cart != null){

      
      for(let i = 0 ; i < cart.items.length; i++){
        cpt += cart.items[i].amount;
      }
    }
      qtyLabel.innerHTML = cpt;
    }
  // hide modal modal
  closeModal.addEventListener("click", () => {
    modalEl.style.display = "none";
    qty.innerHTML = 1;
  });

});