const myLibrary = [];
const booksContainer = document.querySelector("#booksContainer");
const addBookBtn = document.querySelector("#addBookBtn");
const dialogBox = document.querySelector("#dialogBox");
const closeModalBtn = document.querySelector("#closeModalBtn");
const submitBookBtn = document.querySelector("#submitBookBtn");
const bookForm = document.querySelector("#bookForm");
let displayedLibrary = [];

const bookOne = new Book("The Hobbit", "Tolkien", "Fantasy", "Oui");
const bookTwo = new Book("Dune", "Herbert", "SF", "Non");
const bookThree = new Book("Ranma 1/2", "Takahashi", "Manga", "Oui");

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
    if (bookArray[0] || bookArray[1] || bookArray[2]) {
        const newBook = new Book(
            bookArray[0],
            bookArray[1],
            bookArray[2],
            bookArray[3]
        );
        addBookToLibrary(newBook);
        loadingLibrary();
        dialogBox.close();
    } else {
        dialogBox.close();
    }
});

function Book(title, author, genre, read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.read = read;
}

Book.prototype.changeReadStatus = function () {
    if (this.read === "Non") {
        this.read = "Oui";
    } else {
        this.read = "Non";
    }
};

function addBookToLibrary(newBook) {
    return myLibrary.push(newBook);
}

addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
addBookToLibrary(bookThree);

function displayBook(book) {
    const bookCards = document.createElement("div");
    bookCards.className = "bookCards";

    const closeCards = document.createElement("div");
    closeCards.className = "closeCards";
    closeCards.innerHTML = "<i class='fa-solid fa-trash-can'></i>";

    const title = document.createElement("p");
    title.className = "bookInfos";

    const author = document.createElement("p");
    author.className = "bookInfos";

    const genre = document.createElement("p");
    genre.className = "bookInfos";

    const readStatus = document.createElement("p");
    readStatus.className = "bookInfos";

    const changeStatusBtn = document.createElement("button");
    changeStatusBtn.className = "changeBtn";

    changeStatusBtn.addEventListener("click", () => {
        book.changeReadStatus();
        readStatus.innerHTML = "<span>Emprunté : " + book.read + "</span>";
        readStatus.appendChild(changeStatusBtn);
    });

    title.textContent = "Titre : " + book.title;
    author.textContent = "Auteur•e : " + book.author;
    genre.textContent = "Genre : " + book.genre;
    changeStatusBtn.textContent = "Changer le statut";
    readStatus.innerHTML = "<span>Emprunté : " + book.read + "</span>";

    bookCards.append(closeCards, title, author, genre, readStatus);
    booksContainer.append(bookCards);
    document.querySelector("#addBookBtn").after(bookCards);
    readStatus.append(changeStatusBtn);

    closeCards.addEventListener("click", () => {
        bookCards.remove();
    });
}

function loadingLibrary() {
    if (
        myLibrary.length > 0 &&
        (displayedLibrary.length === 0 ||
            displayedLibrary.length >= myLibrary.length)
    ) {
        myLibrary.forEach((book) => {
            displayBook(book);
        });
        displayedLibrary = [...myLibrary];
    } else if (myLibrary.length > displayedLibrary.length) {
        const lastBook = myLibrary[myLibrary.length - 1];
        displayBook(lastBook);
        displayedLibrary = [...myLibrary];
    } else {
        return;
    }
}

loadingLibrary();
