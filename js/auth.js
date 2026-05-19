import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjnFyUvN49loc-odcD6PiPzF90-s4Hc0A",
  authDomain: "swaralathota.firebaseapp.com",
  projectId: "swaralathota",
  storageBucket: "swaralathota.firebasestorage.app",
  messagingSenderId: "819785803261",
  appId: "1:819785803261:web:4976dca6d152049af6e594",
  measurementId: "G-PN9JTFFK6W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.API_BASE = "https://swaralathota-backend.ourancientheroes.workers.dev";

window.logoutUser = async () => {
    if (confirm("Are you sure you want to log out?")) {
        sessionStorage.removeItem('st_isAdmin');
        await signOut(auth);
        window.location.href = 'index.html';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');

    if (loginBtn) {
        loginBtn.addEventListener('click', async () => {
            try {
                await signInWithPopup(auth, provider);
            } catch (error) {
                if (error.code !== 'auth/popup-closed-by-user') {
                    console.error("Login failed", error);
                }
            }
        });
    }

    onAuthStateChanged(auth, async (user) => {
        window.currentUser = user;
        
        const path = window.location.pathname;
        const isIndex = path.endsWith('index.html') || path.endsWith('/');
        const isEvents = path.endsWith('events.html');

        if (user) {
            if (loginBtn) loginBtn.style.display = 'none';

            // Update nav avatar image (doesn't change visibility — that's handled by HTML)
            const navUserImg = document.getElementById('navUserImg');
            if (navUserImg && user.photoURL) {
                navUserImg.src = user.photoURL;
            }
            
            // Redirect landing → events
            if (isIndex) {
                window.location.href = 'events.html';
                return;
            }

            // Check admin once, then cache
            const cachedAdmin = sessionStorage.getItem('st_isAdmin');
            if (cachedAdmin === null) {
                try {
                    const res = await fetch(`${window.API_BASE}/api/users`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            uuid: user.uid,
                            email: user.email,
                            name: user.displayName || 'User'
                        })
                    });
                    const data = await res.json();
                    window.isAdmin = data.isAdmin;
                    sessionStorage.setItem('st_isAdmin', String(!!data.isAdmin));
                    // Show/hide admin tab now that we know
                    const adminNavBtn = document.getElementById('adminNavBtn');
                    if (adminNavBtn) {
                        adminNavBtn.style.display = data.isAdmin ? 'flex' : 'none';
                    }
                } catch (err) {
                    console.error("Failed to check admin status", err);
                }
            } else {
                window.isAdmin = cachedAdmin === 'true';
            }
        } else {
            if (loginBtn) loginBtn.style.display = 'flex';
            
            // Kick from protected pages
            if (isEvents || path.endsWith('profile.html') || path.endsWith('admin.html') || path.endsWith('mytickets.html')) {
                window.location.href = 'index.html';
            }
        }
    });
});
