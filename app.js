const myLibrary = [];
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const genre = document.querySelector("#genre");
const booksContainer = document.querySelector("#booksContainer");

function Book(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
}

function addBookToLibrary(title, author, genre) {
    const newBook = new Book(title, author, genre);
    return myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "Tolkien", "Fantasy");
addBookToLibrary("Dune", "Herbert", "SF");
addBookToLibrary("Ranma 1/2", "Takahashi", "Manga");
addBookToLibrary("The Hobbit", "Tolkien", "Fantasy");
addBookToLibrary("Dune", "Herbert", "SF");
addBookToLibrary("Ranma 1/2", "Takahashi", "Manga");
addBookToLibrary("The Hobbit", "Tolkien", "Fantasy");
addBookToLibrary("Dune", "Herbert", "SF");
addBookToLibrary("Ranma 1/2", "Takahashi", "Manga");
addBookToLibrary("The Hobbit", "Tolkien", "Fantasy");
addBookToLibrary("Dune", "Herbert", "SF");
addBookToLibrary("Ranma 1/2", "Takahashi", "Manga");
addBookToLibrary("The Hobbit", "Tolkien", "Fantasy");
addBookToLibrary("Dune", "Herbert", "SF");
addBookToLibrary("Ranma 1/2", "Takahashi", "Manga");

function displayBook() {
    myLibrary.forEach((book) => {
        const bookCards = document.createElement("div");
        bookCards.className = "bookCards";
        const title = document.createElement("p");
        title.className = "bookInfos";
        const author = document.createElement("p");
        author.className = "bookInfos";
        const genre = document.createElement("p");
        genre.className = "bookInfos";
        title.textContent = "Title : " + book.title;
        author.textContent = "Author : " + book.author;
        genre.textContent = "Genre : " + book.genre;
        bookCards.appendChild(title);
        bookCards.appendChild(author);
        bookCards.appendChild(genre);
        booksContainer.appendChild(bookCards);
    });
}

displayBook();
