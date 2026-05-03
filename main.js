import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// REPLACE THESE WITH YOUR KEYS FROM FIREBASE SETTINGS
const firebaseConfig = {
  apiKey: "AIzaSyBJ55WRtAvAXaUerycWjb1-Zf1E-VEmDDo",
  authDomain: "groups-85638.firebaseapp.com",
  projectId: "groups-85638",
  storageBucket: "groups-85638.appspot.com",
  messagingSenderId: "751289139753",
  appId: "1:751289139753:web:83e9bcb431c1a5ebfbd238"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signup-btn');
const statusMsg = document.getElementById('status-message');

signUpBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        statusMsg.style.color = "#fbbf24";
        statusMsg.innerText = "Enter your details, please.";
        return;
    }

    signUpBtn.innerText = "Joining...";
    signUpBtn.disabled = true;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            statusMsg.style.color = "#4ade80";
            statusMsg.innerText = "Success! Account created.";
            console.log("Success:", userCredential.user);
        })
        .catch((error) => {
            signUpBtn.innerText = "Create Account";
            signUpBtn.disabled = false;
            statusMsg.style.color = "#f87171";
            statusMsg.innerText = error.message;
        });
});