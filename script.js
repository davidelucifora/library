//Library Array
const myLibrary = [
    testBook = new Book(0, 'dummy title', 'dummy author', false )];

//Page Elements
const page = {
        titleInput: document.getElementById('book-title'),
        authorInput: document.getElementById('book-author'),
        isReadInput: document.getElementById('is-read'),
        addBookBtn: document.getElementById('add-book'),
        bookTable: document.getElementById('book-table')
}

//Book Constructor
function Book(id, title, author, isRead){
    this.id = id;
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

Book.prototype.addRow = function(){

    const newRow = document.createElement('tr');

    Object.entries(this).slice(1).forEach(([key, value]) => {

        let newCell = document.createElement('td')
        newCell.textContent = value
        newRow.appendChild(newCell)
        page.bookTable.appendChild(newRow)
        
        if (key === 'isRead') {
            newCell.classList.add('flex-cell')
            newCell.innerHTML = 
            `<label class ="form-group toggle-group">
            <input type="checkbox" id="is-read">
            <span class="toggle"></span></label>`
            let deleteBtn = document.createElement('a')
            newCell.setAttribute(`data-ID`, this.id)
            deleteBtn.textContent = 'x'
            deleteBtn.classList.add('remove-book')
            newCell.appendChild(deleteBtn);
        }
    })
}





displayBooks(myLibrary);
//Add Button Click
page.addBookBtn.addEventListener('click', newBook)

function newBook(e){
    e.preventDefault()
    const book = new Book(
                            myLibrary.length + 1, 
                            page.titleInput.value, 
                            page.authorInput.value,  
                            page.isReadInput.checked) 

    myLibrary.push(book);

        displayBooks(myLibrary)
}

// Display Books in Library
function displayBooks(myLibrary){
    console.log(myLibrary, 'running')
    page.bookTable.innerHTML = 
    `<thead id="table-head">
    <tr>
      <th class='title-table'>Title</th>
      <th class='author-table'>Author</th>
      <th class="status">Status</th>
    </tr>`
myLibrary.forEach(book => {
    book.addRow()
})
}

//     myLibrary.forEach(book => createRow(book))
// }

// function createRow(book)

    


// }
// function Book(id, title, author, isRead) {
//     this.id = id;
//     this.title = title;
//     this.author = author;
//     this.isRead = isRead;
//     }

// Book.prototype.toggleRead = function(){
//     if (this.isRead) console.log('read')
//     else console.log('not read')
// }  

// myLibrary.push(book1,book2)

// if (!myLibrary.length) elements.bookTable.style.display = 'none'

// function displayBooks(elements){

//     if (myLibrary.length) elements.bookTable.style.display = 'table'
//     myLibrary.forEach(book => {
//         let newRow =  document.createElement('tr');
//         let titleCell = document.createElement('td');
//         let authorCell = document.createElement('td');
//         let isReadCell = document.createElement('td');
//         let removeCell = document.createElement('td');        
//         let isReadBtn = document.createElement('button');
//         let removeBtn = document.createElement('span');
//         isReadBtn.classList.add('read-status', 'btn');
//         removeBtn.classList.add('remove-book')
//         authorCell.classList.add('table-author')
//         titleCell.classList.add('table-title')
//         removeBtn.textContent = 'x'
//         titleCell.textContent = book.title;
//         authorCell.textContent = book.author;
//         elements.bookTable.appendChild(newRow);
//         newRow.appendChild(titleCell);
//         newRow.appendChild(authorCell);
//         newRow.appendChild(isReadCell);  
//         newRow.appendChild(isReadCell);
//         newRow.appendChild(removeCell)
//         isReadCell.appendChild(isReadBtn)
//         isReadCell.appendChild(removeBtn)  
//     });
// }
// }}
