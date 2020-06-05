import React from 'react';

function Book( props ){
    return(
        <div>
            {props.books.items.map( ( book ) => {
            return( 
              <div>
                <h1> {book.volumeInfo.title} </h1>
                <h3> {book.volume.Info.authors[0]} </h3>
                <p>  {book.selfLink} </p>
                </div>
             )
          })}
        </div>
    );
}

export default Book;