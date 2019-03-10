const firebase = require('firebase')


const config = {
    apiKey: "AIzaSyAv2q--Tls_DqKPnZfmmjrC3kIqbY0xX7k",
    authDomain: "projekt-236cf.firebaseapp.com",
    databaseURL: "https://projekt-236cf.firebaseio.com",
    projectId: "projekt-236cf",
    storageBucket: "projekt-236cf.appspot.com",
    messagingSenderId: "267509036702"
  };
const app =  firebase.initializeApp(config);
export const db = app.database()