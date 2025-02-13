document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const messages = document.querySelector('.messages');
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const chatItems = document.querySelectorAll('.chat-item');
    const voiceCallBtn = document.getElementById('voiceCallBtn');
    const videoCallBtn = document.getElementById('videoCallBtn');

    // Initialize Lucide icons
    lucide.createIcons();

    // Generate avatars
    generateAvatars();

    // Populate mobile menu
    populateMobileMenu();

    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            chatItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.remove('open');
        }
    });

    // Voice call button
    voiceCallBtn.addEventListener('click', () => {
        alert('Voice call feature is not implemented yet.');
    });

    // Video call button
    videoCallBtn.addEventListener('click', () => {
        alert('Video call feature is not implemented yet.');
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

    function populateMobileMenu() {
        const mobileChatList = document.querySelector('.mobile-chat-list');
        const chatListItems = document.querySelectorAll('.chat-list .chat-item');
        
        
        chatListItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.addEventListener('click', () => {
                mobileChatList.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
                clone.classList.add('active');                
                mobileMenu.classList.remove('open');
            });
            mobileChatList.appendChild(clone);
        });
    }
});