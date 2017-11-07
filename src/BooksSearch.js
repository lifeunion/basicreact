import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book'

class BooksSearch extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeBook: PropTypes.func.isRequired
	}

	state = {
		query: '',
		results: []
  }

  updateShelf = (book) => {
    const { books } = this.props;
    const matchedBook  = books.find((matchedBook) => (matchedBook.id === book.id))
    book.shelf = matchedBook ? matchedBook.shelf: 'none'
    return book
  }

  updateQuery = (event) => {
    const query = event.target.value.trim()
    this.setState({ query: query})
    BooksAPI.search(query, 20).then((books) => {
      if (books.length > 0) {
        books.forEach((book) => {this.updateShelf(book)})
        this.setState({results: books})
      } else {
        this.setState({results:[]})
      }
    })
  }

	render() {

    const { query, results } = this.state
    const { onChangeBook } = this.props

		return (
			<div className="search-books">
            <div className="search-books-bar">
            	<Link className="close-search" to="/"> Close </Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={this.updateQuery} />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {results.map((book) => (
                  <li key={book.id}>
                    <Book book={ book } onChangeBook={onChangeBook} />
                  </li>
                  ))}
              </ol>
            </div>
          	</div>
		)
	}

}

export default BooksSearch