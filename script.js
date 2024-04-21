document.addEventListener("DOMContentLoaded", function () {
  displayBooks();
});

function getBooks() {
  let books = localStorage.getItem("books");
  if (books) {
    return JSON.parse(books);
  } else {
    return [];
  }
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

  if (title.trim() && author.trim() && year.trim()) {
    const book = {
      id: +new Date(),
      title: title,
      author: author,
      year: parseInt(year),
      isComplete: inputBookIsComplete,
    };

    let books = getBooks();
    books.push(book);
    saveBooks(books);

    displayBooks();
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
  }
}

function displayBooks(booksToShow) {
  const unfinishedBooks = document.getElementById("unfinished-books");
  const finishedBooks = document.getElementById("finished-books");

  unfinishedBooks.innerHTML = "";
  finishedBooks.innerHTML = "";

  let books = getBooks();
  if (booksToShow) {
    books = books.filter((book) => book.title.toLowerCase().includes(booksToShow.toLowerCase()));
  }

  books.forEach((book) => {
    const li = document.createElement("li");
    li.classList.add("book");
    li.innerHTML = `
        <span>${book.title} (${book.year}) by ${book.author}</span>
        <button onclick="toggleStatus(${book.id})">${book.isComplete ? "Belum Selesai" : "Selesai"}</button>
        <button onclick="deleteBook(${book.id})">Hapus</button>
      `;
    if (book.isComplete) {
      finishedBooks.appendChild(li);
    } else {
      unfinishedBooks.appendChild(li);
    }
  });
}

function toggleStatus(id) {
  let books = getBooks();
  books.forEach((book) => {
    if (book.id === id) {
      book.isComplete = !book.isComplete;
    }
  });
  saveBooks(books);
  displayBooks();
}

function deleteBook(id) {
  if (confirm("Anda yakin ingin menghapus buku ini?")) {
    let books = getBooks();
    books = books.filter((book) => book.id !== id);
    saveBooks(books);
    displayBooks();
  }
}

function searchBooks() {
  const searchInput = document.getElementById("search").value;
  displayBooks(searchInput);
}
