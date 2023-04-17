import * as React from "react";
import Axios from "axios";

export default function Login(props) {
  const [logEmail, setLogEmail] = React.useState("");
  const [logPassword, setLogPassword] = React.useState("");

  const [loginStatus , setLoginStatus] = React.useState("X");
  // Login States
  const handleLogEmailChange = (event) => {
    setLogEmail(event.target.value);
  };

  const handleLogPasswordChange = (event) => {
    setLogPassword(event.target.value);
  };

  const login = (event) => {
    // Preventing the default behaviour of the form
    event.preventDefault();
    
    Axios.post("http://localhost:3001/auth/login", {
      email: logEmail,
      password: logPassword,
    }).then((response) => {
      console.log(response);
      if(response.data.message){
        setLoginStatus(response.data.message);
      }else{
        props.handleAuth();
        props.handleLogged(response.data[0].Username);
        setLoginStatus(response.data[0].Username);
      }
    });
  };

  return (
    <div className="container my-5">
      <h3>{loginStatus}</h3>
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
