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
    },
    {
        id : 4,
        nom : "Samick Torino",
        image : "samick.jpg",
        prix : 349
    },
    {
        id : 5,
        nom : "Ibanez Iceman",
        image : "ibanez.jpg",
        prix : 699
    },
    {
        id : 6,
        nom : "Vola Blaze",
        image : "vola.jpg",
        prix : 2000
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
            <div class="produit-panier">
                <img src="img/${element.image}" width="80px" />
                <div class="prod-spec">
                    <span class="titre-panier">${element.nom}</span><br />
                    <span class="prix-panier">Prix : ${element.prix}€</span><br>
                </div>
                <div>
                    <select name="quantite">
                    <option value="0" disabled>Quantité</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                    <br>
                    
                </div>
                <span class="supprimerArticle" onclick="supprArticle()">X</span>
            </div>
        </li>
        `
        ulPanier.innerHTML = produitAjoutePanier;
    });
    
}

function supprArticle(){
    
}

function showMenu(){
    let ouvrir = document.getElementById("ul-nav");
    if(ouvrir.className === "topnav"){
        ouvrir.className += " responsive";
    }else{
        ouvrir.className = "topnav";
    }
}