import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJ55WRtAvAXaUerycWjb1-Zf1E-VEmDDo",
    authDomain: "groups-85638.firebaseapp.com",
    // FIXED: Using your actual Singapore Database URL
    databaseURL: "https://groups-85638-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "groups-85638",
    storageBucket: "groups-85638.appspot.com",
    messagingSenderId: "751289139753",
    appId: "1:751289139753:web:83e9bcb431c1a5ebfbd238"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authBtn = document.getElementById('auth-btn');
const statusMsg = document.getElementById('status-message');
const toggleLink = document.getElementById('toggle-link');
const authTitle = document.getElementById('auth-title');

let isLoginMode = false;

toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    authTitle.innerText = isLoginMode ? "Welcome Back" : "Groups";
    authBtn.innerText = isLoginMode ? "Log In" : "Create Account";
    toggleLink.innerText = isLoginMode ? "Sign Up" : "Log In";
});

authBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        statusMsg.innerText = "Please fill in all fields.";
        return;
    }

    authBtn.disabled = true;
    const authFunction = isLoginMode ? signInWithEmailAndPassword : createUserWithEmailAndPassword;

    authFunction(auth, email, password)
        .then((userCredential) => {
            if (!isLoginMode) {
                // Save user to database so they are searchable
                set(ref(db, 'users/' + userCredential.user.uid), {
                    email: email,
                    uid: userCredential.user.uid
                }).then(() => {
                    window.location.href = "chat.html";
                });
            } else {
                window.location.href = "chat.html";
            }
        })
        .catch((error) => {
            authBtn.disabled = false;
            statusMsg.innerText = error.message;
        });
});