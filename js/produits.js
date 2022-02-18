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
let h2 = document.getElementById("h2-panier");
let h3 = document.getElementById("h3-panier");

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
        
        afficherPanier();
    });
    ulParent.appendChild(li);
    
});

function afficherPanier(){
    let produitAjoutePanier = "";
    let prixTotal = 0;
    panier.forEach(element => {
        let ulPanier = document.getElementById("ulPanier");
        
        produitAjoutePanier += 
        `
        <li id="produitAjoute-${element.id}" class="produit-panier">
                <img src="img/${element.image}" width="80px" />
                <div class="prod-spec">
                    <span class="titre-panier">${element.nom}</span><br />
                    <span class="prix-panier">Prix : ${element.prix}€</span><br>
                    <select name="quantite" id="select-${element.id}">
                        <option value="0" selected>Quantité</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div id="prixHT-${element.id}"></div>
        </li>
        `
        /*let selectNum = document.getElementById(`select-${element.id}`);
        console.log(selectNum);
        selectNum.addEventListener("change", function(){
            alert("changement de quantité");
        });*/
        
        if(panier != ""){
            prixTotal = `${parseInt(prixTotal) + parseInt(element.prix)}`;
            h2.innerHTML = "PANIER";
            h3.innerHTML = `${panier.length} article(s) - Total : ${prixTotal} €`;
        }
        ulPanier.innerHTML = produitAjoutePanier;
        console.log(prixTotal);
});

/*
panier.forEach(panierPlein =>{
    let prixHT = document.getElementById(`prixHT-${panierPlein.id}`);
    console.log(`${panierPlein.prix}`);
    prixTotal = parseInt(prixHT)  + prixTotal;
    console.log("prixtotol " + prixTotal)

})
*/

        
panier.forEach(supprimer => {
    let liTest = document.getElementById(`produitAjoute-${supprimer.id}`)
    let liTab = document.getElementById(`produit-${supprimer.id}`);
    let btnSuppr = document.createElement("button");

    btnSuppr.id = `btn-suppr-${supprimer.id}`;
    btnSuppr.className = "btn-suppr";
    btnSuppr.innerHTML = "x";
    
    liTest.appendChild(btnSuppr);
    btnSuppr.addEventListener("click", function(){
       liTab.style.display = "block";
       let panierIndex = panier.indexOf(supprimer);
       panier.splice(panierIndex,1);
       liTest.remove();
       h3.innerHTML = `${panier.length} article(s) - Total : ${prixTotal} €`;
       if(panier == ""){
            h2.innerHTML = `PANIER (VIDE)`;
            h3.innerHTML = ``;
        }
       
    });
   
});
}
    


function showMenu(){
    let ouvrir = document.getElementById("ul-nav");
    if(ouvrir.className === "topnav"){
        ouvrir.className += " responsive";
    }else{
        ouvrir.className = "topnav";
    }
}