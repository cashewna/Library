const myLibrary: Book[] = [];

class Book {
    private static id = 0;
    private id: number;
    private author: string;
    private title: string;
    private numberOfPages: number;
    private hasBeenRead: boolean;

    public constructor(
        author: string,
        title: string,
        numberOfPages: number,
        hasBeenRead: boolean
    ) {
        this.id = ++Book.id;
        this.author = author;
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.hasBeenRead = hasBeenRead;
    }

    public getId() {
        return this.id;
    }
    
    public getTitle() {
        return this.title;
    }
    
    public getAuthor() {
        return this.author;
    }

    public getNumberOfPages() {
        return this.numberOfPages;
    }

    public getHasBeenRead() {
        return this.hasBeenRead;
    }

    public static addToLibrary(book: Book, library: Book[]) {
        library.push(book);
    }
}

class LibraryUI {
    private tableBody: HTMLTableElement | null;
    private newBookBtn: HTMLButtonElement | null;
    private newBookDialog: HTMLDialogElement | null;
    private newBookDialogClose: HTMLButtonElement | null;
    private newBookDialogSubmit: HTMLButtonElement | null;

    constructor(
        containerId: string,
        newBookBtn: string,
        newBookDialog: string,
        newBookDialogClose: string,
        newBookDialogSubmit: string
        ) {
        this.tableBody = document.getElementById(containerId) as HTMLTableElement;
        this.newBookBtn = document.getElementById(newBookBtn) as HTMLButtonElement;
        this.newBookDialog = document.getElementById(newBookDialog) as HTMLDialogElement;
        this.newBookDialogClose = document.getElementById(newBookDialogClose) as HTMLButtonElement;
        this.newBookDialogSubmit = document.getElementById(newBookDialogSubmit) as HTMLButtonElement;
        
        this.newBookBtn?.addEventListener('click', () => {
            this.newBookDialog?.showModal();
        });
        
        this.newBookDialogClose?.addEventListener('click', (e) => {
            e.preventDefault();
            this.newBookDialog?.close();
        });
        
        this.newBookDialogSubmit?.addEventListener('click', (e) => {
            const form = document.getElementById('new-book-form') as HTMLFormElement;
            if (!form.checkValidity()) {
                return;
            }
            
            e.preventDefault();
            const author = document.getElementById('author') as HTMLInputElement;
            const title = document.getElementById('title') as HTMLInputElement;
            const pages = document.getElementById('pages') as HTMLInputElement;
            const read = document.getElementById('read') as HTMLInputElement;
            const newBook = new Book(author.value, title.value, parseInt(pages.value), read.checked);
            Book.addToLibrary(newBook, myLibrary);
            this.newBookDialog?.close();
            this.displayLibrary(newBook);
        });
    }

    public displayLibrary(book: Book) {
        const row = this.tableBody?.insertRow();
            
        if (!row) {
            return;
        }

        const idCell = row?.insertCell(0);
        const titleCell = row?.insertCell(1);
        const authorCell = row?.insertCell(2);
        const pagesCell = row?.insertCell(3);
        const readCell = row?.insertCell(4);

        idCell.textContent = `${book.getId()}`;
        titleCell.textContent = book.getTitle();
        authorCell.textContent = book.getAuthor();
        pagesCell.textContent = book.getNumberOfPages().toString();
        readCell.textContent = book.getHasBeenRead() ? "Yes" : "No";
    }
}

const book1 = new Book("James Clear", "Atomic Habits", 300, false);
Book.addToLibrary(book1, myLibrary);

const myLibraryUI = new LibraryUI('library-body', 'new-book-btn', 'new-book-dialog', 'new-book-dialog-close', 'new-book-submit');
myLibraryUI.displayLibrary(book1);
