import React from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import LeftSideBar from "./LeftSideBar";
import AdminRightSideBar from "./AdminRightSideBar";
import Axios from "axios";
import Search from "./Book/Search";

export default function Navbar(props) {
  const [admin, setAdmin] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [search, setSearch] = React.useState("");

  Axios.defaults.withCredentials = true;

  React.useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      //console.log(response);
      if (response.data.loggedIn === true) {
        if (response.data.user[0].Admin) {
          setAdmin(true);
        } else {
          setUser(true);
        }
      }
    });
  }, []);

  // Handle Search at "/searchBook/:searchString" with Get Request
  const handleSearch = () => {
    console.log(search);
    Axios.get(`http://localhost:3001/book/searchBook/${search}`).then(
      (response) => {
        console.log(response);
        //<Route path="/searchBook/:searchString" element={<Search/>} />
        <Search books={response.data} />;
      }
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span style={{ fontFamily: "Fantasy", fontSize: "24px" }}>LMS</span>
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
            </ul>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{
                maxWidth: "200px",
                fontFamily: "Fantasy",
                borderRadius: "5px",
                backgroundColor: "#f8f9fa",
                color: "#333",
              }}
            />
            <Link
              className="nav-link active"
              aria-current="page"
              to={`/searchBook/${search}`}
            >
              <button
                className="btn btn-outline-success mx-4"
                type="button"
                style={{
                  fontFamily: "Fantasy",
                  backgroundColor: "#ffc107",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                  fontWeight: "bold",
                }}
              >
                Search
              </button>
            </Link>

            <button
              className="btn btn-outline-success"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
              style={{
                fontFamily: "Fantasy",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                fontWeight: "bold",
              }}
            >
              Account
            </button>
          </div>
        </div>
      </nav>

      {admin ? <AdminRightSideBar /> : <RightSidebar />}
      <LeftSideBar />
    </>
  );
}
