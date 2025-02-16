const myLibrary = [];
const booksContainer = document.querySelector("#booksContainer");
const addBookBtn = document.querySelector("#addBookBtn");
const dialogBox = document.querySelector("#dialogBox");
const closeModalBtn = document.querySelector("#closeModalBtn");
const submitBookBtn = document.querySelector("#submitBookBtn");
const bookForm = document.querySelector("#bookForm");

addBookBtn.addEventListener("click", () => {
    dialogBox.showModal();
});

closeModalBtn.addEventListener("click", () => {
    dialogBox.close();
});

submitBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const bookInputs = [...bookForm.elements];
    const bookArray = bookInputs.map((input) => input.value);
    const newBook = new Book(bookArray[0], bookArray[1], bookArray[2]);
    addBookToLibrary(newBook);
    displayBook(newBook);
    dialogBox.close();
});

function Book(title, author, genre) {
    this.title = title;
    this.author = author;
    this.genre = genre;
}

function addBookToLibrary(newBook) {
    return myLibrary.push(newBook);
}

/* addBookToLibrary("The Hobbit", "Tolkien", "Fantasy");
addBookToLibrary("Dune", "Herbert", "SF");
addBookToLibrary("Ranma 1/2", "Takahashi", "Manga");
 */

function displayBook(book) {
    const bookCards = document.createElement("div");
    bookCards.className = "bookCards";

    const closeCards = document.createElement("div");
    closeCards.className = "closeCards";
    closeCards.innerHTML = "<i class='fa-solid fa-xmark'></i>";

    const title = document.createElement("p");
    title.className = "bookInfos";

    const author = document.createElement("p");
    author.className = "bookInfos";

    const genre = document.createElement("p");
    genre.className = "bookInfos";

    title.textContent = "Title : " + book.title;
    author.textContent = "Author : " + book.author;
    genre.textContent = "Genre : " + book.genre;

    bookCards.appendChild(closeCards);
    bookCards.appendChild(title);
    bookCards.appendChild(author);
    bookCards.appendChild(genre);
    booksContainer.appendChild(bookCards);

    closeCards.addEventListener("click", () => {
        bookCards.remove();
    });
}
