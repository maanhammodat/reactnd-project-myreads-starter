import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Book extends Component {
  
  constructor(props) {
    super(props);    
    
  
    this.state = {
      shelf: this.props.book.shelf
    }

    this.onChangeShelf = this.onChangeShelf.bind(this);
  }
  

  onChangeShelf(e){
    
    let shelf = e.target.value;
    let id = this.props.book.id;
    //console.log('change ',id,'to shelf', shelf);
    this.props.onChangeShelf(this.props.book, shelf);

    this.setState({ shelf: shelf });

    // BooksAPI.update(id, shelf).then((res) => {
    //   console.log('change shelf done!', JSON.stringify(res));
    //   // this.setState({ books }); console.log(books);
    //   // console.log(this.state);
    // },
    // (err) => {
    //   console.log('fail: ', err);
    // })

    // BooksAPI.update(this.props.id, shelf).then(() => {
    //   console.log('done!');
    //   this.setState(state => ({
    //     shelf: shelf
    //   }))
    //   console.log(this.state);
    // },
    // (err) => {
    //   console.log('fail: ', err);
    // })

    // BooksAPI.update(id, shelf).then(function (value) {
    //   this.setState({ shelf: shelf })
    // }, function (err) {
    //   console.log('fail: ', err);
    // });

  }

  render() {
    const { title, author, shelf, id } = this.props.book;
    const { thumbnail } = this.props.book.imageLinks;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + thumbnail + '")' }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={this.onChangeShelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading" defaultValue>Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    )
  }
}

export default Book