import * as React from "react";
import Axios from "axios";

export default function Registration() {
  const [logEmail, setLogEmail] = React.useState("");
  const [logPassword, setLogPassword] = React.useState("");

  // Login States
  const handleLogEmailChange = (event) => {
    setLogEmail(event.target.value);
  };

  const handleLogPasswordChange = (event) => {
    setLogPassword(event.target.value);
  };

  const login = () => {
    Axios.post("http://localhost:3001/auth/login", {
      email: logEmail,
      password: logPassword,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="container my-5">
      <h2>Login</h2>
      <form>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInputLogin"
            placeholder="name@example.com"
            value={logEmail}
            onChange={handleLogEmailChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPasswordLogin"
            placeholder="Password"
            value={logPassword}
            onChange={handleLogPasswordChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <br />
        <button type="submit" className="btn btn-primary" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
}
