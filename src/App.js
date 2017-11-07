import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksSearch from './BooksSearch'
import BooksListing from './BooksListing'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
  	books: []
  }

  componentDidMount() {
  	BooksAPI.getAll().then((books) => {this.setState({books})})
  }

  changeBookToShelf = (theBook, theShelf) => {
  		if(this.state.books) {
			BooksAPI.update(theBook, theShelf).then(() => {
				const currentBooks = this.state.books.filter(book => book.id !== theBook.id)
				theBook.shelf = theShelf
				currentBooks.push(theBook);
				this.setState({books: currentBooks })
			})
		}  
	}

  render() {
    return (
      	<div className="app">
    		<Route exact path="/" render={() => (<BooksListing books={this.state.books} onChangeBook={this.changeBookToShelf} />)} />
    		<Route path="/search" render={() => (<BooksSearch books={this.state.books} onChangeBook={this.changeBookToShelf} />)} />
    	</div>
    )
}
}

export default BooksApp
