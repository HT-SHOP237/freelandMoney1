    // Fonction pour mettre à jour le menu
function updateMenu() {
    const auth = checkAuth();
    const profileMenuItem = document.getElementById('profileMenuItem');
    const adminMenuItem = document.getElementById('adminMenuItem');
    const messagesMenuItem = document.getElementById('messagesMenuItem');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (auth.isLoggedIn) {
        // Afficher les onglets pour utilisateurs connectés
        if (profileMenuItem && auth.user) {
            profileMenuItem.style.display = 'block';
        }
        
        if (adminMenuItem && auth.isAdmin) {
            adminMenuItem.style.display = 'block';
        }
        
        if (messagesMenuItem) {
            messagesMenuItem.style.display = 'block';
        }
        
        // Changer le bouton en "Déconnexion"
        if (authButtons) {
            authButtons.innerHTML = `
                <a href="#" class="btn btn-outline" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> Déconnexion
                </a>
            `;
            
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
        // Cacher les onglets pour utilisateurs non connectés
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
        // Sample data for demonstration
        const sampleUsers = [
            { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", referrals: 5, balance: 125000, status: "active", phone: "677123456" },
            { id: 2, name: "Marie Martin", email: "marie.martin@example.com", referrals: 3, balance: 85000, status: "active", phone: "677234567" },
            { id: 3, name: "Paul Bernard", email: "paul.bernard@example.com", referrals: 7, balance: 210000, status: "active", phone: "677345678" },
            { id: 4, name: "Sophie Petit", email: "sophie.petit@example.com", referrals: 2, balance: 45000, status: "active", phone: "677456789" },
            { id: 5, name: "Luc Durand", email: "luc.durand@example.com", referrals: 4, balance: 95000, status: "pending", phone: "677567890" },
            { id: 6, name: "Emma Laurent", email: "emma.laurent@example.com", referrals: 6, balance: 175000, status: "active", phone: "677678901" },
            { id: 7, name: "Thomas Moreau", email: "thomas.moreau@example.com", referrals: 1, balance: 35000, status: "inactive", phone: "677789012" },
            { id: 8, name: "Julie Lefebvre", email: "julie.lefebvre@example.com", referrals: 8, balance: 225000, status: "active", phone: "677890123" },
            { id: 9, name: "David Simon", email: "david.simon@example.com", referrals: 3, balance: 75000, status: "active", phone: "677901234" },
            { id: 10, name: "Sarah Michel", email: "sarah.michel@example.com", referrals: 5, balance: 125000, status: "active", phone: "677012345" }
        ];

        const sampleTransactions = [
            { id: "TX10001", date: "2023-10-15", user: "Jean Dupont", type: "deposit", amount: 50000, status: "completed" },
            { id: "TX10002", date: "2023-10-15", user: "Marie Martin", type: "withdrawal", amount: 25000, status: "pending" },
            { id: "TX10003", date: "2023-10-14", user: "Paul Bernard", type: "deposit", amount: 75000, status: "completed" },
            { id: "TX10004", date: "2023-10-14", user: "Sophie Petit", type: "bonus", amount: 3000, status: "completed" },
            { id: "TX10005", date: "2023-10-13", user: "Luc Durand", type: "withdrawal", amount: 35000, status: "completed" },
            { id: "TX10006", date: "2023-10-13", user: "Emma Laurent", type: "deposit", amount: 100000, status: "completed" },
            { id: "TX10007", date: "2023-10-12", user: "Thomas Moreau", type: "withdrawal", amount: 15000, status: "failed" },
            { id: "TX10008", date: "2023-10-12", user: "Julie Lefebvre", type: "deposit", amount: 60000, status: "completed" },
            { id: "TX10009", date: "2023-10-11", user: "David Simon", type: "bonus", amount: 3000, status: "completed" },
            { id: "TX10010", date: "2023-10-11", user: "Sarah Michel", type: "withdrawal", amount: 45000, status: "pending" }
        ];

        const sampleReferralStats = [
            { user: "Jean Dupont", referrals: 5, earnings: 7500, active: 4 },
            { user: "Marie Martin", referrals: 3, earnings: 4500, active: 2 },
            { user: "Paul Bernard", referrals: 7, earnings: 10500, active: 6 },
            { user: "Sophie Petit", referrals: 2, earnings: 3000, active: 1 },
            { user: "Luc Durand", referrals: 4, earnings: 6000, active: 3 },
            { user: "Emma Laurent", referrals: 6, earnings: 9000, active: 5 },
            { user: "Thomas Moreau", referrals: 1, earnings: 1500, active: 0 },
            { user: "Julie Lefebvre", referrals: 8, earnings: 12000, active: 7 },
            { user: "David Simon", referrals: 3, earnings: 4500, active: 2 },
            { user: "Sarah Michel", referrals: 5, earnings: 7500, active: 4 }
        ];

        // Function to generate a unique transaction ID
        function generateTransactionId(amount, type = 'deposit') {
            const prefix = type === 'deposit' ? 'DP' : 'WD';
            const timestamp = new Date().getTime().toString().slice(-6);
            const amountCode = Math.floor(amount / 1000).toString().padStart(4, '0');
            return `${prefix}${timestamp}${amountCode}`;
        }

        // Function to render users table
        function renderUsersTable(users = sampleUsers) {
            const container = document.getElementById('usersList');
            container.innerHTML = '';
            
            if (users.length === 0) {
                container.innerHTML = '<tr><td colspan="7" style="text-align: center;">Aucun utilisateur trouvé.</td></tr>';
                return;
            }
            
            users.forEach(user => {
                const row = document.createElement('tr');
                
                // Determine status badge class
                let statusClass = '';
                let statusText = '';
                
                if (user.status === 'active') {
                    statusClass = 'status-active';
                    statusText = 'Actif';
                } else if (user.status === 'pending') {
                    statusClass = 'status-pending';
                    statusText = 'En attente';
                } else {
                    statusClass = 'status-inactive';
                    statusText = 'Inactif';
                }
                
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.referrals}</td>
                    <td>${user.balance.toLocaleString()} FCFA</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td class="table-actions">
                        <button class="action-btn btn-view" data-user-id="${user.id}">
                            <i class="fas fa-eye"></i> Voir
                        </button>
                        <button class="action-btn btn-edit" data-user-id="${user.id}">
                            <i class="fas fa-edit"></i> Modifier
                        </button>
                        <button class="action-btn btn-delete" data-user-id="${user.id}">
                            <i class="fas fa-trash"></i> Supprimer
                        </button>
                    </td>
                `;
                
                container.appendChild(row);
            });
            
            // Add event listeners to action buttons
            document.querySelectorAll('.btn-view').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = this.getAttribute('data-user-id');
                    viewUser(userId);
                });
            });
            
            document.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = this.getAttribute('data-user-id');
                    editUser(userId);
                });
            });
            
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = this.getAttribute('data-user-id');
                    deleteUser(userId);
                });
            });
        }

        // Function to render transactions table
        function renderTransactionsTable(transactions = sampleTransactions) {
            const container = document.getElementById('transactionsList');
            container.innerHTML = '';
            
            if (transactions.length === 0) {
                container.innerHTML = '<tr><td colspan="6" style="text-align: center;">Aucune transaction trouvée.</td></tr>';
                return;
            }
            
            transactions.forEach(transaction => {
                const row = document.createElement('tr');
                
                // Determine status badge class
                let statusClass = '';
                let statusText = '';
                
                if (transaction.status === 'completed') {
                    statusClass = 'status-completed';
                    statusText = 'Complété';
                } else if (transaction.status === 'pending') {
                    statusClass = 'status-pending';
                    statusText = 'En attente';
                } else {
                    statusClass = 'status-inactive';
                    statusText = 'Échoué';
                }
                
                // Format date
                const formattedDate = new Date(transaction.date).toLocaleDateString('fr-FR');
                
                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${transaction.user}</td>
                    <td>${transaction.type === 'deposit' ? 'Dépôt' : transaction.type === 'withdrawal' ? 'Retrait' : 'Bonus'}</td>
                    <td>${transaction.amount.toLocaleString()} FCFA</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>${transaction.id}</td>
                `;
                
                container.appendChild(row);
            });
        }

        // Function to render referral stats table
        function renderReferralTable(stats = sampleReferralStats) {
            const container = document.getElementById('referralList');
            container.innerHTML = '';
            
            if (stats.length === 0) {
                container.innerHTML = '<tr><td colspan="4" style="text-align: center;">Aucune donnée de parrainage.</td></tr>';
                return;
            }
            
            stats.forEach(stat => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${stat.user}</td>
                    <td>${stat.referrals}</td>
                    <td>${stat.earnings.toLocaleString()} FCFA</td>
                    <td>${stat.active}</td>
                `;
                
                container.appendChild(row);
            });
        }

        // Function to populate user dropdown
        function populateUserDropdown() {
            const dropdown = document.getElementById('withdrawalUser');
            dropdown.innerHTML = '<option value="">Sélectionner un utilisateur</option>';
            
            sampleUsers.forEach(user => {
                if (user.status === 'active') {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = `${user.name} (${user.balance.toLocaleString()} FCFA)`;
                    dropdown.appendChild(option);
                }
            });
        }

        // Function to view user details
        function viewUser(userId) {
            const user = sampleUsers.find(u => u.id == userId);
            if (user) {
                alert(`Détails de l'utilisateur:\n\nNom: ${user.name}\nEmail: ${user.email}\nTéléphone: ${user.phone}\nFilleuls: ${user.referrals}\nSolde: ${user.balance.toLocaleString()} FCFA\nStatut: ${user.status}`);
            }
        }

        // Function to edit user
        function editUser(userId) {
            const user = sampleUsers.find(u => u.id == userId);
            if (user) {
                const newBalance = prompt(`Modifier le solde de ${user.name} (FCFA):`, user.balance);
                if (newBalance !== null && !isNaN(newBalance) && newBalance >= 0) {
                    user.balance = parseInt(newBalance);
                    renderUsersTable();
                    alert('Solde mis à jour avec succès!');
                }
            }
        }

        // Function to delete user
        function deleteUser(userId) {
            const user = sampleUsers.find(u => u.id == userId);
            if (user) {
                if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.name} ? Cette action est irréversible.`)) {
                    const index = sampleUsers.findIndex(u => u.id == userId);
                    sampleUsers.splice(index, 1);
                    renderUsersTable();
                    alert('Utilisateur supprimé avec succès!');
                }
            }
        }

        // Function to generate deposit ID
        function generateDepositId() {
            const amount = document.getElementById('depositAmount').value;
            const phone = document.getElementById('userPhone').value;
            
            if (!amount || amount < 1000) {
                alert('Veuillez entrer un montant valide (minimum 1000 FCFA)');
                return;
            }
            
            if (!phone || phone.length < 9) {
                alert('Veuillez entrer un numéro de téléphone valide');
                return;
            }
            
            const transactionId = generateTransactionId(amount, 'deposit');
            document.getElementById('depositIdValue').textContent = transactionId;
            document.getElementById('depositIdResult').style.display = 'block';
            
            // Add to transactions list
            sampleTransactions.unshift({
                id: transactionId,
                date: new Date().toISOString().split('T')[0],
                user: `Utilisateur (${phone})`,
                type: "deposit",
                amount: parseInt(amount),
                status: "pending"
            });
            
            renderTransactionsTable();
        }

        // Function to generate withdrawal ID
        function generateWithdrawalId() {
            const amount = document.getElementById('withdrawalAmount').value;
            const userId = document.getElementById('withdrawalUser').value;
            
            if (!amount || amount < 15000) {
                alert('Veuillez entrer un montant valide (minimum 15000 FCFA)');
                return;
            }
            
            if (!userId) {
                alert('Veuillez sélectionner un utilisateur');
                return;
            }
            
            const user = sampleUsers.find(u => u.id == userId);
            if (user && user.balance < amount) {
                alert(`Solde insuffisant. Solde disponible: ${user.balance.toLocaleString()} FCFA`);
                return;
            }
            
            const transactionId = generateTransactionId(amount, 'withdrawal');
            document.getElementById('withdrawalIdValue').textContent = transactionId;
            document.getElementById('withdrawalIdResult').style.display = 'block';
            
            // Add to transactions list
            sampleTransactions.unshift({
                id: transactionId,
                date: new Date().toISOString().split('T')[0],
                user: user.name,
                type: "withdrawal",
                amount: parseInt(amount),
                status: "pending"
            });
            
            renderTransactionsTable();
        }

        // Function to copy ID to clipboard
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('ID copié dans le presse-papier!');
            }).catch(err => {
                console.error('Erreur lors de la copie: ', err);
            });
        }

        // Function to search users
        function searchUsers(query) {
            if (!query) {
                renderUsersTable(sampleUsers);
                return;
            }
            
            const filteredUsers = sampleUsers.filter(user => 
                user.name.toLowerCase().includes(query.toLowerCase()) || 
                user.email.toLowerCase().includes(query.toLowerCase())
            );
            
            renderUsersTable(filteredUsers);
        }

        // Function to filter transactions
        function filterTransactions(type) {
            if (type === 'all') {
                renderTransactionsTable(sampleTransactions);
                return;
            }
            
            const filteredTransactions = sampleTransactions.filter(transaction => 
                transaction.type === type
            );
            
            renderTransactionsTable(filteredTransactions);
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Render initial data
            renderUsersTable();
            renderTransactionsTable();
            renderReferralTable();
            populateUserDropdown();
            
            // Set up event listeners
            document.getElementById('generateDepositId').addEventListener('click', generateDepositId);
            document.getElementById('generateWithdrawalId').addEventListener('click', generateWithdrawalId);
            document.getElementById('copyDepositId').addEventListener('click', function() {
                const id = document.getElementById('depositIdValue').textContent;
                copyToClipboard(id);
            });
            document.getElementById('copyWithdrawalId').addEventListener('click', function() {
                const id = document.getElementById('withdrawalIdValue').textContent;
                copyToClipboard(id);
            });
            document.getElementById('userSearch').addEventListener('input', function() {
                searchUsers(this.value);
            });
            document.getElementById('transactionFilter').addEventListener('change', function() {
                filterTransactions(this.value);
            });
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                    window.location.href = 'connexion.html';
                }
            });
            
            // Navigation mobile
            document.querySelector('.nav-toggle').addEventListener('click', function() {
                document.querySelector('.nav-menu').classList.toggle('active');
            });
            
            // Table sorting
            document.querySelectorAll('th[data-sort]').forEach(th => {
                th.addEventListener('click', function() {
                    const sortBy = this.getAttribute('data-sort');
                    alert(`Trier par ${sortBy} - Cette fonctionnalité sera implémentée prochainement`);
                });
            });
        });
    // Function to handle admin withdrawal
function setupAdminWithdrawal() {
    const withdrawalForm = document.getElementById('adminWithdrawalForm');
    const reasonSelect = document.getElementById('withdrawalReason');
    const otherReasonContainer = document.getElementById('otherReasonContainer');
    
    // Show/hide other reason field
    reasonSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherReasonContainer.style.display = 'block';
        } else {
            otherReasonContainer.style.display = 'none';
        }
    });
    
    // Handle form submission
    withdrawalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const account = document.getElementById('adminAccount').value;
        const password = document.getElementById('adminPassword').value;
        const amount = document.getElementById('adminWithdrawalAmount').value;
        const reason = document.getElementById('withdrawalReason').value;
        const otherReason = document.getElementById('otherReason').value;
        
        // Basic validation
        if (amount < 50000) {
            alert('Le montant minimum de retrait est de 50 000 FCFA');
            return;
        }
        
        if (reason === 'other' && !otherReason) {
            alert('Veuillez préciser le motif de votre retrait');
            return;
        }
        
        // In a real application, you would verify credentials with the server
        // For this demo, we'll simulate a successful withdrawal
        const withdrawalId = 'ADM-' + Date.now().toString().slice(-6) + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
        
        // Show success message
        document.getElementById('adminWithdrawalIdValue').textContent = `Retrait #${withdrawalId} de ${amount} FCFA effectué`;
        document.getElementById('adminWithdrawalResult').style.display = 'block';
        
        // Add to transactions list
        sampleTransactions.unshift({
            id: withdrawalId,
            date: new Date().toISOString().split('T')[0],
            user: "Administrateur",
            type: "admin_withdrawal",
            amount: parseInt(amount) * -1, // Negative amount for withdrawal
            status: "completed"
        });
        
        // Update transactions table
        renderTransactionsTable();
        
        // Reset form
        withdrawalForm.reset();
        otherReasonContainer.style.display = 'none';
        
        alert(`Retrait de ${amount} FCFA effectué avec succès! ID: ${withdrawalId}`);
    });
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Setup admin withdrawal functionality
    setupAdminWithdrawal();
    
    // ... existing code ...
});
 