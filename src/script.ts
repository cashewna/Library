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

    public static addToLibrary(book: Book, library: Book[]) {
        library.push(book);
    }

    public toString(): string {
        return `
            Title: ${this.title} <br>
            Author: ${this.author} <br>
            Pages: ${this.numberOfPages} <br>
            Read: ${this.hasBeenRead ? "Yes" : "No"}
        `;
    }
}

class LibraryUI {
    private libraryContainer: HTMLElement | null;

    constructor(containerId: string) {
        this.libraryContainer = document.getElementById(containerId);
    }

    displayLibrary(library: Book[]) {
        const table = document.createElement('table');
        const headerRow = table.createTHead().insertRow(0);
        const headerCell1 = headerRow.insertCell(0);
        const headerCell2 = headerRow.insertCell(1);

        headerCell1.textContent = "Book #";
        headerCell2.textContent = "Details";

        for (let i = 1; i <= library.length; i++) {
            const row = table.insertRow(i);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);

            cell1.textContent = `${i}`;
            cell2.innerHTML = library[i - 1].toString();
        }
        
        this.libraryContainer?.appendChild(table);
    }
}

const myLibrary: Book[] = [];
const book1 = new Book("James Clear", "Atomic Habits", 300, false);
Book.addToLibrary(book1, myLibrary);

const myLibraryUI = new LibraryUI('library-container');
myLibraryUI.displayLibrary(myLibrary);
