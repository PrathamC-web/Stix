// Main application state
let currentUser = {
    id: 1,
    name: "Jamie Thompson",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    college: "Stanford University",
    major: "Computer Science",
    year: "Senior",
    credits: 1250,
    location: { lat: 37.4419, lng: -122.1430 } // Stanford coordinates
};

let proximityFriends = [
    {
        id: 2,
        name: "Alex Rodriguez",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop",
        distance: 0.8,
        location: { lat: 37.4400, lng: -122.1420 }
    }
];

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const feedToggleBtns = document.querySelectorAll('.toggle-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const categoryBtns = document.querySelectorAll('.category-btn');
const giftBadgeBtns = document.querySelectorAll('.gift-badge-btn');
const modal = document.getElementById('giftBadgeModal');
const closeModalBtn = document.querySelector('.close-modal');
const proximityNotification = document.getElementById('proximityNotification');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFeedToggles();
    initializeTabs();
    initializeCategories();
    initializeBadgeSystem();
    initializeProximityAlerts();
    initializeInteractions();
    
    // Show proximity notification after 3 seconds
    setTimeout(showProximityNotification, 3000);
});

// Navigation System
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetSection = this.getAttribute('data-section');
            document.getElementById(targetSection).classList.add('active');
            
            // Update page title
            updatePageTitle(targetSection);
        });
    });
}

function updatePageTitle(section) {
    const titles = {
        feed: 'STIX - Your Feed',
        profile: 'STIX - Your Profile',
        rooms: 'STIX - Live Rooms',
        startup: 'STIX - Startup Hub',
        badges: 'STIX - Badges'
    };
    document.title = titles[section] || 'STIX - Connect. Create. Collaborate.';
}

// Feed Toggle System
function initializeFeedToggles() {
    feedToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            feedToggleBtns.forEach(toggle => toggle.classList.remove('active'));
            this.classList.add('active');
            
            const feedType = this.getAttribute('data-feed');
            updateFeedContent(feedType);
        });
    });
}

function updateFeedContent(feedType) {
    // Simulate different feed algorithms
    const posts = document.querySelectorAll('.post-card');
    
    if (feedType === 'chronological') {
        // Sort posts chronologically (newest first)
        console.log('Switched to chronological feed');
        animateFeedUpdate();
    } else {
        // Show algorithm-based feed
        console.log('Switched to algorithm-based feed');
        animateFeedUpdate();
    }
}

function animateFeedUpdate() {
    const feedPosts = document.querySelector('.feed-posts');
    feedPosts.style.opacity = '0.7';
    feedPosts.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        feedPosts.style.opacity = '1';
        feedPosts.style.transform = 'translateY(0)';
    }, 300);
}

