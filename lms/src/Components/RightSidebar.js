import React from "react";
import { Link } from "react-router-dom";
import Profile from "./User/Profile";
import Axios from "axios";

export default function RightSidebar(props) {
  const handleProfile = () => {
    return <Profile />;
  };

  const [admin, setAdmin] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [logged, setLogged] = React.useState("");

  Axios.defaults.withCredentials = true;

  const handleLogout = () => {
    Axios.get("http://localhost:3001/auth/logout").then((response) => {
      //console.log(response);
      setUser(false);
      setAdmin(false);
      window.location.reload(false);
    });
  };

  React.useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      //console.log(response);
      if (response.data.loggedIn === true) {
        setLogged(response.data.user[0].Username);
        if (response.data.user[0].Admin) {
          setAdmin(true);
        } else {
          setUser(true);
          setLogged(response.data.user[0].Username);
        }
      }
    });
  }, []);

  return (
    <>
      <div className="container">
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
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
              id="offcanvasRightLabel"
              style={{ color: "#333" }}
            >
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
            {!user ? (
              <Link className="nav-link active" aria-current="page" to="/auth">
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
                  Login
                </button>
              </Link>
            ) : (
              <div className="container">
                <p
                  className="font-monospace"
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "#333",
                  }}
                >
                  <span style={{ color: "#42a7ad" }}>Welcome</span> {logged}
                </p>

                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/profile"
                >
                  <button
                    className="btn btn-outline-success my-2"
                    type="button"
                    onClick={handleProfile}
                    style={{
                      fontSize: "18px",
                      background:
                        "linear-gradient(to bottom, #f8d097, #e68b6b)",
                      color: "#fff",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    Profile
                  </button>
                </Link>

                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/myBooks"
                >
                  <button
                    className="btn btn-outline-success my-2"
                    type="button"
                    style={{
                      fontSize: "18px",
                      background:
                        "linear-gradient(to bottom, #f8d097, #e68b6b)",
                      color: "#fff",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    Your Books
                  </button>
                </Link>

                <button
                  className="btn btn-outline-success my-2"
                  type="button"
                  onClick={handleLogout}
                  style={{
                    fontSize: "18px",
                    background: "linear-gradient(to bottom, #f8d097, #e68b6b)",
                    color: "#fff",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
