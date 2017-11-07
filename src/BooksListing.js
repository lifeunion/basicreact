import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class BooksListing extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onChangeBook: PropTypes.func.isRequired
	}

	chooseWhichShelf = (books,shelf) => {
		return books.filter((book) => book.shelf === shelf)
	}

	render() {
		const { books, onChangeBook } = this.props

		return (
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{ this.chooseWhichShelf(books, 'currentlyReading').map ((book) => (
                    		<li key={book.id}>
                    			<Book book={ book } onChangeBook={ onChangeBook } />
                    		</li>
                    	))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{ this.chooseWhichShelf(books, 'wantToRead').map ((book) => (
                    		<li key={book.id}>
                    			<Book book={ book } onChangeBook={ onChangeBook } />
                    		</li>
                    	))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      { this.chooseWhichShelf(books, 'read').map ((book) => (
                    		<li key={book.id}>
                    			<Book book={ book } onChangeBook={ onChangeBook } />
                    		</li>
                    	))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
          </div>
		)
	}

}

export default BooksListing