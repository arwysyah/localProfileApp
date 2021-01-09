import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB9QQ5RBvn_hHRN_hn__3dhgsAHRw7zhQk",
    authDomain: "localprofile-17bf7.firebaseapp.com",
    projectId: "localprofile-17bf7",
    storageBucket: "localprofile-17bf7.appspot.com",
    messagingSenderId: "81206349039",
    appId: "1:81206349039:web:9ad4173a1adf1ba0e81f1a"
  };
  // Initialize Firebase

  // Initialize Firebase
  const appdata = firebase.initializeApp(firebaseConfig);
  export default appdata