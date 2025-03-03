//toggle contest ke liye

document.addEventListener("DOMContentLoaded", function () {
  const contestBox = document.getElementById("contestBox");
  const contestOptions = document.getElementById("contestOptions");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (contestBox && contestOptions) {
    contestBox.addEventListener("click", function (event) {
      event.preventDefault();
      contestOptions.style.display =
        contestOptions.style.display === "block" ? "none" : "block";
    });
  }

  // Login form event listener
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("login-gmail").value;
      const password = document.getElementById("login-password").value;
      console.log("Login form submitted");
      console.log("Email:", email);
      console.log("Password:", password);
      login(email, password);
    });
  }

  // Signup form event listener
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById(
        "signup-confirm-password"
      ).value;
      console.log("Signup form submitted");
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
      signup(username, email, password, confirmPassword);
    });
  }
});
//upcoming contest ke liye
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
//past contest ke liye
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

function openAuthModal() {
  document.getElementById("auth-modal").style.display = "flex";
}

function toggleAuth(mode) {
  const signupBox = document.getElementById("signup-box");
  const loginBox = document.getElementById("login-box");

  if (mode === "signup") {
    signupBox.style.display = "block";
    loginBox.style.display = "none";
  } else {
    signupBox.style.display = "none";
    loginBox.style.display = "block";
  }
}

const login = async (email, password) => {
  try {
    // Send data to the backend
    const response = await fetch("http://127.0.0.1:5001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Parse the response
    const data = await response.json();

    // Handle the response
    if (data.success) {
      alert("Login successful!");

      // Store username in localStorage for persistence
      localStorage.setItem("username", data.user.username);

      closeAuthModal(); // Close the modal after successful login
      updateUIAfterLogin(data.user.username); // Update the UI
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again.");
  }
};

async function signup() {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password"
  ).value;

  console.log(name);
  // console.log(name)
  // console.log(name)
  // console.log(name)

  if (!name || !email || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5001/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Account created successfully! You can now log in.");
      toggleAuth("login");
    } else {
      alert(data.message || "Signup failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again.");
  }
}

let isGoogleAuthInProgress = false;

// function loginWithGoogle()
//  {
//     if (isGoogleAuthInProgress) {
//         console.log("Google authentication already in progress");
//         return;
//     }

//     isGoogleAuthInProgress = true;

//     google.accounts.id.initialize(
//         {
//          clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callback: handleGoogleLogin,
//         cancel_on_tap_outside: false,
//         itp_support: true ,
//         use_fedcm_for_prompt: true
//     });

//     google.accounts.id.prompt((notification) => {

//         if (notification.isNotDisplayed() || notification.isSkippedMoment()) {

//             console.log("Google One Tap not displayed or skipped:", notification.getNotDisplayedReason() || notification.getSkippedReason());

//             isGoogleAuthInProgress = false;

//             alert("Google Sign-In prompt couldn't be displayed. Please try the regular Google Sign-In button.");

//         } else {

//             setTimeout(() => {
//                 isGoogleAuthInProgress = false;
//             }, 1000);
//         }
//     });
// }



function updateUIAfterLogin(username) {
  const loginButton = document.getElementById("loginButton");
  const userDropdown = document.getElementById("user-dropdown");
  const usernameDisplay = document.getElementById("usernameDisplay");

  if (loginButton && userDropdown && usernameDisplay) {
      loginButton.style.display = "none"; // Hide the login button
      userDropdown.style.display = "block"; // Show the user dropdown
      usernameDisplay.textContent = `👤 ${username}`; // Update the username
  } else {
      console.error("One or more elements are missing in the DOM.");
  }
}

function closeAuthModal() {
  const authModal = document.getElementById("auth-modal");
  if (authModal) {
    authModal.style.display = "none";
  }
}

window.onclick = function (event) {
  const authModal = document.getElementById("auth-modal");
  if (event.target === authModal) {
    closeAuthModal();
  }
};
window.onload = function () {
  initializeGoogleSignIn();
};

function logout() {
  console.log("Logging out");

  // Reset the login button
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
      loginButton.innerHTML = "🔒 Login";
      loginButton.onclick = openAuthModal;
      loginButton.style.display = "block"; // Ensure the login button is visible
  }

  // Hide the user dropdown
  const userDropdown = document.getElementById("user-dropdown");
  if (userDropdown) {
      userDropdown.style.display = "none"; // Hide the dropdown
  }

  // Clear the username display
  const usernameDisplay = document.getElementById("usernameDisplay");
  if (usernameDisplay) {
      usernameDisplay.textContent = ""; // Clear the username
  }

  alert("You have been logged out successfully!");
}


// Open the Profile Modal
function openProfileModal() {
  document.getElementById('cf-modal').style.display = 'flex';
}

// Close the Profile Modal
function closeProfileModal() {
  document.getElementById('cf-modal').style.display = 'none';
}

// Verify Codeforces Handle
async function verifyCFHandle() {
  let handle = document.getElementById('cf-handle').value.trim();
  
  if (handle === "") {
      showAlert("Please enter a Codeforces handle.");
      return;
  }

  try {
      let response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      let data = await response.json();
      
      if (data.status === "OK") {
          localStorage.setItem("cfHandle", handle); // Store handle
          showAlert(`Handle ${handle} connected!`);
          closeProfileModal();
      } else {
          showAlert("Invalid Codeforces handle. Please try again.");
      }
  } catch (error) {
      showAlert("Error verifying handle. Check your internet connection.");
  }
}

// Show Cute Alert Message
function showAlert(message) {
  let alertBox = document.getElementById('alert-box');
  let alertMessage = document.getElementById('alert-message');
  alertMessage.textContent = message;
  alertBox.classList.remove("hidden");
  
  setTimeout(() => alertBox.classList.add("hidden"), 3000);
}

// Redirect to Profile Page
function openProfilePage() {
  window.location.href = "profile/profile.html";
}

