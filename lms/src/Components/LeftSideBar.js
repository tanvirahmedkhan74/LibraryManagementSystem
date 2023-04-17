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
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
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
          <Link className="nav-link active" aria-current="page" to="/auth">
              <button className="btn btn-outline-success my-2" type="button">
                Dashboard
              </button>
            </Link>

            <Link className="nav-link active" aria-current="page" to="/auth">
              <button className="btn btn-outline-success my-2" type="button">
                Trending
              </button>
            </Link>

            <Link className="nav-link active" aria-current="page" to="/auth">
              <button className="btn btn-outline-success my-2" type="button">
                Requested
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
