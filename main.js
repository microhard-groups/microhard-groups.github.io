import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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

// Track current mode: 'signin' or 'signup'
let mode = 'signin';

window.setMode = (newMode) => {
    mode = newMode;
    const title = document.getElementById('auth-title');
    const btn = document.getElementById('auth-btn');
    const signinTab = document.getElementById('tab-signin');
    const signupTab = document.getElementById('tab-signup');
    const confirmGroup = document.getElementById('confirm-group');

    if (mode === 'signin') {
        title.textContent = 'Welcome back';
        btn.textContent = 'Sign In';
        signinTab.classList.add('active');
        signupTab.classList.remove('active');
        confirmGroup.style.display = 'none';
    } else {
        title.textContent = 'Create account';
        btn.textContent = 'Sign Up';
        signupTab.classList.add('active');
        signinTab.classList.remove('active');
        confirmGroup.style.display = 'block';
    }

    document.getElementById('status-message').textContent = '';
};

window.handleAuth = async () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const status = document.getElementById('status-message');
    const btn = document.getElementById('auth-btn');

    if (!email || !password) {
        status.textContent = 'Please fill in all fields.';
        return;
    }

    if (mode === 'signup') {
        const confirm = document.getElementById('confirm-password').value;
        if (password !== confirm) {
            status.textContent = 'Passwords do not match.';
            return;
        }
        if (password.length < 6) {
            status.textContent = 'Password must be at least 6 characters.';
            return;
        }
    }

    btn.disabled = true;
    btn.textContent = 'Please wait...';
    status.textContent = '';

    try {
        let userCred;
        if (mode === 'signin') {
            userCred = await signInWithEmailAndPassword(auth, email, password);
        } else {
            userCred = await createUserWithEmailAndPassword(auth, email, password);
            // Store user in DB so they're searchable
            await set(ref(db, 'users/' + userCred.user.uid), {
                email: email.toLowerCase(),
                uid: userCred.user.uid
            });
        }
        window.location.href = "chat.html";
    } catch (err) {
        // Show friendly error messages
        const errorMap = {
            'auth/user-not-found': 'No account found with this email.',
            'auth/wrong-password': 'Incorrect password.',
            'auth/invalid-credential': 'Invalid email or password.',
            'auth/email-already-in-use': 'An account with this email already exists.',
            'auth/invalid-email': 'Please enter a valid email address.',
            'auth/too-many-requests': 'Too many attempts. Please try again later.',
        };
        status.textContent = errorMap[err.code] || err.message;
        btn.disabled = false;
        window.setMode(mode); // restore button text
    }
};

// Wire up tabs — do this here instead of inline onclick so the module is guaranteed loaded
document.getElementById('tab-signin').addEventListener('click', () => setMode('signin'));
document.getElementById('tab-signup').addEventListener('click', () => setMode('signup'));

// Wire up auth button
document.getElementById('auth-btn').addEventListener('click', handleAuth);

// Allow pressing Enter to submit
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAuth();
});

// local aliases so the functions above work without window.*
function setMode(m) { window.setMode(m); }
function handleAuth() { window.handleAuth(); }
