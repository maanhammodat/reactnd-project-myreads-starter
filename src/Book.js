import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Book extends Component {

  constructor() {
    super();

    //Bind the following functions to the class to avoid collisions with `this`
    this.onChangeShelf = this.onChangeShelf.bind(this);
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  //Set the initial state to none
  state = {
    shelf: 'none'
  }

  //Retrieve the shelf the book belongs to and set the shelf state to it
  componentDidMount(){
    BooksAPI.get(this.props.book.id).then((book) => {
      this.setState({ shelf: book.shelf });
    })
  }

  //Pass in target shelf and set the shelf state to it
  //Call the parent method to update local books array state
  onChangeShelf(e){

    let shelf = e.target.value;

    this.props.onChangeShelf(this.props.book, shelf);
    this.setState({ shelf: shelf });
  }

  render() {

    const { title, authors } = this.props.book;

    const { imageLinks } = this.props.book;

    //Check if book has a thumbnail and render the thumbnail element if so
    let bookCover = imageLinks ?
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + imageLinks.thumbnail + '")' }}></div>
      : '';

    //Check if book has author(s) and render the author(s) element if so
    let bookAuthors = authors ? <div className="book-authors">{authors}</div> : '';

    return (
      <li>
        <div className="book">
          <div className="book-top">
            {bookCover}
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={this.onChangeShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          {bookAuthors}
        </div>
      </li>
    )
  }
}

export default Book;