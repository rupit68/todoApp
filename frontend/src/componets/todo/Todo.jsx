import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import { authActions } from "../../store";
import { useDispatch } from "react-redux";
import axios from "axios";
let id = sessionStorage.getItem("id");
let toupdateArray = [];
console.log("Session ID:", id);
const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Please Enter Title And Body");
    } else {
      if (id && id !== "null") {
        await axios
          .post("http://localhost:1000/api/v/addtask", {
            title: Inputs.title,
            body: Inputs.body,
            id: id,
          })
          .then((res) => console.log("Response:", res))
          .catch((err) => console.error("Error:", err));

        toast.success("Your Task Is Added");
      } else {
        toast.error("Your Task Is Not Saved! Please SignUp");
      }

      setArray([...Array, Inputs]);
      setInputs({ title: "", body: "" });
    }
  };

  const del = async (delid) => {
    if (id) {
      await axios
        .delete(`http://localhost:1000/api/v/deletetask/${delid}`, {
          data: { id: id },
        })
        .then((res) => {
          toast.success("Your Task Is Deleted");
        });
    } else {
      toast.error(" Please SignUp First");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };
  const update = (value) => {
    toupdateArray = Array[value];
  };
  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios
          .get(`http://localhost:1000/api/v/gettask/${id}`)
          .then((res) => setArray(res.data.list));
      };
      fetch();
    }
  }, [submit]);
  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex flex-column todo-inputs-div w-100 p-1">
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              onChange={change}
              value={Inputs.title}
            />
            <textarea
              id="textarea"
              type="text"
              name="body"
              placeholder="Body"
              className="p-2 todo-inputs"
              onChange={change}
              value={Inputs.body}
            />
          </div>
          <div className="w-lg-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {Array &&
                Array.map((item, index) => (
                  <div
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2 "
                    key={index}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update " id="todo-update">
        <div className="container update">
          <Update display={dis} update={toupdateArray} />
        </div>
      </div>
    </>
  );
};

export default Todo;
