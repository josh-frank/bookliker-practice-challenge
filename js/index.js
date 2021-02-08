const booksUrl = "http://localhost:3000/books";
const bookList = document.getElementById( "list" );
const bookView = document.getElementById( "show-panel" );

function fetchBooks() {
    fetch( booksUrl )
    .then( response => response.json() )
    .then( bookData => bookData.forEach( book => renderBook( book ) ) );
}

function renderBook( book ) {
    let thisBook = document.createElement( "li" );
    thisBook.dataset.id = book.id;
    thisBook.innerHTML = `<em>${ book.title }</em> by ${ book.author }`;
    bookList.append( thisBook );
}

function showBook( bookID ) {
    fetch( `${ booksUrl }/${ bookID }` )
    .then( response => response.json() )
    .then( book => {
        bookView.dataset.id = book.id;
        bookView.innerHTML = "";
        let thisBookImage = document.createElement( "img" );
        thisBookImage.src = book.img_url;
        thisBookImage.alt = `${ book.title } by ${ book.author }`;
        let thisBookTitle = document.createElement( "h2" );
        thisBookTitle.textContent = book.title;
        let thisBookSubtitle = document.createElement( "h3" );
        thisBookSubtitle.textContent = book.subtitle;
        let thisBookAuthor = document.createElement( "h4" );
        thisBookAuthor.textContent = `By: ${ book.author }`;
        let thisBookDescription = document.createElement( "p" );
        thisBookDescription.innerHTML = `<b>Summary: </b> ${ book.description }`;
        let likesHeader = document.createElement( "h4" );
        likesHeader.textContent = "Liked by:"
        let thisBookLikes = document.createElement( "ul" );
        book.users.forEach( user => {
            let thisUser = document.createElement( "li" );
            thisUser.textContent = user.username;
            thisBookLikes.append( thisUser );
        } );
        bookView.append( thisBookImage, thisBookTitle, thisBookSubtitle, thisBookAuthor, thisBookDescription, likesHeader, thisBookLikes );
    } );
}

document.addEventListener( "DOMContentLoaded", function() {
    fetchBooks();
    bookList.addEventListener( "click", event => {
        if ( event.target.tagName === "LI" ) { showBook( event.target.dataset.id ); }
    } );
} );
