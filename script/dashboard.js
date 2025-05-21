const userBtn = document.getElementById('userBtn');
const adminBtn = document.getElementById('adminBtn');
const userSection = document.getElementById('userSection');
const adminSection = document.getElementById('adminSection');

userBtn.addEventListener('click', () => {
  userSection.classList.remove('hidden');
  adminSection.classList.add('hidden');
});

adminBtn.addEventListener('click', () => {
  adminSection.classList.remove('hidden');
  userSection.classList.add('hidden');
});

const lendBookForm = document.getElementById('lendBookForm');
const addBookForm = document.getElementById('addBookForm');

// Handle lending book
lendBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Book lending recorded. Enjoy your read!');
});

// Handle adding book
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Book added successfully!');
});