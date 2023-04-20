import React from 'react';

const Book = ({ book }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <img src={book.CoverImage} className="card-img-top" alt={book.Title} />
        <div className="card-body">
          <h5 className="card-title">{book.Title}</h5>
          <p className="card-text">{book.Publisher}</p>
          <p className="card-text">{book.PublicationDate}</p>
          <p className="card-text">{book.Edition} Edition</p>
          <p className="card-text">{book.NumberOfPages} pages</p>
          <p className="card-text">{book.AvailableCopies} available copies</p>
          <a href="#" className="btn btn-primary">Details</a>
        </div>
      </div>
    </div>
  );
}

export default Book;
