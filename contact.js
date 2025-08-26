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
        
        // Gérer le formulaire de contact
        function setupContactForm() {
            const contactForm = document.getElementById('contactForm');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Récupérer les valeurs du formulaire
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // Ici, vous pourriez envoyer les données à un serveur
                // Pour cet exemple, nous affichons simplement une alerte
                
                alert(`Merci ${name} ! Votre message a été envoyé avec succès. Nous vous répondrons à l'adresse ${email} dans les plus brefs délais.`);
                
                // Réinitialiser le formulaire
                contactForm.reset();
            });
        }
        
        // Initialiser la page
        document.addEventListener('DOMContentLoaded', function() {
            setupFAQ();
            setupContactForm();
            
            // Navigation mobile
            document.querySelector('.nav-toggle').addEventListener('click', function() {
                document.querySelector('.nav-menu').classList.toggle('active');
            });
        });
   