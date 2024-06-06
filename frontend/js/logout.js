document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('button-logout');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

function handleLogout() {
    localStorage.removeItem('authToken');
    
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    window.location.href = 'login.html';
}
