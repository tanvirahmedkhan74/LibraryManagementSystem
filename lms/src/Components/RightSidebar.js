import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";

export default function RightSidebar (props) {

  const handleProfile = () => {
    return (
      <Profile />
    )
  };
  return (
    <>
      <div className="container">
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              Manage Account
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {/* Authentication Based Sidebar View*/}
            {props.auth === false ? (
              <Link className="nav-link active" aria-current="page" to="/auth">
                <button className="btn btn-outline-success my-2" type="button">
                  Login
                </button>
              </Link>
            ) : (
              <>
                <div className="container">
                <p className="font-monospace">Welcome {props.logged}</p>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/profile"
                  >
                    <button
                      className="btn btn-outline-success my-2"
                      type="button"
                      onClick={handleProfile}
                    >
                      Profile
                    </button>
                  </Link>

                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/auth"
                  >
                    <button
                      className="btn btn-outline-success my-2"
                      type="button"
                    >
                      Your Books
                    </button>
                  </Link>

                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/auth"
                  >
                    <button
                      className="btn btn-outline-success my-2"
                      type="button"
                    >
                      Due Dates
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
