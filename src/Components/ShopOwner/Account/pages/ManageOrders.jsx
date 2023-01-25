import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageOrders = () => {
  const [order, setOrder] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [userId, setUserId] = React.useState([]);
  React.useEffect(function () {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get("http://localhost:4000/shopowners/getshoporder", config)
      .then((res) => {
        setOrder(res.data);
        console.log(res.data);
        setUserId(res.data.userId);
        userDetails();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);
  const userDetails = () => {
    axios
      .get(`http://localhost:4000/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.message);
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

              <th>User</th>
              <th>Status</th>
              <th>Tracking ID</th>
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
                  <td>{ord.date_added}</td>
                  <td>{ord.productName}</td>
                  <td>
                    <img
                      src={`http://localhost:4000/${ord.productImg}`}
                      style={{ height: "5em", marginTop: "-5px" }}
                    />
                  </td>
                  {/* <td>{order.status}</td> */}
                  <td>{ord.bill}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>dd</td>
                  <td>
                    <input />
                  </td>
                  <td>
                    <button>Update</button>
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
    </div>
  );
};

export default ManageOrders;
