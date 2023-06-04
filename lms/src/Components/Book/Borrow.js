import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Borrow() {
  const params = useParams();
  const bookID = params.id;
  //console.log("Book id is" + bookID);
  Axios.defaults.withCredentials = true;

  const [admin, setAdmin] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [eligible, setEligible] = useState(false);
  const [book, setBook] = useState();
  const [userID, setUserID] = useState(0);
  const [title, setTitle] = useState("");

  React.useEffect(() => {
    console.log("Book id found " + bookID);
    Axios.get(`http://localhost:3001/book/getBook/${bookID}`)
      .then((response) => {
        console.log(response);
        setBook(response.data[0]);
        setTitle(response.data[0].Title);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookID]);

  //console.log(requestBody);

  // Setting up Borrow Date, Due Date(+7 days) and Return Date(+14 days)

  const borrowDate = new Date();
  const dueDate = new Date();
  const returnDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);
  returnDate.setDate(returnDate.getDate() + 14);

  React.useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      //console.log(response);
      if (response.data.loggedIn === true) {
        if (response.data.user[0].Admin) {
          setAdmin(true);
        } else {
          console.log(response.data.user[0]);
          setUserID(response.data.user[0].UserID);
          setUser(true);
        }
      }
    });
  }, []);

  React.useEffect(() => {
    const requestBody = {
      bookID: bookID,
      userID: userID,
    };
    console.log(requestBody);
    Axios.post("http://localhost:3001/user/checkBorrowEligibility", requestBody)
      .then((response) => {
        console.log(response); 
        if (response.data.message === "Eligible") {
          console.log("Message is "+ response.data.message);
          //console.log("Eligible");
          setEligible(true);
        } else {
          //console.log("Not Eligible");
          setEligible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userID, bookID]);

  const handleUnderstood = () => {
    const requestBody = {
      bookID: bookID,
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
  // Confirm Borrowing of Book or show invalid if not eli
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <div className="card" style={{ backgroundColor: "#f5f5f5", padding: "10px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</h2>
            <br />
            <p style={{ marginBottom: "5px" }}>Due Date: {dueDate.toLocaleDateString()}</p>
            <p style={{ marginBottom: "5px" }}>Return Date: {returnDate.toLocaleDateString()}</p>
            <p style={{ marginBottom: "5px" }}>Borrow Date: {borrowDate.toLocaleDateString()}</p>
            <p style={{ color: eligible ? "green" : "red" }}>Eligible: {eligible ? "Yes" : "No"}</p>
            <button
              className={`btn btn-primary ${eligible ? "" : "disabled"}`}
              style={{ opacity: eligible ? 1 : 0.5, cursor: eligible ? "pointer" : "not-allowed" }}
              onClick={() => handleUnderstood()}
              disabled={!eligible}
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
