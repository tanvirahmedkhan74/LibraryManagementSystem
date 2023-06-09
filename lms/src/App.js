import "./App.css";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import ELibrary from "./Components/Book/ELibrary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Components/Auth";
import { useState, useEffect } from "react";
import Profile from "./Components/User/Profile"
import Login from "./Components/Login";
import ManageBook from "./Components/Admin/ManageBook";
import EditBook from "./Components/Admin/EditBook";
import AddBook from "./Components/Admin/AddBook";
import Explore from "./Components/User/Explore";
import MyBooks from "./Components/User/MyBooks";
import Search from "./Components/Book/Search";
import Borrow from "./Components/Book/Borrow";
import Trending from "./Components/Book/Trending";
import ManageUsers from "./Components/Admin/ManageUser";
import Axios from "axios";

function App() {
  Axios.defaults.withCredentials = true;

  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      //console.log(response);
      if (response.data.loggedIn === true) {
        if (response.data.user[0].Admin) {
          setAdmin(true);
        } else {
          setUser(true);
        }
      }
    });
  }, []);

  // changing background image to the whole page
  document.body.style.backgroundImage =
    "url('https://th.bing.com/th/id/R.c6fee5c1e2d761ad6279332084152455?rik=L9bOo7%2fq8V4yig&pid=ImgRaw&r=0')";
  return (
    <>
      <Router>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About/>} />
            <Route exact path="/elibrary" element={<ELibrary/>} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/admin/manageBook" element={<ManageBook/>} />

            <Route path="/admin/editBook/:BookID" element={<EditBook/>} />
            <Route path="/admin/addBook" element={<AddBook/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/myBooks" element={<MyBooks/>}/>
            <Route path="/searchBook/:searchString" element={<Search/>} />
            <Route path="/borrow/:id" element={<Borrow/>}/>
            <Route path="/trending" element={<Trending/>}/>
            <Route path="/admin/manageUser" element={<ManageUsers/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
