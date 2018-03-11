import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  
  constructor(props) {
    super(props);  

    //Bind the following functions to the class to avoid collisions with `this`
    this.onChangeShelf = this.onChangeShelf.bind(this);
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    shelf: 'none'
  }

  componentDidMount(){
    BooksAPI.get(this.props.book.id).then((book) => {
      
      let shelf = book.shelf ? book.shelf : 'none';

      this.setState({ shelf });  
    })
  }
  onChangeShelf(e){
    
    let shelf = e.target.value;
    
    this.props.onChangeShelf(this.props.book, shelf);

    this.setState({ shelf: shelf });
  }

  render() {

    const { title, authors } = this.props.book;
    
    const { imageLinks } = this.props.book;

    let bookCover = imageLinks ? 
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + imageLinks.thumbnail + '")' }}></div>
      : '';
    
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