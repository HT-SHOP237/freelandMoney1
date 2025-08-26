  // Liste des 23 pays avec leur code de drapeau et nombre d'utilisateurs fictifs
        const countries = [
            { name: "Cameroun", flag: "🇨🇲", users: "12,458" },
            { name: "France", flag: "🇫🇷", users: "8,742" },
            { name: "Canada", flag: "🇨🇦", users: "7,321" },
            { name: "Belgique", flag: "🇧🇪", users: "6,543" },
            { name: "Suisse", flag: "🇨🇭", users: "5,987" },
            { name: "Côte d'Ivoire", flag: "🇨🇮", users: "5,432" },
            { name: "Sénégal", flag: "🇸🇳", users: "4,876" },
            { name: "Gabon", flag: "🇬🇦", users: "4,321" },
            { name: "Algérie", flag: "🇩🇿", users: "3,765" },
            { name: "Maroc", flag: "🇲🇦", users: "3,210" },
            { name: "Tunisie", flag: "🇹🇳", users: "2,987" },
            { name: "États-Unis", flag: "🇺🇸", users: "2,654" },
            { name: "Royaume-Uni", flag: "🇬🇧", users: "2,345" },
            { name: "Allemagne", flag: "🇩🇪", users: "2,109" },
            { name: "Espagne", flag: "🇪🇸", users: "1,987" },
            { name: "Italie", flag: "🇮🇹", users: "1,765" },
            { name: "Portugal", flag: "🇵🇹", users: "1,543" },
            { name: "Nigeria", flag: "🇳🇬", users: "1,432" },
            { name: "Ghana", flag: "🇬🇭", users: "1,321" },
            { name: "Afrique du Sud", flag: "🇿🇦", users: "1,210" },
            { name: "Mali", flag: "🇲🇱", users: "1,098" },
            { name: "Bénin", flag: "🇧🇯", users: "987" },
            { name: "Togo", flag: "🇹🇬", users: "876" }
        ];
        
        // Afficher les pays
        function renderCountries() {
            const container = document.getElementById('countriesGrid');
            container.innerHTML = '';
            
            countries.forEach(country => {
                const countryCard = document.createElement('div');
                countryCard.className = 'country-card';
                
                countryCard.innerHTML = `
                    <div class="country-flag">${country.flag}</div>
                    <div class="country-name">${country.name}</div>
                    <div class="country-users">${country.users} utilisateurs</div>
                `;
                
                container.appendChild(countryCard);
            });
        }
        
        // Gérer les FAQ
        function setupFAQ() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            });
        }
        
        // Initialiser la page
        document.addEventListener('DOMContentLoaded', function() {
            renderCountries();
            setupFAQ();
            
            // Navigation mobile
            document.querySelector('.nav-toggle').addEventListener('click', function() {
                document.querySelector('.nav-menu').classList.toggle('active');
            });
        });
        // Fonction pour vérifier si l'utilisateur est connecté
    function checkAuth() {
        const userData = localStorage.getItem('userData');
        const adminData = localStorage.getItem('adminData');
        
        return {
            isLoggedIn: !!userData || !!adminData,
            isAdmin: !!adminData,
            user: userData ? JSON.parse(userData) : null,
            admin: adminData ? JSON.parse(adminData) : null
        };
    }

        // Fonction pour mettre à jour le menu en fonction de l'état de connexion
function updateMenu() {
    const auth = checkAuth();
    const profileMenuItem = document.getElementById('profileMenuItem');
    const adminMenuItem = document.getElementById('adminMenuItem');
    const messagesMenuItem = document.getElementById('messagesMenuItem');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (auth.isLoggedIn) {
        // Afficher les éléments pour utilisateurs connectés
        if (profileMenuItem && auth.user) {
            profileMenuItem.style.display = 'block';
        }
        
        if (adminMenuItem && auth.isAdmin) {
            adminMenuItem.style.display = 'block';
        }
        
        if (messagesMenuItem) {
            messagesMenuItem.style.display = 'block';
        }
        
        // Modifier les boutons d'authentification
        if (authButtons) {
            authButtons.innerHTML = `
                <a href="#" class="btn btn-outline" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> Déconnexion
                </a>
            `;
            
            // Ajouter l'événement de déconnexion
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
                    localStorage.removeItem('userData');
                    localStorage.removeItem('adminData');
                    window.location.href = "accueil.html";
                }
            });
        }
    } else {
        // Cacher les éléments pour utilisateurs connectés
        if (profileMenuItem) profileMenuItem.style.display = 'none';
        if (adminMenuItem) adminMenuItem.style.display = 'none';
        if (messagesMenuItem) messagesMenuItem.style.display = 'none';
        
        // Afficher les boutons de connexion/inscription
        if (authButtons) {
            authButtons.innerHTML = `
                <a href="connexion.html" class="btn btn-outline">
                    <i class="fas fa-sign-in-alt"></i> Connexion
                </a>
                <a href="inscription.html" class="btn btn-primary">
                    <i class="fas fa-user-plus"></i> Inscription
                </a>
            `;
        }
    }
}
    //Appeler updateMenu() au chargement de chaque page
    document.addEventListener('DOMContentLoaded', function() {
        updateMenu();
    })
    
    // fonction pour afficher la modale d'authentification
    function showAuthModal() {

        document.getElementById('authModal').style.display = 'flex';
    }