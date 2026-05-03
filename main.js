import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJ55WRtAvAXaUerycWjb1-Zf1E-VEmDDo",
    authDomain: "groups-85638.firebaseapp.com",
    // CRITICAL: Updated to your Singapore URL from screenshot
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

let isLoginMode = false;

authBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) return;

    authBtn.innerText = "Processing...";
    const authFunc = isLoginMode ? signInWithEmailAndPassword : createUserWithEmailAndPassword;

    authFunc(auth, email, password)
        .then((userCredential) => {
            // This is the part that fixes the 'null' database issue
            if (!isLoginMode) {
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
            authBtn.innerText = "Try Again";
            statusMsg.innerText = error.message;
        });
});