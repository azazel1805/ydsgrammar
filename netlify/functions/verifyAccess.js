async function checkAnalyzerAccess(code) {

    if (!code) {
        alert("Enter code");
        return;
    }

    const res = await fetch("/.netlify/functions/verifyAccess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
    });

    if (res.ok) {
        localStorage.setItem("analyzer_access", "true");
        unlockAnalyzerUI();
        alert("AI unlocked 🔓");
    } else {
        alert("Wrong code ❌");
    }
}
