let menu = document.getElementById("navbar");
menu.innerHTML = 
    `
        <div>
            <ul id="ul-nav" class="topnav">
                <li><a href="accueil.html"><ion-icon name="home"></ion-icon></a></li>
                <li><a href="taches.html">LISTE DES TÂCHES</a></li>
                <li><a href="produits.html">PRODUITS</a></li>
                <li><a href="briques.html">CASSE BRIQUES</a></li>
                <li><a href="asteroid.html">ASTEROIDS</a></li>
                <li id="burger"><a href="#" onclick="showMenu()"><ion-icon name="menu"></ion-icon></a></li>
            </ul>
        </div>
    `;