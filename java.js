

const jugador = document.querySelector(".jugador");
const numero = document.querySelector(".numero");
const caja = document.querySelector(".ecenario");
const atras = document.querySelector('.atras');
const pantalla = document.querySelector('.pantalla');
const titulo = document.querySelector('.titulo')
const agarrarAlgo = document.querySelector('.objetos');
const espada = document.createElement('div');
const verificador = document.createElement('div')
const enemigo = document.querySelector('.enemigo');
const parrafo = document.querySelector('.parrafo')

agarrarAlgo.appendChild(verificador)
verificador.style.backgroundColor = 'red';
verificador.style.margin = '10px 0px'
verificador.style.width = '40px';
verificador.style.height = '10px';

const arrayDeEnemigos = [`
<div class="cuerpo-enemigo">
      <div class="pierna izquierda"></div>
      <div class="pierna derecha"></div>
      <div class="brazo izquierdo"></div>
      <div class="brazo derecho"></div>
      <div class="cabeza-2"></div>
  </div>

`,]


function crearEnemigo(a){
  enemigo.innerHTML = a;
}

crearEnemigo(arrayDeEnemigos[0]);


function reproducirSonido() {
   // Crear un elemento de audio
   var audio = new Audio('/sonidos/golpe.wav'); // Reemplaza 'ruta_del_sonido.mp3' con la ruta a tu archivo de sonido

   // Reproducir el sonido
   audio.play();
}


function pantallaGanadora(){
   
   pantalla.style.background = 'green';
   pantalla.style.visibility = 'visible';
   pantalla.style.border = ' 10px solid rgb(241, 173, 118)';
   parrafo.style.fontSize = '30px';
   parrafo.style.background = 'gold'
   parrafo.textContent = 'GANASTE!!'
}

function pantallaPerdedora(){
   pantalla.style.visibility = 'visible';
   pantalla.style.background = 'grey';
   pantalla.style.borderColor = 'black';
   parrafo.style.background = 'red'
   parrafo.style.fontSize = '30px'
   parrafo.textContent = 'PERDISTE!'
}

function pantallaPause(){
   pantalla.style.visibility = 'visible';
   pantalla.style.background = '#3498db';
   pantalla.style.borderColor = 'black';
   titulo.textContent = 'PAUSA';
   parrafo.style.background = 'red';
   parrafo.style.fontSize = '30px';
   const menuPause =  document.createElement('button');
   const menuReiniciar =  document.createElement('button');
   const menuTienda =  document.createElement('button');
   parrafo.textContent = '';
   parrafo.appendChild(menuReiniciar);
   parrafo.appendChild(menuPause);
   parrafo.appendChild(menuTienda);
   menuPause.style.background = '#b1e240';
   menuReiniciar.style.background = '#40e2e2';
   menuTienda.style.background = '#e240cc';
   menuPause.textContent = 'JUGAR';
   menuReiniciar.textContent = 'REINICIAR';
   menuTienda.textContent = 'TIENDA';
}
  
   


atras.addEventListener('click',()=>{
   pantalla.style.visibility = 'hidden';
   jugador.style.visibility = 'visible';
   seguirPersonaje();
})


// AGARRAR ALGO


let objetoAgarrado = false;


function agarrarObjeto() {
    if (!objetoAgarrado) {
        objetoAgarrado = true;
        agarrarAlgo.appendChild(espada)
        espada.style.backgroundColor = 'black';
        espada.style.margin = '-10px 0px'
        espada.style.width = '20px';

      //   verificador de espada


    }
}

function soltarObjeto() {
    if (objetoAgarrado) {
        objetoAgarrado = false;
        espada.style.backgroundColor = '#e74c3c';
        espada.style.position = 'absolute';
        espada.style.margin = `${valorX + 50}px ${valorY + 50}px`;
        caja.appendChild(espada)
    }
}

