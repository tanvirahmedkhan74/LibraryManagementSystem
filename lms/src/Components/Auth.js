import React from "react";
import Login from "./Login";
import Registration from "./Registration";
import Axios from "axios";

export default function Auth(props) {
  const [admin, setAdmin] = React.useState(false);
  const [user, setUser] = React.useState(false);

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

  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div
          className="shadow-lg w-25 p-3 mb-5 col mx-2"
          style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}
        >
          <h2
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            Login
          </h2>
          <Login />
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              marginTop: "20px",
            }}
          >
            Already have an account? <a href="/login">Log in here</a>.
          </p>
        </div>
        <div
          className="shadow-lg w-25 p-3 mb-5 col"
          style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}
        >
          <h2
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            Registration
          </h2>
          <Registration />
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              marginTop: "20px",
            }}
          >
            Already registered? <a href="/login">Log in here</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
