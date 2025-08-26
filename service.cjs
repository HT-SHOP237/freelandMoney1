   // Toggle mobile navigation
document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
});


    
    // Enregistrement explicite des plugins
    if (typeof Chart !== 'undefined' && Chart.Zoom) {
        Chart.register(Chart.Zoom);
    }
    
    // Configuration des plugins Chart.js
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    }

    // Variables globales
    let serviceChart = null;
    const services = [
        {
            id: 1,
            name: "Éolienne Mini",
            image: "https://images.unsplash.com/photo-1494819681592-4e4b6d4e4c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Petite éolienne domestique pour production d'énergie verte.",
            features: ["Production: 2 KW/jour", "Génère: 200-400 FCFA/jour", "Entretien inclus", "Durée: 30 jours"],
            price: 2000,
            baseDailyIncome: 300,
            volatility: 0.25
        },
        {
            id: 2,
            name: "Panneau Solaire 100W",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Panneau solaire pour production d'énergie résidentielle.",
            features: ["Production: 0.5 KW/jour", "Génère: 250-500 FCFA/jour", "Installation incluse", "Durée: 30 jours"],
            price: 3000,
            baseDailyIncome: 375,
            volatility: 0.22
        },
        {
            id: 3,
            name: "Système Biogaz",
            image: "https://images.unsplash.com/photo-1589923188937-cb64779f4abe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Production de biogaz à partir de déchets organiques.",
            features: ["Production: 5 m³/jour", "Génère: 300-600 FCFA/jour", "Écologique", "Durée: 30 jours"],
            price: 4000,
            baseDailyIncome: 450,
            volatility: 0.20
        },
        {
            id: 4,
            name: "Hydro-turbine",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Petite turbine hydroélectrique pour cours d'eau.",
            features: ["Production: 3 KW/jour", "Génère: 400-800 FCFA/jour", "Installation incluse", "Durée: 30 jours"],
            price: 5000,
            baseDailyIncome: 600,
            volatility: 0.18
        },
        {
            id: 5,
            name: "Éolienne Standard",
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Éolienne standard pour production d'énergie moyenne.",
            features: ["Production: 5 KW/jour", "Génère: 500-1000 FCFA/jour", "Entretien inclus", "Durée: 30 jours"],
            price: 6000,
            baseDailyIncome: 750,
            volatility: 0.16
        },
        {
            id: 6,
            name: "Panneau Solaire 300W",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Panneau solaire haute performance pour production moyenne.",
            features: ["Production: 1.5 KW/jour", "Génère: 600-1200 FCFA/jour", "Installation incluse", "Durée: 30 jours"],
            price: 7000,
            baseDailyIncome: 900,
            volatility: 0.15
        },
        {
            id: 7,
            name: "Système Biogaz Pro",
            image: "https://images.unsplash.com/photo-1589923188937-cb64779f4abe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Système biogaz professionnel pour production à moyenne échelle.",
            features: ["Production: 15 m³/jour", "Génère: 800-1600 FCFA/jour", "Écologique", "Durée: 30 jours"],
            price: 8000,
            baseDailyIncome: 1200,
            volatility: 0.14
        },
        {
            id: 8,
            name: "Hydro-turbine Pro",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Turbine hydroélectrique professionnelle pour production importante.",
            features: ["Production: 8 KW/jour", "Génère: 1000-2000 FCFA/jour", "Installation incluse", "Durée: 30 jours"],
            price: 9000,
            baseDailyIncome: 1500,
            volatility: 0.13
        },
        {
            id: 9,
            name: "Parc Éolien",
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Participation dans un parc éolien pour production à grande échelle.",
            features: ["Production: 15 KW/jour", "Génère: 1500-3000 FCFA/jour", "Entretien inclus", "Durée: 30 jours"],
            price: 10000,
            baseDailyIncome: 2250,
            volatility: 0.12
        },
        {
            id: 10,
            name: "Ferme Solaire",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Participation dans une ferme solaire pour production à grande échelle.",
            features: ["Production: 20 KW/jour", "Génère: 2000-4000 FCFA/jour", "Installation incluse", "Durée: 30 jours"],
            price: 12000,
            baseDailyIncome: 3000,
            volatility: 0.11
        },
        {
            id: 11,
            name: "Centrale Biogaz",
            image: "https://images.unsplash.com/photo-1589923188937-cb64779f4abe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Participation dans une centrale biogaz industrielle.",
            features: ["Production: 50 m³/jour", "Génère: 2500-5000 FCFA/jour", "Écologique", "Durée: 30 jours"],
            price: 14000,
            baseDailyIncome: 3750,
            volatility: 0.10
        },
        {
            id: 12,
            name: "Centrale Hydroélectrique",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Participation dans une centrale hydroélectrique professionnelle.",
            features: ["Production: 30 KW/jour", "Génère: 3000-6000 FCFA/jour", "Installation incluse", "Durée: 30 jours"],
            price: 16000,
            baseDailyIncome: 4500,
            volatility: 0.09
        },
        {
            id: 13,
            name: "Parc Éolien Offshore",
            image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Participation dans un parc éolien offshore pour production maximale.",
            features: ["Production: 50 KW/jour", "Génère: 5000-10000 FCFA/jour", "Entretien inclus", "Durée: 30 jours"],
            price: 18000,
            baseDailyIncome: 7500,
            volatility: 0.08
        },
        {
            id: 14,
            name: "Centrale Solaire Thermique",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Participation dans une centrale solaire thermique à concentration.",
            features: ["Production: 40 KW/jour", "Génère: 4000-8000 FCFA/jour", "Installation incluse", "Durée: 30 jours"],
            price: 19000,
            baseDailyIncome: 6000,
            volatility: 0.075
        },
        {
            id: 15,
            name: "Complexe Énergétique",
            image: "https://images.unsplash.com/photo-1494819681592-4e4b6d4e4c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Participation dans un complexe énergétique multi-sources.",
            features: ["Production: 100 KW/jour", "Génère: 10000-20000 FCFA/jour", "Toutes technologies", "Durée: 30 jours"],
            price: 20000,
            baseDailyIncome: 15000,
            volatility: 0.07
        }
    ];

    // Données des transactions (simulation)
    const transactionIds = {
        "2000": "TX2000ABC123",
        "3000": "TX3000DEF456",
        "4000": "TX4000GHI789",
        "5000": "TX5000JKL012",
        "6000": "TX6000MNO345",
        "7000": "TX7000PQR678",
        "8000": "TX8000STU901",
        "9000": "TX9000VWX234",
        "10000": "TX10000YZA567",
        "12000": "TX12000BCD890",
        "14000": "TX14000EFG123",
        "16000": "TX16000HIJ456",
        "18000": "TX18000KLM789",
        "19000": "TX19000NOP012",
        "20000": "TX20000QRS345"
    };

    // Données des investisseurs (simulation)
    let topInvestors = [];
    //fonction pour verifier si l'utilisateur est connecté
    function checkAuth(){
        const userData =localStorage.getItem('userData');
        const adminData =localStorage.getItem('useradminData');
         return{
            isLoggedIn: !!userData || !!adminData,
            isAdmin: !!adminData,
            user: userData ? JSON.parse(userData) : null,
            admin: adminData ? JSON.parse(adminData) : null,
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

    
    // Générer des noms aléatoires
    function generateRandomName() {
        const firstNames = ['Jean', 'Marie', 'Paul', 'Alice', 'Pierre', 'Sophie', 'Luc', 'Emma', 'Thomas', 'Julie', 'David', 'Sarah', 'Michel', 'Nathalie', 'Alexandre'];
        const lastNames = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Moreau', 'Petit', 'Durand', 'Leroy', 'Morel', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'Thomas'];
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    }
    
    // Générer les investisseurs du top
    function generateTopInvestors() {
        topInvestors = [];
        for (let i = 0; i < 5; i++) {
            const service = services[Math.floor(Math.random() * services.length)];
            const profit = Math.floor(Math.random() * 50000) + 10000;
            
            topInvestors.push({
                rank: i + 1,
                name: generateRandomName(),
                service: service.name,
                profit: profit
            });
        }
        
        // Trier par profit décroissant
        topInvestors.sort((a, b) => b.profit - a.profit);
        
        // Mettre à jour l'affichage
        renderTopInvestors();
    }
    
    // Afficher les investisseurs du top
    function renderTopInvestors() {
        const container = document.getElementById('topInvestorsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        topInvestors.forEach(investor => {
            const investorCard = document.createElement('div');
            investorCard.className = 'investor-card';
            
            investorCard.innerHTML = `
                <div class="investor-rank">#${investor.rank}</div>
                <div class="investor-info">
                    <div class="investor-name">${investor.name}</div>
                    <div class="investor-service">${investor.service}</div>
                    <div class="investor-profit">${investor.profit.toLocaleString()} FCFA</div>
                </div>
            `;
            
            container.appendChild(investorCard);
        });
    }
    
    // Générer les cartes de services
    function renderServices() {
        const servicesContainer = document.getElementById('servicesContainer');
        if (!servicesContainer) return;
        
        servicesContainer.innerHTML = '';
        
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            
            serviceCard.innerHTML = `
                <div class="service-badge">30 jours</div>
                <div class="service-image">
                    <img src="${service.image}" alt="${service.name}">
                </div>
                <div class="service-content">
                    <h3>${service.name}</h3>
                    <p class="service-description">${service.description}</p>
                    <ul class="service-features">
                        ${service.features.map(feature => `<li><i class="fas fa-check-circle"></i> ${feature}</li>`).join('')}
                    </ul>
                    <div class="service-price">${service.price.toLocaleString()} FCFA</div>
                    <div class="service-actions">
                        <a href="#" class="btn-service btn-buy" data-service-id="${service.id}">Acheter</a>
                        <a href="#" class="btn-service btn-graph" data-service-id="${service.id}">Voir graphique</a>
                    </div>
                </div>
            `;
            
            servicesContainer.appendChild(serviceCard);
        });
        
         
      // Ajouter les écouteurs d'événements pour les boutons d'achat
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceId = this.getAttribute('data-service-id');
        openPaymentModal(serviceId);
    });
});
        // Ajouter les écouteurs d'événements pour les boutons de graphique
        document.querySelectorAll('.btn-graph').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceId = this.getAttribute('data-service-id');
                openGraphModal(serviceId);
            });
        });
    }
    
   // Ajouter les écouteurs d'événements pour les boutons d'achat
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const serviceId = this.getAttribute('data-service-id');
        openPaymentModal(serviceId); // ← Appel direct, la vérification se fait dans openPaymentModal
    });
});

