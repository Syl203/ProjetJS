function ajouterTache(){
    let tache = document.getElementById("input-text").value;
    let li = document.createElement("li") ;
    let parent = document.getElementById("ul-parent");
    let liNode = document.createTextNode(tache)
    li.appendChild(liNode);

    if(tache === ""){
        alert("Veuillez entrer une tâche");
    }else{
        parent.appendChild(li);
        document.getElementById("input-text").value = "";
    }

    let span = document.createElement("span");
    let cross = document.createTextNode("X");
    

    span.className = "suppr";
    span.style.color = "#EE0000";
    span.style.fontSize = "25px";
    span.style.fontWeight = "bold";
    span.style.cursor = "pointer";
    span.onclick = function(){
        li.style.display = "none";
    }
    li.style.cursor = "pointer";
    li.onclick = function(){
        
        li.style.backgroundColor = "#50D0E0";
        li.style.textDecoration = "line-through";
        li.style.textAlign = "center";
        
    }

    span.appendChild(cross);
    li.appendChild(span);
    
}