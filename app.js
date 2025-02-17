let myLibrary = [];
const booksContainer = document.querySelector("#booksContainer");
const addBookBtn = document.querySelector("#addBookBtn");
const dialogBox = document.querySelector("#dialogBox");
const closeModalBtn = document.querySelector("#closeModalBtn");
const submitBookBtn = document.querySelector("#submitBookBtn");
const bookForm = document.querySelector("#bookForm");
const dialogContainer = document.querySelector("#dialogContainer");
const searchInput = document.querySelector("#searchInput");
let displayedLibrary = [];
let searchValue;
let removeBook = false;

const bookOne = new Book("The Hobbit", "Tolkien", "Fantasy", "Oui", "1tol");
const bookTwo = new Book("Dune", "Herbert", "SF", "Non", "2her");
const bookThree = new Book("Ranma 1/2", "Takahashi", "Manga", "Oui", "3tak");

//Fermer et ouvrir la dialog box
addBookBtn.addEventListener("click", () => {
    dialogBox.showModal();
});
closeModalBtn.addEventListener("click", () => {
    dialogBox.close();
});
dialogBox.addEventListener("click", () => dialogBox.close());
dialogContainer.addEventListener("click", (event) => event.stopPropagation());

//Soumettre nouveau livre
submitBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const bookInputs = [...bookForm.elements];
    const bookArray = bookInputs.map((input) => input.value);
    const generatedId = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 7)}`;

    bookArray.push(generatedId);
    if (bookArray) {
        const newBook = new Book(
            bookArray[0],
            bookArray[1],
            bookArray[2],
            bookArray[3],
            bookArray[4]
        );
        addBookToLibrary(newBook);
        loadingLibrary();
        dialogBox.close();
    } else {
        dialogBox.close();
    }
});

//Prototype objet livre
function Book(title, author, genre, read, bookId) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.read = read;
    this.bookId = bookId;
}

Book.prototype.changeReadStatus = function () {
    this.read === "Oui" ? (this.read = "Non") : (this.read = "Oui");
};

//Ajouter et afficher des livres dans la bibliothèque
function addBookToLibrary(newBook) {
    return myLibrary.push(newBook);
}

addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
addBookToLibrary(bookThree);
function displayBook(book, removeBook) {
    const bookCards = document.createElement("div");
    bookCards.className = "bookCards";
    bookCards.id = book.bookId;
    if (removeBook) {
        document.getElementById(book.bookId).remove();
        return;
    }
    const closeCards = document.createElement("div");
    closeCards.className = "closeCards";
    closeCards.innerHTML = "<i class='fa-solid fa-trash-can'></i>";

    closeCards.addEventListener("click", () => {
        bookCards.remove();
        myLibrary = myLibrary.filter((object) => object.bookId !== book.bookId);
        /*  booksContainer.innerHTML = "";
        booksContainer.append(addBookBtn);
        loadingLibrary(); */
    });

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

//rechercher dans la barre de recherche
function searchLibrary() {
    searchInput.addEventListener("input", (event) => {
        const searchValue = event.target.value.toLowerCase();
        booksContainer.innerHTML = "";
        booksContainer.append(addBookBtn);

        if (searchValue === "") {
            loadingLibrary();
        } else {
            myLibrary.forEach((book) => {
                const matchesSearch = [
                    book.title,
                    book.author,
                    book.genre,
                ].some((field) => field.toLowerCase().includes(searchValue));

                if (matchesSearch) {
                    displayBook(book);
                }
            });
        }
    });
}

loadingLibrary();
searchLibrary();
