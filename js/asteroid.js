const FPS = 30 // Images par seconde
const TAILLE_VAISSEAU = 30; // Taille du vaisseau
const VITESSE_ROTATION = 360; // Vitesse de rotation
const ACCELERATION_VAISSEAU = 5;
const FRICTION = 0.7; 
const ASTEROIDES_JAG = 0.5;
const NB_ASTEROIDES = 10;
const VITESSE_ASTEROIDE = 50;
const TAILLE_ASTEROIDES = 100;
const ASTEROIDES_VERT = 10;
const MONTRER_LIMITES_COLLISIONS = true;
const DUREE_EXPLOSION = 0.3;

let canv = document.getElementById("canvasJeu");
let ctx = canv.getContext("2d");
let vaisseau = nouveauVaisseau();

let roids = [];
creerAsteroides();

// Evenements
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

setInterval(update, 1000/ FPS);

function creerAsteroides(){
    roids = [];
    let x, y;
    for(let i = 0; i < NB_ASTEROIDES; i++){
        do {
            x = Math.floor(Math.random() * canv.width);
            y = Math.floor(Math.random() * canv.height);
        } while(distEntrePoints(vaisseau.x, vaisseau.y, x, y) < TAILLE_ASTEROIDES * 2 + vaisseau.r);
        roids.push(nvAsteroide(x,y));

    }
}

