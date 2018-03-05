import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book';

class BookShelf extends Component {

  state = {
    query: ''
  }

  render() {

    //const { bookShelfTitle, books } = this.props
    
    const books = this.props.books.map((book, index) =>{
      return(
        <Book title={book.title} author={JSON.stringify(book.author)} thumbnail={book.imageLinks.smallThumbnail} key={index} />
      )
    })

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf