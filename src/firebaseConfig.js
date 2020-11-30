import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBsEHLoskR1AzsL2zosd0qfydlg0X2rK4U",
  authDomain: "dietician-1a2d8.firebaseapp.com",
  databaseURL: "https://dietician-1a2d8.firebaseio.com",
  projectId: "dietician-1a2d8",
  storageBucket: "dietician-1a2d8.appspot.com",
  messagingSenderId: "700005433595",
  appId: "1:700005433595:web:3eeb881d5226e6e942f05e",
  measurementId: "G-GQB15032V2",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
