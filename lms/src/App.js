import "./App.css";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import ELibrary from "./Components/ELibrary";
import ReactDOM from "react-dom/client";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";

function App() {
  let auth = true;

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
                path="/login"
                element={<Login/>}
              />
            )}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
