const addBookForm = document.getElementById('addBookForm');
const bookTitleInput = document.getElementById('bookTitle');
const authorNameInput = document.getElementById('authorName');
const bookTable = document.getElementById('bookTable').getElementsByTagName('tbody')[0];

// Retrieve books from local storage or initialize empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

// Function to render book list
function renderBooks() {
  bookTable.innerHTML = ''; // Clear table

  books.forEach((book, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>
        <button class="action-btn" onclick="editBook(${index})">Edit</button>
        <button class="action-btn" onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    bookTable.appendChild(row);
  });
}

// Function to add a book
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = bookTitleInput.value.trim();
  const author = authorNameInput.value.trim();

  // Check for duplicate book
  const duplicateBook = books.some(book => book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase());

  if (duplicateBook) {
    alert('This book already exists in the library.');
  } else {
    books.push({ title, author });
    localStorage.setItem('books', JSON.stringify(books)); // Save to local storage
    renderBooks();
    addBookForm.reset();
  }
});

// Function to delete a book
function deleteBook(index) {
  books.splice(index, 1); // Remove book from array
  localStorage.setItem('books', JSON.stringify(books)); // Update local storage
  renderBooks();
}

// Function to edit a book
function editBook(index) {
  const book = books[index];
  const newTitle = prompt('Enter new title:', book.title).trim();
  const newAuthor = prompt('Enter new author:', book.author).trim();

  // Check for duplicate before updating
  const duplicateBook = books.some((b, i) => i !== index && b.title.toLowerCase() === newTitle.toLowerCase() && b.author.toLowerCase() === newAuthor.toLowerCase());

  if (duplicateBook) {
    alert('Another book with the same title and author already exists.');
  } else if (newTitle && newAuthor) {
    books[index] = { title: newTitle, author: newAuthor };
    localStorage.setItem('books', JSON.stringify(books)); // Update local storage
    renderBooks();
  }
}

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
  // Clear the logged-in user's data from local storage
  localStorage.removeItem('loggedInUser');

  // Redirect to the login page
  alert('You have been logged out.');
  window.location.href = "index.html"; // Adjust the path to your login page
});

// Initial render of books
renderBooks();