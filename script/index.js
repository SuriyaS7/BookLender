const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Switch between login and register forms
loginBtn.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');
});

registerBtn.addEventListener('click', () => {
  registerForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});

// Handle registration
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('registerUsername').value.trim("");
  const password = document.getElementById('registerPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    alert('Username already exists. Please choose a different one.');
  } else {
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Redirecting to login...');
    registerForm.reset();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  }
});

// Handle login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', username);
    if (username === "admin") {
      alert('Welcome Admin! Redirecting to admin dashboard...');
      window.location.href = "admindashboard.html";
    } else {
      alert('Welcome! Redirecting to user dashboard...');
      window.location.href = "userdashboard.html";
    }
  } else {
    alert('Invalid username or password.');
  }
});
