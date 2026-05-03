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

window.handleAuth = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('auth-btn');

    if (!email || !password) return;
    btn.disabled = true;

    try {
        let userCredential;
        try {
            // Try login
            userCredential = await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            // If login fails, try signup
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Crucial: Save to 'users' folder so search works
            await set(ref(db, 'users/' + userCredential.user.uid), {
                email: email,
                uid: userCredential.user.uid
            });
        }
        window.location.href = "chat.html";
    } catch (error) {
        alert(error.message);
        btn.disabled = false;
    }
};