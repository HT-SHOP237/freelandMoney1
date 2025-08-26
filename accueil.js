 
        // Toggle mobile navigation
        document.querySelector('.nav-toggle').addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
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
        
        // Generate random user data
        function generateRandomName() {
            const firstNames = ['Jean', 'Marie', 'Paul', 'Alice', 'Pierre', 'Sophie', 'Luc', 'Emma', 'Thomas', 'Julie', 'isac'];
            const lastNames = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Moreau', 'Petit', 'Durand', 'Leroy', 'Morel', 'Simon', 'florant'];
            return firstNames[Math.floor(Math.random() * firstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
        }
        
        function generateRandomAmount(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        // Countries with flags (pseudo-flags using background colors)
        const countries = [
            { name: 'Cameroun', flag: '🇨🇲' },
            { name: 'France', flag: '🇫🇷' },
            { name: 'Sénégal', flag: '🇸🇳' },
            { name: 'Côte d\'Ivoire', flag: '🇨🇮' },
            { name: 'Belgique', flag: '🇧🇪' },
            { name: 'Canada', flag: '🇨🇦' },
            { name: 'Maroc', flag: '🇲🇦' },
            { name: 'Tunisie', flag: '🇹🇳' },
            { name: 'Algérie', flag: '🇩🇿' },
            { name: 'Mali', flag: '🇲🇱' },
            { name: 'Bénin', flag: '🇧🇯' },
            { name: 'Togo', flag: '🇹🇬' },
            { name: 'Gabon', flag: '🇬🇦' },
            { name: 'RDC', flag: '🇨🇩' },
            { name: 'Guinée', flag: '🇬🇳' },
            { name: 'Burkina Faso', flag: '🇧🇫' },
            { name: 'Niger', flag: '🇳🇪' },
            { name: 'Tchad', flag: '🇹🇩' },
            { name: 'Rwanda', flag: '🇷🇼' },
            { name: 'Burundi', flag: '🇧🇮' },
            { name: 'Égypte', flag: '🇪🇬' },
            { name: 'Nigeria', flag: '🇳🇬' },
            { name: 'Ghana', flag: '🇬🇭' },
            { name: 'Kenya', flag: '🇰🇪' },
            { name: 'Afrique du Sud', flag: '🇿🇦' },
            { name: 'Angola', flag: '🇦🇴' },
            { name: 'Mozambique', flag: '🇲🇿' },
            { name: 'Ethiopie', flag: '🇪🇹' }
        ];
        
        // Generate testimonials
        const testimonialsGrid = document.getElementById('testimonialsGrid');
        
        for (let i = 0; i < 28; i++) {
            const country = countries[i % countries.length];
            const testimonial = document.createElement('div');
            testimonial.className = 'testimonial-card';
            
            testimonial.innerHTML = `
                <div class="testimonial-content">
                    "J'ai commencé avec un petit investissement et aujourd'hui je gagne plus de ${generateRandomAmount(50, 200)}.000 FCFA par mois. Une plateforme fiable et rentable !"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">${generateRandomName().charAt(0)}</div>
                    <div class="author-info">
                        <h4>${generateRandomName()}</h4>
                        <div class="author-country">
                            <span class="country-flag">${country.flag}</span>
                            ${country.name}
                        </div>
                    </div>
                </div>
            `;
            
            testimonialsGrid.appendChild(testimonial);
        }
        
        // Generate live user activity
        const userList = document.getElementById('userList');
        
        function updateUserList() {
            userList.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                const userItem = document.createElement('div');
                userItem.className = 'user-item';
                userItem.innerHTML = `
                    <span>${generateRandomName()}</span>
                    <span>+${generateRandomAmount(5, 20)}.000 FCFA</span>
                `;
                userList.appendChild(userItem);
            }
        }
        
        // Generate live withdrawal activity
        const withdrawalList = document.getElementById('withdrawalList');
        
        function updateWithdrawalList() {
            withdrawalList.innerHTML = '';
            for (let i = 0; i < 10; i++) {
                const withdrawalItem = document.createElement('div');
                withdrawalItem.className = 'withdrawal-item';
                withdrawalItem.innerHTML = `
                    <span>${generateRandomName()}</span>
                    <span>${generateRandomAmount(15, 100)}.000 FCFA</span>
                `;
                withdrawalList.appendChild(withdrawalItem);
            }
        }
        
        // Initial update
        updateUserList();
        updateWithdrawalList();
        
        // Update user list every 10 seconds
        setInterval(updateUserList, 10000);
        
        // Update withdrawal list every 20 seconds
        setInterval(updateWithdrawalList, 20000);
 

     // Données pour les graphiques
    const generateRandomData = (length, min, max) => {
        return Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };
    
    // Fonction pour dessiner un mini graphique
    const drawMiniChart = (canvasId, data, color) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Effacer le canvas
        ctx.clearRect(0, 0, width, height);
        
        // Calculer les points
        const maxValue = Math.max(...data);
        const minValue = Math.min(...data);
        const range = maxValue - minValue || 1;
        
        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - ((value - minValue) / range) * height;
            return { x, y };
        });
        
        // Dessiner la ligne
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Ajouter un dégradé sous la ligne
        ctx.lineTo(points[points.length - 1].x, height);
        ctx.lineTo(points[0].x, height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, color + '80');
        gradient.addColorStop(1, color + '20');
        
        ctx.fillStyle = gradient;
        ctx.fill();
    };
    
    // Initialiser les graphiques
    const connectionData = generateRandomData(15, 20, 80);
    const withdrawalData = generateRandomData(15, 10, 70);
    
    setTimeout(() => {
        drawMiniChart('connectionChartCanvas', connectionData, '#2ecc71');
        drawMiniChart('withdrawalChartCanvas', withdrawalData, '#3498db');
    }, 100);
    
    // Compteur de connexions horizontal
    let horizontalConnectionCount = 400;
    const tradingHorizontalConnection = document.getElementById('tradingHorizontalConnection');
    const connectionHorizontalChange = document.getElementById('connectionHorizontalChange');
    
    function updateHorizontalConnectionCounter() {
        const increment = Math.floor(Math.random() * 5) + 1; // Entre 1 et 5
        horizontalConnectionCount += increment;
        
        // Animation
        tradingHorizontalConnection.classList.add('value-up');
        connectionHorizontalChange.textContent = `+${increment}`;
        connectionHorizontalChange.classList.add('change-positive');
        
        setTimeout(() => {
            tradingHorizontalConnection.textContent = horizontalConnectionCount;
            tradingHorizontalConnection.classList.remove('value-up');
            connectionHorizontalChange.classList.remove('change-positive');
        }, 500);
        
        // Mise à jour des données du graphique
        connectionData.push(Math.floor(Math.random() * 60) + 20);
        connectionData.shift();
        drawMiniChart('connectionChartCanvas', connectionData, '#2ecc71');
        
        // Prochaine mise à jour dans 14 à 40 secondes
        const nextUpdate = Math.floor(Math.random() * 26000) + 14000;
        setTimeout(updateHorizontalConnectionCounter, nextUpdate);
    }
    
    // Compteur de retraits horizontal
    let horizontalWithdrawalCount = 200;
    const tradingHorizontalWithdrawal = document.getElementById('tradingHorizontalWithdrawal');
    const withdrawalHorizontalChange = document.getElementById('withdrawalHorizontalChange');
    
    function updateHorizontalWithdrawalCounter() {
        const increment = Math.floor(Math.random() * 10) + 5; // Entre 5 et 15
        horizontalWithdrawalCount += increment;
        
        // Réinitialisation après 2000
        if (horizontalWithdrawalCount > 2000) {
            horizontalWithdrawalCount = 200;
        }
        
        // Animation
        tradingHorizontalWithdrawal.classList.add('value-up');
        withdrawalHorizontalChange.textContent = `+${increment}`;
        withdrawalHorizontalChange.classList.add('change-positive');
        
        setTimeout(() => {
            tradingHorizontalWithdrawal.textContent = horizontalWithdrawalCount;
            tradingHorizontalWithdrawal.classList.remove('value-up');
            withdrawalHorizontalChange.classList.remove('change-positive');
        }, 500);
        
        // Mise à jour des données du graphique
        withdrawalData.push(Math.floor(Math.random() * 60) + 10);
        withdrawalData.shift();
        drawMiniChart('withdrawalChartCanvas', withdrawalData, '#3498db');
        
        // Prochaine mise à jour dans 10 secondes
        setTimeout(updateHorizontalWithdrawalCounter, 10000);
    }
    
    // Service populaire horizontal
    const services = ['Éolienne', 'Panneau Solaire', 'Voiture Électrique', 'Camion Écologique', 'Centrale Hydroélectrique'];
    const tradingHorizontalService = document.getElementById('tradingHorizontalService');
    const serviceHorizontalChange = document.getElementById('serviceHorizontalChange');
    let currentServiceIndex = 0;
    
    function updateHorizontalPopularService() {
        currentServiceIndex = (currentServiceIndex + 1) % services.length;
        
        // Animation
        tradingHorizontalService.classList.add('value-up');
        serviceHorizontalChange.textContent = `${Math.floor(Math.random() * 20) + 5}%`;
        serviceHorizontalChange.classList.add('change-positive');
        
        setTimeout(() => {
            tradingHorizontalService.textContent = services[currentServiceIndex];
            tradingHorizontalService.classList.remove('value-up');
            serviceHorizontalChange.classList.remove('change-positive');
            
            // Mettre à jour la barre de progression
            const progressValue = Math.floor(Math.random() * 40) + 40;
            document.querySelector('.progress-fill-horizontal').style.width = `${progressValue}%`;
            document.querySelector('.progress-text-horizontal').textContent = 
                `${progressValue}% des investissements`;
        }, 500);
        
        // Changement toutes les 60 secondes pendant 5 minutes
        setTimeout(updateHorizontalPopularService, 60000);
    }
    
    // Fonction pour alterner le service populaire toutes les 60 secondes pendant 5 minutes
    function startHorizontalServiceRotation() {
        // Arrêter après 5 minutes (300000 ms)
        setTimeout(() => {
            // Remettre le service le plus populaire (Éolienne)
            tradingHorizontalService.textContent = 'Éolienne';
            serviceHorizontalChange.textContent = '+12%';
            document.querySelector('.progress-fill-horizontal').style.width = '75%';
            document.querySelector('.progress-text-horizontal').textContent = '75% des investissements';
        }, 300000);
        
        // Changer toutes les 60 secondes
        const serviceInterval = setInterval(updateHorizontalPopularService, 60000);
    }
    
    // Démarrer tous les compteurs
    setTimeout(updateHorizontalConnectionCounter, 15000);
    setTimeout(updateHorizontalWithdrawalCounter, 10000);
    
    // Démarrer la rotation des services après 5 secondes
    setTimeout(startHorizontalServiceRotation, 5000);
 

    





     // Données des investisseurs
    const firstNames = ['Jean', 'Marie', 'Paul', 'Alice', 'Pierre', 'Sophie', 'Luc', 'Emma', 'Thomas', 'Julie', 'David', 'Sarah', 'Michel', 'Nathalie', 'Alexandre'];
    const lastNames = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Moreau', 'Petit', 'Durand', 'Leroy', 'Morel', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'Thomas'];
    const countrie = [
        { name: 'France', flag: '🇫🇷' },
        { name: 'Cameroun', flag: '🇨🇲' },
        { name: 'Sénégal', flag: '🇸🇳' },
        { name: 'Côte d\'Ivoire', flag: '🇨🇮' },
        { name: 'Belgique', flag: '🇧🇪' },
        { name: 'Canada', flag: '🇨🇦' },
        { name: 'Maroc', flag: '🇲🇦' },
        { name: 'Algérie', flag: '🇩🇿' },
        { name: 'Tunisie', flag: '🇹🇳' },
        { name: 'Mali', flag: '🇲🇱' }
    ];
    const service = ['Éolienne', 'Panneau Solaire', 'Voiture Électrique', 'Camion Écologique', 'Centrale Hydroélectrique', 'Biogaz', 'Géothermie'];
    
    // Générer des investisseurs aléatoires
    function generateRandomInvestors(count) {
        return Array.from({ length: count }, (_, i) => {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const country = countries[Math.floor(Math.random() * countries.length)];
            const service = services[Math.floor(Math.random() * services.length)];
            
            return {
                rank: i + 1,
                firstName,
                lastName,
                country,
                service,
                currentProfit: Math.floor(Math.random() * 50000) + 10000,
                totalProfit: Math.floor(Math.random() * 200000) + 50000,
                referrals: Math.floor(Math.random() * 50) + 5,
                withdrawals: Math.floor(Math.random() * 150000) + 20000
            };
        });
    }
    
   
     let investors = generateRandomInvestors(10);
    
    // Afficher les investisseurs dans le tableau
    function renderInvestorsTable() {
        const tableBody = document.getElementById('investorsTableBody');
        tableBody.innerHTML = '';
        
        investors.forEach(investor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="rank rank-${investor.rank}">${investor.rank}</td>
                <td>${investor.firstName} ${investor.lastName}</td>
                <td><span class="country-flag">${investor.country.flag}</span> ${investor.country.name}</td>
                <td>${investor.service}</td>
                <td class="profit-current">${formatCurrency(investor.currentProfit)} FCFA</td>
                <td class="profit-total">${formatCurrency(investor.totalProfit)} FCFA</td>
                <td class="referrals">${investor.referrals}</td>
                <td class="withdrawals">${formatCurrency(investor.withdrawals)} FCFA</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Formater les montants en devise
    function formatCurrency(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    
    // Mettre à jour les valeurs aléatoirement
    function updateInvestorsData() {
        investors.forEach((investor, index) => {
            // Générer des variations aléatoires (±5%)
            const variation = (Math.random() * 0.1) - 0.05;
            
            // Mettre à jour les profits en cours
            const currentProfitChange = Math.floor(investor.currentProfit * variation);
            investor.currentProfit += currentProfitChange;
            
            // Mettre à jour les profits totaux
            const totalProfitChange = Math.floor(investor.totalProfit * variation * 0.5);
            investor.totalProfit += totalProfitChange;
            
            // Mettre à jour les filleuls (occasionnellement)
            if (Math.random() < 0.2) {
                investor.referrals += Math.floor(Math.random() * 3);
            }
            
            // Mettre à jour les retraits (occasionnellement)
            if (Math.random() < 0.3) {
                const withdrawalChange = Math.floor(Math.random() * 10000);
                investor.withdrawals += withdrawalChange;
            }
            
            // Mettre en évidence la ligne modifiée
            highlightRow(index);
        });
        
        // Trier les investisseurs par profit total (décroissant)
        investors.sort((a, b) => b.totalProfit - a.totalProfit);
        
        // Mettre à jour les rangs
        investors.forEach((investor, index) => {
            investor.rank = index + 1;
        });
        
        // Re-rendre le tableau
        renderInvestorsTable();
    }
    
    // Fonction pour mettre en évidence une ligne
    function highlightRow(index) {
        const rows = document.querySelectorAll('#investorsTableBody tr');
        if (rows[index]) {
            rows[index].classList.add('highlight');
            setTimeout(() => {
                rows[index].classList.remove('highlight');
            }, 2000);
        }
    }
    
    // Initialiser le tableau
    renderInvestorsTable();
    
    // Mettre à jour les données toutes les 20 secondes
    setInterval(updateInvestorsData, 20000);


    
        // Variables globales
        let chart = null;
        let currentInterval = '1'; // 1 minute par défaut
        let currentChartType = 'line';
        let updateInterval = null;
        let eventInterval = null;
        
        // Données initiales
        const chartData = {
            datasets: [
                {
                    label: 'Revenus Totaux',
                    data: [],
                    borderColor: 'rgba(46, 204, 113, 0.8)',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    borderWidth: 3,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    fill: true,
                    tension: 0.1,
                },
                {
                    label: 'Prévisions',
                    data: [],
                    borderColor: 'rgba(241, 196, 15, 0.8)',
                    backgroundColor: 'rgba(241, 196, 15, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.1,
                }
            ]
        };
        
        // Générer des données de prix réalistes
        function generatePriceData(initialPrice, count, intervalMs, volatility) {
            const data = [];
            const now = Date.now();
            let currentPrice = initialPrice;
            
            for (let i = 0; i < count; i++) {
                const timestamp = now - (count - i) * intervalMs;
                
                // Modèle de marche aléatoire avec tendance légèrement haussière
                const changePercent = (Math.random() - 0.48) * volatility;
                currentPrice = currentPrice * (1 + changePercent);
                
                data.push({
                    x: timestamp,
                    y: currentPrice
                });
            }
            
            return data;
        }
        
        // Générer des données de prévision
        function generateForecastData(lastPrice, count, intervalMs) {
            const data = [];
            const now = Date.now();
            let forecastPrice = lastPrice;
            
            // Tendance basée sur la performance récente
            const recentTrend = Math.random() * 0.01 - 0.005;
            
            for (let i = 1; i <= count; i++) {
                const timestamp = now + i * intervalMs;
                
                // Variation avec tendance
                const changePercent = recentTrend + (Math.random() - 0.5) * 0.008;
                forecastPrice = forecastPrice * (1 + changePercent);
                
                data.push({
                    x: timestamp,
                    y: forecastPrice
                });
            }
            
            return data;
        }
        
        // Obtenir le nombre de millisecondes pour un intervalle
        function getIntervalMilliseconds(interval) {
            const intervals = {
                '1': 60 * 1000,        // 1 minute
                '5': 5 * 60 * 1000,    // 5 minutes
                '15': 15 * 60 * 1000,  // 15 minutes
                '30': 30 * 60 * 1000,  // 30 minutes
                '60': 60 * 60 * 1000,  // 1 heure
                '240': 4 * 60 * 60 * 1000, // 4 heures
                'daily': 24 * 60 * 60 * 1000, // 1 jour
                'weekly': 7 * 24 * 60 * 60 * 1000 // 1 semaine
            };
            return intervals[interval] || 60000;
        }
        
        // Obtenir le nombre de points de données pour un intervalle
        function getDataPointCount(interval) {
            const dataPoints = {
                '1': 120,    // 2 heures de données (1 minute interval)
                '5': 144,    // 12 heures de données (5 minutes interval)
                '15': 96,    // 24 heures de données (15 minutes interval)
                '30': 96,    // 48 heures de données (30 minutes interval)
                '60': 168,   // 7 jours de données (1 hour interval)
                '240': 90,   // 15 jours de données (4 hours interval)
                'daily': 90, // 3 mois de données (daily interval)
                'weekly': 52 // 1 an de données (weekly interval)
            };
            return dataPoints[interval] || 100;
        }
        
        // Obtenir l'unité de temps en fonction de l'intervalle
        function getTimeUnit() {
            const intervals = {
                '1': 'minute', '5': 'minute', '15': 'minute', '30': 'minute',
                '60': 'hour', '240': 'hour', 'daily': 'day', 'weekly': 'week'
            };
            return intervals[currentInterval] || 'minute';
        }
        
        // Initialiser le graphique
        function initChart() {
            const ctx = document.getElementById('tradingChart').getContext('2d');
            
            // Configuration du graphique
            const config = {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            external: function(context) {
                                showCustomTooltip(context);
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: getTimeUnit(),
                                displayFormats: {
                                    minute: 'HH:mm',
                                    hour: 'HH:mm',
                                    day: 'MMM dd',
                                    week: 'MMM yyyy'
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 20
                            }
                        },
                        y: {
                            position: 'right',
                            grid: {
                                color: 'rgba(255, 255, 255, 0.05)'
                            },
                            ticks: {
                                color: '#000',
                                callback: function(value) {
                                    return value.toLocaleString() + ' FCFA';
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index',
                        axis: 'x'
                    },
                    elements: {
                        point: {
                            hoverBackgroundColor: '#2ecc71',
                            hoverBorderColor: '#fff',
                            hoverBorderWidth: 2
                        }
                    },
                    animation: {
                        duration: 0
                    },
                    hover: {
                        animation: {
                            duration: 0
                        }
                    }
                }
            };
            
            // Créer le graphique
            chart = new Chart(ctx, config);
            
            // Charger les données initiales
            loadDataForInterval(currentInterval);
            
            // Configurer les événements de souris
            setupChartInteractions();
        }
        
        // Charger les données pour un intervalle spécifique
        function loadDataForInterval(interval) {
            currentInterval = interval;
            const intervalMs = getIntervalMilliseconds(interval);
            const dataPoints = getDataPointCount(interval);
            
            // Générer des données de prix
            const initialPrice = 400000 + Math.random() * 50000;
            const priceData = generatePriceData(initialPrice, dataPoints, intervalMs, 0.005);
            
            // Générer des prévisions
            const lastPrice = priceData[priceData.length - 1].y;
            const forecastData = generateForecastData(lastPrice, 20, intervalMs);
            
            // Mettre à jour les données du graphique
            chart.data.datasets[0].data = priceData;
            chart.data.datasets[1].data = forecastData;
            
            // Mettre à jour l'échelle de temps
            chart.options.scales.x.time.unit = getTimeUnit();
            
            // Mettre à jour le graphique
            chart.update();
            
            // Mettre à jour les indicateurs
            updateIndicators(priceData);
            updateCurrentValue();
            
            // Redémarrer les intervalles de mise à jour
            restartIntervals();
        }
        
        // Mettre à jour la valeur courante affichée
        function updateCurrentValue() {
            const priceData = chart.data.datasets[0].data;
            if (priceData.length === 0) return;
            
            const currentValue = priceData[priceData.length - 1].y;
            document.getElementById('currentValue').textContent = Math.round(currentValue).toLocaleString() + ' FCFA';
            
            // Mettre à jour les dates de période
            updatePeriodDates(priceData);
        }
        
        // Mettre à jour les dates de la période affichée
        function updatePeriodDates(priceData) {
            if (priceData.length < 2) return;
            
            const startDate = new Date(priceData[0].x);
            const endDate = new Date(priceData[priceData.length - 1].x);
            
            const formatOptions = { month: 'short', day: 'numeric' };
            const startStr = startDate.toLocaleDateString('fr-FR', formatOptions);
            const endStr = endDate.toLocaleDateString('fr-FR', formatOptions);
            const yearStr = endDate.getFullYear();
            
            document.getElementById('periodDates').textContent = `${startStr} - ${endStr} ${yearStr}`;
        }
        
        // Mettre à jour les indicateurs techniques
        function updateIndicators(priceData) {
            if (priceData.length === 0) return;
            
            // Calculer les valeurs les plus récentes
            const values = priceData.map(point => point.y);
            const currentValue = values[values.length - 1];
            const periodStartValue = values[0];
            
            // Calculer la variation
            const change = ((currentValue - periodStartValue) / periodStartValue) * 100;
            const changeElement = document.getElementById('periodChange');
            
            changeElement.textContent = (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
            changeElement.className = change >= 0 ? 'value positive' : 'value negative';
            
            // Calculer le plus haut et le plus bas
            const periodHigh = Math.max(...values);
            const periodLow = Math.min(...values);
            
            document.getElementById('periodHigh').textContent = Math.round(periodHigh).toLocaleString() + ' FCFA';
            document.getElementById('periodLow').textContent = Math.round(periodLow).toLocaleString() + ' FCFA';
            
            // Mettre à jour le statut du marché
            const marketStatus = document.querySelector('.status-bull');
            if (change >= 0) {
                marketStatus.textContent = '🐂 Tendance Haussière';
                marketStatus.className = 'status-bull';
            } else {
                marketStatus.textContent = '🐻 Tendance Baissière';
                marketStatus.className = 'status-bear';
            }
            
            // Mettre à jour le volume (aléatoire)
            const volume = Math.round(200000 + Math.random() * 100000);
            document.getElementById('marketVolume').textContent = `Volume: ${(volume / 1000).toFixed(1)}K`;
            
            // Mettre à jour le volume total (aléatoire)
            const totalVolume = 22562890 + Math.floor(Math.random() * 50000);
            document.getElementById('totalVolume').textContent = totalVolume.toLocaleString() + ' FCFA';
        }
        
        // Afficher un tooltip personnalisé
        function showCustomTooltip(context) {
            const tooltip = document.getElementById('chartTooltip');
            const tooltipModel = context.tooltip;
            
            if (tooltipModel.opacity === 0) {
                tooltip.style.opacity = 0;
                return;
            }
            
            // Obtenir les données du point survolé
            const dataPoint = tooltipModel.dataPoints[0];
            const value = dataPoint.raw.y;
            const timestamp = dataPoint.raw.x;
            
            // Calculer le changement depuis le point précédent
            const dataset = chart.data.datasets[dataPoint.datasetIndex];
            const dataIndex = dataPoint.dataIndex;
            let change = 0;
            let changePercent = 0;
            
            if (dataIndex > 0) {
                const prevValue = dataset.data[dataIndex - 1].y;
                change = value - prevValue;
                changePercent = (change / prevValue) * 100;
            }
            
            // Formater la date
            const date = new Date(timestamp);
            const timeStr = date.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit'
            });
            const dateStr = date.toLocaleDateString('fr-FR', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
            
            // Mettre à jour le contenu du tooltip
            tooltip.innerHTML = `
                <div class="time">${timeStr} • ${dateStr}</div>
                <div class="value">${Math.round(value).toLocaleString()} FCFA</div>
                <div class="change ${change >= 0 ? 'positive' : 'negative'}">
                    ${change >= 0 ? '+' : ''}${change.toFixed(0)} (${change >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)
                </div>
            `;
            
            // Positionner le tooltip
            const position = chart.canvas.getBoundingClientRect();
            tooltip.style.left = position.left + tooltipModel.caretX + 'px';
            tooltip.style.top = position.top + tooltipModel.caretY - 100 + 'px';
            tooltip.style.opacity = 1;
            
            // Afficher les lignes de repère
            showGuideLines(tooltipModel.caretX, tooltipModel.caretY);
        }
        
        // Afficher les lignes de repère
        function showGuideLines(x, y) {
            const horizontalLine = document.getElementById('horizontalLine');
            const verticalLine = document.getElementById('verticalLine');
            
            horizontalLine.style.top = y + 'px';
            horizontalLine.style.display = 'block';
            
            verticalLine.style.left = x + 'px';
            verticalLine.style.display = 'block';
        }
        
        // Cacher les lignes de repère
        function hideGuideLines() {
            document.getElementById('horizontalLine').style.display = 'none';
            document.getElementById('verticalLine').style.display = 'none';
        }
        
        // Configurer les interactions du graphique
        function setupChartInteractions() {
            const canvas = document.getElementById('tradingChart');
            
            // Événements de souris pour le tooltip
            canvas.addEventListener('mousemove', function(e) {
                const points = chart.getElementsAtEventForMode(e, 'index', { intersect: false }, true);
                if (points.length) {
                    canvas.style.cursor = 'crosshair';
                } else {
                    canvas.style.cursor = 'default';
                    hideGuideLines();
                    document.getElementById('chartTooltip').style.opacity = 0;
                }
            });
            
            canvas.addEventListener('mouseleave', function() {
                hideGuideLines();
                document.getElementById('chartTooltip').style.opacity = 0;
            });
        }
        
        // Ajouter une alerte de trading
        function addTradingAlert(message, isBullish) {
            const alertsContainer = document.getElementById('tradingAlerts');
            const alert = document.createElement('div');
            alert.className = `alert ${isBullish ? 'bull' : 'bear'}`;
            
            const time = new Date().toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            alert.innerHTML = `
                <span class="time">${time}</span>
                <span class="message">${message}</span>
            `;
            
            alertsContainer.appendChild(alert);
            
            // Limiter à 5 alertes maximum
            if (alertsContainer.children.length > 5) {
                alertsContainer.removeChild(alertsContainer.children[0]);
            }
            
            // Supprimer l'alerte après 10 secondes
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.style.opacity = '0';
                    setTimeout(() => alert.remove(), 500);
                }
            }, 10000);
        }
        
        // Simuler des événements de trading
        function simulateTradingEvents() {
            const events = [
                "Pic de demande sur les éoliennes → +2.3%",
                "Nouveaux investisseurs enregistrés → Volume +15%",
                "Panneaux solaires en hausse → +1.8%",
                "Correction technique → -1.2%",
                "Forte demande → Résistance testée",
                "Support consolidé → Rebond attendu"
            ];
            
            const isBullish = Math.random() > 0.4;
            const message = events[Math.floor(Math.random() * events.length)];
            
            addTradingAlert(message, isBullish);
        }
        
        // Mettre à jour les données en temps réel
        function updateRealtimeData() {
            const intervalMs = getIntervalMilliseconds(currentInterval);
            const priceData = chart.data.datasets[0].data;
            
            if (priceData.length === 0) return;
            
            // Obtenir le dernier prix
            const lastPrice = priceData[priceData.length - 1].y;
            
            // Générer un nouveau point avec une variation aléatoire
            const changePercent = (Math.random() - 0.5) * 0.01;
            const newPrice = lastPrice * (1 + changePercent);
            const newTimestamp = Date.now();
            
            // Ajouter le nouveau point
            priceData.push({
                x: newTimestamp,
                y: newPrice
            });
            
            // Générer de nouvelles prévisions
            const forecastData = generateForecastData(newPrice, 20, intervalMs);
            chart.data.datasets[1].data = forecastData;
            
            // Limiter le nombre de points affichés
            const maxPoints = getDataPointCount(currentInterval);
            if (priceData.length > maxPoints) {
                chart.data.datasets[0].data = priceData.slice(-maxPoints);
            }
            
            // Mettre à jour le graphique
            chart.update('none');
            
            // Mettre à jour les indicateurs
            updateIndicators(chart.data.datasets[0].data);
            updateCurrentValue();
            
            // Occasionnellement, simuler un événement de trading
            if (Math.random() < 0.1) {
                simulateTradingEvents();
            }
        }
        
        // Redémarrer les intervalles de mise à jour
        function restartIntervals() {
            // Arrêter les intervalles existants
            if (updateInterval) clearInterval(updateInterval);
            if (eventInterval) clearInterval(eventInterval);
            
            // Déterminer la vitesse de mise à jour en fonction de l'intervalle
            let updateSpeed = 2000; // 2 secondes par défaut
            
            if (['daily', 'weekly'].includes(currentInterval)) {
                updateSpeed = 5000; // 5 secondes pour les intervalles longs
            }
            
            // Démarrer de nouveaux intervalles
            updateInterval = setInterval(updateRealtimeData, updateSpeed);
            eventInterval = setInterval(simulateTradingEvents, 15000);
        }
        
        // Initialiser le graphique quand la page est chargée
        document.addEventListener('DOMContentLoaded', function() {
            initChart();
            
            // Configurer les boutons d'intervalle
            document.querySelectorAll('.time-filter').forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.time-filter').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    const interval = this.getAttribute('data-interval');
                    loadDataForInterval(interval);
                });
            });
            
            // Configurer les boutons de type de graphique
            document.querySelectorAll('.chart-type').forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.chart-type').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    currentChartType = this.getAttribute('data-type');
                    // Pour l'instant, nous gardons le type ligne
                    // Vous pourriez implémenter le changement vers les chandeliers ici
                });
            });
            
            // Démarrer les intervalles de mise à jour
            restartIntervals();
            
            // Redimensionner le graphique lorsque la fenêtre change de taille
            window.addEventListener('resize', function() {
                if (chart) {
                    chart.resize();
                }
            });
        });
 
       