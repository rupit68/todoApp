import React, { useState } from "react";
import "./signup.css";
import HeadingCompo from "./HeadingCompo";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:1000/api/signin", Inputs).then((res) => {
      sessionStorage.setItem("id", res.data.others._id);
      dispatch(authActions.login());
      history("/todo");
    });
  };
  return (
    <div>
      <div className="signup">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 column  d-lg-flex d-none  justify-content-center align-items-center ">
              <HeadingCompo first="Sign" second="In" />
            </div>
            <div className="col-lg-8 column d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column w-100 p-1">
                <input
                  className="p-2 my-3 input-signup"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={Inputs.email}
                  onChange={change}
                />

                <input
                  className="p-2 my-3 input-signup"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={Inputs.password}
                  onChange={change}
                />
                <button className="btn-signup p-2" onClick={submit}>
                  SignIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
