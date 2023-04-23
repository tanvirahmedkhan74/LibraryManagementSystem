import React from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import ManageBook from './Admin/ManageBook';

export default function AdminRightSideBar() {

  Axios.defaults.withCredentials = true;
  
  const handleLogout = () => {
    Axios.get("http://localhost:3001/auth/logout").then((response) => {
      //console.log(response);
      window.location.reload(false);
    });
  };

    return (
        <>
          <div className="container">
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
              style={{ backgroundColor: "#f8f9fa" , width: "275px" }}
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
                <Link className="nav-link active" aria-current="page" to="/admin/manageBook">
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

                <button className="btn btn-outline-success my-2" type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      );
}
