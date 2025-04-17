// Simulating a simple in-memory database
let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to save users to localStorage
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

// Sign Up Functionality
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        if (users.find(user => user.email === email)) {
            alert("Email already exists!");
            return;
        }

        users.push({ name, email, password });
        saveUsers();
        alert("Sign up successful! Please log in.");
        window.location.href = 'login.html';
    });
}

// Login Functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            alert("Invalid email or password!");
        }
    });
}

// Logout Functionality
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}

// Check if user is logged in
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser && window.location.pathname !== '/login.html' && window.location.pathname !== '/signup.html' && window.location.pathname !== '/index.html') {
        window.location.href = 'login.html';
    }
}

// Run checkAuth on page load
checkAuth();