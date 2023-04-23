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
        if (response.data.user[0].Admin){
          setAdmin(true);
        }else{
          setUser(true);
        }
      }
    });
  }, []);

  return (
    <div className="container text-center">
      <div className="row">
        <div className="shadow-lg w-25 p-3 mb-5 col mx-2">
          <Login/>
        </div>
        <div className="shadow-lg w-25 p-3 mb-5 col">
          <Registration />
        </div>
      </div>
    </div>
  );
}
