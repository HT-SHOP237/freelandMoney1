
        
// Données des administrateurs
const adminAccounts = [
    { username: "admin_ecoinvest", password: "AdminEco123!", email: "admin@ecoinvest.com" },
    { username: "moderator_eco", password: "ModEco456!", email: "mod@ecoinvest.com" }
];

// Gérer la connexion utilisateur
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (loginUser(email, password)) {
        alert("Connexion réussie !");
        
        // Vérifier s'il y avait un achat en attente
        const pendingServiceId = localStorage.getItem('pendingServicePurchase');
        
        if (pendingServiceId) {
            // Rediriger vers services.html pour finaliser l'achat
            window.location.href = 'services.html';
        } else {
            // Rediriger vers le profil
            window.location.href = 'profile.html';
        }
    } else {
        alert("Email ou mot de passe incorrect.");
    }
});

// Gérer la connexion administrateur  
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (loginAdmin(username, password)) {
        alert("Connexion administrateur réussie !");
        
        // Rediriger vers la page d'administration
        window.location.href = 'admin.html';
    } else {
        alert("Identifiants administrateur incorrects.");
    }
});

// Fonction pour connecter un utilisateur
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
        return true;
    }
    
    return false;
}

// Fonction pour connecter un administrateur
function loginAdmin(username, password) {
    const admin = adminAccounts.find(a => a.username === username && a.password === password);
    
    if (admin) {
        localStorage.setItem('adminData', JSON.stringify(admin));
        return true;
    }
    
    return false;
}