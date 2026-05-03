import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJ55WRtAvAXaUerycWjb1-Zf1E-VEmDDo", // Make sure this is your real key!
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
const authBtn = document.getElementById('auth-btn');
const statusMsg = document.getElementById('status-message');
const toggleLink = document.getElementById('toggle-link');
const authTitle = document.getElementById('auth-title');

let isLoginMode = false;

// 1. Toggle between Login and Signup
toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    
    if (isLoginMode) {
        authTitle.innerText = "Welcome Back";
        authBtn.innerText = "Log In";
        toggleLink.innerText = "Sign Up";
        document.getElementById('toggle-text').innerText = "New here?";
    } else {
        authTitle.innerText = "Groups";
        authBtn.innerText = "Create Account";
        toggleLink.innerText = "Log In";
        document.getElementById('toggle-text').innerText = "Already have an account?";
    }
});

// 2. Handle the actual Auth
authBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        statusMsg.innerText = "Fill it all in, mate.";
        return;
    }

    authBtn.disabled = true;
    authBtn.innerText = isLoginMode ? "Logging in..." : "Joining...";

    // Determine which Firebase function to use
    const authFunction = isLoginMode ? signInWithEmailAndPassword : createUserWithEmailAndPassword;

    authFunction(auth, email, password)
        .then(() => {
            window.location.href = "chat.html";
        })
        .catch((error) => {
            authBtn.disabled = false;
            authBtn.innerText = isLoginMode ? "Log In" : "Create Account";
            statusMsg.style.color = "#f87171";
            statusMsg.innerText = error.message;
        });
});