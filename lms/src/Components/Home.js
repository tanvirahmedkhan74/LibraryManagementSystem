import React from "react";
import Axios from "axios";
import BooksList from "./Book/BookList";

export default function Home(props) {
  Axios.defaults.withCredentials = true;
  const [auth, setAuth] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);

  React.useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setAuth(true);
        if (response.data.user[0].Admin){
          setAdmin(true);
        }
      }
    });
  }, []);
  return (
    <>
    <hr className="border border-primary border-3 opacity-75"/>
      <div className="card text-center" style={{backgroundColor: "#efebe9"}}>
        <div className="card-header">Welcome</div>
        <div className="card-body">
          <h5 className="card-title">
            Welcome to Library Management System App
          </h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="/" className="btn btn-primary">
            Let's get Started!
          </a>
        </div>
        <div className="card-footer text-muted">
          {/* {props.auth === true ? "" : "Please Log in to your Account!"} */}
        </div>
      </div>
      <hr className="border border-primary border-3 opacity-75"></hr>
      <BooksList/>
    </>
  );
}
