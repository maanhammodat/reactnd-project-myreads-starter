import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelf extends Component {

  static propTypes = {
    bookShelfTitle: PropTypes.string
  }

  render() {

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.children}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;