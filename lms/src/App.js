import "./App.css";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import ELibrary from "./Components/ELibrary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Components/Auth";
import { useState } from "react";
import Profile from "./Components/Profile";

function App() {
  const [auth, setAuth] = useState(false);
  console.log(auth);
  const [logged, setLogged] = useState("");

  // changing background image to the whole page
  document.body.style.backgroundImage =
    "url('https://th.bing.com/th/id/R.c6fee5c1e2d761ad6279332084152455?rik=L9bOo7%2fq8V4yig&pid=ImgRaw&r=0')";
  return (
    <>
      <Router>
        <Navbar logged={logged} auth={auth} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home auth={auth} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/elibrary" element={<ELibrary auth={auth}/>} />
            <Route path="/auth" element={<Auth auth={auth} logged={logged} setAuth = {setAuth} setLogged={setLogged}/>} />
            <Route path="/profile" element={<Profile auth={auth} logged={logged}/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
