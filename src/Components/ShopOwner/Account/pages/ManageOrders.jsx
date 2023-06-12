import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const ManageOrders = () => {
  const [order, setOrder] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [userId, setUserId] = React.useState([]);
  const [state, setState] = useState({
    status: "",
    tracking: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };

  React.useEffect(function () {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get("https://red-gorgeous-bandicoot.cyclic.app/shopowners/getshoporder", config)
      .then((res) => {
        setOrder(res.data);
        console.log(res);
        // setUserId(res.data.userId);
        userDetails();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);
  const userDetails = () => {
    order.map((use) => {
      axios
        .get(`https://red-gorgeous-bandicoot.cyclic.app/users/${use.userId}`)
        .then((res) => {
          setUser(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  };
  const updateOrder = (id) => {
    const formData = new FormData();
    formData.append("status", state.status);
    formData.append("tracking", state.tracking);

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .put("https://red-gorgeous-bandicoot.cyclic.app/shopowners/update/" + id, formData, config)

      .then((res) => {
        if (res.status === 200) {
          toast("Status Updated");
          // return response.json();
        } else {
          console.log("SOMETHING WENT WRONG");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="text-center ml-3 mt-4" style={{ width: "100%" }}>
      <div class=" container d-flex justify-content-center"></div>
      {order ? (
        <table className="table">
          <thead>
            <tr>
              {/* <th>Sr #</th> */}
              <th>Order Number</th>
              <th>Date</th>
              <th>Product</th>
              <th>Image</th>
              <th>Bill</th>
              {/* <th>Order Status</th> */}

              <th>User Name</th>
              <th>Address</th>
              <th>Status</th>
              {/* <th>Tracking ID</th> */}
              <th>Submit</th>
            </tr>
          </thead>
          <tbody className="mt-3">
            {/* {Object.values(order).map((item, index) => ( */}
            {order?.map((ord) => {
              return (
                <tr>
                  {/* <td>{index + 1}</td> */}
                  <td>{ord._id}</td>
                  <td>{moment(ord.date_added).format("MMM Do YY")}</td>
                  <td>
                    <Link
                      to={`../../singleProduct/${ord.productId}/${ord.shopOwnerId}`}
                      style={{ color: "#0C8AA0" }}
                    >
                      {ord.productName}
                    </Link>{" "}
                  </td>
                  <td>
                    <img
                      src={`https://red-gorgeous-bandicoot.cyclic.app/${ord.productImg}`}
                      style={{ height: "5em", marginTop: "-5px" }}
                    />
                  </td>
                  {/* <td>{order.status}</td> */}
                  <td>{ord.bill}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.address}</td>
                  <td>
                    <select
                      onChange={handleChange}
                      name="status"
                      className="form-select"
                    >
                      <option selected>{ord.status}</option>
                      <option value="Accept">Accept</option>
                      <option value="Reject">Reject</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  {/* <td>
                    <input
                      name="tracking"
                      onChange={handleChange}
                      value={state.tracking}
                      type="text"
                    />
                  </td> */}
                  <td>
                    <button
                      onClick={() => updateOrder(ord._id)}
                      class="buttons btn text-white btn-block btn-primary"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* ))} */}
          </tbody>
        </table>
      ) : (
        <div>
          <div class="container bootstrap snippets bootdey mb-5 mt-5">
            <div class="row">
              <div class="col-md-12">
                <div class="pull-right" style={{ marginTop: "10px" }}>
                  <div class="d-flex align-items-center justify-content-around text-center">
                    <img
                      // class="img-thumbnail "
                      style={{ width: "40%" }}
                      src="/images/No.png"
                    />
                    <div>
                      <h2>No Order Yet</h2>
                      {/* <p>Requested page not found!</p> */}
                      {/* <div class="error-actions">
                        <Link
                          to="/"
                          class="btn btn-primary  signin btn-lg sign-in"
                        >
                          Back Home
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
};

export default ManageOrders;
