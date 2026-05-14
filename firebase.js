// firebase.js - إعدادات الحساب الجديد الموحدة
const firebaseConfig = {
  apiKey: "AIzaSyB2WultJ82Hx7zH-2czVYlWvBPhP0_L6Qk",
  authDomain: "wafaseiyunshop-5a5b2.firebaseapp.com",
  databaseURL: "https://wafaseiyunshop-5a5b2-default-rtdb.firebaseio.com",
  projectId: "wafaseiyunshop-5a5b2",
  storageBucket: "wafaseiyunshop-5a5b2.firebasestorage.app",
  messagingSenderId: "493649894963",
  appId: "1:493649894963:web:7e22905a96e37432fc4d46",
  measurementId: "G-5V1T0D80VR"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

window.database = firebase.database();
window.auth = firebase.auth();