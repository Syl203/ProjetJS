const email = "ms@site.fr";
const password = "azerty";
let nombre = Math.round(Math.random() * 1000);
let code = document.getElementById("labelNumber");
code.innerHTML = "Entrez le code : " + nombre;
let erreur = document.getElementById("erreur");

function connexion(){
    let mailUser = document.getElementById("email").value;
    let passUser = document.getElementById("password").value;
    let codeUser = document.getElementById("number").value;
    if(mailUser ==="" || passUser ==="" || codeUser ===""){
        erreur.className = "erreur";
        erreur.innerHTML = "Erreur : champ(s) manquant(s)";
        }else{
        if(mailUser === email && passUser === password && parseInt(codeUser) === nombre){
            document.getElementById("formulaire").style.display="none";
            document.getElementById("loader").style.display = "block";
            function redirection(){
                
                window.location = "accueil.html";
            }
            setTimeout(redirection, 3000);
        }else{
            erreur.className = "erreur";
            erreur.innerHTML = "Erreur : mauvais identifiants";
        }
    }
}