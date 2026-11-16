
// Get saved books from local storage
let books = JSON.parse(localStorage.getItem("books")) || [
    {
        id: "BK-101",
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        status: "Available"
    },
    {
        id: "BK-102",
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        status: "Issued"
    },
    {
        id: "BK-103",
        title: "Clean Code",
        author: "Robert Martin",
        category: "Technology",
        status: "Available"
    },
    {
        id: "BK-104",
        title: "Wings of Fire",
        author: "A. P. J. Abdul Kalam",
        category: "Biography",
        status: "Available"
    }
];

// Save books
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Update dashboard
function updateDashboard() {
    let total = document.getElementById("totalBooks");
    let available = document.getElementById("availableBooks");
    let issued = document.getElementById("issuedBooks");

    if (total) {
        total.innerText = books.length;
        available.innerText =
            books.filter(book => book.status === "Available").length;

        issued.innerText =
            books.filter(book => book.status === "Issued").length;
    }
}

// Display books in table
function displayBooks(list = books) {
    let table = document.getElementById("bookTable");

    if (!table) return;

    table.innerHTML = "";

    list.forEach((book, index) => {
        let row = table.insertRow();

        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td class="${book.status.toLowerCase()}">
                ${book.status}
            </td>
            <td>
                <button onclick="toggleStatus('${book.id}')">
                    ${book.status === "Available" ? "Issue" : "Return"}
                </button>

                <button class="delete-btn"
                onclick="deleteBook('${book.id}')">
                    Delete
                </button>
            </td>
        `;
    });
}

// Add a new book
let bookForm = document.getElementById("bookForm");

if (bookForm) {
    bookForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let id = document.getElementById("bookId").value.trim().toUpperCase();
        let title = document.getElementById("bookTitle").value.trim();
        let author = document.getElementById("bookAuthor").value.trim();
        let category = document.getElementById("bookCategory").value;

        if (books.some(book => book.id === id)) {
            alert("This Book ID already exists!");
            return;
        }

        let newBook = {
            id: id,
            title: title,
            author: author,
            category: category,
            status: "Available"
        };

        books.push(newBook);

        saveBooks();

        alert("Book added successfully!");

        bookForm.reset();
    });
}

// Issue or return a book
function toggleStatus(id) {
    let book = books.find(book => book.id === id);

    if (book) {
        if (book.status === "Available") {
            book.status = "Issued";
        } else {
            book.status = "Available";
        }

        saveBooks();
        displayBooks();
        updateDashboard();
    }
}

// Delete a book
function deleteBook(id) {
    let confirmDelete = confirm("Do you want to delete this book?");

    if (confirmDelete) {
        books = books.filter(book => book.id !== id);

        saveBooks();
        displayBooks();
        updateDashboard();
    }
}

// Search books
let searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function() {
        let search = searchInput.value.toLowerCase();

        let filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search) ||
            book.id.toLowerCase().includes(search)
        );

        displayBooks(filteredBooks);
    });
}

// Run functions when page loads
saveBooks();
displayBooks();
updateDashboard();