// Ouvrir la modal de paiement AVEC VÉRIFICATION
function openPaymentModal(serviceId) {
    // VÉRIFIER SI L'UTILISATEUR EST CONNECTÉ
    const auth = checkAuth();
    if (!auth.isLoggedIn) {
        // Stocker l'ID du service pour redirection après connexion
        localStorage.setItem('pendingServicePurchase', serviceId);
        
        // Rediriger vers la page de connexion
        window.location.href = 'connexion.html';
        return; // ← IMPORTANT : Arrêter l'exécution
    }
    
    // Si connecté, continuer avec l'ouverture de la modal
    const service = services.find(s => s.id === parseInt(serviceId));
    if (!service) return;
    
    document.getElementById('serviceId').value = service.id;
    document.getElementById('servicePrice').value = service.price;
    document.getElementById('paymentModalTitle').textContent = `Achat: ${service.name}`;
    document.getElementById('paymentModal').style.display = 'flex';
}

// Vérifier s'il y a un achat en attente après connexion
function checkPendingPurchase() {
    const pendingServiceId = localStorage.getItem('pendingServicePurchase');
    
    if (pendingServiceId) {
        // Ouvrir directement la modal de paiement
        openPaymentModal(pendingServiceId);
        
        // Supprimer l'achat en attente
        localStorage.removeItem('pendingServicePurchase');
    }
}

