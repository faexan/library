const readStTrColor = "cadetblue";
const readStFaColor = "indianred";
const container = document.querySelector(".con");
const addBook = document.querySelector(".add-book-btn");
let addBookForm = document.querySelector("#book-add-form");
addBook.addEventListener("click", () => {
  addBookForm.style.display = "flex";
  container.style.pointerEvents = "none";
})
const cancelForm = document.querySelector(".cancel-form");
cancelForm.addEventListener("click", () => {
  addBookForm.style.display = "none";
  container.style.pointerEvents = "auto";
})

const newBookTitle = document.querySelector("#new-title");
const newAuthor = document.querySelector("#new-author");
const newPages = document.querySelector("#new-pages");
const newBookSt = document.querySelector(".initial-book-st");
newBookSt.addEventListener("click", ()=> {
  if (newBookSt.value == "true") {newBookSt.value = "false";} else {newBookSt.value = "true"};
});
const submitBtn = document.querySelector(".add-to-lib");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (newBookTitle.value != "" && newAuthor.value != "" && newPages.value != "" ) {
    const newBook = new Book(newBookTitle.value, newAuthor.value, newPages.value, newBookSt.value);
  addBooktoLibrary(newBook);
  clrScr();
  displayBook(myLibrary);
  addBookForm.style.display = "none";
  container.style.pointerEvents = "auto";
  } else {
    alert("Please add all the fields!");
  }
  newBookTitle.value = "";
  newAuthor.value = "";
  newPages.value = "";
})
const myLibrary = [];

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

function addBooktoLibrary(book) {
  myLibrary.push(book);
 
}

function clrScr() {
  const booksGrid = document.querySelector(".books-grid");
  while (booksGrid.firstChild) {
    booksGrid.removeChild(booksGrid.firstChild);
  }
}

function displayBook(arr) {
  for (let i = 0;i < arr.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.classList.add(`${i}`);
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("bookTitle");
    bookTitle.textContent = arr[i].title;
    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("bookAuthor")
    bookAuthor.textContent = arr[i].author;
    const bookPages = document.createElement("p");
    bookPages.classList.add("bookPages");
    bookPages.textContent = arr[i].pages;
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    const booksGrid = document.querySelector(".books-grid");
    booksGrid.appendChild(bookCard);
    const readStatus = document.createElement("button");
    readStatus.addEventListener("click", (e)=> {
      if (e.target.value == "false") {
        e.target.value = "true";
        readStatus.style.background = readStTrColor;
        readStatus.textContent = "Read";
        arr[i].readStatus = "true";
      } else {
        e.target.value = "false";
        readStatus.textContent = "Not Read";
        readStatus.style.background = readStFaColor;
        arr[i].readStatus = "false";
      };
      
    })
    readStatus.classList.add("read-status");
    if (arr[i].readStatus == "true") {
      readStatus.textContent = "Read";
      readStatus.style.background = readStTrColor;
    } else {
      readStatus.textContent = "Not Read";
      readStatus.style.background = readStFaColor;
    }
    bookCard.appendChild(readStatus);
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.id = `${i}`;
    removeBtn.addEventListener("click", (e) => {
      const card = document.getElementsByClassName(`${e.target.id}`);
      const index = myLibrary.findIndex((n)=>{
        return n.title == card[0].querySelector(".bookTitle").innerHTML;
      });
      card[0].parentNode.removeChild(card[0]);
      myLibrary.splice(index,1);
    });
    removeBtn.textContent = "Remove";
    bookCard.appendChild(removeBtn); 
  }  
}
