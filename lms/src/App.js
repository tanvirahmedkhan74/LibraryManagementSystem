import "./App.css";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import ELibrary from "./Components/ELibrary";
import ReactDOM from "react-dom/client";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Registration from "./Components/Registration";

function App() {
  let auth = true;
  // changing background image to the whole page
  document.body.style.backgroundImage = "url('https://i.pinimg.com/564x/8a/d3/48/8ad3484dd510ba8962a256b922c76aa9.jpg')";
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home auth={auth} />} />
            <Route exact path="/about" element={<About />} />
            {auth ? (
              <Route exact path="/elibrary" element={<ELibrary />} />
            ) : (
              <Route
                exact
                path="/auth"
                element={<Registration/>}
              />
            )}
            <Route path="/auth" element={<Registration/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
