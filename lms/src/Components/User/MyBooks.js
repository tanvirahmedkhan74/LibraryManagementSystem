import Axios from "axios";
import React from 'react'

export default function MyBooks() {
    Axios.defaults.withCredentials = true;
    
    // Store borrowed bookID in a state
    const [borrowedBooks, setBorrowedBooks] = React.useState([]);
    const [userID, setUserID] = React.useState("");

    React.useEffect(() => {
        Axios.get("http://localhost:3001/auth/login").then((response) => {
            console.log(response);
            if (response.data.loggedIn === true) {
                console.log(response.data.user[0].UserID);
                setUserID(response.data.user[0].UserID);
            }
        });
    }, []);

    // get borrowed books from router.get("user/getBorrowedBooks/:id"
    React.useEffect(() => {
        Axios.get(`http://localhost:3001/user/getBorrowedBooks/${userID}`)
            .then(response => {
                console.log(response.data);
                setBorrowedBooks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [userID]);

    // Get borrowed book list using "book/getBook/:id" and store it in a state
    const [borrowedBookList, setBorrowedBookList] = React.useState([]);
    //from bookID in borrowedBooks array of id
    React.useEffect(() => {
        borrowedBooks.map((book) => {
            Axios.get(`http://localhost:3001/book/getBook/${book.BookID}`)
                .then(response => {
                    console.log(response.data);
                    setBorrowedBookList(borrowedBookList => [...borrowedBookList, response.data]);
                })
                .catch(error => {
                    console.log(error);
                });
        })
    }, [borrowedBooks]);
     
    console.log(borrowedBookList);
    // Display borrowed book list

  return (
    <>
     {/*Display all the books from borrowedBookList also return and due date*/}
        <div className="row">
            {borrowedBookList.map((book) => (
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <img className="card-img-top" src={`http://localhost:3001/uploads/${book[0].CoverImage}`} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{book[0].Title}</h5>
                            <p className="card-text">{book[0].Author}</p>
                            <p className="card-text">{book[0].Description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Renew</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Return</button>
                                </div>
                                <small className="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
   
  )
}
