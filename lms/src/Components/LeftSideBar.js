import React from "react";
import { Link } from "react-router-dom";

export default function LeftSideBar () {
  return (
<>
  <div className="container">
    <div
      className="offcanvas offcanvas-start"
      data-bs-scroll="true"
      tabIndex="-1"
      id="offcanvasWithBothOptions"
      aria-labelledby="offcanvasWithBothOptionsLabel"
      style={{
        backgroundColor: "#f8f9fa",
        width: "275px",
        fontFamily: "Fantasy",
        padding: "20px",
        background: "linear-gradient(to bottom, #f8f9fa, #dbd9fe)",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title"
          id="offcanvasWithBothOptionsLabel"
          style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}
        >
          Welcome
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <Link className="nav-link active" aria-current="page" to="/explore">
          <button
            className="btn btn-outline-success my-2"
            type="button"
            style={{
              fontSize: "18px",
              background: "linear-gradient(to bottom, #73c8a9, #42a7ad)",
              color: "#fff",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
            }}
          >
            Explore
          </button>
        </Link>

        <Link className="nav-link active" aria-current="page" to="/trending">
          <button
            className="btn btn-outline-success my-2"
            type="button"
            style={{
              fontSize: "18px",
              background: "linear-gradient(to bottom, #f8d097, #e68b6b)",
              color: "#fff",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
            }}
          >
            Trending
          </button>
        </Link>

        <Link className="nav-link active" aria-current="page" to="/auth">
          <button
            className="btn btn-outline-success my-2"
            type="button"
            style={{
              fontSize: "18px",
              background: "linear-gradient(to bottom, #f0a5a5, #dc6c6c)",
              color: "#fff",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
            }}
          >
            Requested
          </button>
        </Link>
      </div>
    </div>
  </div>
</>

  );
  
}
