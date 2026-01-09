document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. MÉMOIRE DES BOUTONS (SMART STATE) ---
    function saveAppState() {
        const state = {
            web: document.getElementById('sw_web').classList.contains('sur'),
            track: document.getElementById('sw_track').classList.contains('sur'),
            quantum: document.getElementById('sw_quantum').classList.contains('sur')
        };
        chrome.storage.local.set({ 'toggles': state });
    }

    // --- 2. GESTION DU MENU K ---
    const btnK = document.getElementById('openMenu');
    const menu = document.getElementById('menu_profil');
    
    btnK?.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });
    document.addEventListener('click', () => { if(menu) menu.style.display = 'none'; });

    // --- 3. IA DE CONNEXION & VÉRIFICATION ---
    const loginErr = document.getElementById('login_err');

    document.getElementById('btn_login_submit')?.addEventListener('click', () => {
        const user = document.getElementById('log_user').value.trim();
        const pass = document.getElementById('log_pass').value.trim();
        const inputUser = document.getElementById('log_user');

        chrome.storage.local.get(['comptes'], (data) => {
            const comptes = data.comptes || {};

            // VÉRIFICATION INTELLIGENTE
            if (comptes[user] && comptes[user] === pass) {
                chrome.storage.local.set({ 'estConnecte': true, 'pseudo': user }, () => {
                    location.reload(); 
                });
            } else {
                // EFFET ERREUR (IA REJET)
                loginErr.style.display = 'block';
                inputUser.classList.add('shake');
                setTimeout(() => { 
                    inputUser.classList.remove('shake');
                    loginErr.style.display = 'none';
                }, 1500);
            }
        });
    });

    // --- 4. INSCRIPTION PRO (ENREGISTREMENT) ---
    document.getElementById('btn_reg_submit')?.addEventListener('click', () => {
        const user = document.getElementById('reg_user').value.trim();
        const pass = document.getElementById('reg_pass').value.trim();

        if (user !== "" && pass !== "") {
            chrome.storage.local.get(['comptes'], (data) => {
                let comptes = data.comptes || {};
                comptes[user] = pass; // On enregistre le nouveau compte

                chrome.storage.local.set({ 
                    'comptes': comptes, 
                    'estConnecte': true, 
                    'pseudo': user 
                }, () => {
                    location.reload(); 
                });
            });
        }
    });

    // --- 5. LOGOUT ---
    document.getElementById('btn_logout')?.addEventListener('click', () => {
        chrome.storage.local.set({ 'estConnecte': false }, () => { location.reload(); });
    });

    // NAVIGATION
    document.getElementById('link_to_reg')?.addEventListener('click', () => {
        document.getElementById('page_login').classList.remove('active');
        document.getElementById('page_reg').classList.add('active');
    });
    document.getElementById('link_to_log')?.addEventListener('click', () => {
        document.getElementById('page_reg').classList.remove('active');
        document.getElementById('page_login').classList.add('active');
    });

    // --- 6. CHARGEMENT AU DÉMARRAGE ---
    chrome.storage.local.get(['estConnecte', 'pseudo', 'toggles'], (data) => {
        if (data.estConnecte) {
            document.getElementById('page_dash').classList.add('active');
            if(data.pseudo) {
                document.getElementById('openMenu').innerText = data.pseudo.charAt(0).toUpperCase();
                document.getElementById('user_name_display').innerText = data.pseudo;
            }
            if(data.toggles) {
                if(data.toggles.web) document.getElementById('sw_web').classList.add('sur'); else document.getElementById('sw_web').classList.remove('sur');
                if(data.toggles.track) document.getElementById('sw_track').classList.add('sur'); else document.getElementById('sw_track').classList.remove('sur');
                if(data.toggles.quantum) document.getElementById('sw_quantum').classList.add('sur'); else document.getElementById('sw_quantum').classList.remove('sur');
            }
        } else {
            document.getElementById('page_login').classList.add('active');
        }
    });

    document.querySelectorAll('.changer').forEach(sw => {
        sw.addEventListener('click', function() {
            this.classList.toggle('sur');
            saveAppState();
        });
    });

    document.getElementById('btn_site_link')?.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://sites.google.com/view/root-defender-official/accueil' });
    });
});