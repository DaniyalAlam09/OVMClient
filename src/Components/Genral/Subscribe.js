import React from "react";
import { UilEnvelopeAlt } from "@iconscout/react-unicons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Subscribe() {
  const [state, setState] = useState({
    email: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:4000/users/subscription`, { email: state.email })
      .then((user) => {
        if (user) {
          console.log(user);
          toast("Successfull Subscribed");
          window.scrollTo(0, 0);
          // window.location.href = "user/customer-dashboard";
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  return (
    <div className="container heading mb-5">
      <div className="row d-flex justify-content-around">
        <div className=" col-md-6 ">
          <h3>Don’t miss our update.</h3>
          <h3>Subscribe us for more info </h3>
        </div>
        <div className=" col-md-6 ">
          <div className="input-group mail">
            <form
              onSubmit={handleSubmit}
              className="d-flex justify-content-center"
            >
              <UilEnvelopeAlt className="email-icon" />
              <input
                name="email"
                type="email"
                className="form-control"
                onChange={handleChange}
                value={state.email}
                placeholder="Enter your email address"
                size="40"
              />
              <div className="">
                <button className="start" type="submit">
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Subscribe;
