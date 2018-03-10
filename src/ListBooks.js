import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI';

class ListBooks extends Component {

  constructor(props) {
    super(props);
    
    this.setBooks = this.setBooks.bind(this);
  }

  componentWillMount() {
    this.props.hideSearchPage();
  }

  componentDidMount() {
    this.setBooks();
  }

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

export default ListBooks