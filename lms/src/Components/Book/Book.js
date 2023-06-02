import React from "react";
import Axios from "axios";
import { useState } from "react";

const Book = ({ book, key }) => {
  let userID = key;
  console.log(key);
  // Setting up the image url path using the book's CoverImage property and sending the req to /uploads
  // and the folder is set up in LibraryManagementSystem\Server\index.js

  const imageUrl = `http://localhost:3001/uploads/${book.CoverImage}`;

  const [eligible, setEligible] = useState(false);

 //console.log(requestBody);

  // Setting up Borrow Date, Due Date(+7 days) and Return Date(+14 days)

  const borrowDate = new Date();
  const dueDate = new Date();
  const returnDate = new Date();

  dueDate.setDate(dueDate.getDate() + 7);
  returnDate.setDate(returnDate.getDate() + 14);

  // Check eligibility to borrow a book at Axios.post("http://localhost:3001/user/checkBorrowEligibility", requestBody) Using function checkBorrowEligibility()
  // If eligible, borrow the book at Axios.post("http://localhost:3001/user/borrowBook", requestBody)

  React.useEffect(() => {
    const requestBody = {
      bookID: book.BookID,
      userID: userID,
    };
    
    console.log(requestBody);
    Axios.post("http://localhost:3001/user/checkBorrowEligibility", requestBody)
      .then((response) => {
        if (response.data.message === "Eligible") {
          console.log("Eligible");
          setEligible(true);
        } else {
          console.log("Not Eligible");
          setEligible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUnderstood = () => {
    const requestBody = {
      bookID: book.BookID,
      userID: userID,
    };
    // Borrow Book on click of "Understood" button
    Axios.post("http://localhost:3001/user/borrowBook", requestBody)
      .then((response) => {
        //console.log(response);
        alert("Book Borrowed Successfully");
      })
      .catch((error) => {
        console.log(error);
      });

      window.location.reload();
  };

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
            style={{ height: "420px", width: "350px", objectFit: "cover", marginLeft: "30px"}}
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

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Borrow
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
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Borrow Book
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {eligible ? (
                    <div>
                      <p className="card-text font-monospace">
                        Book Name : {book.Title}
                      </p>
                      <p className="card-text font-monospace">
                        Borrow Date: {borrowDate.toDateString()}
                      </p>
                      <p className="card-text font-monospace">
                        Due Date: {dueDate.toDateString()}
                      </p>
                      <p className="card-text font-monospace">
                        Return Date: {returnDate.toDateString()}
                      </p>
                    </div>
                  ) : (
                    <p className="card-text font-monospace">
                      You are not eligible to borrow this book
                    </p>
                  )}
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
                    onClick={() => handleUnderstood()}
                  >
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
          <a href="/" className="btn btn-primary mx-2 my-2">
            Request
          </a>
        </div>
      </div>
    </div>
  );
};

export default Book;