function distEntrePoints(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function exploseVaisseau(){
    vaisseau.explodeTime = Math.ceil(DUREE_EXPLOSION * FPS);
}


function keyDown(/** @type {keyboardEvent} */ ev){
    switch(ev.keyCode){
        case 37: // Fleche gauche
            vaisseau.rot = VITESSE_ROTATION / 180 * Math.PI / FPS;
            break;

        case 38: // Fleche haut
            vaisseau.thrusting = true;
            break;
        
        case 39: // Fleche droite
            vaisseau.rot = - VITESSE_ROTATION / 180 * Math.PI / FPS;
            break;
    }
}

function keyUp(/** @type {keyboardEvent} */ ev){
    switch(ev.keyCode){
        case 37: // Fleche gauche
            vaisseau.rot = 0;
            break;

        case 38: // Fleche haut
        vaisseau.thrusting = false;
            break;
        
        case 39: // Fleche droite
            vaisseau.rot = 0;
            break;
    }
}

function nvAsteroide(x, y){
    let roid = {
        x:x,
        y:y,
        xv : Math.random() * VITESSE_ASTEROIDE / FPS * (Math.random() <0.5 ? 1 : -1),
        yv : Math.random() * VITESSE_ASTEROIDE / FPS * (Math.random() <0.5 ? 1 : -1),
        r: TAILLE_ASTEROIDES / 2,
        a: Math.random() * Math.PI * 2,
        vert: Math.floor(Math.random() * (ASTEROIDES_VERT + 1) + ASTEROIDES_VERT / 2),
        offset: []
    };

    for(let i = 0; i< roid.vert; i++){
        roid.offset.push(Math.random() * ASTEROIDES_JAG * 2 + 1 - ASTEROIDES_JAG);
    }
    return roid;
}

function nouveauVaisseau(){
    return {
        x: canv.width / 2,
        y: canv.height / 2,
        r: TAILLE_VAISSEAU / 2,
        a: 90 / 180 * Math.PI, // COnversio en radians
        explodeTime: 0,
        rot: 0,
        thrusting: false,
        thrust: {
            x: 0,
            y: 0
        }
}
}

function update(){

    let explosion = vaisseau.explodeTime > 0;
    // Déssiner l'espace
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canv.width, canv.height);

    // Accélérer le vaisseau
    if(vaisseau.thrusting){
        vaisseau.thrust.x += ACCELERATION_VAISSEAU * Math.cos(vaisseau.a) / FPS;
        vaisseau.thrust.y -= ACCELERATION_VAISSEAU * Math.sin(vaisseau.a) / FPS;
    }else{
        vaisseau.thrust.x -= FRICTION * vaisseau.thrust.x / FPS;
        vaisseau.thrust.y -= FRICTION * vaisseau.thrust.y / FPS;
    }


    // Dessiner le vaisseau
    if(!explosion){
        ctx.strokeStyle = "white";
        ctx.lineWidth = TAILLE_VAISSEAU / 20;
        ctx.beginPath();
        ctx.moveTo(
            vaisseau.x + 4/3 * vaisseau.r * Math.cos(vaisseau.a),
            vaisseau.y - 4/3 * vaisseau.r * Math.sin(vaisseau.a)
        );
        ctx.lineTo(
            vaisseau.x - vaisseau.r * (2/3 * Math.cos(vaisseau.a)+ Math.sin(vaisseau.a)),
            vaisseau.y + vaisseau.r * (2/3 * Math.sin(vaisseau.a)- Math.cos(vaisseau.a))
        );
        ctx.lineTo(
            vaisseau.x - vaisseau.r * (2/3*Math.cos(vaisseau.a)- Math.sin(vaisseau.a)),
            vaisseau.y + vaisseau.r * (2/3*Math.sin(vaisseau.a)+ Math.cos(vaisseau.a))
        );
        ctx.closePath();
        ctx.stroke();
    }else{
        // On dessine l'explosion
        ctx.fillStyle = "darkred";
        ctx.beginPath();
        ctx.arc(vaisseau.x, vaisseau.y, vaisseau.r * 1.7, 0, Math.PI * 2, false);
        ctx.fill();
        
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(vaisseau.x, vaisseau.y, vaisseau.r * 1.4, 0, Math.PI * 2, false);
        ctx.fill();

        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(vaisseau.x, vaisseau.y, vaisseau.r * 1.1, 0, Math.PI * 2, false);
        ctx.fill();

        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(vaisseau.x, vaisseau.y, vaisseau.r * 0.8, 0, Math.PI * 2, false);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(vaisseau.x, vaisseau.y, vaisseau.r * 0.5, 0, Math.PI * 2, false);
        ctx.fill();
    }


    if(MONTRER_LIMITES_COLLISIONS){
        ctx.strokeStyle = "lime";
        ctx.beginPath();
        ctx.arc(vaisseau.x, vaisseau.y, vaisseau.r, 0, Math.PI * 2, false);
        ctx.stroke();
    }

    // Dessiner les asteroides
    
    let x,y,r,a,vert,offset;
    for(let i = 0; i< roids.length; i++){
        ctx.strokeStyle = "slategrey";
        ctx.lineWidth = TAILLE_VAISSEAU / 20;
        x = roids[i].x;
        y = roids[i].y;
        r = roids[i].r;
        a = roids[i].a;
        vert = roids[i].vert;
        offset = roids[i].offset;

        ctx.beginPath();
        ctx.moveTo(
            x + r * offset[0] * Math.cos(a),
            y + r * offset[0] * Math.sin(a)
        );

        for(let j = 0; j < vert; j++){
            ctx.lineTo(
                x + r * offset[j] * Math.cos(a + j * Math.PI * 2 / vert),
                y + r * offset[j] * Math.sin(a + j * Math.PI * 2 / vert)
            );
        }
        ctx.closePath();
        ctx.stroke();

        if(MONTRER_LIMITES_COLLISIONS){
            ctx.strokeStyle = "lime";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.stroke();
        }  
    }

    if(!explosion){
        for(let i = 0; i < roids.length; i++){
            if(distEntrePoints(vaisseau.x, vaisseau.y, roids[i].x, roids[i].y) < vaisseau.r + roids[i].r){
                exploseVaisseau();
            }
        }
    // Tourner le vaisseau
    vaisseau.a += vaisseau.rot;

    // Faire bouger le vaisseau
    vaisseau.x += vaisseau.thrust.x;
    vaisseau.y += vaisseau.thrust.y;

    }else {
        vaisseau.explodeTime--;

        if(vaisseau.explodeTime == 0){
            vaisseau = nouveauVaisseau();
        }
    }

    // Sortie d'écran
    if(vaisseau.x < 0 - vaisseau.r){
        vaisseau.x = canv.width + vaisseau.r;
    }else if(vaisseau.x > canv.width + vaisseau.r){
        vaisseau.x = 0 - vaisseau.r;
    }
    if(vaisseau.y < 0 - vaisseau.r){
        vaisseau.y = canv.height + vaisseau.r;
    }else if(vaisseau.y > canv.height + vaisseau.r){
        vaisseau.y = 0 - vaisseau.r;
    }

    // Bouger les asteroides
    for(let i = 0; i < roids.length; i++){
        roids[i].x += roids[i].xv;
        roids[i].y += roids[i].yv;

        if(roids[i].x < 0 - roids[i].r){
            roids[i].x = canv.width + roids[i].r;
        }else if(roids[i].x > canv.width + roids[i].r){
            roids[i].x = 0 - roids[i].r;
        }
        if(roids[i].y < 0 - roids[i].r){
            roids[i].y = canv.height + roids[i].r;
        }else if(roids[i].y > canv.height + roids[i].r){
            roids[i].y = 0 - roids[i].r;
        }
    }

    for(let i = 0; i < roids.length; i++){
        if(distEntrePoints(vaisseau.x, vaisseau.y, roids[i].x, roids[i].y) < vaisseau.r + roids[i].r){
            exploseVaisseau();
        }
    }

    // Centre du vaisseau
    ctx.fillStyle = "red";
    ctx.fillRect(vaisseau.x - 1, vaisseau.y - 1, 2, 2);
}