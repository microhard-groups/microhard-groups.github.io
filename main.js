// 1. Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. Your web app's Firebase configuration
// PASTE YOUR KEYS HERE FROM THE FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyBJ55WRtAvAXaUerycWjb1-Zf1E-VEmDDo",
  authDomain: "groups-85638.firebaseapp.com",
  projectId: "groups-85638",
  storageBucket: "groups-85638.firebasestorage.app",
  messagingSenderId: "751289139753",
  appId: "1:751289139753:web:83e9bcb431c1a5ebfbd238",
  measurementId: "G-0SPQGZB6HK"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

// Reference the elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signup-btn');
const statusMsg = document.getElementById('status-message');

// The logic to create the user
signUpBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // It worked!
            statusMsg.style.color = "green";
            statusMsg.innerText = "Success! Account created.";
            console.log("User created:", userCredential.user);
        })
        .catch((error) => {
            // It failed (e.g., password too short, email already exists)
            statusMsg.style.color = "red";
            statusMsg.innerText = error.message;
        });
});

// 4. Reference your HTML elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signup-btn');

// 5. The Logic
signUpBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Account Created!");
            console.log("User:", userCredential.user);
        })
        .catch((error) => {
            alert(error.message);
        });
});