function girarEspada() {
  

   setTimeout(() => {
      verificador.style.width = '150px'  
      espada.style.width = '150px'  
      espada.style.transition = 'transform 500ms ease-in-out'; 
        espada.style.transform = 'rotate(180deg)';
       
   }, 600);
   
  
      setTimeout(() => {
         verificador.style.width = '30px';
         espada.style.transition = 'transform 1200ms ease-in-out'; 
         espada.style.transform = 'rotate(0deg)';
         espada.style.width = '30px'
    }, 1300);
   
}



function seguirPersonaje(){

   const seguir = jugador.getBoundingClientRect();

   console.log(seguir.x, seguir.y);

   // enemigo.style.margin = `${seguir.y }px ${seguir.x }px`
   

}



function verificarColision() {
   const rect1 = enemigo.getBoundingClientRect();
   const rect2 = verificador.getBoundingClientRect();
   const rect3 = jugador.getBoundingClientRect();


   if (
       rect1.left < rect2.left + rect2.width &&
       rect1.left + rect1.width > rect2.left &&
       rect1.top < rect2.top + rect2.height &&
       rect1.top + rect1.height > rect2.top 
      
  ) {
     reproducirSonido()
     pantallaGanadora()
  }

   // Verificar colisión o proximidad

    if(rect1.left < rect3.left + rect3.width &&
      rect1.left + rect1.width > rect3.left &&
      rect1.top < rect3.top + rect3.height &&
      rect1.top + rect1.height > rect3.top &&
      objetoAgarrado == false){
     pantallaPerdedora()  
   }
       

}

const rect1 = enemigo.getBoundingClientRect();

 console.log(rect1.x, rect1.y);



for(i = 0 ; i <= 78 ; i++){
   const divPiso =  document.createElement('div');
   divPiso.style.background =  'rgba(117, 108, 108, 0.801)';
   divPiso.style.border= '3px solid rgb(75, 47, 47)';
   divPiso.style.boxShadow = '2px 2px 2px 2px rgba(0, 0, 0, 0.616)';

   
   
      espada.style.width = '80px';
      espada.style.position = 'absolute';
      espada.style.height = '5px';
      espada.style.background = 'black';
      espada.style.margin = '500px';
      espada.style.transition = '3s';
      caja.appendChild(espada);
      caja.appendChild(divPiso);
      
}


var valorY = 100;
let valorX = 100;

numero.innerHTML = `${valorY}Y `+` ${valorX}X`;

addEventListener("keydown", function(e){

   //  alert(e.code)

   if(e.code == e.code){
      pantalla.style.visibility = 'hidden';
      jugador.style.visibility = 'visible'
   }

   if(e.code == 'ArrowUp'){
      if(valorX > 0 ){
        valorX -= 50
        numero.innerHTML = `${valorY}Y `+` ${valorX}X`;
         jugador.style.marginTop = `${valorX}px`;
        }
      }
   
   if(e.code == "ArrowDown"){
     if(valorX < 500){
      valorX += 50
      numero.innerHTML = `${valorY}Y `+` ${valorX}X`;
      jugador.style.marginTop = `${ valorX}px`;
     }
   }
   if(e.code == "ArrowRight"){
      if(valorY < 1200){
         valorY += 50
         numero.innerHTML = `${valorY}Y `+` ${valorX}X`;
         jugador.style.marginLeft = `${  valorY}px`;
      }
   }
   if(e.code == "ArrowLeft"){
      if(valorY > 0){
         valorY -= 50
        numero.innerHTML = `${valorY}Y `+` ${valorX}X`;
        jugador.style.marginLeft = `${valorY}px`;
      }     
   }
   if(e.code == "Escape"){
      pantallaPause()
   }
   verificarColision()
   seguirPersonaje()
})



addEventListener('keydown', (event) => {
    if( jugador.style.marginTop === espada.style.marginTop && jugador.style.marginLeft === espada.style.marginLeft || objetoAgarrado ){
       if(event.key === 'Enter'){
          if (objetoAgarrado) {
                soltarObjeto()
             } else {
                agarrarObjeto();
            }
          }
    
        } 
        if(objetoAgarrado){
         if(event.key === ' '){
            girarEspada()
         }
        }
  });





