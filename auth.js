document.addEventListener('DOMContentLoaded', function() {
    const mainBtn = document.getElementById('mainBtn');
    const toggleBtn = document.getElementById('toggleBtn');
    const formTitle = document.getElementById('formTitle');
    
    let isLoginMode = true;

    // Basculer entre Connexion et Création
    toggleBtn.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        if (isLoginMode) {
            formTitle.innerText = "ROOT-DEFENDER PRO";
            mainBtn.innerText = "Se connecter";
            toggleBtn.innerText = "Pas de compte ? Créer un compte";
        } else {
            formTitle.innerText = "CRÉER UN COMPTE";
            mainBtn.innerText = "S'inscrire";
            toggleBtn.innerText = "Déjà un compte ? Se connecter";
        }
    });

    // Action du bouton principal
    mainBtn.addEventListener('click', function() {
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;

        if (email.includes('@') && pass.length >= 4) {
            // Sauvegarde les infos
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userInitial', email.charAt(0).toUpperCase());

            // Redirection vers la page de protection
            window.location.href = 'popup.html';
        } else {
            alert("Veuillez remplir correctement les champs.");
        }
    });
});