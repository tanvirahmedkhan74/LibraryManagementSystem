import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditBook from "./EditBook";
import "./ManageBook.css";
import AddBook from "./AddBook";

export default function ManageBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/book/getBooks")
      .then((response) => {
        setBooks(response.data);
        // formatting dates for all books in Books
        for (let i = 0; i < response.data.length; i++) {
          const dateObj = new Date(response.data[i].PublicationDate);
          const formattedDate = dateObj.toISOString().slice(0, 10);
          response.data[i].PublicationDate = formattedDate;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const imageUrl = `http://localhost:3001/uploads/${book.CoverImage}`;

  // const handleEdit = (book) => {
  //   return <EditBook book={book} />;
  // };

  const handleDelete = (book) => {
    axios
      .delete(`http://localhost:3001/book/deleteBook/${book.BookID}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Books</h3>
      <Link to={"/admin/addBook"}>
        <button
          className="btn btn-outline-success my-2"
          type="button"
          style={{ padding: "2px" }}
        >
          Add Book
        </button>
      </Link>
      <table className="book-table">
        <thead>
          <tr>
            <th>BookID</th>
            <th>Title</th>
            <th>ISBN</th>
            <th>Publisher</th>
            <th>Publication Date</th>
            <th>Category</th>
            <th>Available Copies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.BookID}>
              <td>{book.BookID}</td>
              <td>{book.Title}</td>
              <td>{book.ISBN}</td>
              <td>{book.Publisher}</td>
              <td>{book.PublicationDate}</td>
              <td>{book.category}</td>
              <td>{book.AvailableCopies}</td>
              <td>
                <Link to={`/admin/editBook/${book.BookID}`}>
                  <button
                    className="btn btn-outline-success my-2"
                    type="button"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  type="button"
                  className="btn btn-outline-success my-2"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  Delete
                </button>
                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          Delete Book
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Are You Sure About Deleting This Book?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleDelete(book)}
                        >
                          Yes!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
