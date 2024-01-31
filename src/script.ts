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

    constructor(containerId: string) {
        this.tableBody = document.getElementById(containerId) as HTMLTableElement;
    }

    displayLibrary(library: Book[]) {
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

const myLibrary: Book[] = [];
const book1 = new Book("James Clear", "Atomic Habits", 300, false);
const book2 = new Book("J.K. Rowling", "Harry Potter", 500, true);
Book.addToLibrary(book1, myLibrary);
Book.addToLibrary(book2, myLibrary);

const myLibraryUI = new LibraryUI('library-body');
myLibraryUI.displayLibrary(myLibrary);
