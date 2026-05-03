import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJ55WRtAvAXaUerycWjb1-Zf1E-VEmDDo",
    authDomain: "groups-85638.firebaseapp.com",
    databaseURL: "https://groups-85638-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "groups-85638",
    appId: "1:751289139753:web:83e9bcb431c1a5ebfbd238"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Attach this to your button's onclick in HTML: onclick="handleAuth()"
window.handleAuth = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('auth-btn');

    if (!email || !password) return alert("Fill in both fields!");
    btn.innerText = "Connecting...";

    try {
        let userCred;
        try {
            userCred = await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            userCred = await createUserWithEmailAndPassword(auth, email, password);
            // This is what puts you in the DB so others can find you!
            await set(ref(db, 'users/' + userCred.user.uid), {
                email: email,
                uid: userCred.user.uid
            });
        }
        window.location.href = "chat.html";
    } catch (err) {
        alert("Error: " + err.message);
        btn.innerText = "Log In / Sign Up";
    }
};