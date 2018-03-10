import React from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import BookShelf from './BookShelf';
import Book from './Book';
import Search from './Search';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeShelf = this.onChangeShelf.bind(this);
    this.setBooks = this.setBooks.bind(this);
    this.showSearchPage = this.showSearchPage.bind(this);
    this.hideSearchPage = this.hideSearchPage.bind(this);
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
    showSearchPage: null,
    books: []
  }

  setBooks(books){
    this.setState({ books });
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

  showSearchPage() {
    this.setState({ showSearchPage: true });
  }

  hideSearchPage() {
    this.setState({ showSearchPage: false });
  }

  render() {
    
    console.log('search state', this.state.showSearchPage);

      let currentShelf, wantToReadShelf, readShelf, searchBooks;
      
      if(this.state.showSearchPage === false){
        
        console.log('not search page!');
        currentShelf = this.getBooksByShelf('currentlyReading');
        currentShelf = currentShelf.map((book, index) => {
          return (
            <Book
              book={book}
              key={index}
              onChangeShelf={this.onChangeShelf}
            />
          )
        });

        wantToReadShelf = this.getBooksByShelf('wantToRead');
        wantToReadShelf = wantToReadShelf.map((book, index) => {
          return (
            <Book
              book={book}
              key={index}
              onChangeShelf={this.onChangeShelf}
            />
          )
        });

        readShelf = this.getBooksByShelf('read');
        readShelf = readShelf.map((book, index) => {
          return (
            <Book
              book={book}
              key={index}
              onChangeShelf={this.onChangeShelf}
            />
          )
        });

      }else if(this.state.showSearchPage){

        searchBooks = this.state.books.map((book, index) => {
          return (
            <Book
              book={book}
              key={index}
              onChangeShelf={this.onChangeShelf}
            />
          )
        });

      }
    
    return (

      <div className="app">

        <Route exact path="/" render={() => (          
          <ListBooks setBooks={this.setBooks} showSearchPage={this.showSearchPage} hideSearchPage={this.hideSearchPage}>
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
        )} />
        
        <Route path="/search" render={() => (
          <Search setBooks={this.setBooks} showSearchPage={this.showSearchPage} hideSearchPage={this.hideSearchPage}>
            {searchBooks}
          </Search>
        )} />
      
      </div>

    )
  }
}

export default BooksApp