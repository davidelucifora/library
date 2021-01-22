let myLibrary = []

const elements = {
    titleInput: document.getElementById('book-title'),
    authorInput: document.getElementById('book-author'),
    isReadInput: document.getElementById('is-read'),
    addBookBtn: document.getElementById('add-book'),
    bookTable: document.getElementById('book-table')
}



function Book(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

if (!myLibrary.length) elements.bookTable.style.display = 'none'

let book1 = new Book('Lord of the Rings', 'J.R.R Tolkien', true);
let book2 = new Book('Pedro Paramo', 'Juan Rulfo', false);

myLibrary.push(book1);
myLibrary.push(book2);


function displayBooks(elements){

    if (myLibrary.length) elements.bookTable.style.display = 'table'
    myLibrary.forEach(book => {
        let newRow =  document.createElement('tr');
        let titleCell = document.createElement('td');
        let authorCell = document.createElement('td');
        let isReadCell = document.createElement('td');
        let isReadBtn = document.createElement('button');
        let removeBtn = document.createElement('a');
        isReadBtn.classList.add('read-status', 'btn');
        isReadBtn.classList.add(`${book.isRead ? 'btn-read' : 'btn-not-read'}`);
        removeBtn.classList.add('remove-book')
        removeBtn.textContent = 'x'
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        isReadBtn.textContent = `${book.isRead ? 'Read' : 'Not read'}`;
        elements.bookTable.appendChild(newRow);
        newRow.appendChild(titleCell);
        newRow.appendChild(authorCell);
        newRow.appendChild(isReadCell);  
        newRow.appendChild(isReadCell);
        isReadCell.appendChild(isReadBtn)
        isReadCell.appendChild(removeBtn)  
    });
}

