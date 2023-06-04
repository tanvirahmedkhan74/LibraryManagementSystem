import React from "react";
import Axios from "axios";
import axios from "axios";
import Book from "../Book/Book";
import { useState, useEffect } from "react";

export default function Explore() {
  Axios.defaults.withCredentials = true;
  const [auth, setAuth] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);
  const [books, setBooks] = useState([]);

  const [userID, setUserID] = React.useState("");

  React.useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setAuth(true);
        setUserID(response.data.user[0].UserID);
        if (response.data.user[0].Admin) {
          setAdmin(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/book/getBooks")
      .then((response) => {
        //console.log(response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {auth ? (
        <div className="row">
          {books.map((book) => (
            <Book book={book} userID={userID} key={book.BookID} />
          ))}
        </div>
      ) : (
        <p className="text-center" style={{ fontSize: "20px" }}>
          Please login to explore the books
        </p>
      )}
    </>
  );
}
