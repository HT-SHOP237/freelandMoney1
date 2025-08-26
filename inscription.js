
        document.addEventListener('DOMContentLoaded', function() {
            const registerForm = document.getElementById('registerForm');
            const passwordInput = document.getElementById('password');
            const passwordStrengthBar = document.getElementById('passwordStrengthBar');
            const passwordStrengthText = document.getElementById('passwordStrengthText');
            
            // Vérificateur de force du mot de passe
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;
                let text = '';
                let barColor = '';
                
                if (password.length > 0) {
                    // Vérifier la longueur
                    if (password.length > 7) strength += 20;
                    
                    // Vérifier les lettres minuscules et majuscules
                    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 20;
                    
                    // Vérifier les chiffres
                    if (password.match(/([0-9])/)) strength += 20;
                    
                    // Vérifier les caractères spéciaux
                    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/)) strength += 20;
                    
                    // Vérifier si le mot de passe est trop commun
                    if (!password.match(/(password|123456|qwerty|azerty)/i)) strength += 20;
                }
                
                // Déterminer le texte et la couleur en fonction de la force
                if (strength === 0) {
                    text = '';
                    barColor = '';
                } else if (strength < 40) {
                    text = 'Faible';
                    barColor = 'password-strength-weak';
                } else if (strength < 80) {
                    text = 'Moyen';
                    barColor = 'password-strength-medium';
                } else {
                    text = 'Fort';
                    barColor = 'password-strength-strong';
                }
                
                // Mettre à jour la barre et le texte
                passwordStrengthBar.style.width = strength + '%';
                passwordStrengthBar.className = 'password-strength-bar ' + barColor;
                passwordStrengthText.textContent = text;
            });
            
            // Gestion de la soumission du formulaire
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const referralCode = document.getElementById('referralCode').value;
                const termsAgreement = document.getElementById('termsAgreement').checked;
                
                // Validation basique
                if (password !== confirmPassword) {
                    alert("Les mots de passe ne correspondent pas.");
                    return;
                }
                
                if (!termsAgreement) {
                    alert("Vous devez accepter les conditions d'utilisation pour créer un compte.");
                    return;
                }
                
                if (registerUser(firstName, lastName, email, phone, password, referralCode)) {
                    alert("Inscription réussie ! Vous êtes maintenant connecté.\n\nUn bonus de 3000 FCFA a été ajouté à votre compte.");
                    window.location.href = 'profile.html';
                }
            });
            
            // Fonction pour enregistrer un nouvel utilisateur
            function registerUser(firstName, lastName, email, phone, password, referralCode = '') {
                // Vérifier si l'utilisateur existe déjà
                const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
                const userExists = existingUsers.some(user => user.email === email);
                
                if (userExists) {
                    alert("Un compte avec cet email existe déjà.");
                    return false;
                }
                
                // Vérifier le format du numéro de téléphone
                if (!phone.match(/^[2367][0-9]{8}$/)) {
                    alert("Veuillez entrer un numéro de téléphone valide (Cameroon format: 6xx xxx xxx ou 2xx xxx xxx)");
                    return false;
                }
                
                // Appliquer le bonus de parrainage si le code est valide
                let referralBonus = 0;
                if (referralCode) {
                    // Ici, vous devriez vérifier si le code de parrainage est valide
                    // Pour cette démo, nous supposons que tout code non vide est valide
                    referralBonus = 500;
                    alert(`Bonus de parrainage de ${referralBonus} FCFA appliqué!`);
                }
                
                 
                
                // Ajouter le bonus de parrainage si applicable
                if (referralBonus > 0) {
                    newUser.transactions.push({
                        id: Date.now() + 1,
                        date: new Date().toLocaleDateString('fr-FR'),
                        type: "referral",
                        description: "Bonus de parrainage",
                        amount: referralBonus,
                        status: "completed"
                    });
                }
                
                // Sauvegarder l'utilisateur
                existingUsers.push(newUser);
                localStorage.setItem('allUsers', JSON.stringify(existingUsers));
                localStorage.setItem('userData', JSON.stringify(newUser));
                
                return true;
            }
        });
   // Gérer l'inscription
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const referralCode = document.getElementById('referralCode').value;
    
    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }
    
    if (registerUser(firstName, lastName, email, phone, password, referralCode)) {
        alert("Inscription réussie ! Vous êtes maintenant connecté.");
        
        // Vérifier s'il y avait un achat en attente
        const pendingServiceId = localStorage.getItem('pendingServicePurchase');
        
        if (pendingServiceId) {
            // Rediriger vers services.html pour finaliser l'achat
            window.location.href = 'services.html';
        } else {
            // Rediriger vers le profil
            window.location.href = 'profile.html';
        }
    }
});

// Fonction pour enregistrer un utilisateur
function registerUser(firstName, lastName, email, phone, password, referralCode = '') {
    const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const userExists = existingUsers.some(user => user.email === email);
    
    if (userExists) {
        alert("Un compte avec cet email existe déjà.");
        return false;
    }
    
    // Créer le nouvel utilisateur
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        password,
        serviceBalance: 3000,
        referralBalance: 0,
        referralCount: 0,
        referralEarnings: 0,
        activeServices: [],
        transactions: [
            {
                id: Date.now(),
                date: new Date().toLocaleDateString('fr-FR'),
                type: "bonus",
                description: "Bonus d'inscription",
                amount: 3000,
                status: "completed"
            }
        ],
        usedTransactionIds: []
    };
    
    // Sauvegarder l'utilisateur
    existingUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(existingUsers));
    localStorage.setItem('userData', JSON.stringify(newUser));
    
    return true;
}
// Fonction pour générer un code de parrainage unique
function generateReferralCode(userId, firstName, lastName) {
    const baseCode = `${firstName.charAt(0)}${lastName.charAt(0)}${userId}`;
    return baseCode.toUpperCase();
}

// Fonction pour trouver un parrain par son code
function findReferrerByCode(referralCode) {
    const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    return users.find(user => user.referralCode === referralCode);
}

// Fonction pour attribuer le bonus de parrainage
function applyReferralBonus(referrerId, newUserId) {
    const users = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const referrer = users.find(user => user.id === referrerId);
    const newUser = users.find(user => user.id === newUserId);
    
    if (referrer && newUser) {
        // Ajouter le bonus au parrain
        referrer.referralBalance += 1000;
        referrer.referralCount += 1;
        referrer.referralEarnings += 1000;
        
        // Ajouter une transaction pour le parrain
        referrer.transactions.unshift({
            id: Date.now(),
            date: new Date().toLocaleDateString('fr-FR'),
            type: "referral",
            description: `Bonus parrainage - ${newUser.firstName} ${newUser.lastName}`,
            amount: 1000,
            status: "completed"
        });
        
        // Ajouter le bonus au filleul
        newUser.serviceBalance += 1000;
        newUser.transactions.unshift({
            id: Date.now() + 1,
            date: new Date().toLocaleDateString('fr-FR'),
            type: "bonus",
            description: "Bonus de parrainage",
            amount: 1000,
            status: "completed"
        });
        
        // Mettre à jour le localStorage
        localStorage.setItem('allUsers', JSON.stringify(users));
        localStorage.setItem('userData', JSON.stringify(referrer));
        
        return true;
    }
    
    return false;
}

 