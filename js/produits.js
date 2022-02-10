let produits = [
    {
        id : 1,
        nom : "Vigier Excalibur",
        image : "vigier.jpg",
        prix : 1800
    },
    {
        id : 2,
        nom : "Gibson Les Paul",
        image : "gibson.jpg",
        prix : 1499
    },
    {
        id : 3,
        nom : "Fender Stratocaster",
        image : "fender.jpg",
        prix : 1099
    }
];

let panier = [];

produits.forEach(element => {
    let ulParent = document.getElementById("parent");
    let li = document.createElement("li");
    li.className = "produit";
    li.setAttribute("id","produit-"+element.id);
    li.innerHTML = 
        `
        <div class="prod">
            <img src="img/${element.image}" width="240px" />
            <span class="titre">${element.nom}</span>
            <span class="prix">Prix : ${element.prix}€</span>
        </div>    
        `
    li.addEventListener("click",function(){
        li.style.display = "none";
        panier.push(element);
        console.log(panier);
        afficherPanier();
    });
    ulParent.appendChild(li);
});

function afficherPanier(){
    let produitAjoutePanier = "";
    panier.forEach(element => {
        let ulPanier = document.getElementById("ulPanier");
        
        produitAjoutePanier += 
        `
        <li id="produit-${element.id}">
            <div class="prod">
                <img src="img/${element.image}" width="120px" />
                <span class="titre">${element.nom}</span>
                <span class="prix">Prix : ${element.prix}€</span>
            </div>
        </li>
        `
        ulPanier.innerHTML = produitAjoutePanier;
    });
    
}