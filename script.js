document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messages = document.querySelector('.messages');
    const voiceCallBtn = document.getElementById('voiceCallBtn');
    const videoCallBtn = document.getElementById('videoCallBtn');
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.querySelector('.sidebar');

    // Initialize Lucide icons
    lucide.createIcons();

    // Generate avatars
    generateAvatars();

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('show-chat-list');
    });

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            const messageElement = createMessageElement(message, 'sent');
            messages.appendChild(messageElement);
            messageInput.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
    }

    function createMessageElement(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        messageDiv.appendChild(paragraph);
        
        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        timestamp.textContent = getCurrentTime();
        messageDiv.appendChild(timestamp);
        
        return messageDiv;
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function generateAvatars() {
        const avatars = document.querySelectorAll('.avatar');
        avatars.forEach(avatar => {
            const name = avatar.getAttribute('data-name');
            const initials = getInitials(name);
            avatar.textContent = initials;
            avatar.style.backgroundColor = getAvatarColor(name);
        });
    }

    function getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    // function getInitials(name) {
    //     return name.toUpperCase().slice(0, 1);
    // }

    function getAvatarColor(name) {
        const colors = [
            '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
            '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
            '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6',
            '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d'
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }

    voiceCallBtn.addEventListener('click', () => {
        alert('Voice call feature not implemented');
    });

    videoCallBtn.addEventListener('click', () => {
        alert('Video call feature not implemented');
    });
});