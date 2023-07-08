let myLibrary = [];
const library = document.querySelector(".library");
const newBookBtn = document.getElementById("new-book");
const bookFormBtn = document.getElementById("add-book");

newBookBtn.addEventListener("click", displayBookForm);
bookFormBtn.addEventListener("click", addBookToLibrary);

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
    document.getElementById("book-form").reset();
    // Add to display
    displayBook(newBook);
    // Close pop-up
}

function displayLibrary() {
    myLibrary.forEach(book => {
        displayBook(book);
    });
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
    console.log(index);
    myLibrary.splice(index, 1);
    ele.remove();
}

displayLibrary();

function displayBookForm(e) {

}