// Appeler cette fonction au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // ... autre code d'initialisation ...
    checkPendingPurchase(); // ← Vérifier les achats en attente
});
      
    
    // Fonction pour générer des données de prix réalistes
    function generatePriceData(initialPrice, count, volatility, trend = 0.0005) {
        const data = [];
        let currentPrice = initialPrice;
        
        for (let i = 0; i < count; i++) {
            // Ajouter une tendance légèrement haussière
            const randomChange = (Math.random() - 0.5) * volatility;
            currentPrice = currentPrice * (1 + randomChange + trend);
            
            data.push({
                x: new Date(Date.now() - (count - i) * 60000),
                y: currentPrice
            });
        }
        
        return data;
    }
    
    // Obtenir le libellé du timeframe
    function getTimeframeLabel(timeframe) {
        switch(timeframe) {
            case '1D': return '24 Heures';
            case '1W': return '1 Semaine';
            case '1M': return '1 Mois';
            case '3M': return '3 Mois';
            case '1Y': return '1 An';
            case 'ALL': return 'Max';
            default: return '24 Heures';
        }
    }
    
    // Générer le graphique d'évolution des revenus
    function renderServiceGraph(service, timeframe = '1D', chartType = 'line') {
        const ctx = document.getElementById('serviceGraph');
        if (!ctx) return;
        
        // Détruire le graphique existant
        if (serviceChart) {
            serviceChart.destroy();
            serviceChart = null;
        }
        
        // Déterminer le nombre de points en fonction du timeframe
        let dataPoints = 100;
        
        switch(timeframe) {
            case '1D': dataPoints = 96; break;
            case '1W': dataPoints = 168; break;
            case '1M': dataPoints = 120; break;
            case '3M': dataPoints = 180; break;
            case '1Y': dataPoints = 365; break;
            case 'ALL': dataPoints = 730; break;
        }
        
        // Générer des données de prix réalistes
        const priceData = generatePriceData(service.baseDailyIncome, dataPoints, service.volatility);
        
        // Préparer les données pour le graphique
        const labels = priceData.map((point, index) => {
            return `${index % 24}:${(index % 60).toString().padStart(2, '0')}`;
        });
        
        const data = priceData.map(point => point.y);
        
        // Configuration des options du graphique
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Temps'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Prix (FCFA)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Évolution des revenus - ${service.name} - ${getTimeframeLabel(timeframe)}`,
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${Math.round(context.raw).toLocaleString()} FCFA`;
                        }
                    }
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'xy',
                    },
                    pan: {
                        enabled: true,
                        mode: 'xy',
                    }
                },
                legend: {
                    position: 'top',
                }
            }
        };
        
        // Création du graphique selon le type choisi
        let backgroundColor, borderColor;
        
        switch(chartType) {
            case 'candle':
            case 'heikinashi':
                backgroundColor = 'rgba(155, 89, 182, 0.1)';
                borderColor = '#9b59b6';
                break;
            case 'area':
                backgroundColor = 'rgba(46, 204, 113, 0.3)';
                borderColor = '#2ecc71';
                break;
            default: // line
                backgroundColor = 'rgba(46, 204, 113, 0.1)';
                borderColor = '#2ecc71';
        }
        
        serviceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Prix',
                    data: data,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: chartType === 'area',
                    tension: 0.1
                }]
            },
            options: chartOptions
        });
        
        // Mettre à jour les indicateurs de prix
        const currentPrice = data[data.length - 1];
        const previousPrice = data[data.length - 2] || currentPrice;
        const priceChange = currentPrice - previousPrice;
        const priceChangePercent = previousPrice ? (priceChange / previousPrice) * 100 : 0;
        
        document.getElementById('currentPrice').textContent = `${Math.round(currentPrice).toLocaleString()} FCFA`;
        document.getElementById('priceChange').textContent = `${priceChange >= 0 ? '+' : ''}${priceChangePercent.toFixed(2)}% (${Math.round(priceChange).toLocaleString()} FCFA)`;
        document.getElementById('priceChange').className = `price-change ${priceChange >= 0 ? 'positive' : 'negative'}`;
        
        // Animation de changement de prix
        const priceElement = document.getElementById('currentPrice');
        priceElement.classList.remove('price-up', 'price-down');
        void priceElement.offsetWidth; // Trigger reflow
        priceElement.classList.add(priceChange >= 0 ? 'price-up' : 'price-down');
        
        // Afficher les informations du graphique
        const prices = data;
        const minIncome = Math.min(...prices);
        const maxIncome = Math.max(...prices);
        const avgIncome = prices.reduce((a, b) => a + b, 0) / prices.length;
        const lastIncome = prices[prices.length - 1];
        const firstIncome = prices[0];
        const totalChange = firstIncome ? ((lastIncome - firstIncome) / firstIncome) * 100 : 0;
        
        document.getElementById('graphInfo').innerHTML = `
            <div class="info-box">
                <h4>Revenu minimum</h4>
                <div class="value">${Math.round(minIncome).toLocaleString()} FCFA</div>
            </div>
            <div class="info-box">
                <h4>Revenu maximum</h4>
                <div class="value">${Math.round(maxIncome).toLocaleString()} FCFA</div>
            </div>
            <div class="info-box">
                <h4>Revenu moyen</h4>
                <div class="value">${Math.round(avgIncome).toLocaleString()} FCFA</div>
            </div>
            <div class="info-box">
                <h4>Dernier revenu</h4>
                <div class="value">${Math.round(lastIncome).toLocaleString()} FCFA</div>
            </div>
            <div class="info-box">
                <h4>Variation totale</h4>
                <div class="value ${totalChange >= 0 ? 'positive' : 'negative'}">${totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}%</div>
            </div>
            <div class="info-box">
                <h4>Volatilité</h4>
                <div class="value">${(service.volatility * 100).toFixed(1)}%</div>
            </div>
        `;
        
        // Afficher les indicateurs techniques simplifiés
        document.getElementById('technicalIndicators').innerHTML = `
            <div class="indicator-box">
                <h4>Prix Actuel</h4>
                <div class="value">${Math.round(currentPrice).toLocaleString()} FCFA</div>
            </div>
            <div class="indicator-box">
                <h4>Moyenne</h4>
                <div class="value">${Math.round(avgIncome).toLocaleString()} FCFA</div>
            </div>
            <div class="indicator-box">
                <h4>Tendance</h4>
                <div class="value ${currentPrice > avgIncome ? 'positive' : 'negative'}">${currentPrice > avgIncome ? 'Haussière' : 'Baissière'}</div>
            </div>
        `;
    }
    
    
    // Ouvrir la modal de graphique
    function openGraphModal(serviceId) {
        const service = services.find(s => s.id === parseInt(serviceId));
        if (!service) return;
        
        document.getElementById('graphModalTitle').textContent = `Évolution des revenus: ${service.name}`;
        document.getElementById('graphModal').style.display = 'flex';
        
        // Générer le graphique
        renderServiceGraph(service);
        
        // Configurer les boutons de timeframe
        document.querySelectorAll('.graph-controls button').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.graph-controls button').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const timeframe = this.getAttribute('data-timeframe');
                const chartType = document.querySelector('.chart-type-controls button.active')?.getAttribute('data-chart-type') || 'line';
                renderServiceGraph(service, timeframe, chartType);
            });
        });
        
        // Configurer les boutons de type de graphique
        document.querySelectorAll('.chart-type-controls button').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.chart-type-controls button').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const chartType = this.getAttribute('data-chart-type');
                const timeframe = document.querySelector('.graph-controls button.active')?.getAttribute('data-timeframe') || '1D';
                renderServiceGraph(service, timeframe, chartType);
            });
        });
    }
    
    // Fermer les modals
    function setupModalClose() {
        document.getElementById('closeGraphModal').addEventListener('click', function() {
            document.getElementById('graphModal').style.display = 'none';
            if (serviceChart) {
                serviceChart.destroy();
                serviceChart = null;
            }
            
        });
        
        document.getElementById('closePaymentModal').addEventListener('click', function() {
            document.getElementById('paymentModal').style.display = 'none';
        });
        
        // Fermer en cliquant à l'extérieur
        window.addEventListener('click', function(event) {
            if (event.target === document.getElementById('graphModal')) {
                document.getElementById('graphModal').style.display = 'none';
                if (serviceChart) {
                    serviceChart.destroy();
                    serviceChart = null;
                }
            }
            if (event.target === document.getElementById('paymentModal')) {
                document.getElementById('paymentModal').style.display = 'none';
            }
            
        });
    }
    
    // Gérer la soumission du formulaire de paiement
    function setupPaymentForm() {
        document.getElementById('paymentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const serviceId = document.getElementById('serviceId').value;
            const servicePrice = document.getElementById('servicePrice').value;
            const transactionId = document.getElementById('transactionId').value;
            const service = services.find(s => s.id === parseInt(serviceId));
            
            // Vérifier si l'ID de transaction correspond
            if (transactionId === transactionIds[servicePrice]) {
                // Transaction validée
                alert(`Achat réussi! Vous avez investi dans ${service.name} pour ${service.price.toLocaleString()} FCFA.`);
                
                // Mettre à jour le portefeuille (simulation)
                updateAccountBalance(service.price);
                
                // Réinitialiser le formulaire et fermer la modal
                document.getElementById('paymentForm').reset();
                document.getElementById('paymentModal').style.display = 'none';
            } else {
                // ID de transaction incorrect
                alert("ID de transaction incorrect. Veuillez contacter l'administrateur pour obtenir le bon ID.");
            }
        });
    }
    
    // Mettre à jour le solde du compte (simulation)
    function updateAccountBalance(amount) {
        const balanceElement = document.querySelector('.account-item .value');
        const currentBalance = parseInt(balanceElement.textContent.replace(/\s|FCFA/g, '') || 0);
        const newBalance = currentBalance + amount;
        balanceElement.textContent = `${newBalance.toLocaleString()} FCFA`;
        
        // Mettre à jour le nombre de services actifs
        const activeServicesElement = document.querySelectorAll('.account-item .value')[2];
        const currentServices = parseInt(activeServicesElement.textContent || 0);
        activeServicesElement.textContent = currentServices + 1;
    }
    
    // Initialiser la page
    function initPage() {
        renderServices();
        generateTopInvestors();
        setupModalClose();
        setupPaymentForm();

        // verifier si il y'a un achat en attente apres connexion
        checkPengingPurchase();
        
        // Mettre à jour les investisseurs toutes les 24 heures
        setInterval(generateTopInvestors, 24 * 60 * 60 * 1000);
        
        // Navigation mobile
        document.querySelector('.nav-toggle').addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
        
        // Toggle account summary
        document.getElementById('accountToggle').addEventListener('click', function() {
            const content = document.getElementById('accountContent');
            const icon = this.querySelector('.fa-chevron-down');
            
            if (content.style.display === 'none') {
                content.style.display = 'grid';
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                content.style.display = 'none';
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }
        });
    }
    
    // Démarrer l'initialisation lorsque le DOM est chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPage);
    } else {
        initPage();
    }
    
    
    // Données pour les transactions (à ajouter dans votre code existant)
    const userFirstNames = ['Jean', 'Marie', 'Paul', 'Alice', 'Pierre', 'Sophie', 'Luc', 'Emma', 'Thomas', 'Julie', 'David', 'Sarah', 'Michel', 'Nathalie', 'Alexandre'];
    const userLastNames = ['Dupont', 'Martin', 'Bernard', 'Dubois', 'Moreau', 'Petit', 'Durand', 'Leroy', 'Morel', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'Thomas'];
    
    // Générer des transactions aléatoires
    function generateRandomTransactions() {
        const investments = [];
        const withdrawals = [];
        
        // Générer 5-10 investissements aléatoires
        const investmentCount = Math.floor(Math.random() * 6) + 5;
        for (let i = 0; i < investmentCount; i++) {
            const service = services[Math.floor(Math.random() * services.length)];
            const firstName = userFirstNames[Math.floor(Math.random() * userFirstNames.length)];
            const lastName = userLastNames[Math.floor(Math.random() * userLastNames.length)];
            
            investments.push({
                id: i + 1,
                userName: `${firstName} ${lastName}`,
                service: service.name,
                amount: service.price,
                time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // 0-7 jours
            });
        }
        
        // Générer 5-10 retraits aléatoires
        const withdrawalCount = Math.floor(Math.random() * 6) + 5;
        for (let i = 0; i < withdrawalCount; i++) {
            const firstName = userFirstNames[Math.floor(Math.random() * userFirstNames.length)];
            const lastName = userLastNames[Math.floor(Math.random() * userLastNames.length)];
            const amount = Math.floor(Math.random() * 100000) + 5000;
            
            withdrawals.push({
                id: i + 1,
                userName: `${firstName} ${lastName}`,
                amount: amount,
                time: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // 0-7 jours
            });
        }
        
        // Trier par date (du plus récent au plus ancien)
        investments.sort((a, b) => b.time - a.time);
        withdrawals.sort((a, b) => b.time - a.time);
        
        return { investments, withdrawals };
    }
    
    // Afficher les transactions
    function renderTransactions(transactions, containerId, isWithdrawal = false) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        
        transactions.forEach(transaction => {
            const transactionItem = document.createElement('div');
            transactionItem.className = 'transaction-item';
            
            const timeAgo = getTimeAgo(transaction.time);
            
            if (isWithdrawal) {
                transactionItem.innerHTML = `
                    <div class="transaction-info">
                        <div class="transaction-name">${transaction.userName}</div>
                        <div class="transaction-time">${timeAgo}</div>
                    </div>
                    <div class="transaction-amount withdrawal-amount">-${transaction.amount.toLocaleString()} FCFA</div>
                `;
            } else {
                transactionItem.innerHTML = `
                    <div class="transaction-info">
                        <div class="transaction-name">${transaction.userName}</div>
                        <div class="transaction-service">${transaction.service}</div>
                        <div class="transaction-time">${timeAgo}</div>
                    </div>
                    <div class="transaction-amount">${transaction.amount.toLocaleString()} FCFA</div>
                `;
            }
            
            container.appendChild(transactionItem);
        });
    }
    
    // Fonction pour formater la date en "il y a X temps"
    function getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 60) {
            return `Il y a ${diffMins} min`;
        } else if (diffHours < 24) {
            return `Il y a ${diffHours} h`;
        } else {
            return `Il y a ${diffDays} j`;
        }
    }
    
    // Gestion des onglets
    function setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Désactiver tous les onglets
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Activer l'onglet cliqué
                button.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    
    // Changement automatique d'onglet toutes les 10 secondes
    function startAutoTabRotation() {
        const tabs = ['investments', 'withdrawals'];
        let currentTabIndex = 0;
        
        setInterval(() => {
            currentTabIndex = (currentTabIndex + 1) % tabs.length;
            const nextTab = tabs[currentTabIndex];
            
            // Simuler un clic sur le bouton de l'onglet
            const tabButton = document.querySelector(`.tab-button[data-tab="${nextTab}"]`);
            if (tabButton) {
                tabButton.click();
            }
        }, 10000); // 10 secondes
    }
    
    // Initialiser les transactions
    function initTransactions() {
        const transactions = generateRandomTransactions();
        renderTransactions(transactions.investments, 'investments-list');
        renderTransactions(transactions.withdrawals, 'withdrawals-list', true);
        setupTabs();
        startAutoTabRotation();
    }
    
    // Ajouter l'appel à initTransactions dans votre fonction initPage()
    function initPage() {
        // Vos autres initialisations...
        renderServices();
        generateTopInvestors();
        setupModalClose();
        setupPaymentForm();
        initTransactions(); // <-- Ajoutez cette ligne
        
        // ... le reste de votre code d'initialisation
    }

     // Données pour les utilisateurs fictifs (200 utilisateurs)
    const countries = [
        { name: "Cameroun", code: "CM", flag: "🇨🇲" },
        { name: "Côte d'Ivoire", code: "CI", flag: "🇨🇮" },
        { name: "Sénégal", code: "SN", flag: "🇸🇳" },
        { name: "Gabon", code: "GA", flag: "🇬🇦" },
        { name: "Mali", code: "ML", flag: "🇲🇱" },
        { name: "Bénin", code: "BJ", flag: "🇧🇯" },
        { name: "Togo", code: "TG", flag: "🇹🇬" },
        { name: "Burkina Faso", code: "BF", flag: "🇧🇫" },
        { name: "Niger", code: "NE", flag: "🇳🇪" },
        { name: "Guinée", code: "GN", flag: "🇬🇳" },
        { name: "Congo", code: "CG", flag: "🇨🇬" },
        { name: "RDC", code: "CD", flag: "🇨🇩" },
        { name: "Tchad", code: "TD", flag: "🇹🇩" },
        { name: "Madagascar", code: "MG", flag: "🇲🇬" },
        { name: "Nigeria", code: "NG", flag: "🇳🇬" },
        { name: "Ghana", code: "GH", flag: "🇬🇭" },
        { name: "France", code: "FR", flag: "🇫🇷" },
        { name: "Belgique", code: "BE", flag: "🇧🇪" },
        { name: "Canada", code: "CA", flag: "🇨🇦" },
        { name: "USA", code: "US", flag: "🇺🇸" }
    ];
    
    // Générer 200 utilisateurs fictifs
    function generateFakeUsers() {
        const users = [];
        
        for (let i = 0; i < 200; i++) {
            const firstName = userFirstNames[Math.floor(Math.random() * userFirstNames.length)];
            const lastName = userLastNames[Math.floor(Math.random() * userLastNames.length)];
            const country = countries[Math.floor(Math.random() * countries.length)];
            
            users.push({
                id: i + 1,
                name: `${firstName} ${lastName}`,
                country: country.name,
                flag: country.flag,
                initials: `${firstName[0]}${lastName[0]}`.toUpperCase()
            });
        }
        
        return users;
    }
    
    // Générer des achats aléatoires
    function generateRandomPurchases(users) {
        const purchases = [];
        const selectedIndices = new Set();
        
        // Sélectionner 20 utilisateurs aléatoires uniques
        while (selectedIndices.size < 20 && selectedIndices.size < users.length) {
            const randomIndex = Math.floor(Math.random() * users.length);
            if (!selectedIndices.has(randomIndex)) {
                selectedIndices.add(randomIndex);
            }
        }
        
        // Créer un achat pour chaque utilisateur sélectionné
        selectedIndices.forEach(index => {
            const user = users[index];
            const service = services[Math.floor(Math.random() * services.length)];
            
            purchases.push({
                id: Date.now() + Math.floor(Math.random() * 1000),
                user: user,
                service: service.name,
                amount: service.price,
                timestamp: new Date()
            });
        });
        
        return purchases;
    }
    
    // Afficher les achats en direct
    function renderLivePurchases(purchases) {
        const container = document.getElementById('purchases-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        purchases.forEach(purchase => {
            const purchaseItem = document.createElement('div');
            purchaseItem.className = 'purchase-item';
            
            const timeAgo = getTimeAgo(purchase.timestamp);
            
            purchaseItem.innerHTML = `
                <div class="purchase-info">
                    <div class="purchase-user">
                        <div class="user-avatar">${purchase.user.initials}</div>
                        <div class="user-details">
                            <div class="user-name">${purchase.user.name}</div>
                            <div class="user-country">${purchase.user.flag} ${purchase.user.country}</div>
                        </div>
                    </div>
                </div>
                <div class="purchase-details">
                    <div class="purchase-service">${purchase.service}</div>
                    <div class="purchase-amount">${purchase.amount.toLocaleString()} FCFA</div>
                    <div class="purchase-time">${timeAgo}</div>
                </div>
            `;
            
            container.appendChild(purchaseItem);
        });
    }
    
    // Démarrer le système de mises à jour automatiques
    function startLiveUpdates() {
        const users = generateFakeUsers();
        let countdown = 15;
        let countdownInterval;
        
        // Fonction pour mettre à jour les achats
        function updatePurchases() {
            const purchases = generateRandomPurchases(users);
            renderLivePurchases(purchases);
            
            // Réinitialiser le compte à rebours
            countdown = 10 + Math.floor(Math.random() * 6); // 10-15 secondes
            updateCountdown();
        }
        
        // Mettre à jour le compte à rebours
        function updateCountdown() {
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.textContent = countdown;
            }
        }
        
        // Démarrer le compte à rebours
        function startCountdown() {
            clearInterval(countdownInterval);
            
            countdownInterval = setInterval(() => {
                countdown--;
                updateCountdown();
                
                if (countdown <= 0) {
                    updatePurchases();
                }
            }, 1000);
        }
        
        // Initialiser
        updatePurchases();
        startCountdown();
        
        // Configurer l'intervalle pour les mises à jour automatiques
        setInterval(() => {
            updatePurchases();
            startCountdown();
        }, (10 + Math.floor(Math.random() * 6)) * 1000); // 10-15 secondes
    }
    
    // Initialiser les achats en direct
    function initLivePurchases() {
        startLiveUpdates();
    }
    
    // Ajouter l'appel à initLivePurchases dans votre fonction initPage()
    function initPage() {
        // Vos autres initialisations...
        renderServices();
        generateTopInvestors();
        setupModalClose();
        setupPaymentForm();
        initTransactions();
        initLivePurchases(); // <-- Ajoutez cette ligne
        
        // ... le reste de votre code d'initialisation
    }

    



    // Données pour les utilisateurs fictifs (200 utilisateurs)
    
    
    // Générer 200 utilisateurs fictifs
    function generateFakeUsers() {
        const users = [];
        
        for (let i = 0; i < 200; i++) {
            const firstName = userFirstNames[Math.floor(Math.random() * userFirstNames.length)];
            const lastName = userLastNames[Math.floor(Math.random() * userLastNames.length)];
            const country = countries[Math.floor(Math.random() * countries.length)];
            
            users.push({
                id: i + 1,
                name: `${firstName} ${lastName}`,
                country: country.name,
                flag: country.flag,
                initials: `${firstName[0]}${lastName[0]}`.toUpperCase()
            });
        }
        
        return users;
    }
    
    // Générer des retraits aléatoires
    function generateRandomWithdrawals(users) {
        const withdrawals = [];
        const selectedIndices = new Set();
        
        // Sélectionner 20 utilisateurs aléatoires uniques
        while (selectedIndices.size < 20 && selectedIndices.size < users.length) {
            const randomIndex = Math.floor(Math.random() * users.length);
            if (!selectedIndices.has(randomIndex)) {
                selectedIndices.add(randomIndex);
            }
        }
        
        // Créer un retrait pour chaque utilisateur sélectionné
        selectedIndices.forEach(index => {
            const user = users[index];
            const service = services[Math.floor(Math.random() * services.length)];
            const amount = service.price;
            
            withdrawals.push({
                id: Date.now() + Math.floor(Math.random() * 1000),
                user: user,
                service: service.name,
                amount: amount,
                timestamp: new Date()
            });
        });
        
        return withdrawals;
    }
    
    // Fonction pour formater la date en "il y a X temps"
    function getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) {
            return `À l'instant`;
        } else if (diffMins < 60) {
            return `Il y a ${diffMins} min`;
        } else if (diffHours < 24) {
            return `Il y a ${diffHours} h`;
        } else {
            return `Il y a ${diffDays} j`;
        }
    }
    
    // Afficher les retraits en direct
    function renderLiveWithdrawals(withdrawals) {
        const container = document.getElementById('withdrawals-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        withdrawals.forEach(withdrawal => {
            const withdrawalItem = document.createElement('div');
            withdrawalItem.className = 'withdrawal-item';
            
            const timeAgo = getTimeAgo(withdrawal.timestamp);
            
            withdrawalItem.innerHTML = `
                <div class="withdrawal-info">
                    <div class="withdrawal-user">
                        <div class="withdrawal-user-avatar">${withdrawal.user.initials}</div>
                        <div class="withdrawal-user-details">
                            <div class="withdrawal-user-name">${withdrawal.user.name}</div>
                            <div class="withdrawal-user-country">${withdrawal.user.flag} ${withdrawal.user.country}</div>
                        </div>
                    </div>
                </div>
                <div class="withdrawal-details">
                    <div class="withdrawal-service">${withdrawal.service}</div>
                    <div class="withdrawal-amount">-${withdrawal.amount.toLocaleString()} FCFA</div>
                    <div class="withdrawal-time">${timeAgo}</div>
                </div>
            `;
            
            container.appendChild(withdrawalItem);
        });
    }
    
    // Démarrer le système de mises à jour automatiques pour les retraits
    function startWithdrawalLiveUpdates() {
        const users = generateFakeUsers();
        let countdown = 15;
        let countdownInterval;
        
        // Fonction pour mettre à jour les retraits
        function updateWithdrawals() {
            const withdrawals = generateRandomWithdrawals(users);
            renderLiveWithdrawals(withdrawals);
            
            // Réinitialiser le compte à rebours
            countdown = 10 + Math.floor(Math.random() * 6); // 10-15 secondes
            updateWithdrawalCountdown();
        }
        
        // Mettre à jour le compte à rebours
        function updateWithdrawalCountdown() {
            const countdownElement = document.getElementById('withdrawal-countdown');
            if (countdownElement) {
                countdownElement.textContent = countdown;
            }
        }
        
        // Démarrer le compte à rebours
        function startWithdrawalCountdown() {
            clearInterval(countdownInterval);
            
            countdownInterval = setInterval(() => {
                countdown--;
                updateWithdrawalCountdown();
                
                if (countdown <= 0) {
                    updateWithdrawals();
                }
            }, 1000);
        }
        
        // Initialiser
        updateWithdrawals();
        startWithdrawalCountdown();
        
        // Configurer l'intervalle pour les mises à jour automatiques
        setInterval(() => {
            updateWithdrawals();
            startWithdrawalCountdown();
        }, (10 + Math.floor(Math.random() * 6)) * 1000); // 10-15 secondes
    }
    
    // Initialiser les retraits en direct
    function initLiveWithdrawals() {
        startWithdrawalLiveUpdates();
    }
    
    // Démarrer lorsque la page est chargée
    document.addEventListener('DOMContentLoaded', function() {
        initLiveWithdrawals();
    });
    
// Vérifier s'il y a un achat en attente après connexion
function checkPendingPurchase() {
    const pendingServiceId = localStorage.getItem('pendingServicePurchase');
    
    if (pendingServiceId) {
        // Ouvrir directement la modal de paiement
        openPaymentModal(pendingServiceId);
        
        // Supprimer l'achat en attente
        localStorage.removeItem('pendingServicePurchase');
    }
}

// Appeler cette fonction au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // ... autre code d'initialisation ...
    checkPendingPurchase();
});
    