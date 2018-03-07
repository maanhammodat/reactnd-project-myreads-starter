import React from 'react';
//import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {

  constructor(props) {
    super(props);

    //this.onChangeShelf = this.onChangeShelf.bind(this);

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
    BooksAPI.getAll().then((books) => {
      this.setState({ books }); console.log(books);
    })

    BooksAPI.update('sJf1vQAACAAJ', 'read').then((books) => {
      console.log(books);
    },
    (err) => {
      console.log('fail: ', err);
    })
  }

  getBooksByShelf(category){
    let booksByShelf = this.state.books.filter((book) => book.shelf == category);
    return booksByShelf;
  }

  // onChangeShelf(id, shelf) {
  //   BooksAPI.update('sJf1vQAACAAJ', 'read').then((books) => {
  //     console.log(books);
  //   },
  //     (err) => {
  //       console.log('fail: ', err);
  //     })
  // }

  render() {
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
          <ListBooks>
              <BookShelf books={this.getBooksByShelf('currentlyReading')} bookShelfTitle='Currently Reading' 
              onChangeShelf={this.onChangeShelf} 
              />
              <BookShelf books={this.getBooksByShelf('wantToRead')} bookShelfTitle='Want to Read' 
              onChangeShelf={this.onChangeShelf} 
              />
              <BookShelf books={this.getBooksByShelf('read')} bookShelfTitle='Read' 
              onChangeShelf={this.onChangeShelf} 
              />            
          </ListBooks>
        )}
      </div>
    )
  }
}

export default BooksApp
