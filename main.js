import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// Added Database imports
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJ55WRtAvAXaUerycWjb1-Zf1E-VEmDDo",
    authDomain: "groups-85638.firebaseapp.com",
    databaseURL: "https://groups-85638-default-rtdb.firebaseio.com/",
    projectId: "groups-85638",
    storageBucket: "groups-85638.appspot.com",
    messagingSenderId: "751289139753",
    appId: "1:751289139753:web:83e9bcb431c1a5ebfbd238"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Initialize Database

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

// 2. Handle Auth & User Registration
authBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        statusMsg.innerText = "Fill it all in, mate.";
        return;
    }

    authBtn.disabled = true;
    authBtn.innerText = isLoginMode ? "Logging in..." : "Joining...";

    if (isLoginMode) {
        // LOGIN LOGIC
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "chat.html";
            })
            .catch((error) => handleAuthError(error));
    } else {
        // SIGNUP LOGIC
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // SAVE USER TO DATABASE so they can be searched later
                const userId = userCredential.user.uid;
                set(ref(db, 'users/' + userId), {
                    email: email,
                    uid: userId
                }).then(() => {
                    window.location.href = "chat.html";
                });
            })
            .catch((error) => handleAuthError(error));
    }
});

function handleAuthError(error) {
    authBtn.disabled = false;
    authBtn.innerText = isLoginMode ? "Log In" : "Create Account";
    statusMsg.style.color = "#f87171";
    statusMsg.innerText = error.message;
}