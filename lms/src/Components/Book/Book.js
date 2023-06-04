import React from "react";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  const imageUrl = `http://localhost:3001/uploads/${book.CoverImage}`;

  return (
<div className="col-md-4 mb-3">
  <div className="card" style={{ fontFamily: "Fantasy", backgroundColor: "#f8f8ff" }}>
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
      <h5 className="card-title" style={{ fontSize: "20px", fontWeight: "bold" }}>
        {book.Title}
      </h5>
      <p className="card-text" style={{ fontSize: "16px" }}>
        Publisher: {book.Publisher}
      </p>
      <p className="card-text" style={{ fontSize: "16px" }}>
        Publication Date: {book.PublicationDate}
      </p>
      <p className="card-text" style={{ fontSize: "16px" }}>
        Category: {book.Category}
      </p>
      <p className="card-text" style={{ fontSize: "16px" }}>
        Edition: {book.Edition}
      </p>
      <p className="card-text" style={{ fontSize: "16px" }}>
        Pages: {book.NumberOfPages}
      </p>
      <p className="card-text" style={{ fontSize: "16px" }}>
        Available Copies: {book.AvailableCopies}
      </p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Link className="nav-link active" aria-current="page" to={`/borrow/${book.BookID}`}>
          <button type="button" className="btn btn-primary" style={{ fontSize: "18px" }}>
            Borrow
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default Book;
