let myLibrary = [];
const library = document.querySelector(".library");
const newBookBtn = document.getElementById("new-book");
const bookFormBtn = document.getElementById("add-book");
const bookForm = document.getElementById("book-form");
const closeBtn = document.getElementById("close-popup");
const errorMsg = document.getElementById("error-msg");

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

function addBookToLibrary(e) {
    e.preventDefault();
    let bookFormData = new FormData(document.forms["book-form"]);
    let title = bookFormData.get("title");
    let author = bookFormData.get("author");
    let pages = bookFormData.get("pages");
    let read = bookFormData.get("read");
    console.log(read);
    let error = validateForm(title, author, pages);
    if (error) return;
    let newBook = new Book(title, author, pages, read === "on");
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
        data.textContent = getPropText(prop, book);
        bookEle.appendChild(data);
    }
    bookContainer.appendChild(bookEle);
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    let readBtn = document.createElement("button");
    readBtn.textContent = book.read ? "Not Read" : "Read";
    readBtn.addEventListener("click", toggleBookRead);
    btnContainer.appendChild(readBtn);
    let btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.addEventListener("click", removeBook);
    btnContainer.appendChild(btn);
    bookContainer.appendChild(btnContainer);
    bookContainer.setAttribute("data-library-index", myLibrary.length - 1);
    library.appendChild(bookContainer);
}

function getPropText(prop, book) {
    let content;
    switch (prop) {
        case "title":
            content = `"${book[prop]}"`;
            break;
        case "author":
            content = "By: " + book[prop];
            break;
        case "pages":
            content = book[prop] + " pages";
            break;
        case "read":
            content = book[prop] ? "Read" : "Not Read";
    }
    return content;
}

function removeBook(e) {
    let ele = e.target.closest(".book");
    let index = ele.getAttribute("data-library-index");
    myLibrary.splice(index, 1);
    ele.remove();
    resetLibraryIndexes();
}

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
    e.target.textContent = myLibrary[index].read ? "Not Read" : "Read";
    e.target.parentElement.previousElementSibling.lastElementChild.textContent = getPropText("read", myLibrary[index]);
}

function displayBookForm(e) {
    bookForm.style.display = "block";
}

function closePopup() {
    bookForm.style.display = "none";
    bookForm.reset();
    errorMsg.textContent = "";
}

function validateForm(title, author, pages) {
    let error;
    if (!title) error = "Please include a title";
    else if (!author) error = "Please include an author";
    else if (!pages) error = "Please include the number of pages";
    errorMsg.textContent = error;
    return error;
}

// Dummy content for easier debugging
const firstBook = new Book("Hamlet", "William Shakespeare", 215, true);
const secondBook = new Book("The Odyssey", "Homer", 834, false);
const thirdBook = new Book("1984", "George Orwell", 312, true);
const book4 = new Book("The Lord of the Rings: The Fellowship of the Ring", "J. R. R. Tolkien", 517, true);
const book5 = new Book("The Lord of the Rings: The Two Towers", "J. R. R. Tolkien", 517, true);
const book6 = new Book("The Lord of the Rings: The Return of the King", "J. R. R. Tolkien", 517, true);
const book7 = new Book("Harry Potter and The Philosopher Stone", "J. K. Rowling", 221, true);
const book8 = new Book("Harry Potter and The Chamber of Secrets", "J. K. Rowling", 243, true);


myLibrary.push(book7);
myLibrary.push(book8);
myLibrary.push(firstBook);
myLibrary.push(secondBook);
myLibrary.push(thirdBook);
myLibrary.push(book4);
myLibrary.push(book5);
myLibrary.push(book6);

displayLibrary();