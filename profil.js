 
        // Fonction pour récupérer les données utilisateur depuis le localStorage
        function getUserData() {
            const userData = localStorage.getItem('userData');
            return userData ? JSON.parse(userData) : null;
        }

        // Fonction pour sauvegarder les données utilisateur dans le localStorage
        function saveUserData(userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }

        // Fonction pour vérifier si l'utilisateur est connecté
        function checkUserLoggedIn() {
            const userData = getUserData();
            if (!userData) {
                // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
                window.location.href = "connexion.html";
                return false;
            }
            return true;
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

        // Fonction pour initialiser les données utilisateur si elles n'existent pas
        function initializeUserData() {
            if (!getUserData()) {
                const defaultUserData = {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    serviceBalance: 3000, // Bonus d'inscription de 3000 FCFA
                    referralBalance: 0,
                    referralCount: 0,
                    referralEarnings: 0,
                    activeServices: [],
                    transactions: [
                        {
                            id: 1,
                            date: new Date().toLocaleDateString('fr-FR'),
                            type: "bonus",
                            description: "Bonus d'inscription",
                            amount: 3000,
                            status: "completed"
                        }
                    ],
                    usedTransactionIds: [] // Stocker les IDs de transaction déjà utilisés
                };
                saveUserData(defaultUserData);
                
                // Rediriger vers la page d'inscription pour compléter le profil
                window.location.href = "inscription.html";
            }
        }

        // Générer des noms aléatoires pour les retraits en direct
        function generateRandomName() {
            const firstNames = ['Jean', 'Marie', 'Paul', 'Alice', 'Pierre', 'Sophie', 'Luc', 'Emma', 'Thomas', 'Julie', 'David', 'Sarah', 'Michel', 'Nathalie', 'Alexandre'];
            const lastNames = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Moreau', 'Petit', 'Durand', 'Leroy', 'Morel', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'Thomas'];
            return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        }

        // Générer des données de retrait aléatoires
        function generateRandomWithdrawals(count) {
            const withdrawals = [];
            for (let i = 0; i < count; i++) {
                withdrawals.push({
                    user: generateRandomName(),
                    amount: Math.floor(Math.random() * 50000) + 15000
                });
            }
            return withdrawals;
        }

        // Mettre à jour l'affichage des retraits en direct
        function updateLiveWithdrawals() {
            const withdrawals = generateRandomWithdrawals(5);
            const container = document.getElementById('withdrawalsList');
            // Effacer le contenu existant
            container.innerHTML = '';
            
            // Ajouter les nouveaux retraits
            withdrawals.forEach(withdrawal => {
                const item = document.createElement('div');
                item.className = 'withdrawal-item';
                item.innerHTML = `
                    <span class="withdrawal-user">${withdrawal.user}</span>
                    <span class="withdrawal-amount">${withdrawal.amount.toLocaleString()} FCFA</span>
                `;
                container.appendChild(item);
            });
        }

        // Mettre à jour l'affichage du profil
        function updateProfileDisplay() {
            const userData = getUserData();
            if (!userData) return;
            
            // Mettre à jour les informations utilisateur
            document.getElementById('userName').textContent = `${userData.firstName} ${userData.lastName}`;
            document.getElementById('userEmail').textContent = userData.email;
            document.getElementById('userAvatar').textContent = userData.firstName.charAt(0) + userData.lastName.charAt(0);
            
            // Mettre à jour les soldes
            document.getElementById('serviceBalance').textContent = `${userData.serviceBalance.toLocaleString()} FCFA`;
            document.getElementById('referralBalance').textContent = `${userData.referralBalance.toLocaleString()} FCFA`;
            document.getElementById('referralCount').textContent = userData.referralCount;
            document.getElementById('totalReferralEarnings').textContent = userData.referralEarnings.toLocaleString();
            
            // Mettre à jour le lien de parrainage
            document.getElementById('referralLink').value = `https://ecoinvest.com/register?ref=${userData.firstName.toLowerCase()}${userData.lastName.toLowerCase()}${userData.referralCount}`;
            
            // Mettre à jour les boutons de retrait
            updateWithdrawalButtons();
            
            // Mettre à jour les services actifs
            renderActiveServices();
            
            // Mettre à jour l'historique des transactions
            renderTransactions();
        }

        // Mettre à jour les boutons de retrait en fonction des soldes
        function updateWithdrawalButtons() {
            const userData = getUserData();
            if (!userData) return;
            
            const serviceBtn = document.getElementById('withdrawService');
            const referralBtn = document.getElementById('withdrawReferral');
            
            // Service balance (minimum 25,000 FCFA)
            if (userData.serviceBalance >= 25000) {
                serviceBtn.disabled = false;
                serviceBtn.textContent = "Effectuer un retrait";
            } else {
                serviceBtn.disabled = true;
                serviceBtn.textContent = `Encore ${(25000 - userData.serviceBalance).toLocaleString()} FCFA pour retirer`;
            }
            
            // Referral balance (minimum 15,000 FCFA)
            if (userData.referralBalance >= 15000) {
                referralBtn.disabled = false;
                referralBtn.textContent = "Effectuer un retrait";
            } else {
                referralBtn.disabled = true;
                referralBtn.textContent = `Encore ${(15000 - userData.referralBalance).toLocaleString()} FCFA pour retirer`;
            }
        }

        // Afficher les services actifs
        function renderActiveServices() {
            const userData = getUserData();
            if (!userData) return;
            
            const container = document.getElementById('activeServices');
            container.innerHTML = '';
            
            if (userData.activeServices.length === 0) {
                container.innerHTML = '<p class="no-services">Aucun service actif pour le moment.</p>';
                return;
            }
            
            userData.activeServices.forEach(userService => {
                const serviceItem = document.createElement('div');
                serviceItem.className = 'service-item';
                
                const totalDays = 30;
                const daysPassed = totalDays - userService.daysRemaining;
                const progress = (daysPassed / totalDays) * 100;
                const totalEarnings = daysPassed * userService.dailyIncome;
                
                serviceItem.innerHTML = `
                    <div class="service-name">${userService.name}</div>
                    <div class="service-details">
                        <div class="service-detail">
                            <div class="label">Investissement</div>
                            <div class="value">${userService.price.toLocaleString()} FCFA</div>
                        </div>
                        <div class="service-detail">
                            <div class="label">Gain/jour</div>
                            <div class="value">${userService.dailyIncome.toLocaleString()} FCFA</div>
                        </div>
                    </div>
                    <div class="service-details">
                        <div class="service-detail">
                            <div class="label">Gains totaux</div>
                            <div class="value">${totalEarnings.toLocaleString()} FCFA</div>
                        </div>
                    </div>
                    <div class="service-progress">
                        <div class="service-progress-bar" style="width: ${progress}%"></div>
                    </div>
                    <div class="service-remaining">${userService.daysRemaining} jours restants</div>
                `;
                
                container.appendChild(serviceItem);
            });
        }

        // Afficher l'historique des transactions
        function renderTransactions() {
            const userData = getUserData();
            if (!userData) return;
            
            const container = document.getElementById('transactionsList');
            container.innerHTML = '';
            
            if (userData.transactions.length === 0) {
                container.innerHTML = '<tr><td colspan="5" style="text-align: center;">Aucune transaction pour le moment.</td></tr>';
                return;
            }
            
            userData.transactions.forEach(transaction => {
                const row = document.createElement('tr');
                
                // Déterminer la classe du type de transaction
                let typeClass = '';
                if (transaction.type === 'deposit') typeClass = 'deposit';
                else if (transaction.type === 'withdrawal') typeClass = 'withdrawal';
                else if (transaction.type === 'referral') typeClass = 'referral';
                else if (transaction.type === 'bonus') typeClass = 'bonus';
                
                // Déterminer la classe du statut
                let statusClass = '';
                if (transaction.status === 'completed') statusClass = 'completed';
                else if (transaction.status === 'pending') statusClass = 'pending';
                else if (transaction.status === 'failed') statusClass = 'failed';
                
                // Déterminer la classe du montant
                const amountClass = transaction.amount >= 0 ? 'positive' : 'negative';
                const amountDisplay = transaction.amount >= 0 ? 
                    `+${transaction.amount.toLocaleString()}` : 
                    transaction.amount.toLocaleString();
                
                row.innerHTML = `
                    <td>${transaction.date}</td>
                    <td><span class="transaction-type ${typeClass}">${getTransactionTypeLabel(transaction.type)}</span></td>
                    <td>${transaction.description}</td>
                    <td class="transaction-amount ${amountClass}">${amountDisplay} FCFA</td>
                    <td><span class="transaction-status ${statusClass}">${getTransactionStatusLabel(transaction.status)}</span></td>
                `;
                
                container.appendChild(row);
            });
        }

        // Obtenir le libellé du type de transaction
        function getTransactionTypeLabel(type) {
            const labels = {
                'deposit': 'Dépôt',
                'withdrawal': 'Retrait',
                'referral': 'Parrainage',
                'bonus': 'Bonus'
            };
            return labels[type] || type;
        }

        // Obtenir le libellé du statut de transaction
        function getTransactionStatusLabel(status) {
            const labels = {
                'completed': 'Complété',
                'pending': 'En attente',
                'failed': 'Échoué'
            };
            return labels[status] || status;
        }

        // Ouvrir la modal de dépôt
        function openDepositModal() {
            document.getElementById('depositModal').style.display = 'flex';
        }

        // Ouvrir la modal de retrait
        function openWithdrawalModal(type) {
            const userData = getUserData();
            if (!userData) return;
            
            document.getElementById('withdrawalType').value = type;
            
            let amount = 0;
            let title = '';
            
            if (type === 'service') {
                amount = userData.serviceBalance;
                title = 'Retrait des Gains de Service';
            } else {
                amount = userData.referralBalance;
                title = 'Retrait des Gains de Parrainage';
            }
            
            document.getElementById('withdrawalAmount').value = amount;
            document.getElementById('withdrawalModalTitle').textContent = title;
            document.getElementById('withdrawalModal').style.display = 'flex';
        }

        // Ouvrir la modal d'édition de profil
        function openEditProfileModal() {
            const userData = getUserData();
            if (!userData) return;
            
            document.getElementById('firstName').value = userData.firstName;
            document.getElementById('lastName').value = userData.lastName;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;
            
            document.getElementById('editProfileModal').style.display = 'flex';
        }

        // Copier le lien de parrainage
        function copyReferralLink() {
            const linkInput = document.getElementById('referralLink');
            linkInput.select();
            document.execCommand('copy');
            
            alert('Lien de parrainage copié dans le presse-papier !');
        }

        // Partager le lien de parrainage
        function shareReferralLink(platform) {
            const link = document.getElementById('referralLink').value;
            let url = '';
            
            switch(platform) {
                case 'whatsapp':
                    url = `https://wa.me/?text=${encodeURIComponent('Rejoins-moi sur EcoInvest et commence à investir dans des projets écologiques! ' + link)}`;
                    break;
                case 'facebook':
                    url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
                    break;
                case 'telegram':
                    url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('Rejoins-moi sur EcoInvest!')}`;
                    break;
            }
            
            window.open(url, '_blank');
        }

        // Gérer la soumission du formulaire de dépôt
        function setupDepositForm() {
            document.getElementById('depositForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const userData = getUserData();
                if (!userData) return;
                
                const phoneNumber = document.getElementById('phoneNumber').value;
                const depositAmount = parseInt(document.getElementById('depositAmount').value);
                const transactionId = document.getElementById('transactionId').value;
                
                // Vérifier si l'ID de transaction a déjà été utilisé
                if (userData.usedTransactionIds.includes(transactionId)) {
                    alert("Cet ID de transaction a déjà été utilisé. Veuillez contacter l'administrateur si vous pensez qu'il s'agit d'une erreur.");
                    return;
                }
                
                // Simuler la validation de l'ID (en production, cela serait fait côté serveur)
                if (transactionId && transactionId.length >= 6) {
                    // Dépôt réussi
                    alert(`Dépôt réussi ! ${depositAmount.toLocaleString()} FCFA ont été ajoutés à votre solde.`);
                    
                    // Mettre à jour le solde
                    userData.serviceBalance += depositAmount;
                    
                    // Ajouter l'ID de transaction à la liste des IDs utilisés
                    userData.usedTransactionIds.push(transactionId);
                    
                    // Ajouter la transaction à l'historique
                    userData.transactions.unshift({
                        id: Date.now(),
                        date: new Date().toLocaleDateString('fr-FR'),
                        type: 'deposit',
                        description: `Dépôt MTN Money`,
                        amount: depositAmount,
                        status: 'completed'
                    });
                    
                    // Sauvegarder les données mises à jour
                    saveUserData(userData);
                    
                    // Mettre à jour l'affichage
                    updateProfileDisplay();
                    
                    // Réinitialiser le formulaire et fermer la modal
                    document.getElementById('depositForm').reset();
                    document.getElementById('depositModal').style.display = 'none';
                } else {
                    // ID de transaction incorrect
                    alert("ID de transaction incorrect. Veuillez contacter l'administrateur pour obtenir le bon ID.");
                }
            });
        }

        // Gérer la soumission du formulaire de retrait
        function setupWithdrawalForm() {
            document.getElementById('withdrawalForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const userData = getUserData();
                if (!userData) return;
                
                const type = document.getElementById('withdrawalType').value;
                const amount = parseInt(document.getElementById('withdrawalAmount').value);
                const withdrawalId = document.getElementById('withdrawalId').value;
                
                // Vérifier si l'ID de retrait a déjà été utilisé
                if (userData.usedTransactionIds.includes(withdrawalId)) {
                    alert("Cet ID de retrait a déjà été utilisé. Veuillez contacter l'administrateur si vous pensez qu'il s'agit d'une erreur.");
                    return;
                }
                
                // Simuler la validation de l'ID (en production, cela serait fait côté serveur)
                if (withdrawalId && withdrawalId.length >= 6) {
                    // Retrait réussi
                    alert(`Retrait réussi ! ${amount.toLocaleString()} FCFA ont été retirés de votre solde.`);
                    
                    // Mettre à jour les soldes
                    if (type === 'service') {
                        userData.serviceBalance -= amount;
                    } else {
                        userData.referralBalance -= amount;
                    }
                    
                    // Ajouter l'ID de retrait à la liste des IDs utilisés
                    userData.usedTransactionIds.push(withdrawalId);
                    
                    // Ajouter la transaction à l'historique
                    userData.transactions.unshift({
                        id: Date.now(),
                        date: new Date().toLocaleDateString('fr-FR'),
                        type: 'withdrawal',
                        description: `Retrait ${type === 'service' ? 'gains de service' : 'gains de parrainage'}`,
                        amount: -amount,
                        status: 'completed'
                    });
                    
                    // Sauvegarder les données mises à jour
                    saveUserData(userData);
                    
                    // Mettre à jour l'affichage
                    updateProfileDisplay();
                    
                    // Réinitialiser le formulaire et fermer la modal
                    document.getElementById('withdrawalForm').reset();
                    document.getElementById('withdrawalModal').style.display = 'none';
                } else {
                    // ID de retrait incorrect
                    alert("ID de retrait incorrect. Veuillez contacter l'administrateur pour obtenir le bon ID.");
                }
            });
        }

        // Gérer la soumission du formulaire d'édition de profil
        function setupEditProfileForm() {
            document.getElementById('editProfileForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const userData = getUserData();
                if (!userData) return;
                
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                
                // Valider les mots de passe s'ils ont été saisis
                if (password && password !== confirmPassword) {
                    alert("Les mots de passe ne correspondent pas.");
                    return;
                }
                
                // Mettre à jour les informations utilisateur
                userData.firstName = firstName;
                userData.lastName = lastName;
                userData.email = email;
                userData.phone = phone;
                
                // Sauvegarder les données mises à jour
                saveUserData(userData);
                
                // Mettre à jour l'affichage
                updateProfileDisplay();
                
                // Fermer la modal
                document.getElementById('editProfileModal').style.display = 'none';
                
                alert("Profil mis à jour avec succès !");
            });
        }

        // Déconnexion de l'utilisateur
        function logout() {
            if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
                // Rediriger vers la page de connexion
                window.location.href = "connexion.html";
            }
        }

        // Initialiser la page
        document.addEventListener('DOMContentLoaded', function() {
            // Vérifier si l'utilisateur est connecté
            if (!checkUserLoggedIn()) return;
            
            // Initialiser les données utilisateur
            initializeUserData();
            
            // Mettre à jour l'affichage du profil
            updateProfileDisplay();
            
            // Mettre à jour les retraits en direct
            updateLiveWithdrawals();
            
            // Configurer les gestionnaires d'événements
            setupDepositForm();
            setupWithdrawalForm();
            setupEditProfileForm();
            
            // Gérer le bouton de dépôt
            document.getElementById('depositBtn').addEventListener('click', function() {
                openDepositModal();
            });
            
            // Gérer les boutons de retrait
            document.getElementById('withdrawService').addEventListener('click', function() {
                if (!this.disabled) {
                    openWithdrawalModal('service');
                }
            });
            
            document.getElementById('withdrawReferral').addEventListener('click', function() {
                if (!this.disabled) {
                    openWithdrawalModal('referral');
                }
            });
            
            // Gérer le bouton d'édition de profil
            document.getElementById('editProfileBtn').addEventListener('click', function(e) {
                e.preventDefault();
                openEditProfileModal();
            });
            
            // Gérer le bouton de copie de lien
            document.getElementById('copyLink').addEventListener('click', copyReferralLink);
            
            // Gérer les boutons de partage
            document.getElementById('shareWhatsapp').addEventListener('click', function() {
                shareReferralLink('whatsapp');
            });
            
            document.getElementById('shareFacebook').addEventListener('click', function() {
                shareReferralLink('facebook');
            });
            
            document.getElementById('shareTelegram').addEventListener('click', function() {
                shareReferralLink('telegram');
            });
            
            // Gérer le bouton de déconnexion
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
            
            // Fermer les modals
            document.getElementById('closeDepositModal').addEventListener('click', function() {
                document.getElementById('depositModal').style.display = 'none';
            });
            
            document.getElementById('closeWithdrawalModal').addEventListener('click', function() {
                document.getElementById('withdrawalModal').style.display = 'none';
            });
            
            document.getElementById('closeEditModal').addEventListener('click', function() {
                document.getElementById('editProfileModal').style.display = 'none';
            });
            
            document.getElementById('cancelEdit').addEventListener('click', function() {
                document.getElementById('editProfileModal').style.display = 'none';
            });
            
            // Fermer en cliquant à l'extérieur
            window.addEventListener('click', function(event) {
                if (event.target === document.getElementById('depositModal')) {
                    document.getElementById('depositModal').style.display = 'none';
                }
                if (event.target === document.getElementById('withdrawalModal')) {
                    document.getElementById('withdrawalModal').style.display = 'none';
                }
                if (event.target === document.getElementById('editProfileModal')) {
                    document.getElementById('editProfileModal').style.display = 'none';
                }
            });
            
            // Navigation mobile
            document.querySelector('.nav-toggle').addEventListener('click', function() {
                document.querySelector('.nav-menu').classList.toggle('active');
            });
            
            // Mettre à jour les retraits en direct toutes les 10 secondes
            setInterval(updateLiveWithdrawals, 10000);
        });
    