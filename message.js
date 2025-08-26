     // Toggle mobile navigation
        document.querySelector('.nav-toggle').addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
        // Données de messagerie
        let messagesData = JSON.parse(localStorage.getItem('messagesData')) || {};
        let currentChat = null;
        
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
        
        // Fonction pour initialiser la messagerie
        function initMessaging() {
            const auth = checkAuth();
            if (!auth.isLoggedIn) {
                window.location.href = 'connexion.html';
                return;
            }
            
            // Charger les contacts
            loadContacts();
            
            // Charger les utilisateurs pour nouvelle conversation
            loadUsersList();
            
            // Configurer les événements
            setupEventListeners();
            
            // Mettre à jour le menu
            updateMenu();
        }
        
        // Charger la liste des contacts
        function loadContacts() {
            const auth = checkAuth();
            if (!auth.user) return;
            
            const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
            const contactsList = document.getElementById('contactsList');
            contactsList.innerHTML = '';
            
            // Filtrer l'utilisateur actuel
            const otherUsers = allUsers.filter(user => user.id !== auth.user.id);
            
            if (otherUsers.length === 0) {
                contactsList.innerHTML = '<div class="no-contacts">Aucun utilisateur à contacter</div>';
                return;
            }
            
            otherUsers.forEach(user => {
                const conversationId = getConversationId(auth.user.id, user.id);
                const conversation = messagesData[conversationId] || [];
                const lastMessage = conversation.length > 0 ? conversation[conversation.length - 1] : null;
                const unreadCount = conversation.filter(msg => 
                    msg.senderId === user.id && !msg.read
                ).length;
                
                const contactItem = document.createElement('div');
                contactItem.className = 'contact-item';
                contactItem.dataset.userId = user.id;
                
                contactItem.innerHTML = `
                    <div class="contact-avatar">${user.firstName.charAt(0)}${user.lastName.charAt(0)}</div>
                    <div class="contact-info">
                        <div class="contact-name">${user.firstName} ${user.lastName}</div>
                        <div class="contact-last-message">${lastMessage ? lastMessage.content : 'Aucun message'}</div>
                    </div>
                    <div class="contact-meta">
                        <div class="contact-time">${lastMessage ? formatTime(lastMessage.timestamp) : ''}</div>
                        ${unreadCount > 0 ? `<div class="unread-count">${unreadCount}</div>` : ''}
                    </div>
                `;
                
                contactItem.addEventListener('click', () => openChat(user));
                contactsList.appendChild(contactItem);
            });
        }
        
        // Charger la liste des utilisateurs pour nouvelle conversation
        function loadUsersList() {
            const auth = checkAuth();
            if (!auth.user) return;
            
            const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
            const usersList = document.getElementById('usersList');
            usersList.innerHTML = '';
            
            // Filtrer l'utilisateur actuel
            const otherUsers = allUsers.filter(user => user.id !== auth.user.id);
            
            if (otherUsers.length === 0) {
                usersList.innerHTML = '<div class="no-users">Aucun utilisateur disponible</div>';
                return;
            }
            
            otherUsers.forEach(user => {
                const userItem = document.createElement('div');
                userItem.className = 'user-item';
                userItem.dataset.userId = user.id;
                
                userItem.innerHTML = `
                    <div class="user-avatar">${user.firstName.charAt(0)}${user.lastName.charAt(0)}</div>
                    <div class="user-info">
                        <div class="user-name">${user.firstName} ${user.lastName}</div>
                        <div class="user-email">${user.email}</div>
                    </div>
                `;
                
                userItem.addEventListener('click', () => {
                    openChat(user);
                    document.getElementById('newConversationModal').style.display = 'none';
                });
                
                usersList.appendChild(userItem);
            });
        }
        
        // Ouvrir une conversation
        function openChat(user) {
            const auth = checkAuth();
            if (!auth.user) return;
            
            currentChat = user;
            
            // Mettre à jour l'en-tête du chat
            document.getElementById('currentChatAvatar').textContent = 
                `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
            document.getElementById('currentChatName').textContent = 
                `${user.firstName} ${user.lastName}`;
            document.getElementById('currentChatStatus').textContent = 'En ligne';
            
            // Charger les messages
            loadMessages(user.id);
            
            // Marquer les messages comme lus
            markMessagesAsRead(user.id);
            
            // Mettre à jour les contacts
            loadContacts();
        }
        
        // Charger les messages d'une conversation
        function loadMessages(userId) {
            const auth = checkAuth();
            if (!auth.user) return;
            
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.innerHTML = '';
            
            const conversationId = getConversationId(auth.user.id, userId);
            const conversation = messagesData[conversationId] || [];
            
            if (conversation.length === 0) {
                messagesContainer.innerHTML = `
                    <div class="no-chat-selected">
                        <i class="fas fa-comment-slash"></i>
                        <p>Aucun message échangé pour le moment</p>
                    </div>
                `;
                return;
            }
            
            conversation.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${message.senderId === auth.user.id ? 'sent' : 'received'}`;
                
                messageElement.innerHTML = `
                    <div class="message-content">${message.content}</div>
                    <div class="message-time">${formatTime(message.timestamp)}</div>
                `;
                
                messagesContainer.appendChild(messageElement);
            });
            
            // Scroll vers le bas
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
        
        // Envoyer un message
        function sendMessage() {
            const auth = checkAuth();
            if (!auth.user || !currentChat) return;
            
            const messageInput = document.getElementById('messageInput');
            const content = messageInput.value.trim();
            
            if (!content) return;
            
            const message = {
                id: Date.now(),
                senderId: auth.user.id,
                receiverId: currentChat.id,
                content: content,
                timestamp: new Date().toISOString(),
                read: false
            };
            
            const conversationId = getConversationId(auth.user.id, currentChat.id);
            if (!messagesData[conversationId]) {
                messagesData[conversationId] = [];
            }
            
            messagesData[conversationId].push(message);
            localStorage.setItem('messagesData', JSON.stringify(messagesData));
            
            // Ajouter le message à l'interface
            const messagesContainer = document.getElementById('messagesContainer');
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            
            messageElement.innerHTML = `
                <div class="message-content">${content}</div>
                <div class="message-time">${formatTime(message.timestamp)}</div>
            `;
            
            messagesContainer.appendChild(messageElement);
            
            // Vider et focus sur l'input
            messageInput.value = '';
            messageInput.focus();
            
            // Scroll vers le bas
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Mettre à jour les contacts
            loadContacts();
        }
        
        // Marquer les messages comme lus
        function markMessagesAsRead(userId) {
            const auth = checkAuth();
            if (!auth.user) return;
            
            const conversationId = getConversationId(auth.user.id, userId);
            if (messagesData[conversationId]) {
                messagesData[conversationId].forEach(message => {
                    if (message.senderId === userId && !message.read) {
                        message.read = true;
                    }
                });
                
                localStorage.setItem('messagesData', JSON.stringify(messagesData));
                loadContacts();
            }
        }
        
        // Générer un ID de conversation unique
        function getConversationId(userId1, userId2) {
            return [userId1, userId2].sort().join('_');
        }
        
        // Formater l'heure
        function formatTime(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
        
        // Configurer les événements
        function setupEventListeners() {
            // Envoyer un message
            document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
            
            document.getElementById('messageInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
            
            // Nouvelle conversation
            document.getElementById('newConversationBtn').addEventListener('click', function() {
                document.getElementById('newConversationModal').style.display = 'flex';
            });
            
            // Fermer les modals
            document.getElementById('closeNewConversationModal').addEventListener('click', function() {
                document.getElementById('newConversationModal').style.display = 'none';
            });
            
            window.addEventListener('click', function(event) {
                if (event.target === document.getElementById('newConversationModal')) {
                    document.getElementById('newConversationModal').style.display = 'none';
                }
            });
            
            // Déconnexion
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                    localStorage.removeItem('userData');
                    localStorage.removeItem('adminData');
                    window.location.href = 'connexion.html';
                }
            });
        }
        
        // Mettre à jour le menu
        function updateMenu() {
            const auth = checkAuth();
            const profileMenuItem = document.getElementById('profileMenuItem');
            const adminMenuItem = document.getElementById('adminMenuItem');
            const messagesMenuItem = document.getElementById('messagesMenuItem');
            const authButtons = document.querySelector('.auth-buttons');
            
            if (auth.isLoggedIn) {
                if (authButtons) {
                    authButtons.innerHTML = `
                        <a href="#" class="btn btn-outline" id="logoutBtn">
                            <i class="fas fa-sign-out-alt"></i> Déconnexion
                        </a>
                    `;
                }
                
                if (profileMenuItem && auth.user) {
                    profileMenuItem.style.display = 'block';
                }
                
                if (adminMenuItem && auth.isAdmin) {
                    adminMenuItem.style.display = 'block';
                }
                
                if (messagesMenuItem) {
                    messagesMenuItem.style.display = 'block';
                }
            }
        }
        
        // Initialiser la messagerie au chargement
        document.addEventListener('DOMContentLoaded', initMessaging);
    