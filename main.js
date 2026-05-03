// 1. Imports (Only once!)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 2. Your Config (Keep your actual keys here)
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "groups-85638.firebaseapp.com",
  projectId: "groups-85638",
  storageBucket: "groups-85638.appspot.com",
  messagingSenderId: "751289139753",
  appId: "1:751289139753:web:83e9bcb431c1a5ebfbd238"
};

// 3. Initialize (Only once!)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 4. Elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signup-btn');
const statusMsg = document.getElementById('status-message');

// 5. Logic
signUpBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        statusMsg.innerText = "Fill in both fields, genius.";
        return;
    }

    signUpBtn.innerText = "Joining...";
    signUpBtn.disabled = true;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            statusMsg.style.color = "#28a745";
            statusMsg.innerText = "Success! Welcome to Groups.";
            console.log("Logged in:", userCredential.user);
        })
        .catch((error) => {
            signUpBtn.innerText = "Sign Up";
            signUpBtn.disabled = false;
            statusMsg.style.color = "#dc3545";
            statusMsg.innerText = error.message;
        });
});