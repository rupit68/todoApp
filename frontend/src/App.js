import React, { useEffect } from "react";
import Navbar from "./componets/navbar/Navbar";
import Home from "./componets/home/Home";
import Footer from "./componets/footer/Footer";
import About from "./componets/about/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./componets/signup/Signup";
import SignIn from "./componets/signup/SignIn";
import Todo from "./componets/todo/Todo";
import { authActions } from "./store";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }
  }, []);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>

      {/* <Home /> */}

      <Footer />
    </div>
  );
};

export default App;
