import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class ListBooks extends Component {

  constructor() {
    super();

    //Bind the following functions to the class to avoid collisions with `this`
    this.setBooks = this.setBooks.bind(this);
  }

  static propTypes = {
    setBooks: PropTypes.func.isRequired,
    showSearchPage: PropTypes.func.isRequired,
    hideSearchPage: PropTypes.func.isRequired
  }

  //Trigger hideSearchPage() to set parent showSearchPage state to false
  componentWillMount() {
    this.props.hideSearchPage();
  }

  //Trigger setBooks to retrieve book data to iterate through
  componentDidMount() {
    this.setBooks();
  }

  //Set parent state with books array to render Book and BookShelf components as children props
  setBooks(){
    BooksAPI.getAll().then((books) => {
      this.props.setBooks(books);
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.children}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search' onClick={this.props.showSearchPage}>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;