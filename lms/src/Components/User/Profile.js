import React from "react";
import Axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLock,
} from "react-icons/fa";

export default function Profile() {
  Axios.defaults.withCredentials = true;

  const [auth, setAuth] = React.useState(false);
  const [admin, setAdmin] = React.useState(false);

  const [userID, setUserID] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [fname, setFname] = React.useState(null);
  const [lname, setLname] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [adminStatus, setAdminStatus] = React.useState(null);

  React.useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setUserID(response.data.user[0].UserID);
        setAddress(response.data.user[0].Address);
        setEmail(response.data.user[0].Email);
        setFname(response.data.user[0].FirstName);
        setLname(response.data.user[0].LastName);
        setPhone(response.data.user[0].PhoneNumber);
        setUsername(response.data.user[0].Username);
        setPassword(response.data.user[0].Password);
        setAdminStatus(response.data.user[0].Admin);

        setAuth(true);
        if (response.data.user[0].Admin) {
          setAdmin(true);
        }
      }
    });
  }, []);

  // Updating user information to "/updateUser/:id" route in the backend with fname, lname, email, password, address, phone;
  const updateUser = (id) => {
    Axios.put(`http://localhost:3001/user/updateUser/${id}`, {
      fname: fname,
      lname: lname,
      email: email,
      address: address,
      phone: phone,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <div className="container my-5">
        <h1 className="mb-4">
          <FaUser className="me-2" />
          Profile
        </h1>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="first-name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                className="form-control"
                value={fname}
                onChange={(event) => {
                  setFname(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="last-name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="form-control"
                value={lname}
                onChange={(event) => {
                  setLname(event.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaPhone />
                </span>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}

                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaMapMarkerAlt />
                </span>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  disabled
                  value={username}
                />
              </div>
            </div>

            <button type="button" className="btn btn-primary" onClick={() => updateUser(userID)}>
              Update
            </button>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input type="password" id="password" className="form-control"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
