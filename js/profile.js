document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.getElementById('mainProfileName');
    const profileEmail = document.getElementById('mainProfileEmail');
    const profileAvatar = document.getElementById('mainProfileImg');

    let checkInterval = setInterval(async () => {
        if (typeof window.currentUser !== 'undefined') {
            clearInterval(checkInterval);
            if (!window.currentUser) {
                window.location.href = 'index.html';
                return;
            }
            
            if (profileName) profileName.textContent = window.currentUser.displayName || 'User';
            if (profileEmail) profileEmail.textContent = window.currentUser.email || '';
            if (profileAvatar && window.currentUser.photoURL) {
                profileAvatar.src = window.currentUser.photoURL;
            }
        }
    }, 200);

    setTimeout(() => { clearInterval(checkInterval); }, 8000);
});
