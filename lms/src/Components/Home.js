import React from "react";

export default function Home(props) {
  return (
    <>
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
          {props.auth === true ? "" : "Please Log in to your Account!"}
        </div>
      </div>
    </>
  );
}
