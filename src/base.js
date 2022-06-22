import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDNVXvzLQrpu1lrBNKhNbLl30KOUYTBFck",
    authDomain: "bakin-with-the-bros.firebaseapp.com",
    databaseURL: "https://bakin-with-the-bros-default-rtdb.firebaseio.com",
});


const base = Rebase.createClass(firebaseApp.database());


// This is a Named Export
export { firebaseapp };

// This is a Default Export
export default base;