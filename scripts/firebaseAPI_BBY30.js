


const firebaseConfig = {
  apiKey: "AIzaSyDb67Wl-leblllTZNi_LAF2Z9QxyagMg5M",
  authDomain: "bby30-104fb.firebaseapp.com",
  projectId: "bby30-104fb",
  storageBucket: "bby30-104fb.appspot.com",
  messagingSenderId: "389831300125",
  appId: "1:389831300125:web:f06a84e81449017998e2f4",
  measurementId: "G-38WCFVY5Y3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();