

class FakeProduct {
  constructor(id, name, brand, img, priceRange, price, stock, desc, descPlus) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.img = img;
    this.priceRange = priceRange;
    this.price = price;
    this.stock = stock;
    this.desc = desc;
    this.descPlus = descPlus;
  }
}
class FakeBdd {
  constructor() {
    this.FakeProducts = [];

    this.FakeProducts.push(
      new FakeProduct(
        1,
        "Asus Vivobook 15",
        "asus",
        "img/1.jpg",
        "price-low",
        469,
        1,
        "Découvrez des couleurs à votre image Reflétant l'audace de la jeunesse, le ASUS Vivobook vous aide à exprimer votre vraie nature. Doté de performances de pointe, d'une charnière ErgoLift innovante et d'un écran NanoEdge, il vous permet d'abattre quantité de travail.",
        "descPlus"
      )
    );
    this.FakeProducts.push(
      new FakeProduct(
        2,
        "Asus Vivobook 17",
        "asus",
        "img/2.jpg",
        "price-medium",
        599,
        1,
        "Donnez de l'éclat à votre monde grâce au ASUS Vivobook 17X, l'ordinateur portable doté de nombreuses fonctionnalités et d'un écran brillant. Le Vivobook 17X facilite le travail, où que ce soit : tout a été amélioré, de son puissant processeur mobile AMD Ryzen™ 7 à sa charnière à 180°, en passant par ses couleurs modernes et son design géométrique épuré. Prenez un nouveau départ aujourd'hui avec le Vivobook 17X !",
        "descPlus"
      )
    );
    this.FakeProducts.push(
      new FakeProduct(
        3,
        "Acer Aspire 3",
        "acer",
        "img/3.png",
        "price-low",
        499,
        1,
        "l'Aspire 3 prêt à l'emploi avec les derniers processeurs AMD Ryzen™ série 70001 conçus pour le multitâche et la productivité.",
        "descPlus"
      )
    );
    this.FakeProducts.push(
      new FakeProduct(
        4,
        "Acer Aspire 5",
        "acer",
        "img/4.jpg",
        "price-medium",
        699,
        1,
        "Les multiples options de couleurs de cet ordinateur portable tendance cachent une sélection de cartes graphiques et de processeurs puissants permettant de profiter de son écran au rapport corps/écran élevé.",
        "descPlus"
      )
    );
    this.FakeProducts.push(
      new FakeProduct(
        5,
        "Acer Nitro 5",
        "acer",
        "img/5.jpg",
        "price-high",
        1099,
        1,
        "Acer Nitro 5 AN517-55-54EK. Type de produit: Ordinateur portable, Format: Clapet. Famille de processeur: Intel® Core™ i5, Modèle de processeur: i5-12450H.",
        "descPlus"
      )
    );
    this.FakeProducts.push(
      new FakeProduct(
        6,
        "Dell Latitude 5400",
        "dell",
        "img/6.jpg",
        "promo",
        380.9,
        1,
        "Windows 10 Pro., I5 8350U 1.7 GHZ - 8e Génération, Taille de l'écran : 14.1pouces, Webcam : Oui, Ecran tactile : Non",
        "descPlus"
      )
    );
    this.FakeProducts.push(
      new FakeProduct(
        7,
        "Dell Precision 7520",
        "dell",
        "img/7.jpg",
        "price-medium",
        560.9,
        1,
        "Windows 10 Pro., I7 7820HQ 2.6 GHZ - 7e Génération, Taille de l'écran : 15.6pouces, Webcam : Oui, Ecran tactile : Non",
        "descPlus"
      )
    );
    this.FakeProducts.push(
      new FakeProduct(
        8,
        "Dell Latitude 5430",
        "dell",
        "img/8.jpg",
        "price-high",
        1172.1,
        1,
        "DELL Latitude 5430. Type de produit: Ordinateur portable, Format: Clapet. Famille de processeur: Intel® Core™ i5, Modèle de processeur: i5-1235U. Taille de l'écran: 35,6 cm (14'), Type HD: Full HD, Résolution de l'écran: 1920 x 1080 pixels.",
        "descPlus"
      )
    );
    this.FakeProducts.push(
      new FakeProduct(
        9,
        "Lenovo 82V700ALFR",
        "lenovo",
        "img/9.jpg",
        "price-promo",
        229,
        1,
        "Couvrez tous vos besoins informatiques quotidiens tout en vous divertissant avec l’IdeaPad 1 (15.6, Intel). Équipé de processeurs Intel Celeron fiables et offrant une grande autonomie, vous pourrez consulter vos e-mails et publier de nouveaux messages sur les réseaux sociaux toute la journée, où bon vous semble.",
        "descPlus"
      )
    );
  }

  getBrand(brandId) {
    return this.products.filter((element) => {
      return element.brand === brandId;
    });
  }
}

function initFakeProducts() {

  if (sessionStorage.getItem("fakeBdd") == null)
    sessionStorage.setItem("fakeBdd", myFakeBdd);
  console.log("Fake Bdd initialized");
  localStorage.setItem('myFakeBdd', myFakeBdd);

}
const myFakeBdd = new FakeBdd();
export { initFakeProducts };

function getTheFakeBd() {
  return myFakeBdd;
}
// const myFakeBdd = new FakeBdd();
// if (sessionStorage.getItem("fakeBdd") == null)
//   sessionStorage.setItem("fakeBdd", myFakeBdd);
// console.log("Fake products Bdd initialized");

export { getTheFakeBd };