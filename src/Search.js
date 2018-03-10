import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Search extends Component {

    constructor(props) {
        super(props);

        this.searchBooks = this.searchBooks.bind(this);
    }

    state = {
        query: ''
    }

    componentWillMount() {
        this.props.showSearchPage();
    }

    componentDidMount() {
        this.searchBooks(this.state.query);
    }

    searchBooks(query){

        this.setState({ query });

        query != '' &&
        BooksAPI.search(query).then((res) => {
            console.log('searchBooks: ',res);
            if(res){
                if(res.error){
                    this.setState({ query: '' });
                    return false;
                }
                this.props.setBooks(res);
            }
                         
        })
    }

    render() {
        let output = (this.state.query == '' ? '' : this.props.children);
        console.log('output', output);
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/' onClick={this.props.hideSearchPage}>Close</Link>
                    <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={(event) => this.searchBooks(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {output}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search