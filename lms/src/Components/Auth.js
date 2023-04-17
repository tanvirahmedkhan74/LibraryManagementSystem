import React from "react";
import Login from "./Login";
import Registration from "./Registration";

export default function Auth(props) {

  const handleAuth = () => {
    props.setAuth(true);
  };

  const handleLogged = (name) => {
    props.setLogged(name);
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="shadow-lg w-25 p-3 mb-5 col mx-2">
          <Login
            auth={props.auth}
            handleAuth={handleAuth}
            handleLogged={handleLogged}
          />
        </div>
        <div className="shadow-lg w-25 p-3 mb-5 col">
          <Registration />
        </div>
      </div>
    </div>
  );
}
