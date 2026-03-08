/* =========================================
   YDS Community Forum v1.0
   Firestore + Storage Integration
========================================= */

const forumHTML = `
<div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
            <h1 class="text-3xl font-bold text-slate-900" style="font-family: 'Playfair Display', serif;">Soru Çözüm Forumu</h1>
            <p class="text-slate-500 italic mt-1">Takıldığın soruların fotoğrafını paylaş, toplulukla birlikte çöz.</p>
        </div>
        <button onclick="openNewPostModal()" class="px-6 py-3 bg-red-800 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2">
            <i class="fas fa-plus"></i> Soru Sor
        </button>
    </div>

    <!-- Stats & Filters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-6" id="forumPostsContainer">
            <!-- Posts will be injected here -->
            <div class="text-center py-20 text-slate-400">
                <i class="fas fa-circle-notch animate-spin text-3xl mb-4"></i>
                <p>Sorular yükleniyor...</p>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-info-circle text-red-800"></i> Forum Kuralları
                </h3>
                <ul class="text-sm text-slate-600 space-y-3">
                    <li class="flex gap-2"><span>•</span> <span>Sorunun fotoğrafını net çekmeye çalışın.</span></li>
                    <li class="flex gap-2"><span>•</span> <span>Saygılı bir dil kullanın.</span></li>
                    <li class="flex gap-2"><span>•</span> <span>Başkalarının sorularına yardım ederek XP kazanın.</span></li>
                </ul>
            </div>
            
            <div class="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h3 class="font-bold text-red-900 mb-2">🔥 Yardımlaşma</h3>
                <p class="text-sm text-red-800 opacity-80 leading-relaxed">
                    Bugün 12 yeni soru soruldu. Yardım etmek için sorulara göz at!
                </p>
            </div>
        </div>
    </div>
</div>

<!-- NEW POST MODAL -->
<div id="newPostModal" class="fixed inset-0 bg-black/60 z-[300] hidden items-center justify-center p-4">
    <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-xl font-bold text-slate-900">Yeni Soru Paylaş</h3>
            <button onclick="closeNewPostModal()" class="text-slate-400 hover:text-red-800"><i class="fas fa-times text-xl"></i></button>
        </div>
        <div class="p-6 space-y-4">
            <div>
                <label class="block text-sm font-bold text-slate-700 mb-1">Başlık</label>
                <input id="postTitle" type="text" placeholder="Örn: Tense sorusunda takıldım" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-red-800 outline-none">
            </div>
            <div>
                <label class="block text-sm font-bold text-slate-700 mb-1">Açıklama</label>
                <textarea id="postDescription" placeholder="Sorunla ilgili eklemek istediğin bir şey var mı?" class="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-red-800 outline-none h-24"></textarea>
            </div>
            <div>
                <label class="block text-sm font-bold text-slate-700 mb-1">Soru Fotoğrafı</label>
                <label for="postImage" class="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors group">
                    <i class="fas fa-camera text-2xl text-slate-300 group-hover:text-red-800 transition-colors mb-2"></i>
                    <span class="text-xs text-slate-400" id="fileLabel">Fotoğraf Seç veya Sürükle</span>
                    <input id="postImage" type="file" accept="image/*" class="hidden" onchange="updateFileLabel(this)">
                </label>
            </div>
            <button id="submitPostBtn" onclick="handlePostSubmit()" class="w-full py-3 bg-red-800 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2">
                Paylaş
            </button>
        </div>
    </div>
</div>
`;

function initForum() {
    const { onSnapshot, collection, query, orderBy, db } = window.firebaseExports;

    const container = document.getElementById("forumPostsContainer");
    if (!container) return;

    // Set up real-time listener for posts
    const q = query(collection(db, "forum_posts"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderPosts(posts);
    });
}

