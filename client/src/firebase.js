import firebase from 'firebase'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBBbnKPjAcOBspxGy0FeBTo_NEZE9ThDEI",
    authDomain: "ecommerce-9670c.firebaseapp.com",
    databaseURL: "https://ecommerce-9670c.firebaseio.com",
    projectId: "ecommerce-9670c",
    storageBucket: "ecommerce-9670c.appspot.com",
    messagingSenderId: "49448406339",
    appId: "1:49448406339:web:00088a2ab2d603d131b3f6",
    measurementId: "G-SF6VVCBMFV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()