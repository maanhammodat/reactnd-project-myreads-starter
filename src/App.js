import React from 'react';
//import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import BookShelf from './BookShelf';
import Book from './Book';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeShelf = this.onChangeShelf.bind(this);
    this.onAddBook = this.onAddBook.bind(this);
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     * 
     * 1. Render Books in this App.js file to allow better passing of data, e.g. when changing shelf at book level
     */
    showSearchPage: false,
    books: []
  }

  // state = {
  //   books: []
  // }
  
  componentDidMount() {
    console.log('componentDidMount BooksApp');
    BooksAPI.getAll().then((books) => {
      this.setState({ books }); console.log(books);
    })
  }

  getBooksByShelf(category){
    let booksByShelf = this.state.books.filter((book) => book.shelf === category);
    return booksByShelf;
  }

  onChangeShelf(book, newShelf){
    
    book.shelf = newShelf;
    
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id).concat([book])
    }))

    BooksAPI.update(book, newShelf);
  }

  onAddBook(){
    this.setState({ showSearchPage: true });
  }

  render() {

    let currentShelf = this.getBooksByShelf('currentlyReading');
    currentShelf = currentShelf.map((book, index) => {
      return (
        <Book
          book={book}
          key={index}
          onChangeShelf={this.onChangeShelf}
        />
      )
    });

    let wantToReadShelf = this.getBooksByShelf('wantToRead');
    wantToReadShelf = wantToReadShelf.map((book, index) => {
      return (
        <Book
          book={book}
          key={index}
          onChangeShelf={this.onChangeShelf}
        />
      )
    });

    let readShelf = this.getBooksByShelf('read');
    readShelf = readShelf.map((book, index) => {
      return (
        <Book
          book={book}
          key={index}
          onChangeShelf={this.onChangeShelf}
        />
      )
    });

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          this.state.books.length > 0 &&
          <ListBooks onAddBook={this.onAddBook}>
              <BookShelf bookShelfTitle='Currently Reading'>
                {currentShelf}
              </BookShelf>
              <BookShelf bookShelfTitle='Want to Read'>
                {wantToReadShelf}
              </BookShelf>
              <BookShelf bookShelfTitle='Read'>
                {readShelf}
              </BookShelf>              
          </ListBooks>
        )}
      </div>
    )
  }
}

export default BooksApp