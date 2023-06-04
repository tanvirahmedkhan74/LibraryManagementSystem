import React from "react";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Book = ({ book }) => {

  const imageUrl = `http://localhost:3001/uploads/${book.CoverImage}`;

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        {/* <img src={book.CoverImage} className="card-img-top" alt={book.Title} /> */}
        <div
          style={{
            height: "435px",
            width: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
          }}
        >
          <img
            src={imageUrl}
            alt={book.Title}
            style={{
              height: "420px",
              width: "350px",
              objectFit: "cover",
              marginLeft: "30px",
            }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title font-monospace">{book.Title}</h5>
          <p className="card-text font-monospace">{book.Publisher}</p>
          <p className="card-text font-monospace">{book.PublicationDate}</p>
          <p className="card-text font-monospace">Category: {book.Category}</p>
          <p className="card-text font-monospace">{book.Edition} Edition</p>
          <p className="card-text font-monospace">{book.NumberOfPages} pages</p>
          <p className="card-text font-monospace">
            {book.AvailableCopies} available copies
          </p>
          <Link className="nav-link active" aria-current="page" to={`/borrow/${book.BookID}`}>
            <button type="button" className="btn btn-primary">
              Borrow
            </button>
          </Link>
          <a href="/" className="btn btn-primary mx-2 my-2">
            Request
          </a>
        </div>
      </div>
    </div>
  );
};

export default Book;
