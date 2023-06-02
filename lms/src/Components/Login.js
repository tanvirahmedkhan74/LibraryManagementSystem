import * as React from "react";
import Axios from "axios";
import { redirect } from "react-router-dom";

export default function Login(props) {
  const [logEmail, setLogEmail] = React.useState("");
  const [logPassword, setLogPassword] = React.useState("");

  const [loginStatus , setLoginStatus] = React.useState(false);

  // Login States
  const handleLogEmailChange = (event) => {
    setLogEmail(event.target.value);
  };

  const handleLogPasswordChange = (event) => {
    setLogPassword(event.target.value);
  };

  // VVVV IMPORTANT VVVV
  Axios.defaults.withCredentials = true;

  const login = (event) => {
    // Preventing the default behaviour of the form
    event.preventDefault();
    
    Axios.post("http://localhost:3001/auth/login", {
      email: logEmail,
      password: logPassword,
    }).then((response) => {
      //console.log(response);
      if(!response.data.auth){
        alert("Wrong email or password");
        setLoginStatus(false);
      }else{
        setLoginStatus(true);
        //console.log(response);
        localStorage.setItem("token" , response.data.token);
        console.log(response.data.result[0].Username);
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
        
      }
    });
  };

  // const userAuthenticated = () => {
  //   Axios.get("http://localhost:3001/auth/isUserAuth", {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // };
  

  React.useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setLoginStatus(true);
      }
    });
  }, []);

  return (
    <div className="container my-5">
      <h3>{loginStatus ? "IN" : "Nope"}</h3>
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
