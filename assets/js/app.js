//Variables
const listaTweets = document.getElementById('lista-tweets');


//Event listeners
eventListeners();
function eventListeners() {
  // Cuándo se envia el formulario
  document.getElementById('formulario').addEventListener('submit', agregarTweet);

  //borrar Tweets
  listaTweets.addEventListener('click', borrarTweet);

  //Contenido cargado
  document.addEventListener('DOMContentLoaded', cargarLocalStorage);
}


//Funciones

//Añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  //Leer el valor de textarea
  const tweet = document.getElementById('tweet').value;
  //Crear boton de eliminar
  const botonBorrar = document.createElement('a');
  botonBorrar.classList = 'borrar-tweet';
  botonBorrar.innerText = 'X';


  //Crear elemento y añadir contendio a la lista
  const li = document.createElement('li');
  li.innerText = tweet;
  //Añade el botón de borrar al tweet
  li.appendChild(botonBorrar);
  //Añadirlo al padre lista-tweets
  listaTweets.appendChild(li);

  //Ejecuta función de agregar tweet a localStorage
  agregarTweetLocalStorage(tweet);

  limpiarCampo(document.getElementById('tweet'));
}

//Limpiar campo
function limpiarCampo(e) {
  e.value = '';
  e.focus();
}


//Borrar tweet
function borrarTweet(e) {
  let tweet, li;
  e.preventDefault();
  if (e.target.className === 'borrar-tweet') {
    e.target.parentElement.remove();
    li = e.target.parentElement;
    tweet = li.childNodes[0].nodeValue;
    borrarTweetLocalStorage(tweet);
    //alert('Tweet eliminado');
  }
}


//Agregar tweet a localStorage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();  
  //Añadir el nuevo tweet
  tweets.push(tweet);
  //Convertir de string a arreglo para el LS
  localStorage.setItem('tweets', JSON.stringify(tweets));
} 


//Obtener tweets de LS
function obtenerTweetsLocalStorage() {
  let tweets;
  //Revisar valores de LS
  if (localStorage.getItem('tweets') === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}


//Función que carga ls datos del Storage
function cargarLocalStorage() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach(tweet => {
    //Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //Crear elemento y añadir contendio a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //Añade el botón de borrar al tweet
    li.appendChild(botonBorrar);
    //Añadirlo al padre lista-tweets
    listaTweets.appendChild(li);  
  }); 
}

//Eliminar tweet del LS
function borrarTweetLocalStorage(tweetBorrar) {
  
  let tweets;
  //Elimina la X del tweet
  //tweetBorrar = tweet.substring(0, tweet.length - 1);
  
  tweets = obtenerTweetsLocalStorage();

  tweets.forEach((tweet, index) => {
    if (tweet == tweetBorrar) {
      tweets.splice(index, 1);
    }
  });
  //Actualizar LS borrando tweet
  localStorage.setItem('tweets', JSON.stringify(tweets));
  
}