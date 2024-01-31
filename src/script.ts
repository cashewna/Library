class Book {
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
        this.author = author;
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.hasBeenRead = hasBeenRead;
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

    constructor(containerId: string, newBookBtn: string, newBookDialog: string, newBookDialogClose: string) {
        this.tableBody = document.getElementById(containerId) as HTMLTableElement;
        this.newBookBtn = document.getElementById(newBookBtn) as HTMLButtonElement;
        this.newBookDialog = document.getElementById(newBookDialog) as HTMLDialogElement;
        this.newBookDialogClose = document.getElementById(newBookDialogClose) as HTMLButtonElement;
        
        this.newBookBtn?.addEventListener('click', () => {
            this.newBookDialog?.showModal();
        });
        
        this.newBookDialogClose?.addEventListener('click', (e) => {
            e.preventDefault();
            this.newBookDialog?.close();
        });
    }

    public displayLibrary(library: Book[]) {
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
    
    public addBookToLibrary(book: Book) {
        
    }
}

const myLibrary: Book[] = [];
const book1 = new Book("James Clear", "Atomic Habits", 300, false);
const book2 = new Book("J.K. Rowling", "Harry Potter", 500, true);
Book.addToLibrary(book1, myLibrary);
Book.addToLibrary(book2, myLibrary);

const myLibraryUI = new LibraryUI('library-body', 'new-book-btn', 'new-book-dialog', 'new-book-dialog-close');
myLibraryUI.displayLibrary(myLibrary);

