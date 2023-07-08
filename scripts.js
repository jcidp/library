let myLibrary = [];
const library = document.querySelector(".library");

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

addBookToLibrary(firstBook);
addBookToLibrary(secondBook);
addBookToLibrary(thirdBook);

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayLibrary() {
    myLibrary.forEach(book => {
        let bookEle = document.createElement("ul");
            for (let prop in book) {
                if (prop === "info") continue;
                let data = document.createElement("li");
                data.textContent = `${prop}: ${book[prop]}`;
                bookEle.appendChild(data);
            }
        library.appendChild(bookEle);
    });
}

displayLibrary();