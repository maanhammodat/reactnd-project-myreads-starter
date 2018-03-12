import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class Search extends Component {

    constructor() {
        super();

        //Bind the following functions to the class to avoid collisions with `this`
        this.searchBooks = this.searchBooks.bind(this);
    }

    static propTypes = {
        setBooks: PropTypes.func.isRequired,
        showSearchPage: PropTypes.func.isRequired,
        hideSearchPage: PropTypes.func.isRequired
    }

    //Set initial query state to blank and validSearch to false
    state = {
        query: '',
        validSearch: false
    }

    //Trigger showSearchPage() to set parent showSearchPage state to true
    componentWillMount() {
        this.props.showSearchPage();
    }

    //Perform search on componentDidMount to clear results when query text is deleted
    componentDidMount() {
        this.searchBooks(this.state.query);
    }

    //1. Sets state to query text
    //2. If query is valid then fetch results from BooksAPI, otherwise set validSearch state to false
    //3. If API results are valid then run the setBooks method from parent to update books array state data and set validSearch state to true, otherwise set validSearch state to false
    searchBooks(query){

        this.setState({ query });

        if(query === ''){
            this.setState({ validSearch: false });
            return false;
        }else{
            BooksAPI.search(query).then((res) => {
                if(res){
                    if(res.error){
                        this.setState({ validSearch: false });
                        return false;
                    }
                    this.props.setBooks(res);
                    this.setState({ validSearch: true });
                }

            })
        }
    }

    render() {
        //if validSearch state is true, then show books
        let output = (!this.state.validSearch ? '' : this.props.children);

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/' onClick={this.props.hideSearchPage}>Close</Link>
                    <div className="search-books-input-wrapper">
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

export default Search;