import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Update = ({ display, update }) => {
  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title,
        body: update.body,
      });
    }
  }, [update]); // Re-run when `update` changes

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    await axios
      .put(`http://localhost:1000/api/v/updatetask/${update._id}`, Inputs)
      .then((res) => {
        toast.success(res.data.message);
      });
    display("none");
  };

  return (
    <>
      <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
        <ToastContainer />
        <h3>Update Your Task</h3>
        <input
          type="text"
          name="title"
          className="todo-inputs my-4 w-100 p-3"
          placeholder="Enter New Title"
          value={Inputs.title}
          onChange={change}
        />
        <textarea
          name="body"
          className="todo-inputs w-100 p-3"
          placeholder="Enter New Body"
          value={Inputs.body}
          onChange={change}
        ></textarea>
        <div>
          <button className="btn btn-dark my-4" onClick={submit}>
            UPDATE
          </button>
          <button
            className="btn btn-danger my-4 mx-3"
            onClick={() => display("none")}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Update;
