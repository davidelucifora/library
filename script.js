//Library Array
const myLibrary = []

let storageChoice;
//Page Elements
const page = {
        titleInput: document.getElementById('book-title'),
        authorInput: document.getElementById('book-author'),
        isReadInput: document.getElementById('is-read'),
        addBookBtn: document.getElementById('add-book'),
        bookTable: document.getElementById('book-table'),
        container: document.getElementById('container'),
        loginModal: document.getElementById('login-modal'),
        signInForm: document.getElementById('sign-in-form'),
        loginEmailInput: document.getElementById('sign-in-email'),
        loginPwdInput: document.getElementById('sign-in-pwd'),
        loginBtn: document.getElementById('login-btn'),
        signUpBtn: document.getElementById('sign-up-btn'),
        chooseLocalBtn: document.getElementById('choose-local-btn'),
        loginLogoutBtn: document.getElementById('login-logout-btn')

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
            newCell.dataset.id = this.id
            
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

/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// PSEUDO CODE FOR WORK IN PROGRESS // 
// So

// The window loads,

// The program checks if the user is logged in.

// If it is, goes to firebase storage mode with his credentials.

// If he isn't, shows the modal.

// If the user signs in -> Go to firebase mode (init firebase -> auth the user -> show him his library)
// If the user signs up -> Create user and go to Firebase Mode. (init firebase -> auth the user -> show him empty library)
// If the user clicks on localStorage -> go to localStorage (show warning somewhere that he will lose data)
// If the user clicks out of the Modal -> go to localStorage. 

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
//Check if user is signed in
let isUserLoggedIn

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
            //Welcome User and close Login Modal
            showWelcomeMessage()
        // Change login btn to Logout Button.
            page.loginLogoutBtn.innerText = 'Logout'
            isUserLoggedIn = true;
    }
});

//Listen for click on Modal and local storage btn.
page.loginModal.addEventListener('click', function(){

    closeModal()
    retrieveBooksFromLocalStorage()
    displayBooks(myLibrary)
    isUserLoggedIn = false
    showLoginButton()
})
page.chooseLocalBtn.addEventListener('click', function(){

    closeModal()
    retrieveBooksFromLocalStorage()
    displayBooks(myLibrary)
    isUserLoggedIn = false
    showLoginButton()
    
})

page.signUpBtn.addEventListener('click', function(){

    // const dbRef = firebase.database().ref('Library')
    const email = page.loginEmailInput.value;
    const password = page.loginPwdInput.value;
    //Sign Up the User
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
        var user = userCredential.user;
        isUserLoggedIn = true;
    // ...
  })
  .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    // ..
  })

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        showWelcomeMessage()
    } else {
      // No user is signed in.
    }
  });

});

function showWelcomeMessage(){
    document.querySelectorAll('.login-child').forEach(elem => elem.style.display = 'none')
    page.welcomeMessage = document.createElement('h1')
    page.welcomeMessage.textContent = 'Welcome!'
    page.signInForm.appendChild(page.welcomeMessage)
    setTimeout(closeModal, 1000)
}

// close the modal.
function closeModal(){
    page.container.classList.remove('is-blurred');
    page.loginModal.style.display = 'none';
    page.signInForm.style.display = 'none';
}

function showLoginButton(){
    return page.loginBtn.textContent = `${storageChoice === 'local' ? 'Login' : 'Logout'}`    
}
page.loginLogoutBtn.addEventListener('click', function(e){

    if (this.innerText = 'Logout'){
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
          return e.target.innerText = 'Login'
        }

})
displayBooks(myLibrary)

page.loginLogoutBtn.addEventListener('click', function(){   
    if (this.textContent === 'Login') {
        showModal()
    }
    else {
        ////LOG USER OUT AND HIDE MODAL///
    }
})

function showModal() {
    page.container.classList.add('is-blurred');
    page.loginModal.style.display = 'flex';
    page.signInForm.style.display= 'flex';
}
//Listen for add book button
page.addBookBtn.addEventListener('click', newBook)

function newBook(e){
    e.preventDefault()

    //Check if Form is empty 
        if (!page.titleInput.value || 
        !page.authorInput.value){

            emptyFormError(e)

        }
        // Create Book 
        else {
            const book = new Book(
                            generateID(), 
                            page.titleInput.value, 
                            page.authorInput.value,  
                            page.isReadInput.checked)

    //Add Book to Library and Local Storage
    myLibrary.push(book)
    localStorage.setItem(book.id, JSON.stringify(book))
        
        //Reset form and refresh book list
        page.titleInput.value = '';
        page.authorInput.value = ''
        displayBooks(myLibrary)
    }
}

// Display Books in Library
function displayBooks(myLibrary){

    //Invite users to add Books if Library is empty 
    if(!myLibrary.length) {
    page.bookTable.style.display = 'none'
    document.querySelector('.empty-library-message').style.display = 'block'}

    //Display Table
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

    //Call AddRow method for each book
myLibrary.forEach(book => {
    book.addRow()
});

//Listen for Clicks on Remove Buttons
document.querySelectorAll('.remove-book').forEach(button => {
    button.addEventListener('click', removeBook);
});
//Remove Book
function removeBook(e){ 

    const bookID = e.target.parentNode.dataset.id;
    localStorage.removeItem(bookID)
    myLibrary.splice(myLibrary.findIndex(function(i){
        return i.id === bookID
    }),1)
    displayBooks(myLibrary)
    
}

//Listen for Clicks on Read Status Buttons
document.querySelectorAll('.read-status-btn').forEach(btn => {
    btn.addEventListener('click', toggleStatus)
    })

}

function toggleStatus(e){
    e.preventDefault()
    const bookID = e.target.parentNode.dataset.id;
    const book = myLibrary.find(x => x.id === bookID);
    const status = book.changeStatus()
    localStorage.removeItem(bookID)
    localStorage.setItem(book.id, JSON.stringify(book))
    e.target.textContent = `${status ? 'Read' : 'Unread'}`
    e.target.className = ''
    e.target.classList.add('read-status-btn', 'read-status-btn-'+status)

}

//Sync myLibrary with local Storage
function retrieveBooksFromLocalStorage(){
        //Retrieve Objects in localStorage if any and add to a temp array
        if (localStorage.length){
            const tempList = []
            for(let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                object = JSON.parse((localStorage.getItem(key)))
                //Push them to a temp Array
                tempList.push(object)
            }
            
        tempList.forEach(book => {
            if (!JSON.stringify(book).includes('firebase')){
            myLibrary.push(new Book(book.id, book.title, book.author, book.isRead))}    
        });
        }   
}

// Generates unique random ID
function generateID() {
    return (Date.now().toString(36) + Math.random().toString(36).substring(2,5).toUpperCase())
}

//Empty Form Error
function emptyFormError(e) {
    e.target.innerText = 'All Fields are Required!'
    e.target.style.backgroundColor = 'red'
    setTimeout(function() {
        e.target.innerText = 'Add Book'
        e.target.style.backgroundColor = null
    }, 1000)
}