document.addEventListener("DOMContentLoaded", function() {
    const contestBox = document.getElementById("contestBox");
    const contestOptions = document.getElementById("contestOptions");
    
    // Toggle contest options on click
    contestBox.addEventListener("click", function(event) {
        event.preventDefault();
        contestOptions.style.display = contestOptions.style.display === "block" ? "none" : "block";
    });
    
    // Add form submission handlers
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            login();
        });
    }
    
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", function(event) {
            event.preventDefault();
            signup();
        });
    }
});
function toggleContests() {
    let contestOptions = document.getElementById("contestOptions");
    
    // Toggle visibility
    if (contestOptions.style.display === "none") {
        contestOptions.style.display = "block";
    } else {
        contestOptions.style.display = "none";
    }
}

function toggleContests() {
    let contestOptions = document.getElementById("contestOptions");
    
    // Toggle visibility
    if (contestOptions.style.display === "none") {
        contestOptions.style.display = "block";
    } else {
        contestOptions.style.display = "none";
    }
}

// Show upcoming contests on the main page (horizontal layout)
function showUpcoming() {
    document.getElementById("contestDisplay").innerHTML = `
      
        <div class="contest-list">
            <div class="contest-card">
                <h3>Spring Challenge</h3>
                <p><strong>Date:</strong> March 15, 2025</p>
                <p><strong>Duration:</strong> 2 hours</p>
                <button class="join-btn">Join Now</button>
            </div>
            
            <div class="contest-card">
                <h3>Algorithmic Marathon</h3>
                <p><strong>Date:</strong> March 22, 2025</p>
                <p><strong>Duration:</strong> 3 hours</p>
                <button class="join-btn">Join Now</button>
            </div>
            
            <div class="contest-card">
                <h3>Code Sprint</h3>
                <p><strong>Date:</strong> March 29, 2025</p>
                <p><strong>Duration:</strong> 1.5 hours</p>
                <button class="join-btn">Join Now</button>
            </div>
            <div class="contest-card">
                <h3>Spring Challenge</h3>
                <p><strong>Date:</strong> March 15, 2025</p>
                <p><strong>Duration:</strong> 2 hours</p>
                <button class="join-btn">Join Now</button>
            </div>
            
            <div class="contest-card">
                <h3>Algorithmic Marathon</h3>
                <p><strong>Date:</strong> March 22, 2025</p>
                <p><strong>Duration:</strong> 3 hours</p>
                <button class="join-btn">Join Now</button>
            </div>
            
            <div class="contest-card">
                <h3>Code Sprint</h3>
                <p><strong>Date:</strong> March 29, 2025</p>
                <p><strong>Duration:</strong> 1.5 hours</p>
                <button class="join-btn">Join Now</button>
            </div>
        </div>
    `;
}

// Show past contests on the main page (horizontal layout)
function showPast() {
    document.getElementById("contestDisplay").innerHTML = `
       
        <div class="contest-list">
            <div class="contest-card">
                <h3>Winter Clash</h3>
                <p><strong>Date:</strong> January 10, 2025</p>
                <p><strong>Duration:</strong> 2.5 hours</p>
                <button class="join-btn">View Results</button>
            </div>
            
            <div class="contest-card">
                <h3>Autumn Code</h3>
                <p><strong>Date:</strong> November 25, 2024</p>
                <p><strong>Duration:</strong> 3 hours</p>
                <button class="join-btn">View Results</button>
            </div>
             <div class="contest-card">
                <h3>Winter Clash</h3>
                <p><strong>Date:</strong> January 10, 2025</p>
                <p><strong>Duration:</strong> 2.5 hours</p>
                <button class="join-btn">View Results</button>
            </div>
            
            <div class="contest-card">
                <h3>Autumn Code</h3>
                <p><strong>Date:</strong> November 25, 2024</p>
                <p><strong>Duration:</strong> 3 hours</p>
                <button class="join-btn">View Results</button>
            </div>
             <div class="contest-card">
                <h3>Winter Clash</h3>
                <p><strong>Date:</strong> January 10, 2025</p>
                <p><strong>Duration:</strong> 2.5 hours</p>
                <button class="join-btn">View Results</button>
            </div>
            
            <div class="contest-card">
                <h3>Autumn Code</h3>
                <p><strong>Date:</strong> November 25, 2024</p>
                <p><strong>Duration:</strong> 3 hours</p>
                <button class="join-btn">View Results</button>
            </div>
             <div class="contest-card">
                <h3>Winter Clash</h3>
                <p><strong>Date:</strong> January 10, 2025</p>
                <p><strong>Duration:</strong> 2.5 hours</p>
                <button class="join-btn">View Results</button>
            </div>
            
            <div class="contest-card">
                <h3>Autumn Code</h3>
                <p><strong>Date:</strong> November 25, 2024</p>
                <p><strong>Duration:</strong> 3 hours</p>
                <button class="join-btn">View Results</button>
            </div>
        </div>
    `;
}


