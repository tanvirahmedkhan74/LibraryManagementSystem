import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Trending = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  const fetchTrendingBooks = () => {
    axios.get('http://localhost:3001/book/getTrending')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Trending Books</h2>
      <ul style={{ listStyle: 'none', padding: '0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px' }}>
        {books.map(book => (
          <li key={book.BookID} style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{book.Title}</h3>
            <p style={{ fontSize: '14px', marginBottom: '5px' }}>Publisher ID: {book.PublisherID}</p>
            <p style={{ fontSize: '14px', marginBottom: '5px' }}>ISBN: {book.ISBN}</p>
            <p style={{ fontSize: '14px', marginBottom: '5px' }}>Publication Date: {book.PublicationDate}</p>
            <p style={{ fontSize: '14px', marginBottom: '5px' }}>Edition: {book.Edition}</p>
            <p style={{ fontSize: '14px', marginBottom: '5px' }}>Category ID: {book.CategoryID}</p>
            <p style={{ fontSize: '14px', marginBottom: '5px' }}>Available Copies: {book.AvailableCopies}</p>
            <img style={{ width: '100%', height: 'auto', borderRadius: '5px' }} src={`http://localhost:3001/uploads/${book.CoverImage}`} alt="Book Cover" />
          </li>
        ))}
      </ul>
    </div>
  );  
};

export default Trending;
