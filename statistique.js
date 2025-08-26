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
   // Données des services (15 services comme dans la page services)
        const services = [
            { id: 1, name: "Éolienne Mini", price: 2000, dailyIncome: 300 },
            { id: 2, name: "Panneau Solaire 100W", price: 3000, dailyIncome: 375 },
            { id: 3, name: "Système Biogaz", price: 4000, dailyIncome: 450 },
            { id: 4, name: "Hydro-turbine", price: 5000, dailyIncome: 600 },
            { id: 5, name: "Éolienne Standard", price: 6000, dailyIncome: 750 },
            { id: 6, name: "Panneau Solaire 300W", price: 7000, dailyIncome: 900 },
            { id: 7, name: "Système Biogaz Pro", price: 8000, dailyIncome: 1200 },
            { id: 8, name: "Hydro-turbine Pro", price: 9000, dailyIncome: 1500 },
            { id: 9, name: "Parc Éolien", price: 10000, dailyIncome: 2250 },
            { id: 10, name: "Ferme Solaire", price: 12000, dailyIncome: 3000 },
            { id: 11, name: "Centrale Biogaz", price: 14000, dailyIncome: 3750 },
            { id: 12, name: "Centrale Hydroélectrique", price: 16000, dailyIncome: 4500 },
            { id: 13, name: "Parc Éolien Offshore", price: 18000, dailyIncome: 7500 },
            { id: 14, name: "Centrale Solaire Thermique", price: 19000, dailyIncome: 6000 },
            { id: 15, name: "Complexe Énergétique", price: 20000, dailyIncome: 15000 }
        ];

        // Générer des noms aléatoires
        function generateRandomName() {
            const firstNames = ['Jean', 'Marie', 'Paul', 'Alice', 'Pierre', 'Sophie', 'Luc', 'Emma', 'Thomas', 'Julie', 'David', 'Sarah', 'Michel', 'Nathalie', 'Alexandre'];
            const lastNames = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Moreau', 'Petit', 'Durand', 'Leroy', 'Morel', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'Thomas'];
            return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        }

        // Générer des pays aléatoires
        function generateRandomCountry() {
            const countries = ['Cameroun', 'France', 'Canada', 'Belgique', 'Suisse', 'Côte d\'Ivoire', 'Sénégal', 'Gabon', 'Algérie', 'Maroc', 'Tunisie', 'États-Unis', 'Royaume-Uni', 'Allemagne', 'Espagne'];
            return countries[Math.floor(Math.random() * countries.length)];
        }

        // Générer des données d'activité
        function generateActivityData(type, count) {
            const data = [];
            for (let i = 0; i < count; i++) {
                const name = generateRandomName();
                const country = generateRandomCountry();
                const service = services[Math.floor(Math.random() * services.length)];
                
                switch(type) {
                    case 'newUsers':
                        data.push({
                            name,
                            country,
                            time: `${Math.floor(Math.random() * 60)} min ago`
                        });
                        break;
                    case 'purchases':
                        data.push({
                            name,
                            service: service.name,
                            amount: service.price,
                            time: `${Math.floor(Math.random() * 60)} min ago`
                        });
                        break;
                    case 'withdrawals':
                        const amount = Math.floor(Math.random() * 50000) + 15000;
                        data.push({
                            name,
                            amount,
                            time: `${Math.floor(Math.random() * 60)} min ago`
                        });
                        break;
                }
            }
            return data;
        }

        // Générer des données de classement
        function generateRankingData(type, count) {
            const data = [];
            for (let i = 0; i < count; i++) {
                const name = generateRandomName();
                const country = generateRandomCountry();
                
                switch(type) {
                    case 'investors':
                        const profit = Math.floor(Math.random() * 500000) + 100000;
                        data.push({
                            rank: i + 1,
                            name,
                            profit
                        });
                        break;
                    case 'withdrawals':
                        const amount = Math.floor(Math.random() * 500000) + 50000;
                        data.push({
                            rank: i + 1,
                            name,
                            amount
                        });
                        break;
                    case 'services':
                        const service = services[i % services.length];
                        const purchases = Math.floor(Math.random() * 500) + 100;
                        data.push({
                            rank: i + 1,
                            name: service.name,
                            purchases
                        });
                        break;
                }
            }
            return data;
        }

        // Afficher les données d'activité
        function renderActivityData() {
            const newUsers = generateActivityData('newUsers', 10);
            const purchases = generateActivityData('purchases', 10);
            const withdrawals = generateActivityData('withdrawals', 10);
            
            const newUsersList = document.getElementById('newUsersList');
            const purchasesList = document.getElementById('recentPurchasesList');
            const withdrawalsList = document.getElementById('recentWithdrawalsList');
            
            newUsersList.innerHTML = '';
            purchasesList.innerHTML = '';
            withdrawalsList.innerHTML = '';
            
            // Afficher les nouveaux utilisateurs
            newUsers.forEach(user => {
                const item = document.createElement('div');
                item.className = 'activity-item';
                item.innerHTML = `
                    <div class="user-avatar">${user.name.charAt(0)}</div>
                    <div class="activity-info">
                        <div class="user-name">${user.name}</div>
                        <div class="activity-desc">${user.country} • ${user.time}</div>
                    </div>
                `;
                newUsersList.appendChild(item);
            });
            
            // Afficher les achats récents
            purchases.forEach(purchase => {
                const item = document.createElement('div');
                item.className = 'activity-item';
                item.innerHTML = `
                    <div class="user-avatar">${purchase.name.charAt(0)}</div>
                    <div class="activity-info">
                        <div class="user-name">${purchase.name}</div>
                        <div class="activity-desc">${purchase.service} • ${purchase.time}</div>
                    </div>
                    <div class="activity-amount">${purchase.amount.toLocaleString()} FCFA</div>
                `;
                purchasesList.appendChild(item);
            });
            
            // Afficher les retraits récents
            withdrawals.forEach(withdrawal => {
                const item = document.createElement('div');
                item.className = 'activity-item';
                item.innerHTML = `
                    <div class="user-avatar">${withdrawal.name.charAt(0)}</div>
                    <div class="activity-info">
                        <div class="user-name">${withdrawal.name}</div>
                        <div class="activity-desc">${withdrawal.time}</div>
                    </div>
                    <div class="activity-amount">${withdrawal.amount.toLocaleString()} FCFA</div>
                `;
                withdrawalsList.appendChild(item);
            });
        }

        // Afficher les données de classement
        function renderRankingData() {
            const topInvestors = generateRankingData('investors', 10);
            const topWithdrawals = generateRankingData('withdrawals', 20);
            const topServices = generateRankingData('services', 10);
            
            const investorsList = document.getElementById('topInvestorsList');
            const withdrawalsList = document.getElementById('topWithdrawalsList');
            const servicesList = document.getElementById('topServicesList');
            
            investorsList.innerHTML = '';
            withdrawalsList.innerHTML = '';
            servicesList.innerHTML = '';
            
            // Afficher le top des investisseurs
            topInvestors.forEach(investor => {
                const item = document.createElement('div');
                item.className = 'top-list-item';
                item.innerHTML = `
                    <div class="rank ${investor.rank <= 3 ? 'rank-' + investor.rank : ''}">${investor.rank}</div>
                    <div class="user-info">
                        <div class="user-name">${investor.name}</div>
                    </div>
                    <div class="user-amount">${investor.profit.toLocaleString()} FCFA</div>
                `;
                investorsList.appendChild(item);
            });
            
            // Afficher le top des retraits
            topWithdrawals.forEach(withdrawal => {
                const item = document.createElement('div');
                item.className = 'top-list-item';
                item.innerHTML = `
                    <div class="rank ${withdrawal.rank <= 3 ? 'rank-' + withdrawal.rank : ''}">${withdrawal.rank}</div>
                    <div class="user-info">
                        <div class="user-name">${withdrawal.name}</div>
                    </div>
                    <div class="user-amount">${withdrawal.amount.toLocaleString()} FCFA</div>
                `;
                withdrawalsList.appendChild(item);
            });
            
            // Afficher le top des services
            topServices.forEach(service => {
                const item = document.createElement('div');
                item.className = 'top-list-item';
                item.innerHTML = `
                    <div class="rank ${service.rank <= 3 ? 'rank-' + service.rank : ''}">${service.rank}</div>
                    <div class="user-info">
                        <div class="user-name">${service.name}</div>
                    </div>
                    <div class="user-amount">${service.purchases} achats</div>
                `;
                servicesList.appendChild(item);
            });
        }

        // Créer les graphiques
        function createCharts() {
            // Données pour le graphique des services populaires
            const servicesData = {
                labels: services.map(service => service.name),
                datasets: [{
                    label: 'Nombre d\'achats',
                    data: services.map(() => Math.floor(Math.random() * 500) + 100),
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(155, 89, 182, 0.7)',
                        'rgba(241, 196, 15, 0.7)',
                        'rgba(230, 126, 34, 0.7)',
                        'rgba(231, 76, 60, 0.7)',
                        'rgba(149, 165, 166, 0.7)',
                        'rgba(26, 188, 156, 0.7)',
                        'rgba(52, 73, 94, 0.7)',
                        'rgba(243, 156, 18, 0.7)',
                        'rgba(211, 84, 0, 0.7)',
                        'rgba(192, 57, 43, 0.7)',
                        'rgba(127, 140, 141, 0.7)',
                        'rgba(22, 160, 133, 0.7)',
                        'rgba(44, 62, 80, 0.7)'
                    ],
                    borderColor: [
                        'rgb(46, 204, 113)',
                        'rgb(52, 152, 219)',
                        'rgb(155, 89, 182)',
                        'rgb(241, 196, 15)',
                        'rgb(230, 126, 34)',
                        'rgb(231, 76, 60)',
                        'rgb(149, 165, 166)',
                        'rgb(26, 188, 156)',
                        'rgb(52, 73, 94)',
                        'rgb(243, 156, 18)',
                        'rgb(211, 84, 0)',
                        'rgb(192, 57, 43)',
                        'rgb(127, 140, 141)',
                        'rgb(22, 160, 133)',
                        'rgb(44, 62, 80)'
                    ],
                    borderWidth: 1
                }]
            };

            // Données pour le graphique des revenus
            const revenueLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
            const revenueData = {
                labels: revenueLabels,
                datasets: [{
                    label: 'Revenus (FCFA)',
                    data: revenueLabels.map(() => Math.floor(Math.random() * 10000000) + 5000000),
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    borderColor: 'rgb(46, 204, 113)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            };

            // Options communes pour les graphiques
            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString() + (this.id === 'y' ? ' FCFA' : '');
                            }
                        }
                    }
                }
            };

            // Créer le graphique des services
            const servicesCtx = document.getElementById('servicesChart').getContext('2d');
            new Chart(servicesCtx, {
                type: 'bar',
                data: servicesData,
                options: chartOptions
            });

            // Créer le graphique des revenus
            const revenueCtx = document.getElementById('revenueChart').getContext('2d');
            new Chart(revenueCtx, {
                type: 'line',
                data: revenueData,
                options: chartOptions
            });
        }

        // Mettre à jour les statistiques avec animation
        function updateStats() {
            const stats = [
                { id: 'totalUsers', min: 12000, max: 15000 },
                { id: 'totalServices', min: 8000, max: 10000 },
                { id: 'totalInvested', min: 180000000, max: 200000000 },
                { id: 'totalWithdrawn', min: 55000000, max: 60000000 }
            ];

            stats.forEach(stat => {
                const element = document.getElementById(stat.id);
                const currentValue = parseInt(element.textContent.replace(/,/g, ''));
                const newValue = Math.floor(Math.random() * (stat.max - stat.min + 1)) + stat.min;
                
                if (newValue !== currentValue) {
                    element.textContent = newValue.toLocaleString();
                    element.parentElement.classList.add('highlight');
                    setTimeout(() => {
                        element.parentElement.classList.remove('highlight');
                    }, 2000);
                }
            });
        }

        // Mettre à jour les données en direct
        function updateLiveData() {
            // Mettre à jour les activités
            renderActivityData();
            
            // Ajouter de nouvelles activités avec animation
            const lists = [
                document.getElementById('newUsersList'),
                document.getElementById('recentPurchasesList'),
                document.getElementById('recentWithdrawalsList')
            ];
            
            lists.forEach(list => {
                if (list.children.length > 0) {
                    list.children[0].classList.add('highlight');
                    setTimeout(() => {
                        list.children[0].classList.remove('highlight');
                    }, 2000);
                }
            });
            
            // Mettre à jour les statistiques
            updateStats();
        }

        // Initialiser la page
        document.addEventListener('DOMContentLoaded', function() {
            renderActivityData();
            renderRankingData();
            createCharts();
            
            // Mettre à jour les données toutes les 10 secondes
            setInterval(updateLiveData, 10000);
            
            // Navigation mobile
            document.querySelector('.nav-toggle').addEventListener('click', function() {
                document.querySelector('.nav-menu').classList.toggle('active');
            });
            
            // Gérer les boutons de période des graphiques
            document.querySelectorAll('.chart-controls button').forEach(button => {
                button.addEventListener('click', function() {
                    this.parentElement.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    // Ici, on pourrait recharger les données du graphique en fonction de la période sélectionnée
                });
            });
        });

       