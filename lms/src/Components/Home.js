import React from "react";
import Axios from "axios";
import BooksList from "./Book/BookList";

import c0 from "../Assets/Carousel/carousel0.jpg";
import c1 from "../Assets/Carousel/carousel1.jpg";
import c2 from "../Assets/Carousel/carousel2.jpg";
import c3 from "../Assets/Carousel/carousel3.jpg";

export default function Home(props) {
  Axios.defaults.withCredentials = true;
  const [auth, setAuth] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);

  React.useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setAuth(true);
        if (response.data.user[0].Admin) {
          setAdmin(true);
        }
      }
    });
  }, []);

  return (
    <>
      <hr className="border border-primary border-3 opacity-75" />
      <div
        className="card text-center"
        style={{ backgroundColor: "#dbd9fe", padding: "20px" }}
      >
        <div className="card-header">Welcome</div>
        <div className="card-body">
          <h5
            className="card-title"
            style={{
              fontFamily: "Fantasy",
              fontSize: "32px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Welcome to the Library Management System App
          </h5>
          <p
            className="card-text"
            style={{ fontFamily: "Arial, sans-serif", fontSize: "18px" }}
          >
            "The only thing that you absolutely have to know is the location of
            the library."
            <br />- Albert Einstein
          </p>
          <a
            href="/"
            className="btn btn-primary"
            style={{ fontFamily: "Arial, sans-serif", fontSize: "20px" }}
          >
            Let's get Started!
          </a>
        </div>
        <div
          className="card-footer text-muted"
          style={{ fontFamily: "Arial, sans-serif", fontSize: "16px" }}
        >
          {/* {props.auth === true ? "" : "Please Log in to your Account!"} */}
        </div>
      </div>
      <hr className="border border-primary border-3 opacity-75" />

      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={c0} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={c1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={c2} className="d-block w-100" alt="..." />
          </div>
        </div>
      </div>
    </>
  );
}
