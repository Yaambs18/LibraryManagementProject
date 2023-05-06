const logOutBtn = document.getElementById('logOut');

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../Login/login.html';
});