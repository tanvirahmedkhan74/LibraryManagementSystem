import React from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import Axios from "axios";

export default function RightSidebar(props) {
  const handleProfile = () => {
    return <Profile />;
  };

  const [admin, setAdmin] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [logged, setLogged] = React.useState("");

  Axios.defaults.withCredentials = true;

  React.useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setLogged(response.data.user[0].Username);
        if (response.data.user[0].Admin){
          setAdmin(true);
        }else{
          setUser(true);
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
          style={{ backgroundColor: "#f8f9fa", width: "275px" }}
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
            {!user ? (
              <Link className="nav-link active" aria-current="page" to="/auth">
                <button className="btn btn-outline-success my-2" type="button">
                  Login
                </button>
              </Link>
            ) : (
              <div className="container">
                <p className="font-monospace">Welcome {logged}</p>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
