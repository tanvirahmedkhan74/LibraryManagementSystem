import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';

const BooksList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/book/getBooks')
      .then(response => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="row">
      {books.map(book => (
        <Book book={book} key={book.BookID} />
      ))}
    </div>
  );
};

export default BooksList;
