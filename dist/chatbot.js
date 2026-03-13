document.addEventListener("DOMContentLoaded", () => {
    initChatbot();
});

window.toggleChatbotWindow = function() {
    const win = document.getElementById("chatbotWindow");
    if (win) {
        win.classList.toggle("hidden");
        win.classList.toggle("flex");
        // Auto focus input when opened
        if (win.classList.contains("flex")) {
            setTimeout(() => document.getElementById("chatInput")?.focus(), 300);
        }
    }
};

function initChatbot() {
    const input = document.getElementById("chatInput");
    const btn = document.getElementById("chatSendBtn");
    const chatMessages = document.getElementById("chatMessages");

    if (!input || !btn) return;

    const sendMessage = async () => {
        const text = input.value.trim();
        if (!text) return;

        // User Message
        appendMessage("user", text);
        input.value = "";

        // Show Typing
        const typing = document.getElementById("typingIndicator");
        typing.classList.remove("hidden");
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 50);

        try {
            const response = await fetch("/.netlify/functions/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: text,
                    history: getChatHistory()
                })
            });

            const data = await response.json();
            typing.classList.add("hidden");

            if (data.reply) {
                appendMessage("bot", data.reply);
            } else {
                appendMessage("bot", "Üzgünüm, şu an bağlantı kuramıyorum. Lütfen tekrar deneyin.");
            }
        } catch (err) {
            typing.classList.add("hidden");
            appendMessage("bot", "Bir hata oluştu. Bağlantınızı kontrol edin.");
            console.error(err);
        }
    };

    btn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
}

function appendMessage(role, text) {
    const container = document.getElementById("chatMessages");
    const div = document.createElement("div");
    div.className = `flex ${role === "user" ? "justify-end" : "justify-start"}`;

    const isBot = role === "bot";
    const bg = isBot ? "bg-white border border-slate-100" : "bg-red-800 text-white";
    const rounded = isBot ? "rounded-tl-none" : "rounded-tr-none";
    const textColor = isBot ? "text-slate-800" : "text-white";

    div.innerHTML = `
        <div class="${bg} ${textColor} p-3 rounded-2xl ${rounded} max-w-[85%] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            ${isBot ? '<p class="text-[10px] font-bold mb-1 text-red-800 uppercase tracking-widest">Sınav Koçu</p>' : ""}
            <p class="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">${text}</p>
        </div>
    `;

    container.appendChild(div);
    
    // Smooth scroll to bottom
    setTimeout(() => {
        container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }, 100);
}

function getChatHistory() {
    return []; 
}
