let bloc1 = document.getElementById("bloc1");
bloc1.style.backgroundImage = "url('img/img-bloc-1.jpg')";
bloc1.style.backgroundSize = "cover";
bloc1.style.height = "100vh";
bloc1.style.alignItems = "center";

let divCentre = document.createElement("div")
divCentre.id = "divCentre";
divCentre.style.margin = "0 auto";
//divCentre.style.marginTop = "-120px";
divCentre.style.width = "280px";
divCentre.style.height = "280px";
divCentre.style.position = "relative";
divCentre.style.top = "35%";

divCentre.style.borderRadius = "50%";
divCentre.style.backgroundColor = "#D5D5D5";
bloc1.appendChild(divCentre);