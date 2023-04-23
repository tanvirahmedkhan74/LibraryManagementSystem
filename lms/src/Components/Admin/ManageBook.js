import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditBook from "./EditBook";
import "./ManageBook.css";

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

  const handleEdit = (book) => {
    return <EditBook book={book} />;
  };

  const handleDelete = (book) => {
    axios
      .delete(`http://localhost:3001/book/deleteBook/${book.BookID}`)
      .then(() => {
        setBooks(books.filter((b) => b.BookID !== book.BookID));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Books</h3>
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
  
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/manageBook"
                >
                  <button
                    className="btn btn-outline-success my-2"
                    type="button"
                  >
                    Delete
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );  
}
