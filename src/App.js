import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import BookShelf from './BookShelf';
import Book from './Book';
import Search from './Search';


class BooksApp extends React.Component {

  constructor() {
    super();

    //Bind the following functions to the class to avoid collisions with `this`
    this.onChangeShelf = this.onChangeShelf.bind(this);
    this.setBooks = this.setBooks.bind(this);
    this.showSearchPage = this.showSearchPage.bind(this);
    this.hideSearchPage = this.hideSearchPage.bind(this);
  }

  state = {
    showSearchPage: null,
    books: []
  }

  //Books passed on to the state from ListBooks or Search components
  setBooks(books){
    this.setState({ books });
  }

  //Filters books by category for ListBooks compoenent and returns an array
  getBooksByShelf(category){
    let booksByShelf = this.state.books.filter((book) => book.shelf === category);
    return booksByShelf;
  }

  //Updates book shelf by
  //1. Passing in book object and modifying its shelf property,
  //2. Updating the state by removing the old book object through a filter and adding the new book object
  //3. Calling BooksApI to update the remote data
  onChangeShelf(book, newShelf){
    book.shelf = newShelf;

    BooksAPI.update(book, newShelf).then(() => {
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book])
      }))
    });
  }

  showSearchPage() {
    this.setState({ showSearchPage: true });
  }

  hideSearchPage() {
    this.setState({ showSearchPage: false });
  }

  render() {

    //ListBooks and Search component variables instantiated regardless of state to avoid lint errors
    let currentShelf, wantToReadShelf, readShelf, searchBooks;

    //ListBooks logic, uses book data from BooksAPI.getAll() - see ListBooks component
    //3 book shelves are populated and Books are generated with the entire book object passed in to the prop
    if(this.state.showSearchPage === false){

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

    //Search logic. Uses book data from search query using BooksAPI.search - see Search component
    //Books are generated with the entire book object passed in to the prop
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

export default BooksApp;