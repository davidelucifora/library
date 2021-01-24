//Library Array
const myLibrary = [new Book(0, 'Dummy', 'Dummy', true)];

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

Book.prototype.addRow = function() {
    const newRow = document.createElement('tr');
    Object.entries(this).slice(1).forEach(([key, value]) => {

        let newCell = document.createElement('td')
        newCell.textContent = value
        newRow.appendChild(newCell)
        page.bookTable.appendChild(newRow)
        
        if (key === 'isRead') {
            const isReadBtn = document.createElement('button')
            isReadBtn.classList.add('read-status-btn','read-status-btn-'+value)
            isReadBtn.textContent = `${this.isRead ? 'Read' : 'Unread'}`;
            console.log(this.isRead)

            newCell.textContent = null;
            newCell.style.display = 'flex'
            newCell.appendChild(isReadBtn);
            
            let deleteBtn = document.createElement('a')
            newCell.setAttribute(`data-ID`, this.id)
            deleteBtn.textContent = 'x'
            deleteBtn.classList.add('remove-book')
            newCell.appendChild(deleteBtn);
        }
    })
}

displayBooks(myLibrary)
//Add Button Click
page.addBookBtn.addEventListener('click', newBook)

function newBook(e){
    e.preventDefault()
    if (page.titleInput.value && 
        page.authorInput.value){
    const book = new Book(
                            myLibrary.length, 
                            page.titleInput.value, 
                            page.authorInput.value,  
                            page.isReadInput.checked) 

    myLibrary.push(book);
        page.titleInput.value = '';
        page.authorInput.value = ''
        displayBooks(myLibrary)
    }
    else {
        e.target.innerText = 'All Fields are Required!'
        e.target.style.backgroundColor = 'red'
        setTimeout(function() {
            e.target.innerText = 'Add Book'
            e.target.style.backgroundColor = null
        }, 1000)
    }
    }


// Display Books in Library
function displayBooks(myLibrary){
    page.bookTable.style.display = 'none'
    if (myLibrary.length) page.bookTable.style.display = 'table'
    page.bookTable.innerHTML = 
    `<thead id="table-head">
    <tr>
      <th class='title-table'>Title</th>
      <th class='author-table'>Author</th>
      <th class="status">Status</th>
    </tr>
    </thead>`


myLibrary.forEach(book => {
    book.addRow()
});
document.querySelectorAll('.remove-book').forEach(button => {

    button.addEventListener('click', removeBook);
});
}
function removeBook(e){

    const bookID = e.target.parentNode.dataset.id;
    myLibrary.splice(bookID,1)
    displayBooks(myLibrary)
    

}

