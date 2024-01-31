"use strict";
class Book {
    author;
    title;
    numberOfPages;
    hasBeenRead;
    constructor(author, title, numberOfPages, hasBeenRead) {
        this.author = author;
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.hasBeenRead = hasBeenRead;
    }
    getTitle() {
        return this.title;
    }
    getAuthor() {
        return this.author;
    }
    getNumberOfPages() {
        return this.numberOfPages;
    }
    getHasBeenRead() {
        return this.hasBeenRead;
    }
    static addToLibrary(book, library) {
        library.push(book);
    }
}
class LibraryUI {
    tableBody;
    constructor(containerId) {
        this.tableBody = document.getElementById(containerId);
    }
    displayLibrary(library) {
        for (let i = 0; i < library.length; i++) {
            const row = this.tableBody?.insertRow(-1);
            if (!row) {
                return;
            }
            const idCell = row?.insertCell(0);
            const titleCell = row?.insertCell(1);
            const authorCell = row?.insertCell(2);
            const pagesCell = row?.insertCell(3);
            const readCell = row?.insertCell(4);
            idCell.textContent = `${i + 1}`;
            titleCell.textContent = library[i].getTitle();
            authorCell.textContent = library[i].getAuthor();
            pagesCell.textContent = library[i].getNumberOfPages().toString();
            readCell.textContent = library[i].getHasBeenRead() ? "Yes" : "No";
        }
    }
}
const myLibrary = [];
const book1 = new Book("James Clear", "Atomic Habits", 300, false);
const book2 = new Book("J.K. Rowling", "Harry Potter", 500, true);
Book.addToLibrary(book1, myLibrary);
Book.addToLibrary(book2, myLibrary);
const myLibraryUI = new LibraryUI('library-body');
myLibraryUI.displayLibrary(myLibrary);
