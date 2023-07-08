let myLibrary = [];
const library = document.querySelector(".library");
const newBookBtn = document.getElementById("new-book");
const bookFormBtn = document.getElementById("add-book");
const bookForm = document.getElementById("book-form");
const closeBtn = document.getElementById("close-popup");

newBookBtn.addEventListener("click", displayBookForm);
bookFormBtn.addEventListener("click", addBookToLibrary);
closeBtn.addEventListener("click", closePopup);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`
    };
}

const firstBook = new Book("Ex1", "Me", 0, true);
const secondBook = new Book("Ex2", "Me", 1, true);
const thirdBook = new Book("Ex3", "Me", 100, false);

myLibrary.push(firstBook);
myLibrary.push(secondBook);
myLibrary.push(thirdBook);

function addBookToLibrary(e) {
    e.preventDefault();
    let bookFormData = new FormData(document.forms["book-form"]);
    let title = bookFormData.get("title");
    let author = bookFormData.get("author");
    let pages = bookFormData.get("pages");
    let read = bookFormData.get("read");
    console.log(read);
    let newBook = new Book(title, author, pages, read === "Yes");
    myLibrary.push(newBook);
    // Add to display
    displayBook(newBook);
    // Close pop-up
    closePopup();
}

function displayLibrary() {
    myLibrary.forEach(book => {
        displayBook(book);
    });
    resetLibraryIndexes();
}

function displayBook(book) {
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
    let bookEle = document.createElement("ul");
    for (let prop in book) {
        if (prop === "info") continue;
        let data = document.createElement("li");
        data.textContent = `${prop}: ${book[prop]}`;
        bookEle.appendChild(data);
    }
    bookContainer.appendChild(bookEle);
    let readBtn = document.createElement("button");
    readBtn.textContent = book.read ? "Not read" : "Read";
    readBtn.addEventListener("click", toggleBookRead);
    bookContainer.appendChild(readBtn);
    let btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.addEventListener("click", removeBook);
    bookContainer.appendChild(btn);
    bookContainer.setAttribute("data-library-index", myLibrary.length - 1);
    library.appendChild(bookContainer);
}

function removeBook(e) {
    let ele = e.target.closest(".book");
    let index = ele.getAttribute("data-library-index");
    myLibrary.splice(index, 1);
    ele.remove();
    resetLibraryIndexes();
}

displayLibrary();

function resetLibraryIndexes() {
    let books = document.querySelectorAll(".book");
    books.forEach((book, i) => {
        book.setAttribute("data-library-index", i);
    });
}

function toggleBookRead(e) {
    let bookContainer = e.target.closest(".book");
    let index = bookContainer.getAttribute("data-library-index");
    myLibrary[index].read = !myLibrary[index].read;
    e.target.textContent = myLibrary[index].read ? "Not read" : "Read";
    e.target.previousElementSibling.lastElementChild.textContent = `read: ${myLibrary[index].read}`;
}

function displayBookForm(e) {
    bookForm.style.display = "block";
}

function closePopup() {
    bookForm.style.display = "none";
    bookForm.reset();
}