function renderPosts(posts) {
    const container = document.getElementById("forumPostsContainer");
    if (!container) return;

    if (posts.length === 0) {
        container.innerHTML = `
            <div class="bg-white p-12 rounded-2xl border border-dashed border-slate-200 text-center">
                <i class="fas fa-comments text-4xl text-slate-200 mb-4"></i>
                <h3 class="text-xl font-bold text-slate-900">Henüz soru yok</h3>
                <p class="text-slate-500 mt-2">İlk soruyu sen sorarak tartışmayı başlat!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = posts.map(post => `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:border-red-200 transition-all duration-300">
            <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-800 font-bold">
                        ${post.authorEmail ? post.authorEmail[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                        <p class="text-sm font-bold text-slate-900">${post.authorEmail || 'Anonim'}</p>
                        <p class="text-xs text-slate-400">${formatDate(post.createdAt)}</p>
                    </div>
                </div>
                
                <h3 class="text-xl font-bold text-slate-900 mb-2">${post.title}</h3>
                <p class="text-slate-600 text-sm mb-4 leading-relaxed">${post.description}</p>
                
                ${post.imageUrl ? `
                    <div class="rounded-xl overflow-hidden border border-slate-100 mb-4">
                        <img src="${post.imageUrl}" class="w-full h-auto max-h-[400px] object-contain bg-slate-50" loading="lazy">
                    </div>
                ` : ''}
                
                <div class="flex items-center gap-6 pt-4 border-t border-slate-50">
                    <button onclick="toggleComments('${post.id}')" class="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-800 transition-colors">
                        <i class="far fa-comment-alt"></i> ${post.commentCount || 0} Yorum
                    </button>
                    <div class="text-xs text-slate-300 ml-auto">#YDS_SORU</div>
                </div>
                
                <!-- Comments Section -->
                <div id="comments-${post.id}" class="hidden mt-6 pt-6 border-t border-slate-100 space-y-4">
                    <div id="list-comments-${post.id}" class="space-y-4">
                        <!-- Individual comments here -->
                    </div>
                    
                    <div class="flex gap-2">
                        <input id="input-comment-${post.id}" type="text" placeholder="Yorumun..." class="flex-1 px-4 py-2 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-red-800 outline-none text-sm">
                        <button onclick="submitComment('${post.id}')" class="p-2 bg-red-800 text-white rounded-lg hover:bg-black transition-colors">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

function openNewPostModal() {
    document.getElementById("newPostModal").classList.replace("hidden", "flex");
}

function closeNewPostModal() {
    document.getElementById("newPostModal").classList.replace("flex", "hidden");
}

function updateFileLabel(input) {
    const label = document.getElementById("fileLabel");
    if (input.files && input.files[0]) {
        label.innerText = "Seçildi: " + input.files[0].name;
    }
}

async function handlePostSubmit() {
    if (!window.currentUser) {
        alert("Lütfen önce giriş yapın.");
        return;
    }

    const title = document.getElementById("postTitle").value.trim();
    const description = document.getElementById("postDescription").value.trim();
    const file = document.getElementById("postImage").files[0];
    const btn = document.getElementById("submitPostBtn");

    if (!title || !description) {
        alert("Lütfen başlık ve açıklama girin.");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-circle-notch animate-spin"></i> Paylaşılıyor...`;

    try {
        let imageUrl = "";
        if (file) {
            const { ref, uploadBytes, getDownloadURL } = window.storageExports;
            const storageRef = ref(window.storage, `forum_images/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            imageUrl = await getDownloadURL(snapshot.ref);
        }

        const { addDoc, collection, serverTimestamp, db } = window.firebaseExports;
        await addDoc(collection(db, "forum_posts"), {
            title,
            description,
            imageUrl,
            authorId: window.currentUser.uid,
            authorEmail: window.currentUser.email,
            createdAt: serverTimestamp(),
            commentCount: 0
        });

        // Reset
        document.getElementById("postTitle").value = "";
        document.getElementById("postDescription").value = "";
        document.getElementById("postImage").value = "";
        document.getElementById("fileLabel").innerText = "Fotoğraf Seç veya Sürükle";

        closeNewPostModal();
        alert("Sorun paylaşıldı!");

    } catch (err) {
        console.error(err);
        alert("Bir hata oluştu: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = "Paylaş";
    }
}

async function toggleComments(postId) {
    const section = document.getElementById(`comments-${postId}`);
    const list = document.getElementById(`list-comments-${postId}`);

    if (section.classList.contains("hidden")) {
        section.classList.remove("hidden");

        // Fetch comments
        const { collection, query, orderBy, getDocs, db } = window.firebaseExports;
        list.innerHTML = `<p class="text-xs text-slate-400">Yorumlar yükleniyor...</p>`;

        const q = query(collection(db, "forum_posts", postId, "comments"), orderBy("createdAt", "asc"));
        const snapshot = await getDocs(q);
        const comments = snapshot.docs.map(doc => doc.data());

        if (comments.length === 0) {
            list.innerHTML = `<p class="text-xs text-slate-400 italic font-medium">İlk yorumu sen yap!</p>`;
        } else {
            list.innerHTML = comments.map(c => `
                <div class="bg-slate-50 p-3 rounded-lg">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-xs font-bold text-slate-900">${c.authorEmail || 'Anonim'}</span>
                        <span class="text-[10px] text-slate-400">${formatDate(c.createdAt)}</span>
                    </div>
                    <p class="text-sm text-slate-600">${c.content}</p>
                </div>
            `).join("");
        }
    } else {
        section.classList.add("hidden");
    }
}

async function submitComment(postId) {
    if (!window.currentUser) {
        alert("Lütfen önce giriş yapın.");
        return;
    }

    const input = document.getElementById(`input-comment-${postId}`);
    const content = input.value.trim();
    if (!content) return;

    try {
        const { addDoc, collection, serverTimestamp, db, doc, updateDoc, increment } = window.firebaseExports;

        // Add comment
        await addDoc(collection(db, "forum_posts", postId, "comments"), {
            content,
            authorId: window.currentUser.uid,
            authorEmail: window.currentUser.email,
            createdAt: serverTimestamp()
        });

        // Update comment count
        const postRef = doc(db, "forum_posts", postId);
        await updateDoc(postRef, {
            commentCount: increment ? increment(1) : 1 // Simple fallback if increment missing
        });

        input.value = "";
        // Refresh comments view
        const section = document.getElementById(`comments-${postId}`);
        section.classList.add("hidden");
        toggleComments(postId);

    } catch (err) {
        console.error(err);
        alert("Yorum yaparken hata oluştu: " + err.message);
    }
}

function formatDate(timestamp) {
    if (!timestamp) return "Şimdi";
    let date;
    if (timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
    } else if (timestamp instanceof Date) {
        date = timestamp;
    } else {
        return "Şimdi";
    }

    return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    });
}
