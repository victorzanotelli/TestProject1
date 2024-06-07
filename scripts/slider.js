const carousselImage = document.querySelector('.contenu_carou_auto');

carousselImage.addEventListener('mouseover', function() {
    carousselImage.style.animationPlayState = 'paused';
});

carousselImage.addEventListener('mouseout', function() {
    carousselImage.style.animationPlayState = 'running';
});


// Appliquer le filtre aux produits affichés
//filterCatalog(filter)

const deserialized = JSON.parse(sessionStorage.getItem("bdd"));
const pdt = Object.assign(new Bdd(), deserialized);
console.log(pdt);
const brands =  pdt.getBrandList();
const brandsss = pdt.getBrandList();
const array3 = brands.concat(brandsss);
console.log(array3);
const divCarou = document.querySelector('.caroussel-image');
const brand = 0
function displayCarou (){
    for (let i=0; i < array3.length; i++ ){
        const brand = document.createElement('img')
        brand.src = array3[i].img;
        brand.id = array3[i].name;
        divCarou.appendChild(brand);

    }

}
// document.getElementById(brand.id).addEventListener('click', function() {
    // Récupérer la valeur de l'attribut data-filter de l'image cliquée
    // const filter = this.dataset.filter;

    // Rediriger l'utilisateur vers la page catalogue.html avec le paramètre de filtre
    // window.location.href = `catalogue.html?filter=${filter}`;
// });

//const urlParams = new URLSearchParams(window.location.search);
// const filter = urlParams.get('filter');
displayCarou();