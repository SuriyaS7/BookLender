// Retrieve the logged-in user's username
const loggedInUser = localStorage.getItem('loggedInUser');

// Validate if the user is logged in; otherwise, redirect to login page
if (!loggedInUser) {
  alert('No logged-in user found. Redirecting to login...');
  window.location.href = "index.html"; // Redirect to login page
}

const viewBooksTab = document.getElementById('viewBooksTab');
const lendedBooksTab = document.getElementById('lendedBooksTab');
const viewBooksSection = document.getElementById('viewBooksSection');
const lendedBooksSection = document.getElementById('lendedBooksSection');
const availableBooksTable = document.getElementById('availableBooksTable').getElementsByTagName('tbody')[0];
const lendedBooksTable = document.getElementById('lendedBooksTable').getElementsByTagName('tbody')[0];
const lendBookPopup = document.getElementById('lendBookPopup');
const lendBookForm = document.getElementById('lendBookForm');
const lendBookTitle = document.getElementById('lendBookTitle');
const lendFromDate = document.getElementById('lendFromDate');
const lendToDate = document.getElementById('lendToDate');
const closePopup = document.getElementById('closePopup');

// Retrieve books from local storage or initialize empty arrays
let books = JSON.parse(localStorage.getItem('books')) || [];
let lendedBooks = JSON.parse(localStorage.getItem('lendedBooks')) || [];

// Render available books to the table
function renderBooks() {
  availableBooksTable.innerHTML = '';
  books.forEach((book, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td><button class="action-btn" onclick="openLendPopup(${index})">Lend</button></td>
    `;
    availableBooksTable.appendChild(row);
  });
}

// Render lended books specific to the logged-in user
function renderLendedBooks() {
  lendedBooksTable.innerHTML = '';
  lendedBooks
    .filter(book => book.username === loggedInUser) // Filter books by username
    .forEach((book, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.fromDate}</td>
        <td>${book.toDate}</td>
        <td><button class="action-btn" onclick="closeLend(${index})">Close Lend</button></td>
      `;
      lendedBooksTable.appendChild(row);
    });
}

// Open lending popup
function openLendPopup(index) {
  const book = books[index];
  lendBookTitle.value = book.title;
  lendBookPopup.classList.remove('hidden');
}

// Close lending popup
closePopup.addEventListener('click', () => {
  lendBookPopup.classList.add('hidden');
});

// Handle book lending
lendBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = lendBookTitle.value;
  const fromDate = lendFromDate.value;
  const toDate = lendToDate.value;

  if (!loggedInUser) {
    alert('No logged-in user found. Please log in again.');
    return;
  }

  lendedBooks.push({ title, fromDate, toDate, username: loggedInUser }); // Correctly associate username
  localStorage.setItem('lendedBooks', JSON.stringify(lendedBooks)); // Save to local storage
  renderLendedBooks();

  lendBookPopup.classList.add('hidden');
  lendBookForm.reset();
});

// Handle closing a lend
function closeLend(index) {
  const userSpecificBooks = lendedBooks.filter(book => book.username === loggedInUser);
  const bookToRemove = userSpecificBooks[index];
  const globalIndex = lendedBooks.indexOf(bookToRemove); // Find the global index in the full array

  lendedBooks.splice(globalIndex, 1); // Remove the book
  localStorage.setItem('lendedBooks', JSON.stringify(lendedBooks)); // Update local storage
  renderLendedBooks();
}

// Tab switching for "View Books" and "Lended Books"
viewBooksTab.addEventListener('click', () => {
  viewBooksSection.classList.remove('hidden');
  lendedBooksSection.classList.add('hidden');
});

lendedBooksTab.addEventListener('click', () => {
  lendedBooksSection.classList.remove('hidden');
  viewBooksSection.classList.add('hidden');
});

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
  // Clear the logged-in user's data from local storage
  localStorage.removeItem('loggedInUser');

  // Redirect to the login page
  alert('You have been logged out.');
  window.location.href = "index.html"; // Adjust the path to your login page
});

// Initial rendering
renderBooks();
renderLendedBooks();
