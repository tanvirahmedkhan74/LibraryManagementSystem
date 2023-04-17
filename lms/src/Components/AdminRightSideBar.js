import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminRightSideBar() {
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
                <Link className="nav-link active" aria-current="page" to="/auth">
                  <button className="btn btn-outline-success my-2" type="button">
                   Manage Books
                  </button>
                </Link>
                <Link className="nav-link active" aria-current="page" to="/auth">
                  <button className="btn btn-outline-success my-2" type="button">
                   Manage Users
                  </button>
                </Link>
                <Link className="nav-link active" aria-current="page" to="/auth">
                  <button className="btn btn-outline-success my-2" type="button">
                   Manage Request
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      );
}
