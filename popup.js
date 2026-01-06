document.addEventListener('DOMContentLoaded', function() {
    // Vérification de session
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // Menu Profil Interactif
    const badge = document.getElementById('openMenu');
    const menu = document.getElementById('profileMenu');
    
    badge.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });

    document.addEventListener('click', () => menu.style.display = 'none');

    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    });

    // Animation de Scan "Elite"
    setTimeout(() => {
        document.getElementById('mainStatus').innerText = "Protégé";
        document.getElementById('subStatus').innerText = "Navigation sécurisée active";
    }, 1500);

    // Contrôle des Protections
    document.querySelectorAll('.switch').forEach(sw => {
        sw.addEventListener('click', function() {
            this.classList.toggle('on');
        });
    });
});