import React from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import LeftSideBar from "./LeftSideBar";
import AdminRightSideBar from "./AdminRightSideBar";
export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            LMS
          </Link>
          <button
            className="btn btn-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/elibrary">
                  eLibrary
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success mx-4" type="submit">
                Search
              </button>
            </form>
            <button
              className="btn btn-outline-success"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              Account
            </button>
          </div>
        </div>
      </nav>
      {props.logged === "Admin" ? <AdminRightSideBar/> : <RightSidebar logged={props.logged} auth={props.auth}/>}
      <LeftSideBar />
    </>
  );
}
