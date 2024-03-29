"use strict";
const myLibrary = [];
class Book {
    static id = 0;
    id;
    author;
    title;
    numberOfPages;
    hasBeenRead;
    constructor(author, title, numberOfPages, hasBeenRead) {
        this.id = ++Book.id;
        this.author = author;
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.hasBeenRead = hasBeenRead;
    }
    getId() {
        return this.id;
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
    setHasBeenRead(hasBeenRead) {
        this.hasBeenRead = hasBeenRead;
    }
    static addToLibrary(book, library) {
        library.push(book);
    }
}
class LibraryUI {
    tableBody;
    newBookBtn;
    newBookDialog;
    newBookDialogClose;
    newBookDialogSubmit;
    constructor(containerId, newBookBtn, newBookDialog, newBookDialogClose, newBookDialogSubmit) {
        this.tableBody = document.getElementById(containerId);
        this.newBookBtn = document.getElementById(newBookBtn);
        this.newBookDialog = document.getElementById(newBookDialog);
        this.newBookDialogClose = document.getElementById(newBookDialogClose);
        this.newBookDialogSubmit = document.getElementById(newBookDialogSubmit);
        this.newBookBtn?.addEventListener('click', () => {
            this.newBookDialog?.showModal();
        });
        this.newBookDialogClose?.addEventListener('click', (e) => {
            e.preventDefault();
            this.newBookDialog?.close();
        });
        this.newBookDialogSubmit?.addEventListener('click', (e) => {
            const form = document.getElementById('new-book-form');
            if (!form.checkValidity()) {
                return;
            }
            e.preventDefault();
            const author = document.getElementById('author');
            const title = document.getElementById('title');
            const pages = document.getElementById('pages');
            const read = document.getElementById('read');
            const newBook = new Book(author.value, title.value, parseInt(pages.value), read.checked);
            Book.addToLibrary(newBook, myLibrary);
            form.reset();
            this.newBookDialog?.close();
            this.displayLibrary(newBook);
        });
    }
    displayLibrary(book) {
        const row = this.tableBody?.insertRow();
        if (!row) {
            return;
        }
        const idCell = row?.insertCell(0);
        const titleCell = row?.insertCell(1);
        const authorCell = row?.insertCell(2);
        const pagesCell = row?.insertCell(3);
        const readCell = row?.insertCell(4);
        const deleteCell = row?.insertCell(5);
        row.setAttribute('id', `${book.getId()}`);
        idCell.textContent = `${book.getId()}`;
        titleCell.textContent = book.getTitle();
        authorCell.textContent = book.getAuthor();
        pagesCell.textContent = book.getNumberOfPages().toString();
        readCell.appendChild(this.createReadButton(book.getId(), book.getHasBeenRead()));
        deleteCell.appendChild(this.createDeleteButton(book.getId()));
    }
    createReadButton(id, hasBeenRead) {
        const button = document.createElement('button');
        button.textContent = hasBeenRead ? 'Read' : 'Unread';
        button.addEventListener('click', () => {
            const row = document.getElementById(`${id}`);
            if (!row) {
                return;
            }
            const book = myLibrary.find(book => book.getId() === id);
            if (!book) {
                return;
            }
            book.setHasBeenRead(!book.getHasBeenRead());
            button.textContent = book.getHasBeenRead() ? 'Read' : 'Unread';
        });
        return button;
    }
    createDeleteButton(id) {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.addEventListener('click', () => {
            const row = document.getElementById(`${id}`);
            if (!row) {
                return;
            }
            row.remove();
            myLibrary.splice(id, 1);
        });
        return button;
    }
}
const myLibraryUI = new LibraryUI('library-body', 'new-book-btn', 'new-book-dialog', 'new-book-dialog-close', 'new-book-submit');
// myLibraryUI.displayLibrary(book1);
