document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter');
    const catalogItems = document.querySelectorAll('.catalog-item');
    const filterMenu = document.querySelector('.filter-menu');
    const toggleFiltersButton = document.getElementById('toggle-filters');
    const clearFiltersButton = document.getElementById('clear-filters');
    const cartItemsList = document.getElementById('cart-items');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    toggleFiltersButton.addEventListener('click', () => {
        if (filterMenu.style.display === 'none' || filterMenu.style.display === '') {
            filterMenu.style.display = 'block';
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

        catalogItems.forEach(item => {
            const itemCategories = item.dataset.category.split(' ');
            const itemPrices = item.dataset.price.split(' ');
            const isCategoryMatch = activeFilters.some(filter => itemCategories.includes(filter));
            const isPriceMatch = activeFilters.some(filter => itemPrices.includes(filter));
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
