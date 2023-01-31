import React from "react";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

function Contact() {
  const [state, setState] = useState({
    email: "",
    firstName: "",
    message: "",
    subject: "",
    lastName: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:4000/users/contactus`, {
        email: state.email,
        firstName: state.firstName,
        message: state.message,
        subject: state.subject,
        lastName: state.lastName,
      })
      .then((user) => {
        if (user) {
          console.log(user);
          toast("Message Sent Successfully");
          window.scrollTo(0, 0);
          navigate("/");
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
    <div>
      {/* <Navbar /> */}
      <div className="py-5">
        <div className="container py-4">
          <h2 className="text-uppercase lined mb-4">Contact Us</h2>
          <h2 className="heading text-uppercase lined mb-4">
            We are here to help you
          </h2>
          <p className="lead mb-5">
            We would love to hear from you! Whether you have a question about a
            product, need help with an order, or just want to share your
            thoughts, we're here to listen. You can reach us via email at{" "}
            <a href="mailto:">onlinevirtualmall09@gmail.com</a>, or by filling
            out the contact form on our website. Our dedicated customer support
            team will get back to you as soon as possible. If you prefer to
            speak with someone over the phone, give us a call at{" "}
            <strong>+92 307 001 9351</strong>. We're available 24 hours. At OVM
            , your satisfaction is our top priority, and we're always here to
            help. So don't hesitate to reach out to us, we're here for you.
          </p>
          <p className="text-sm mb-5">
            Please feel free to contact us, our customer service center is
            working for you 24/7.
          </p>
          <div className="row gy-5 mb-5">
            <div className="col-lg-4 block-icon-hover text-center">
              <div className="icon icon-outlined icon-outlined-primary icon-thin mx-auto mb-3">
                <UilLocationPoint className="icons" />
              </div>
              <h4 className="text-uppercase mb-3">Address</h4>
              <p className="text-gray-600 text-sm">
                Hafeez Centre
                <br />
                Block E1
                <br />
                Gulberg III, <strong>Lahore, Punjab</strong>
              </p>
            </div>
            <div className="col-lg-4 block-icon-hover text-center">
              <div className="icon icon-outlined icon-outlined-primary icon-thin mx-auto mb-3">
                <CallIcon className="icons" />
              </div>
              <h4 className="text-uppercase mb-3">Call center</h4>
              <p className="text-gray-600 text-sm">
                Our Satff is available to assist with any questions or concerns
              </p>
              <p className="text-gray-600 text-sm">
                <strong>+92 307 001 9351</strong>
              </p>
            </div>
            <div className="col-lg-4 block-icon-hover text-center">
              <div className="icon icon-outlined icon-outlined-primary icon-thin mx-auto mb-3">
                <EmailIcon className="icons" />
              </div>
              <h4 className="text-uppercase mb-3">Electronic support</h4>
              <p className="text-gray-600 text-sm">
                Please feel free to write an email to us or to use our
                electronic ticketing system.
              </p>
              <ul className="list-unstyled text-sm mb-0">
                <li>
                  <strong>
                    <a href="mailto:">onlinevirtualmall09@gmail.com</a>
                  </strong>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7 mx-auto">
              <h2 className="lined lined-center text-uppercase mb-4">
                Contact form
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" for="firstname">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={state.firstName}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" for="lastname">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={state.lastName}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" for="emailaddress">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={handleChange}
                      value={state.email}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" for="subject">
                      Subject
                    </label>
                    <input
                      name="subject"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={state.subject}
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label" for="message">
                      Message
                    </label>
                    <textarea
                      name="message"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={state.message}
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="col-md-12 text-center">
                    <button
                      className="btn button btn-outline-primary"
                      type="submit"
                    >
                      Send message
                    </button>
                  </div>
                </div>
              </form>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
