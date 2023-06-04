import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

export default function Search() {
  let { searchString } = useParams();

  searchString = searchString.startsWith(":")
    ? searchString.substring(1) // Remove the ':' character
    : searchString;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/book/searchBook/${searchString}`).then(
      (response) => {
        console.log(response);
        setBooks(response.data);
      }
    );
  }, [searchString]);

  return (
    <>
      <div className="container">
        <h2
          style={{
            fontFamily: "fantasy",
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Search Results
        </h2>
        {books.length > 0 ? (
          <>
            <p
              style={{ fontFamily: "fantasy", fontSize: "18px", color: "#666" }}
            >
              Number of Results: {books.length}
            </p>
            <div className="row">
              {books.map((book) => (
                <div className="col-sm-4" key={book.id}>
                  <div className="card book-card">
                    <img
                      src={`http://localhost:3001/uploads/${book.CoverImage}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5
                        className="card-title"
                        style={{
                          fontFamily: "fantasy",
                          fontSize: "24px",
                          color: "#333",
                        }}
                      >
                        {book.Title}
                      </h5>
                      <p
                        className="card-text"
                        style={{
                          fontFamily: "fantasy",
                          fontSize: "16px",
                          color: "#666",
                        }}
                      >
                        {book.ISBN}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p style={{ fontFamily: "fantasy", fontSize: "18px", color: "#333" }}>
            Sorry, No Book Found! Please Check Your Spelling.
          </p>
        )}
      </div>

      <style>{`
        .book-card {
          height: 100%;
        }

        .book-card .card-body {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
}
