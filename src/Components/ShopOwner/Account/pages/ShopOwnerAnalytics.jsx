import axios from "axios";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./style.css";

const ShopOwnerAnalytics = () => {
  const [order, setOrder] = React.useState([]);
  const [pendingOrder, setPendingOrder] = React.useState("");
  const [products, setProducts] = useState([]);
  React.useEffect(function () {
    fetchOrders();
    fetchProducts();
    pending();
  }, []);
  const fetchOrders = () => {
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
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const fetchProducts = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get("https://red-gorgeous-bandicoot.cyclic.app/shopowners/myproducts", config)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const pending = () => {
    order.map((p) => {
      let a = p?.status === "pending";
      // let b = a?.length;
      console.log(a);
    });
  };
  return (
    <>
      <div className="container row mt-5 d-flex justify-content-around">
        <div
          className="block border text-center pt-4 m-3 col-md-3"
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#CEEFFC",
          }}
        >
          <h5 className="block-text">Total Live Products</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={products.length} duration={1} />
          </p>
        </div>
        <div
          className="block border text-center pt-4 m-3 col-md-3"
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#CEEFFC",
          }}
        >
          <h5 className="block-text">Total Orders</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={order.length} duration={1} />
          </p>
        </div>
        <div
          className="block border text-center pt-4 m-3 col-md-3"
          style={{
            height: "150px",
            width: "300px",
            backgroundColor: "#CEEFFC",
          }}
        >
          <h5 className="block-text">Total Pending Orders</h5>
          <p className="block-text block-p">
            {" "}
            <CountUp end={order.length} duration={1} />
          </p>
        </div>
      </div>
    </>
  );
};

export default ShopOwnerAnalytics;
