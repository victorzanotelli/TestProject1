class Product{
    constructor(id,name,brand,img,priceRange,price,stock,desc,descPlus){
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

class Bdd{
    constructor(){
        this.products = [];

        this.products.push(new Product(1,"Asus Vivobook 15","asus","../img/1.jpg","price-low",469,1,"Découvrez des couleurs à votre image Reflétant l'audace de la jeunesse, le ASUS Vivobook vous aide à exprimer votre vraie nature. Doté de performances de pointe, d'une charnière ErgoLift innovante et d'un écran NanoEdge, il vous permet d'abattre quantité de travail.","descPlus"));
        this.products.push(new Product(2,"Asus Vivobook 17","asus","../img/2.jpg","price-medium",599,1,"Donnez de l'éclat à votre monde grâce au ASUS Vivobook 17X, l'ordinateur portable doté de nombreuses fonctionnalités et d'un écran brillant. Le Vivobook 17X facilite le travail, où que ce soit : tout a été amélioré, de son puissant processeur mobile AMD Ryzen™ 7 à sa charnière à 180°, en passant par ses couleurs modernes et son design géométrique épuré. Prenez un nouveau départ aujourd'hui avec le Vivobook 17X !","descPlus"));
        this.products.push(new Product(3,"Acer Aspire 3","acer","../img/3.png","price-low",499,1,"l'Aspire 3 prêt à l'emploi avec les derniers processeurs AMD Ryzen™ série 70001 conçus pour le multitâche et la productivité.","descPlus"));
        this.products.push(new Product(4,"Acer Aspire 5","acer","../img/4.jpg","price-medium",699,1,"Les multiples options de couleurs de cet ordinateur portable tendance cachent une sélection de cartes graphiques et de processeurs puissants permettant de profiter de son écran au rapport corps/écran élevé.","descPlus"));
        this.products.push(new Product(5,"Acer Nitro 5","acer","../img/5.jpg","price-high",1099,1,"Acer Nitro 5 AN517-55-54EK. Type de produit: Ordinateur portable, Format: Clapet. Famille de processeur: Intel® Core™ i5, Modèle de processeur: i5-12450H.","descPlus"));
        this.products.push(new Product(6,"Dell Latitude 5400","dell","../img/6.jpg","promo",380.90,1,"Windows 10 Pro., I5 8350U 1.7 GHZ - 8e Génération, Taille de l'écran : 14.1pouces, Webcam : Oui, Ecran tactile : Non","descPlus"));
        this.products.push(new Product(7,"Dell Precision 7520","dell","../img/7.jpg","price-medium",560.90,1,"Windows 10 Pro., I7 7820HQ 2.6 GHZ - 7e Génération, Taille de l'écran : 15.6pouces, Webcam : Oui, Ecran tactile : Non","descPlus"));
        this.products.push(new Product(8,"Dell Latitude 5430","dell","../img/8.jpg","price-high",1172.10,1,"DELL Latitude 5430. Type de produit: Ordinateur portable, Format: Clapet. Famille de processeur: Intel® Core™ i5, Modèle de processeur: i5-1235U. Taille de l'écran: 35,6 cm (14'), Type HD: Full HD, Résolution de l'écran: 1920 x 1080 pixels.","descPlus"));
        this.products.push(new Product(9,"Lenovo 82V700ALFR","lenovo","../img/9.jpg","price-promo",229,1,"Couvrez tous vos besoins informatiques quotidiens tout en vous divertissant avec l’IdeaPad 1 (15.6, Intel). Équipé de processeurs Intel Celeron fiables et offrant une grande autonomie, vous pourrez consulter vos e-mails et publier de nouveaux messages sur les réseaux sociaux toute la journée, où bon vous semble.","descPlus"));
    }

    getBrand(brandId){
        return this.products.filter(element => {
            return element.brand === brandId;
        })
    }

    getProductId(productID){
        return this.products.filter(element => {
            return element.id === productID;
        })
    }



    getPriceRange(priceRange){
        return this.products.filter(element => {
            return element.priceRange === priceRange;
        })
    }

    filterProducts(brandIds,priceRanges){
        let tmp = [];
        let results = [];

        for (let i = 0; i < brandIds.length; i++) {
            const filter = this.products.filter(element => {
                return element.brand === brandIds[i]})
            tmp.push(...filter);
        }

        for (let j = 0; j < priceRanges.length; j++) {
            const filter = tmp.filter(e => {          
                return e.priceRange == priceRanges[j]
            });
            results.push(...filter);
        }

        return results;
    }
    getBrandList(){
        let brandList = [];
        for (let index = 0; index < this.products.length; index++) {
            if(brandList.length > 0){
                if(brandList.find((e)=>(e.name === this.products[index].brand)) === undefined)
                    brandList.push({name : this.products[index].brand, img :this.products[index].img});
            }
            else{
                brandList.push({name : this.products[index].brand, img :this.products[index].img});
            }
            
        }
        console.log('%cscripts\product.js:81 brandList', 'color: #007acc;', brandList);
        return brandList;
    }
};  

const bdd = new Bdd();
console.log(bdd)
if(sessionStorage.getItem("bdd") == null)
    sessionStorage.setItem("bdd",JSON.stringify(bdd));