// Tab System
function initializeTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabContainer = this.closest('.startup-container, .badges-container');
            if (!tabContainer) return;
            
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs in this container
            tabContainer.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
            tabContainer.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = tabContainer.querySelector(`#${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Animate tab change
            animateTabChange(targetPanel);
        });
    });
}

function animateTabChange(panel) {
    if (panel) {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Category System
function initializeCategories() {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const container = this.closest('.rooms-container, .badges-container');
            if (!container) return;
            
            container.querySelectorAll('.category-btn').forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent.toLowerCase();
            filterContent(category, container);
        });
    });
}

function filterContent(category, container) {
    const items = container.querySelectorAll('.room-card, .badge-shop-item');
    
    items.forEach(item => {
        if (category === 'all rooms' || category === 'all badges') {
            item.style.display = 'block';
        } else {
            // Simple filtering logic - in a real app, this would be more sophisticated
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(category.replace(' ', ''))) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
    
    // Animate filtered results
    animateFilterResults(items);
}

function animateFilterResults(items) {
    items.forEach((item, index) => {
        if (item.style.display !== 'none') {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 50);
        }
    });
}

// Badge System
function initializeBadgeSystem() {
    giftBadgeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showGiftBadgeModal(this);
        });
    });
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideGiftBadgeModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideGiftBadgeModal();
            }
        });
    }
    
    // Friend search functionality
    const friendSearch = document.querySelector('.friend-search');
    if (friendSearch) {
        friendSearch.addEventListener('input', function() {
            filterFriendSuggestions(this.value);
        });
    }
    
    // Friend suggestion selection
    const friendSuggestions = document.querySelectorAll('.friend-suggestion');
    friendSuggestions.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            selectFriend(this);
        });
    });
    
    // Confirm gift button
    const confirmGiftBtn = document.querySelector('.confirm-gift-btn');
    if (confirmGiftBtn) {
        confirmGiftBtn.addEventListener('click', confirmGiftPurchase);
    }
}

function showGiftBadgeModal(btn) {
    const badgeCard = btn.closest('.badge-shop-item');
    const badgeName = badgeCard.querySelector('h4').textContent;
    const badgePrice = badgeCard.querySelector('.badge-price').textContent;
    
    // Update modal content
    const modalBadgeName = modal.querySelector('.selected-badge h4');
    const modalBadgePrice = modal.querySelector('.selected-badge p');
    
    if (modalBadgeName) modalBadgeName.textContent = badgeName;
    if (modalBadgePrice) modalBadgePrice.textContent = badgePrice;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Animate modal appearance
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.9) translateY(-20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1) translateY(0)';
        modalContent.style.opacity = '1';
    }, 100);
}

function hideGiftBadgeModal() {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.9) translateY(-20px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }, 200);
}

function filterFriendSuggestions(searchTerm) {
    const suggestions = document.querySelectorAll('.friend-suggestion');
    
    suggestions.forEach(suggestion => {
        const friendName = suggestion.querySelector('span').textContent.toLowerCase();
        if (friendName.includes(searchTerm.toLowerCase())) {
            suggestion.style.display = 'flex';
        } else {
            suggestion.style.display = 'none';
        }
    });
}

function selectFriend(suggestion) {
    const friendName = suggestion.querySelector('span').textContent;
    const friendSearch = document.querySelector('.friend-search');
    
    if (friendSearch) {
        friendSearch.value = friendName;
    }
    
    // Highlight selected friend
    document.querySelectorAll('.friend-suggestion').forEach(s => s.classList.remove('selected'));
    suggestion.classList.add('selected');
}

function confirmGiftPurchase() {
    const selectedFriend = document.querySelector('.friend-search').value;
    const badgeName = modal.querySelector('.selected-badge h4').textContent;
    const message = modal.querySelector('textarea').value;
    
    if (!selectedFriend) {
        alert('Please select a friend to gift the badge to.');
        return;
    }
    
    // Simulate gift purchase
    showNotification(`🎁 Badge "${badgeName}" sent to ${selectedFriend}!`);
    
    // Update user credits (simulate)
    currentUser.credits -= 150;
    updateCreditsDisplay();
    
    hideGiftBadgeModal();
    
    // Reset form
    document.querySelector('.friend-search').value = '';
    document.querySelector('textarea').value = '';
}

function updateCreditsDisplay() {
    const creditsDisplay = document.querySelector('.credits-amount');
    if (creditsDisplay) {
        creditsDisplay.textContent = `💰 Credits: ${currentUser.credits.toLocaleString()}`;
    }
}

// Proximity Alerts
function initializeProximityAlerts() {
    // Simulate location updates
    setInterval(checkProximityFriends, 30000); // Check every 30 seconds
}

function checkProximityFriends() {
    proximityFriends.forEach(friend => {
        const distance = calculateDistance(currentUser.location, friend.location);
        if (distance <= 1.0 && Math.random() > 0.7) { // 30% chance to show notification
            showProximityNotification(friend);
        }
    });
}

function calculateDistance(pos1, pos2) {
    // Simple distance calculation (in km)
    const R = 6371;
    const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
    const dLng = (pos2.lng - pos1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function showProximityNotification(friend) {
    const notification = document.getElementById('proximityNotification');
    if (!notification) return;
    
    // Update notification content if friend data is provided
    if (friend) {
        const img = notification.querySelector('img');
        const text = notification.querySelector('.notification-text');
        
        if (img) img.src = friend.avatar;
        if (text) text.innerHTML = `<strong>${friend.name}</strong> is nearby (${friend.distance}km away)`;
    }
    
    notification.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Interactive Elements
function initializeInteractions() {
    // Like buttons
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleLike(this);
        });
    });
    
    // Join room buttons
    const joinRoomBtns = document.querySelectorAll('.join-room-btn');
    joinRoomBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            joinRoom(this);
        });
    });
    
    // Connect buttons
    const connectBtns = document.querySelectorAll('.connect-btn');
    connectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            connectWithUser(this);
        });
    });
    
    // Status creation
    const postBtn = document.querySelector('.post-btn');
    if (postBtn) {
        postBtn.addEventListener('click', createStatusPost);
    }
    
    // Status item clicks
    const statusItems = document.querySelectorAll('.status-item');
    statusItems.forEach(item => {
        item.addEventListener('click', function() {
            viewStatus(this);
        });
    });
    
    // Badge actions
    const thankBtns = document.querySelectorAll('.thank-btn');
    thankBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sendThanks(this);
        });
    });
    
    const displayBtns = document.querySelectorAll('.display-btn');
    displayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addToProfile(this);
        });
    });
    
    // Notification action
    const notificationAction = document.querySelector('.notification-action');
    if (notificationAction) {
        notificationAction.addEventListener('click', function() {
            sayHiToFriend();
        });
    }
}

function toggleLike(btn) {
    const likeCount = btn.querySelector('span');
    const currentCount = parseInt(likeCount.textContent);
    
    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        likeCount.textContent = currentCount - 1;
        btn.style.color = '#64748b';
    } else {
        btn.classList.add('liked');
        likeCount.textContent = currentCount + 1;
        btn.style.color = '#ef4444';
        
        // Add animation
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    }
}

function joinRoom(btn) {
    const roomCard = btn.closest('.room-card');
    const roomName = roomCard.querySelector('h3').textContent;
    
    // Simulate joining room
    btn.textContent = 'Joining...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'In Room';
        btn.style.background = '#10b981';
        showNotification(`🎉 Joined "${roomName}"!`);
        
        // Add user to participants
        const participantAvatars = roomCard.querySelector('.participant-avatars');
        const userAvatar = document.createElement('img');
        userAvatar.src = currentUser.avatar;
        userAvatar.alt = 'You';
        userAvatar.style.width = '30px';
        userAvatar.style.height = '30px';
        userAvatar.style.borderRadius = '50%';
        userAvatar.style.objectFit = 'cover';
        userAvatar.style.border = '2px solid white';
        userAvatar.style.marginLeft = '-8px';
        
        participantAvatars.insertBefore(userAvatar, participantAvatars.firstChild);
    }, 1000);
}

function connectWithUser(btn) {
    const userCard = btn.closest('.idea-card, .founder-card');
    const userName = userCard.querySelector('h4').textContent;
    
    btn.textContent = 'Connecting...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'Connected';
        btn.style.background = '#10b981';
        showNotification(`🤝 Connected with ${userName}!`);
    }, 1000);
}

function createStatusPost() {
    const statusText = document.querySelector('.status-text');
    const content = statusText.value.trim();
    
    if (!content) {
        showNotification('⚠️ Please enter some content for your status.');
        return;
    }
    
    // Simulate posting
    const postBtn = document.querySelector('.post-btn');
    postBtn.textContent = 'Posting...';
    postBtn.disabled = true;
    
    setTimeout(() => {
        statusText.value = '';
        postBtn.textContent = 'Post';
        postBtn.disabled = false;
        showNotification('🎉 Status posted successfully!');
        
        // In a real app, this would add the post to the feed
        addNewPostToFeed(content);
    }, 1000);
}

function addNewPostToFeed(content) {
    const feedPosts = document.querySelector('.feed-posts');
    const newPost = document.createElement('div');
    newPost.className = 'post-card';
    newPost.style.opacity = '0';
    newPost.style.transform = 'translateY(-20px)';
    
    newPost.innerHTML = `
        <div class="post-header">
            <img src="${currentUser.avatar}" alt="Your avatar" class="post-avatar">
            <div class="post-info">
                <h4>${currentUser.name}</h4>
                <p>${currentUser.major} • ${currentUser.college} • ${currentUser.year}</p>
                <span class="post-time">Just now</span>
            </div>
        </div>
        <div class="post-content">
            <p>${content}</p>
        </div>
        <div class="post-actions">
            <button class="action-btn like-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span>0</span>
            </button>
            <button class="action-btn comment-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>0</span>
            </button>
            <button class="action-btn share-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16,6 12,2 8,6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                <span>Share</span>
            </button>
        </div>
    `;
    
    feedPosts.insertBefore(newPost, feedPosts.firstChild);
    
    // Animate new post appearance
    setTimeout(() => {
        newPost.style.opacity = '1';
        newPost.style.transform = 'translateY(0)';
    }, 100);
    
    // Add event listeners to new post
    const likeBtn = newPost.querySelector('.like-btn');
    likeBtn.addEventListener('click', function() {
        toggleLike(this);
    });
}

function viewStatus(statusItem) {
    // Simulate status viewing
    statusItem.style.transform = 'scale(1.05)';
    setTimeout(() => {
        statusItem.style.transform = 'scale(1)';
    }, 200);
    
    showNotification('👀 Status viewed!');
}

function sendThanks(btn) {
    const badgeItem = btn.closest('.gifted-badge-item');
    const gifterName = badgeItem.querySelector('.gifter-name').textContent;
    
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'Thanks Sent';
        btn.style.background = '#10b981';
        showNotification(`💙 Thank you message sent to ${gifterName}!`);
    }, 1000);
}

function addToProfile(btn) {
    btn.textContent = 'Adding...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'Added';
        btn.style.background = '#10b981';
        showNotification('✨ Badge added to your profile!');
    }, 1000);
}

function sayHiToFriend() {
    const notification = document.getElementById('proximityNotification');
    showNotification('👋 Said hi to your friend!');
    notification.classList.remove('show');
}

// Utility Functions
function showNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: white;
        color: #1e293b;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 2001;
        font-weight: 500;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for selected friend suggestion
const style = document.createElement('style');
style.textContent = `
    .friend-suggestion.selected {
        background: #dbeafe !important;
        color: #1d4ed8 !important;
    }
    
    .post-card {
        transition: all 0.3s ease;
    }
    
    .action-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    .join-room-btn:disabled,
    .connect-btn:disabled {
        opacity: 0.8;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);