import React from 'react';

function BookForm( props ){
    return(
        <div>
             <form onSubmit= {props.searchBooks}>
            <label htmlFor="bookName">
                Book Name: 
            </label>
            <input type = "text" name = "bookName" id = "bookName" />
            <button type = "submit">
                Search
            </button>
        </form>
        </div>
    );
}

export default BookForm;