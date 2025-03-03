let selectedProblems = [];

// Show create contest button if logged in
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("user")) {
        document.getElementById("createContestBtn").style.display = "block";
    }
    fetchCustomContests();
});

// Open contest modal
function openCreateContestModal() {
    let selectedTable = document.getElementById("selectedProblems");
    selectedTable.innerHTML = selectedProblems.map(p => `<tr><td>${p.id}</td><td>${p.name}</td></tr>`).join("");
    document.getElementById("createContestModal").style.display = "block";
}

// Close modal
function closeCreateContestModal() {
    document.getElementById("createContestModal").style.display = "none";
}

// Submit custom contest
function submitCustomContest() {
    let contestName = document.getElementById("contestName").value;
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;

    if (!contestName || !startTime || !endTime || selectedProblems.length === 0) {
        alert("Please fill all fields and select problems!");
        return;
    }

    let user = JSON.parse(localStorage.getItem("user"));

    let contestData = {
        creator: user.email,
        contestName,
        startTime,
        endTime,
        problems: selectedProblems
    };

    fetch("/api/createCustomContest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contestData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Custom contest created successfully!");
        closeCreateContestModal();
        fetchCustomContests();
    })
    .catch(error => console.error("Error creating contest:", error));
}

// Fetch custom contests
function fetchCustomContests() {
    fetch("/api/getCustomContests")
        .then(response => response.json())
        .then(data => {
            document.getElementById("customContestsList").innerHTML = data.map(contest => `
                <div class="contest-card">
                    <h3>${contest.contestName}</h3>
                    <p><strong>Created by:</strong> ${contest.creator}</p>
                    <p><strong>Start:</strong> ${contest.startTime}</p>
                    <p><strong>End:</strong> ${contest.endTime}</p>
                    <button onclick="joinContest('${contest.id}')">Join Contest</button>
                </div>
            `).join("");
        })
        .catch(error => console.error("Error fetching contests:", error));
}
 