function showMenu(){
    let ouvrir = document.getElementById("ul-nav");
    if(ouvrir.className === "topnav"){
        ouvrir.className += " responsive";
    }else{
        ouvrir.className = "topnav";
    }
}