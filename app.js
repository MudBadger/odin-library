let myLibrary = [];
const booksContainer = document.querySelector("#booksContainer");
const addBookBtn = document.querySelector("#addBookBtn");
const newBookBox = document.querySelector("#newBookBox");
const deleteCardBox = document.querySelector("#deleteCardBox");
const closeNewBookBoxBtn = document.querySelector("#closeNewBookBoxBtn");
const submitNewBookBtn = document.querySelector("#submitNewBookBtn");
const newBookForm = document.querySelector("#newBookForm");
const newBookContainer = document.querySelector("#newBookContainer");
let searchValue;
const searchInput = document.querySelector("#searchInput");
const emptySearchInputBtn = document.querySelector("#emptySearchInputBtn");
let removeBook = false;
const cancelDeleteCardBtn = document.querySelector("#cancelDeleteCardBtn");
const deleteCardContainer = document.querySelector("#deleteCardContainer");
const borrowed = "Emprunté";
const available = "Disponible";

const bookOne = new Book(
    "The Hobbit",
    "Tolkien",
    "Fantasy",
    "Disponible",
    "1tol"
);
const bookTwo = new Book("Dune", "Herbert", "SF", "Emprunté", "2her");
const bookThree = new Book(
    "Ranma 1/2",
    "Takahashi",
    "Manga",
    "Disponible",
    "3tak"
);

//Fermer et ouvrir la dialog box
addBookBtn.addEventListener("click", () => {
    newBookBox.showModal();
});
closeNewBookBoxBtn.addEventListener("click", () => {
    newBookBox.close();
});
newBookBox.addEventListener("click", () => newBookBox.close());
newBookContainer.addEventListener("click", (event) => event.stopPropagation());

cancelDeleteCardBtn.addEventListener("click", () => deleteCardBox.close());

deleteCardBox.addEventListener("click", () => deleteCardBox.close());
deleteCardContainer.addEventListener("click", (event) =>
    event.stopPropagation()
);

emptySearchInputBtn.addEventListener("click", () => {
    searchInput.value = "";
    loadingLibrary();
});

searchInput.addEventListener("keypress", (event) => {
    if (event.code === "Enter") {
        searchLibrary();
    }
});
searchInput.addEventListener("input", () => searchLibrary());
//Soumettre nouveau livres
submitNewBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const bookInputs = [...newBookForm.elements];
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
            bookInputs[3].checked ? borrowed : available,
            bookArray[4]
        );
        addBookToLibrary(newBook);
        loadingLibrary();
        newBookBox.close();
    } else {
        newBookBox.close();
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
    this.read === borrowed ? (this.read = available) : (this.read = borrowed);
};

//Ajouter et afficher des livres dans la bibliothèque
function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

addBookToLibrary(bookOne);
addBookToLibrary(bookTwo);
addBookToLibrary(bookThree);

function deleteBook(bookId, bookCard) {
    const deleteCardBtn = document.querySelector("#deleteCardBtn");

    deleteCardBtn.addEventListener("click", () => {
        deleteCardBox.close();
        bookCard.remove();
        myLibrary = myLibrary.filter((object) => object.bookId !== bookId);
        loadingLibrary();
    });
}

function displayChangeStatusBtn(book, changeStatusBtn) {
    if (book.read === borrowed) {
        changeStatusBtn.innerHTML =
            "<i class='fa-solid fa-xmark xChangeStatus'></i>";
    } else {
        changeStatusBtn.innerHTML =
            "<i class='fa-solid fa-check checkChangeStatus'></i>";
    }
}

function displayBook(book, removeBook) {
    const bookCard = document.createElement("div");
    bookCard.className = "bookCard";
    bookCard.id = book.bookId;
    if (removeBook) {
        document.getElementById(book.bookId).remove();
        return;
    }
    const deleteCardBtn = document.createElement("div");
    deleteCardBtn.className = "deleteCardBtn";
    deleteCardBtn.innerHTML = "<i class='fa-solid fa-trash-can'></i>";

    deleteCardBtn.addEventListener("click", () => {
        deleteCardBox.showModal();
        deleteBook(book.bookId, bookCard);
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
    changeStatusBtn.className = "changeStatusBtn";

    changeStatusBtn.addEventListener("click", () => {
        book.changeReadStatus();
        readStatus.innerHTML = `<span>${book.read}</span>`;
        displayChangeStatusBtn(book, changeStatusBtn);
        readStatus.appendChild(changeStatusBtn);
    });

    title.textContent = "Titre : " + book.title;
    author.textContent = "Auteur•e : " + book.author;
    genre.textContent = "Genre : " + book.genre;
    readStatus.innerHTML = `<span>${book.read}</span>`;
    displayChangeStatusBtn(book, changeStatusBtn);

    bookCard.append(deleteCardBtn, title, author, genre, readStatus);
    booksContainer.append(bookCard);
    addBookBtn.after(bookCard);
    readStatus.append(changeStatusBtn);
}

function loadingLibrary() {
    if (myLibrary.length > 0) {
        booksContainer.innerHTML = "";
        booksContainer.append(addBookBtn);
        myLibrary.forEach((book) => {
            displayBook(book);
        });
    } else {
        return;
    }
}

//rechercher dans la barre de recherche
function searchLibrary() {
    const searchValue = searchInput.value.toLowerCase();
    booksContainer.innerHTML = "";
    booksContainer.append(addBookBtn);

    myLibrary.forEach((book) => {
        const matchesSearch = [book.title, book.author, book.genre].some(
            (field) => field.toLowerCase().includes(searchValue)
        );

        if (matchesSearch) {
            displayBook(book);
        }
    });
}

loadingLibrary();
