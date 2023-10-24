 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebasejs/app";
 import { getFirestore, collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyC3aj3uqbBp8k7aK4a2p-CuEv2DLeXDUhg",
   authDomain: "cwm-2023-noche-v-chat.firebaseapp.com",
   projectId: "cwm-2023-noche-v-chat",
   storageBucket: "cwm-2023-noche-v-chat.appspot.com",
   messagingSenderId: "616029296735",
   appId: "1:616029296735:web:594da1c1c085f1f546e3ea"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 // Obtener la instancia de Firestore.
 const db = getFirestore(app);

 const refChat = collection(db, 'chats');

 const salida = document.getElementById('salida');
 const formChat = document.getElementById('form-chat');
 const user = document.getElementById('user');
 const message = document.getElementById('message');

 formChat.addEventListener('submit', function(ev) {
     ev.preventDefault();

     const data = {
         user: user.value,
         message: message.value,
     }

     /*
      |--------------------------------------------------------------------------
      | Grabando datos
      |--------------------------------------------------------------------------
      | Para grabar datos en una collection, solo necesitamos llamar a la función addDoc, pasándole
      | 2 cosas:
      | 1. La referencia de la collection donde quiero insertar el documento.
      | 2. Un objeto con los datos a insertar.
      | La función retorna una promesa que se completa cuando el documento se grabó correctamente.
      */
     addDoc(refChat, data)
         .then(() => {
             user.value = '';
             message.value = '';
         });
 });

 /*
  |--------------------------------------------------------------------------
  | Leyendo datos de Firestore en tiempo real
  |--------------------------------------------------------------------------
  | Si queremos leer los datos en tiempo real, es decir, que se actualicen automáticamente tan pronto
  | haya datos nuevos en el servidor, es bastante sencillo.
  | Tenemos que primero, cambiar la función que usamos. En vez de "getDocs" vamos a usar "onSnapshot".
  | Esta función no retorna una promesa, sino que recibe un segundo parámetro que es un "callback"
  | con lo que queremos hacer cada vez que haya nueva data.
  */
 onSnapshot(refChat, snapshot => {
     salida.innerHTML = snapshot.docs.map(doc => `<div>
             <div><b>Usuario: </b> ${doc.data().user}</div>
             <div><b>Dijo: </b> ${doc.data().message}</div>
         </div>`).join('');
 });


