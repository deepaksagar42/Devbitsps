document.addEventListener("DOMContentLoaded", function () {
    loadProfile();
});

function loadProfile() {
    const username = localStorage.getItem("username") || "Guest";
    const cfHandle = localStorage.getItem("codeforcesHandle");

    document.getElementById("usernameDisplay").innerText = username;
    
    if (cfHandle) {
        document.getElementById("cfHandleDisplay").innerText = cfHandle;
        document.getElementById("connect-section").style.display = "none";
        document.getElementById("disconnect-btn").style.display = "block";
    }
}

async function verifyHandle() {
    const handle = document.getElementById("cf-handle").value.trim();
    if (!handle) {
        alert("Please enter a Codeforces handle!");
        return;
    }

    const apiUrl = `https://codeforces.com/api/user.info?handles=${handle}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === "OK") {
            localStorage.setItem("codeforcesHandle", handle);
            document.getElementById("cfHandleDisplay").innerText = handle;
            document.getElementById("connect-section").style.display = "none";
            document.getElementById("disconnect-btn").style.display = "block";
            document.getElementById("verification-result").innerText = "✅ Handle Verified & Connected!";
        } else {
            document.getElementById("verification-result").innerText = "❌ Handle Not Found!";
        }
    } catch (error) {
        document.getElementById("verification-result").innerText = "⚠️ Error verifying handle. Try again later.";
    }
}

function disconnectHandle() {
    localStorage.removeItem("codeforcesHandle");
    document.getElementById("cfHandleDisplay").innerText = "Not Connected";
    document.getElementById("connect-section").style.display = "block";
    document.getElementById("disconnect-btn").style.display = "none";
}

function goBack() {
    window.location.href = "../frontendlogin/index.html";  // Adjust if needed
}