// Auth modal functions
function openAuthModal() {
    document.getElementById('auth-modal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

function toggleAuth(mode) {
    if (mode === 'signup') {
        document.getElementById('signup-box').style.display = 'block';
        document.getElementById('login-box').style.display = 'none';
    } else {
        document.getElementById('signup-box').style.display = 'none';
        document.getElementById('login-box').style.display = 'block';
    }
}

// Authentication functions
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Here you would typically send these credentials to your server
    console.log("Login attempt:", email);
    
    // For demo purposes, we'll just close the modal and update the UI
    alert("Login successful!");
    closeAuthModal();
    updateUIAfterLogin(email);
}

function loginWithGoogle() {
    // In a real application, this would integrate with Google OAuth
    console.log("Google login attempted");
    
    // For demo purposes
    alert("Google login successful!");
    closeAuthModal();
    updateUIAfterLogin("user@gmail.com");
}

function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validation
    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }
    
    // Here you would typically send this data to your server
    console.log("Signup attempt:", name, email);
    
    // For demo purposes
    alert("Account created successfully! You can now log in.");
    toggleAuth('login');
}


// Close modal when clicking outside content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeAuthModal();
    }
}

function logout() {
    // In a real app, you would clear session/tokens here
    console.log("Logging out");
    
    // Reset the login button to original state
    const loginButton = document.getElementById('loginButton');
    loginButton.innerHTML = '🔒 Login';
    loginButton.onclick = openAuthModal;
    
    // Hide the user menu if it's visible
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
        userMenu.style.display = 'none';
    }
    
    alert("You have been logged out successfully!");
}

