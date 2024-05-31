document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter');
    let catalogItems = document.querySelectorAll('.catalog-item');
    const filterMenu = document.querySelector('.filter-menu');
    const toggleFiltersButton = document.getElementById('toggle-filters');
    const clearFiltersButton = document.getElementById('clear-filters');
    const cartItemsList = document.getElementById('cart-items');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    console.log('%cscripts\card.js:10 catalogItems', 'color: #007acc;', catalogItems);
    function init(){
        sessionStorage.setItem("mykey","myvalue");
        clearFiltersButton.style.display = "none";

    }

    function loadCard(){
        let cardContent = "";
        for (let i = 0; i < bdd.products.length; i++) {
            cardContent += "<div class=\"catalog-item\" data-category=\"" + bdd.products[i].brand + "\" data-price=\"" + bdd.products[i].priceRange +"\">";
            cardContent += "<div class=\"product-name\">" + bdd.products[i].name +"</div>";
            cardContent += "<div class=\"product-img\"><img src=\"" + bdd.products[i].img + "\" alt=\"" + bdd.products[i].name +"\"></div>";
            cardContent += "<div class=\"product-desc\"><p>" + bdd.products[i].desc + "</p></div>";
            cardContent += "<div class=\"product-price\"><div>Prix : </div><div>" + bdd.products[i].price + "€</div></div></div>";        
        }
        // console.log("html" + cardContent);
        document.getElementById("catalog").innerHTML = cardContent;
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

            if(activeFilters.length === 0){
                clearFiltersButton.style.display = "none";
            }
            else{
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
});
