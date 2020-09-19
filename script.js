
let bola = document.getElementById("bola");
let obstaculos = Array.from(document.getElementsByClassName("obstaculo"));
let obstaculos_dom = document.getElementsByClassName("obstaculo");
let obstaculo_primero;
let obstaculo_seguro;
let PASOS=1;
//ESTADISTICAS
let puntaje=document.getElementById("puntaje");
let PUNTAJE=0;
let time_velocidad=10;

let ultimo_obstaculo = obstaculos[obstaculos.length - 1];

let fondo = document.getElementById("fondo");
let start = document.getElementById("start");
let bot = document.getElementById("bot");
let up = document.getElementById("up");

//parametros
let DISTANCIA_OBSTACULOS = 250;

//Eventos

let idCronometro=null;
let nuevoCro=null;
let cronometroIniciador=null;

up.addEventListener('touchstart', function () {
    subir_bola();
});

up.addEventListener('touchend', function () {
    detener_bola();
});

bot.addEventListener('touchstart', function () {
    bajar_bola();
});
bot.addEventListener('touchend', function () {
    detener_bola();
});

start.addEventListener('click',aumentar_time );

function iniciarGame() {
    clearInterval(idCronometro);
    idCronometro = setInterval(mover_obstaculos,time_velocidad);
    time_velocidad--;
}

function aumentar_time(){
    //reiniciar todo
    clearInterval(cronometroIniciador);
    clearInterval(idCronometro);
    time_velocidad=10;
    PUNTAJE=0;
    if(PASOS==0){
        let posicionar=obstaculo_seguro.offsetTop+obstaculo_seguro.clientHeight/2-bola.clientHeight/2
        bola.style.top=posicionar+"px";
        PASOS=1;
        console.log(posicionar);
    }
    
    cronometroIniciador=setInterval(iniciarGame,2000);
}

function subir_bola() {
    nuevoCro = setInterval(function(){
        let subir = bola.offsetTop - PASOS;
        bola.style.top = subir + "px";
    }, 3);
}

function bajar_bola() {
    nuevoCro = setInterval(function(){
        let bajar = bola.offsetTop + PASOS;
        bola.style.top = bajar + "px";
    }, 3);
}

function detener_bola(){
    clearInterval(nuevoCro);
}



function mover_obstaculos() {
    
    //cambiar puntaje
    puntaje.innerHTML=PUNTAJE;
    PUNTAJE++;
    //actualizando el obstaculo a esquivar
    obstaculo_primero = obstaculos[0];
    obstaculo_seguro = obstaculo_primero.children[0];



    //moviendo obstaculos y quitandolos
    for (let i = 0; i < obstaculos.length; i++) {
        let reducir = obstaculos[i].offsetLeft - 1;
        obstaculos[i].style.left = reducir + "px";

        //eliminando obstaculos
        if (obstaculos[i].offsetLeft < -obstaculos[i].clientWidth) {
            //quitandolo del DOM

            fondo.removeChild(obstaculos[i]);
            //quitar del array
            obstaculos.splice(i, 1);

        }
    }

    //agregando obstaculos

    if (DISTANCIA_OBSTACULOS == fondo.clientWidth - ultimo_obstaculo.offsetLeft - ultimo_obstaculo.clientWidth) {
        ultimo_obstaculo = ultimo_obstaculo.cloneNode(true);
        obstaculos.push(ultimo_obstaculo);

        ultimo_obstaculo.style.left = fondo.clientWidth + "px";


        let hijo = ultimo_obstaculo.children[0];


        hijo.style.top = getRandom(0,350- obstaculo_seguro.clientHeight) + "px";

        fondo.insertBefore(ultimo_obstaculo, null);
    }

    comprobarGameOver();
}



function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function comprobarGameOver() {
    if (obstaculo_primero.offsetLeft <= bola.offsetLeft + bola.clientWidth &&
        bola.offsetLeft + bola.clientWidth <= bola.clientWidth + obstaculo_primero.clientWidth + obstaculo_primero.offsetLeft) {
        console.log("Sin tocar");
        if (!(obstaculo_seguro.offsetTop < bola.offsetTop &&
            bola.offsetTop < obstaculo_seguro.offsetTop + obstaculo_seguro.clientHeight - bola.clientHeight)) {
                eliminarCronometros();
            console.log("Game Over");
        }
    }

    if(!(bola.offsetTop>=0 && bola.offsetTop<=fondo.clientHeight-bola.clientHeight)){
        eliminarCronometros();
        
    }
}

function eliminarCronometros(){
    clearInterval(idCronometro);
    clearInterval(cronometroIniciador);
    PASOS=0;
}









