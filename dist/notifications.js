/* =========================================
   IN-APP NOTIFICATIONS SYSTEM
   Firestore Real-time Listener
========================================= */

let notifications = [];

function initNotifications() {
    const checkAuth = setInterval(() => {
        if (window.currentUser && window.firebaseExports) {
            clearInterval(checkAuth);
            startNotificationListener();
        }
    }, 500);
}

function startNotificationListener() {
    const { onSnapshot, collection, query, orderBy, db, where } = window.firebaseExports;

    // Listen to notifications for current user
    const q = query(
        collection(db, "users", window.currentUser.uid, "notifications"),
        orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
        notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        updateNotificationUI();
    });
}

function updateNotificationUI() {
    const badgeDesktop = document.getElementById("notifBadgeDesktop");
    const badgeMobile = document.getElementById("notifBadgeMobile");
    const list = document.getElementById("notificationList");

    const unreadCount = notifications.filter(n => !n.read).length;

    // Toggle badges
    if (unreadCount > 0) {
        badgeDesktop?.classList.remove("hidden");
        badgeMobile?.classList.remove("hidden");
    } else {
        badgeDesktop?.classList.add("hidden");
        badgeMobile?.classList.add("hidden");
    }

    // Update List
    if (notifications.length === 0) {
        list.innerHTML = `
            <div class="p-8 text-center text-slate-400">
                <i class="fas fa-bell-slash text-2xl mb-2 opacity-20"></i>
                <p class="text-xs">Henüz bildirim yok</p>
            </div>`;
        return;
    }

    list.innerHTML = notifications.map(n => `
        <div onclick="handleClickNotification('${n.id}', '${n.link}')" 
             class="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors relative ${n.read ? 'opacity-60' : 'bg-red-50/20'}">
            <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-xs">
                    <i class="fas ${n.type === 'forum_reply' ? 'fa-comment' : 'fa-bell'}"></i>
                </div>
                <div class="flex-1">
                    <p class="text-xs font-bold text-slate-900">${n.title}</p>
                    <p class="text-[11px] text-slate-500 leading-tight mt-0.5">${n.message}</p>
                    <p class="text-[9px] text-slate-400 mt-1">${formatTimeAgo(n.createdAt)}</p>
                </div>
                ${!n.read ? '<div class="w-1.5 h-1.5 bg-red-600 rounded-full mt-1"></div>' : ''}
            </div>
        </div>
    `).join("");
}

window.toggleNotifications = function () {
    const dropdown = document.getElementById("notificationDropdown");
    dropdown.classList.toggle("hidden");
};

window.markAllAsRead = async function () {
    const { doc, updateDoc, db } = window.firebaseExports;
    const unread = notifications.filter(n => !n.read);

    for (const n of unread) {
        await updateDoc(doc(db, "users", window.currentUser.uid, "notifications", n.id), {
            read: true
        });
    }
};

window.handleClickNotification = async function (id, link) {
    const { doc, updateDoc, db } = window.firebaseExports;

    // Mark as read
    await updateDoc(doc(db, "users", window.currentUser.uid, "notifications", id), {
        read: true
    });

    // Close dropdown
    document.getElementById("notificationDropdown").classList.add("hidden");

    // Navigate
    if (link) {
        const [tab, extra] = link.split("/");
        if (typeof window.switchTab === "function") {
            window.switchTab(tab);
            // If it's a forum link, we might want to scroll to post or something, but switchTab is enough for now
        }
    }
};

// HELPER: Send notification to a specific user
window.createNotification = async function (targetUserId, notifData) {
    const { addDoc, collection, serverTimestamp, db } = window.firebaseExports;

    await addDoc(collection(db, "users", targetUserId, "notifications"), {
        ...notifData,
        read: false,
        createdAt: serverTimestamp()
    });
};

function formatTimeAgo(timestamp) {
    if (!timestamp) return "Şimdi";
    const seconds = timestamp.seconds ? timestamp.seconds : Math.floor(timestamp / 1000);
    const diff = Math.floor(Date.now() / 1000) - seconds;

    if (diff < 60) return "Az önce";
    if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} saat önce`;
    return new Date(seconds * 1000).toLocaleDateString('tr-TR');
}

// Close dropdown on click outside
document.addEventListener("click", (e) => {
    const dropdown = document.getElementById("notificationDropdown");
    const bellButtons = document.querySelectorAll("button[onclick='toggleNotifications()']");

    let isClickInside = dropdown.contains(e.target);
    bellButtons.forEach(btn => {
        if (btn.contains(e.target)) isClickInside = true;
    });

    if (!isClickInside && !dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden");
    }
});

// Start the system
document.addEventListener("DOMContentLoaded", initNotifications);
