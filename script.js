
const form = document.getElementById("book-form");
const list = document.getElementById("book-list");

// Display all books
async function loadBooks() {
    const response = await fetch("/api/books");
    const books = await response.json();

    list.innerHTML = "";

    books.forEach((book) => {
        const item = document.createElement("div");

        item.className = "list-group-item d-flex justify-content-between align-items-center";

        item.innerHTML = `
            <div>
                <h5>${book.title}</h5>
                <p class="mb-0">Author: ${book.author}</p>
                <small>Year: ${book.year}</small>
            </div>

            <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">
                Delete
            </button>
        `;

        list.appendChild(item);
    });
}

// Add a new book
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;

    const response = await fetch("/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, author, year })
    });

    if (response.ok) {
        form.reset();
        loadBooks();
    } else {
        alert("Unable to add book. Please try again.");
    }
});

// Delete a book
async function deleteBook(id) {
    await fetch(`/api/books/${id}`, {
        method: "DELETE"
    });

    loadBooks();
}

// Load books when page opens
loadBooks();
