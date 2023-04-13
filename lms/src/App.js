import "./App.css";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import ELibrary from "./Components/ELibrary";
import ReactDOM from "react-dom/client";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "./Components/Auth";

function App() {
  let auth = true;
  // changing background image to the whole page
  document.body.style.backgroundImage = "url('https://th.bing.com/th/id/R.c6fee5c1e2d761ad6279332084152455?rik=L9bOo7%2fq8V4yig&pid=ImgRaw&r=0')";
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
                element={<Auth/>}
              />
            )}
            <Route path="/auth" element={<Auth/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