function updateUIAfterLogin(email) {
    // Update the login button to show the user is logged in
    const loginButton = document.getElementById('loginButton');
    const username = email.split('@')[0];
    loginButton.innerHTML = '👤 ' + username;
    
    // Remove the original onclick and add a new one to toggle user menu
    loginButton.onclick = function() {
        const userMenu = document.getElementById('user-menu');
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
    };
    
    // Create user menu if it doesn't exist
    if (!document.getElementById('user-menu')) {
        const userMenu = document.createElement('div');
        userMenu.id = 'user-menu';
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <a href="#" id="profile-link">Profile</a>
            <a href="#" id="settings-link">Settings</a>
            <a href="#" id="logout-link">Logout</a>
        `;
        document.querySelector('.nav').appendChild(userMenu);
        
        // Add logout event listener
        document.getElementById('logout-link').addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const contestSection = document.getElementById("contestList"); // Contest list section
    const problemsetSection = document.getElementById("problemset-section"); // Problemset section

    const contestBtn = document.getElementById("contest-btn"); // Contest button
    const problemsetBtn = document.getElementById("problemset-btn"); // Problemset button

    // Ensure both sections exist before proceeding
    if (!contestSection || !problemsetSection || !contestBtn || !problemsetBtn) {
        console.error("One or more elements not found! Check your HTML IDs.");
        return;
    }

    // Initially, show the contest section and hide the problemset
    contestSection.style.display = "block";
    problemsetSection.style.display = "none";

    // When clicking "Problemset", show it and hide contest section
    problemsetBtn.addEventListener("click", function () {
        console.log("Problemset button clicked!");
        contestSection.style.display = "none"; // Hide contest section
        problemsetSection.style.display = "block"; // Show problemset section
    });

    // When clicking "Contests", show it and hide problemset section
    contestBtn.addEventListener("click", function () {
        console.log("Contests button clicked!");
        contestSection.style.display = "block"; // Show contest section
        problemsetSection.style.display = "none"; // Hide problemset section
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const problemsetLink = document.querySelector("#problemset-link"); // Link to problemset
    const contestTitle = document.querySelector("#contestTitle"); // "Upcoming Contests" section
    const problemsetSection = document.querySelector("#problemset-section"); // Problemset section

    problemsetLink.addEventListener("click", function () {
        contestTitle.style.display = "none"; 
        problemsetSection.style.display = "block"; 
    });
});

// problemset function 
document.addEventListener("DOMContentLoaded", function () {
    const contestSection = document.getElementById("contestDisplay");
    const problemsetSection = document.getElementById("problemsetDisplay");
    const contestBtn = document.getElementById("contest-btn");
    const problemsetBtn = document.getElementById("problemset-btn");

    // Show contests by default, hide problemset
    contestSection.style.display = "block";
    problemsetSection.style.display = "none";

    // When clicking "Problemset", show it and hide contest section
    problemsetBtn.addEventListener("click", function () {
        problemsetSection.style.display = "block";
        contestSection.style.display = "none";
    });

    // When clicking "Contests", show it and hide problemset section
    contestBtn.addEventListener("click", function () {
        contestSection.style.display = "block";
        problemsetSection.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const contestSection = document.getElementById("contestDisplay");
    const problemsetSection = document.getElementById("problemsetDisplay");
    const contestBtn = document.getElementById("contest-btn");
    const problemsetBtn = document.getElementById("problemset-btn");
    const problemTable = document.getElementById("problemTableBody");

    let problemsFetched = false; // Prevent multiple API calls

    // Function to switch between sections
    function showSection(show, hide) {
        hide.style.opacity = "0";
        setTimeout(() => {
            hide.style.display = "none";
            show.style.display = "block";
            setTimeout(() => (show.style.opacity = "1"), 50);
        }, 300);
    }

    // Clicking "Problemset" hides contests and shows problems
    problemsetBtn.addEventListener("click", function () {
        showSection(problemsetSection, contestSection);
        
        // Fetch problems only if they haven't been fetched before
        if (!problemsFetched) {
            fetch("https://codeforces.com/api/problemset.problems")
                .then(response => response.json())
                .then(data => {
                    if (data.status === "OK") {
                        let problems = data.result.problems.slice(0, 100); // Fetch only first 100 for performance

                        // Generate HTML rows for problems
                        let html = problems.map(problem => {
                            let problemLink = `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
                            return `
                                <tr>
                                    <td class="problem-id">${problem.contestId}${problem.index}</td>
                                    <td><a href="${problemLink}" target="_blank">${problem.name}</a></td>
                                    <td>${problem.rating ? problem.rating : "Unrated"}</td>
                                    <td>${problem.tags.length > 0 ? problem.tags.join(", ") : "No Tags"}</td>
                                </tr>
                            `;
                        }).join("");

                        // Insert problems into table
                        problemTable.innerHTML = html;
                        problemsFetched = true; // Set flag to prevent multiple requests
                    }
                })
                .catch(error => console.error("Error fetching problems:", error));
        }
    });

    // Clicking "Contests" hides problemset and shows contests
    contestBtn.addEventListener("click", function () {
        showSection(contestSection, problemsetSection);
    });

    // Ensure clicking on "Upcoming Contests" or "Past Contests" updates the contest section
    document.querySelectorAll("#contestOptions a").forEach(item => {
        item.addEventListener("click", function () {
            showSection(contestSection, problemsetSection);
        });
    });
});
