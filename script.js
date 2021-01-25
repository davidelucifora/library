//Library Array
const myLibrary = [];

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
//Book Methods

    //Get values from book properties and display on a new row.
    Book.prototype.addRow = function() {

    const newRow = document.createElement('tr');
    Object.entries(this).slice(1).forEach(([key, value]) => {

        //Title / Author Cells.
        let newCell = document.createElement('td')
        newCell.textContent = value
        newRow.appendChild(newCell)
        page.bookTable.appendChild(newRow)

        // Last column (Status + Remove buttons)
        if (key === 'isRead') {
            
            
            //Create read Status Button
            const isReadBtn = document.createElement('button')
            //Change button style and value if book is read/unread
            newCell.textContent = null;
            isReadBtn.textContent = `${this.isRead ? 'Read' : 'Unread'}`;
            isReadBtn.classList.add('read-status-btn','read-status-btn-'+value) 
            newCell.style.display = 'flex'
            newCell.appendChild(isReadBtn);
            
            //Create Delete Button
            let deleteBtn = document.createElement('a')
            
            //Add Datakey with Book's ID
            newCell.setAttribute(`data-ID`, this.id)
            
            //Style and Append Delete Button
            deleteBtn.textContent = 'x'
            deleteBtn.classList.add('remove-book')
            newCell.appendChild(deleteBtn);
        }
    })
}

//Toggle read status 
Book.prototype.changeStatus = function(){
return this.isRead = !this.isRead
}

//Display books on page.
displayBooks(myLibrary)

//Listen for add book button
page.addBookBtn.addEventListener('click', newBook)

function newBook(e){
    e.preventDefault()

    //Create book only if values are provided
    if (page.titleInput.value && 
        page.authorInput.value){
    const book = new Book(
                            generateID(), 
                            page.titleInput.value, 
                            page.authorInput.value,  
                            page.isReadInput.checked) 

    myLibrary.push(book);
        page.titleInput.value = '';
        page.authorInput.value = ''
        displayBooks(myLibrary)
    }

    // Empty form error message
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
    if(!myLibrary.length) {
    page.bookTable.style.display = 'none'
    document.querySelector('.empty-library-message').style.display = 'block'}
    else  {
        document.querySelector('.empty-library-message').style.display = 'none'
        page.bookTable.style.display = 'table'}
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

//Listen for Clicks on Remove Buttons
document.querySelectorAll('.remove-book').forEach(button => {

    button.addEventListener('click', removeBook);
});

//Listen for Clicks on Read Status Buttons
document.querySelectorAll('.read-status-btn').forEach(btn => {
    btn.addEventListener('click', toggleStatus)
    })
}

//Remove Book
function removeBook(e){
    
    const bookID = e.target.parentNode.dataset.id;
    myLibrary.splice(bookID,1)
    displayBooks(myLibrary)
}

//toggleStatus
function toggleStatus(e){
    e.preventDefault()
    const bookID = e.target.parentNode.dataset.id;
    const book = myLibrary.find(x => x.id === bookID);
    const status = book.changeStatus()
    e.target.textContent = `${status ? 'Read' : 'Unread'}`
    e.target.className = ''
    e.target.classList.add('read-status-btn', 'read-status-btn-'+status)


}
// Generates unique random ID
function generateID() {
    return (Date.now().toString(36) + Math.random().toString(36).substring(2,5).toUpperCase())
}

