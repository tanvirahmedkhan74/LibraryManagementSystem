import React from 'react';

const Book = ({ book }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        {/* <img src={book.CoverImage} className="card-img-top" alt={book.Title} /> */}
        <img src={book.CoverImage} alt={book.Title} />
        <div className="card-body">
          <h5 className="card-title font-monospace">{book.Title}</h5>
          <p className="card-text font-monospace">{book.Publisher}</p>
          <p className="card-text font-monospace">{book.PublicationDate}</p>
          <p className="card-text font-monospace">Category: {book.category}</p>
          <p className="card-text font-monospace">{book.Edition} Edition</p>
          <p className="card-text font-monospace">{book.NumberOfPages} pages</p>
          <p className="card-text font-monospace">{book.AvailableCopies} available copies</p>
          
          <a href="/" className="btn btn-primary">Details</a>
        </div>
      </div>
    </div>
  );
}

export default Book;
