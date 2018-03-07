/**
 * TODO: trying to pass books array as state to detect change
 * Response from API is 
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class BookShelf extends Component {

  constructor(props) {
    super(props);

    this.onChangeShelf = this.onChangeShelf.bind(this);
    
  }

  onChangeShelf(id, shelf) {
    BooksAPI.update(id, shelf).then((res) => {
      console.log('change shelf done!', JSON.stringify(res));
      // this.setState({ books }); console.log(books);
      // console.log(this.state);
    },
      (err) => {
        console.log('fail: ', err);
      })
  }

  render() {

    const { books } = this.props;
    let output;
    
    if(books.length > 0){

      output = books.map((book, index) =>{
        return(
          <Book 
            title={book.title} 
            author={JSON.stringify(book.author)} 
            thumbnail={book.imageLinks.smallThumbnail} 
            shelf={book.shelf} 
            id={book.id}
            key={index}
            onChangeShelf={this.onChangeShelf}
          />
        )
      });

    }else{
      output = <p>No books found!</p>;
    }

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {output}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf