import React from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function Search() {
  let { searchString } = useParams();
  searchString = searchString.startsWith(":")
    ? searchString.substring(1) // Remove the ':' character
    : searchString;

  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    Axios.get(`http://localhost:3001/book/searchBook/${searchString}`).then(
      (response) => {
        console.log(response);
        setBooks(response.data);
      }
    );
  }, [searchString]);

  return (
    <>
      <div
        className="container"
      >
        <h2>Search Results</h2>
        {books.length > 0 ? (
          <>
            <p>Number of Results: {books.length}</p>
            <div className="row">
              {books.map((book) => (
                <div className="col-sm-4" key={book.id}>
                  <div className="card" >
                    <img
                      src={`http://localhost:3001/uploads/${book.CoverImage}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{book.Title}</h5>
                      <p className="card-text">{book.Description}</p>
                      <a href="/" className="btn btn-primary">
                        Borrow
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Sorry, No Book Found! Please Check Your Spelling.</p>
        )}
      </div>
    </>
  );
}
