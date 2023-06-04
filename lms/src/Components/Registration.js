import * as React from "react";
import Axios from "axios";

export default function Registration() {
  const [name, setName] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRegEmailChange = (event) => {
    setRegEmail(event.target.value);
  };

  const handleRegPasswordChange = (event) => {
    setRegPassword(event.target.value);
  };

  //Axios.defaults.withCredentials = true;
  const register = () => {
    Axios.post("http://localhost:3001/auth/register", {
      uname: name,
      email: regEmail,
      password: regPassword,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="container my-5">
      <h2 style={{ fontFamily: "Fantasy", fontSize: "32px" }}>Registration</h2>
      <form>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInputName"
            placeholder="name@example.com"
            value={name}
            onChange={handleNameChange}
          />
          <label htmlFor="floatingInput" style={{ fontFamily: "Fantasy" }}>
            Name
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInputEmail"
            placeholder="name@example.com"
            value={regEmail}
            onChange={handleRegEmailChange}
          />
          <label htmlFor="floatingInput" style={{ fontFamily: "Fantasy" }}>
            Email address
          </label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={regPassword}
            onChange={handleRegPasswordChange}
          />
          <label htmlFor="floatingPassword" style={{ fontFamily: "Fantasy" }}>
            Password
          </label>
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-primary mx-3"
          onClick={register}
          style={{ fontFamily: "Fantasy", fontSize: "18px" }}
        >
          Create new Account
        </button>
      </form>
    </div>
  );
  
}
