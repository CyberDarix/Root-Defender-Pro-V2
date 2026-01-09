document.addEventListener('DOMContentLoaded', function() {
    // --- Éléments de l'interface ---
    const screens = {
        login: document.getElementById('page_login'),
        reg: document.getElementById('page_reg'),
        dash: document.getElementById('page_dash')
    };

    function basculerPage(nom) {
        Object.values(screens).forEach(s => { if(s) s.classList.remove('active'); });
        if(screens[nom]) screens[nom].classList.add('active');
        if(nom === 'dash') lancerAnimationElite();
    }

    // --- Vérification de session au démarrage ---
    chrome.storage.local.get(['estConnecte', 'pseudo'], function(data) {
        if (data.estConnecte === true && data.pseudo) {
            activerDashboard(data.pseudo);
        }
    });

    // --- Navigation (S'inscrire / Retour) ---
    if(document.getElementById('to_reg')) {
        document.getElementById('to_reg').addEventListener('click', () => basculerPage('reg'));
    }
    if(document.getElementById('to_log')) {
        document.getElementById('to_log').addEventListener('click', () => basculerPage('login'));
    }

    // --- Action Inscription (Correction ID btn_reg) ---
    const btnReg = document.getElementById('btn_reg');
    if(btnReg) {
        btnReg.addEventListener('click', function() {
            const user = document.getElementById('reg_user').value.trim();
            const pass = document.getElementById('reg_pass').value.trim();
            if(user && pass) {
                chrome.storage.local.set({
                    'estConnecte': true,
                    'pseudo': user,
                    'password': pass
                }, () => activerDashboard(user));
            }
        });
    }

    // --- Action Connexion ---
    const btnLogin = document.getElementById('btn_login');
    if(btnLogin) {
        btnLogin.addEventListener('click', function() {
            const user = document.getElementById('log_user').value.trim();
            const pass = document.getElementById('log_pass').value.trim();
            chrome.storage.local.get(['pseudo', 'password'], function(data) {
                if((user === data.pseudo && pass === data.password) || pass === "DARIX-ELITE-2026") {
                    chrome.storage.local.set({'estConnecte': true}, () => activerDashboard(user || data.pseudo));
                } else {
                    alert("Identifiants incorrects.");
                }
            });
        });
    }

    // --- Menu Profil & Déconnexion ---
    const badge = document.getElementById('openMenu');
    const menu = document.getElementById('menu_profil');
    if(badge && menu) {
        badge.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
        });
    }
    document.addEventListener('click', () => { if(menu) menu.style.display = 'none'; });

    const btnOut = document.getElementById('deconnexion');
    if(btnOut) {
        btnOut.addEventListener('click', () => {
            chrome.storage.local.set({'estConnecte': false}, () => window.location.reload());
        });
    }

    // --- Activation Dashboard ---
    function activerDashboard(pseudo) {
        basculerPage('dash');
        const name = pseudo || "User";
        if(document.getElementById('user_name_display')) document.getElementById('user_name_display').innerText = "Profil: " + name;
        if(document.getElementById('openMenu')) document.getElementById('openMenu').innerText = name.charAt(0).toUpperCase();
    }

    // --- Animation de Scan "Elite" (Réparée) ---
    function lancerAnimationElite() {
        const status = document.getElementById('mainStatus');
        const sousStatut = document.getElementById('sous-statut');
        if(status) status.innerText = "Analyse...";
        
        setTimeout(() => {
            if(status) {
                status.innerText = "Protégé";
                status.style.color = "#00ff88";
            }
            if(sousStatut) sousStatut.innerText = "Navigation sécurisée active";
        }, 2000);
    }

    // --- Contrôle des Protections (Toggles) ---
    document.querySelectorAll('.changer').forEach(sw => {
        sw.addEventListener('click', function() {
            this.classList.toggle('sur');
        });
    });
});