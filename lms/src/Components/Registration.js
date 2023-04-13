import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import Axios from "axios";


export default function Registration() {
  const [name, setName] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regPassword, setRegPassword] = React.useState("");

  const [logEmail, setLogEmail] = React.useState("");
  const [logPassword, setLogPassword] = React.useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRegEmailChange = (event) => {
    setRegEmail(event.target.value);
  };

  const handleRegPasswordChange = (event) => {
    setRegPassword(event.target.value);
  };

  // Login States
  const handleLogEmailChange = (event) => {
    setLogEmail(event.target.value);
  };

  const handleLogPasswordChange = (event) => {
    setLogPassword(event.target.value);
  };

  const register = () => {
    Axios.post("http://localhost:3001/auth/register", {
      uname: name,
      email: regEmail,
      password: regPassword,
    }).then((response) => {
      console.log(response);
    });
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
    <div className="container">
      <div className="left_bar">
        <h4>Registraion</h4>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-name"
              label="Name"
              variant="standard"
              value={name}
              onChange={handleNameChange}
            />
          </Box>
        </Box>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-email"
              label="Email"
              variant="standard"
              value={regEmail}
              onChange={handleRegEmailChange}
            />
          </Box>
        </Box>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-password"
              label="Password"
              variant="standard"
              value={regPassword}
              onChange={handleRegPasswordChange}
            />
          </Box>
        </Box>
        <Button
          onClick={register}
          size="small"
          variant="contained"
          endIcon={<SendIcon />}
        >
          Submit
        </Button>
      </div>

      <div className="right_bar">
        <h4>Log In</h4>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-email"
              label="Email"
              variant="standard"
              value={logEmail}
              onChange={handleLogEmailChange}
            />
          </Box>
        </Box>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-password"
              label="Password"
              variant="standard"
              value={logPassword}
              onChange={handleLogPasswordChange}
            />
          </Box>
        </Box>
        <Button size="small" onClick={login} variant="contained" endIcon={<SendIcon />}>
          Submit
        </Button>
      </div>
    </div>
  );
}


