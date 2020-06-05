import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      searchTerm : "",
      errorMessage : "",
      //Had problems with the books compile error, couldn't figure out what was wrong.
      books : []
    }
  }

  searchBooks = ( event ) => {
    event.preventDefault();
    const searchTerm = event.currentTarget.bookName.value;

    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`

    const settings = {
      method : 'GET'
    }

    fetch( url, settings)
      .then ( response => {
        if( response.ok ){
          return response.json();
        }
        throw new Error( response.statusText );
      })
      .then( responseJSON => {
        if (responseJSON.totalItems == 0){
          this.setState({
            errorMessage : "No results Obtained"
          })
        }
        else{
          this.setState({
            books : responseJSON
          })
        }
      })
      .catch( err => {
        this.setState({
          errorMessage : err.message
        })
      })

  }

  render(){
    return(
      <div>

        <div>
          <BookForm searchBooks = {this.searchBooks}/>
        </div>
        <p>
          {this.state.errorMessage}
        </p>
        
        <div>
          <Book bookData = {books}
                key={books.totalItems}/>
        </div>

      </div>
    )
  }

}

export default App;
