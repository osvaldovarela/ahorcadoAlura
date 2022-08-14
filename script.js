let word;
let cant_errores = 0;
let cant_aciertos = 0;

const palabras = ["HTML", "JAVASCRIPT", "CSS", "ALURA", "ORACLE", "FRAMEWORK"];
const btn = id("jugar");
const imagen = id("imagen");
const btn_letras = document.querySelectorAll("#letras button");

btn.addEventListener("click", iniciar);

function id(str) {
  return document.getElementById(str);
}
function crearPalabraSecreta(num_min, num_max) {
  const amplitud_valores = num_max - num_min;
  const valor_al_azar = Math.floor(Math.random() * amplitud_valores) + num_min;
  return valor_al_azar;
}

function iniciar(event) {
  imagen.src = "img/img0.png";
  btn.disabled = true;
  cant_errores = 0;
  cant_aciertos = 0;

  const parrafo = id("palabra_a_adivinar");
  parrafo.innerHTML = "";

  const cant_palabras = palabras.length;
  const valor_al_azar = crearPalabraSecreta(0, cant_palabras);

  word = palabras[valor_al_azar];
  const cant_letras = word.length;
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = false;
  }

  for (let i = 0; i < cant_letras; i++) {
    const span = document.createElement("span");
    parrafo.appendChild(span);
  }
}

for (let i = 0; i < btn_letras.length; i++) {
  btn_letras[i].addEventListener("click", click_letras);
}

function click_letras(event) {
  const spans = document.querySelectorAll("#palabra_a_adivinar span");
  const button = event.target;
  button.disabled = true;

  const letra = button.innerHTML.toUpperCase();
  const palabra = word.toUpperCase();

  let acerto = false;
  for (let i = 0; i < palabra.length; i++) {
    if (letra == palabra[i]) {
      spans[i].innerHTML = letra;
      cant_aciertos++;
      acerto = true;
    }
  }

  if (acerto == false) {
    cant_errores++;
    const source = `img/img${cant_errores}.png`;
    const imagen = id("imagen");
    imagen.src = source;
  }

  if (cant_errores == 7) {
    id("perdiste").innerHTML = "Fin del juego, la palabra era " + word;
  } else if (cant_aciertos == word.length) {
    id("ganaste").innerHTML = "GANASTE, FELICIDADES!!";
  }
}

function game_over() {
  for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].disabled = true;
  }

  btn.disabled = false;
}

game_over();
