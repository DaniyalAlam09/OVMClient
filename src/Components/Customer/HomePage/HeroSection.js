import React, { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import hero from "./assets/img/hero-carousel/VR2.png";

function HeroSection({ Name1, Name2, ImageSource }) {
  const [user, setUser] = React.useState([]);
  const [shopowner, setShopowner] = React.useState([]);

  React.useEffect(function () {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get("http://localhost:4000/users/user", config)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err.response.data);
        setUser([]);
      });
    axios
      .get("http://localhost:4000/shopowners/shopowner", config)
      .then((res) => {
        setShopowner(res.data.user);
      })
      .catch((err) => {
        console.log(err.response.data);
        setShopowner([]);
      });
  }, []);
  return (
    <section
      id="hero-animated"
      class="hero-fullscreen hero-animated justify-content-center d-flex align-items-center"
    >
      <div
        class="container row d-flex justify-content-center align-items-center text-center"
        data-aos="zoom-out"
      >
        <div className="col-xl-6 col-sm-12 mb-12 ">
          <h2>
            Welcome to <strong style={{ color: "#0ea2bd" }}>OVM</strong>
          </h2>
          <p>
            It has become appallingly obvious that our technology has exceeded
            our humanity.
          </p>
          <div class="d-flex justify-content-center">
            {!user?.firstName && !shopowner?.firstName && (
              <Link to="/account" type="submit">
                <button class="btn-get-started scrollto"> Get Started</button>
              </Link>
            )}
            {user?.firstName && <h6>Welcome Back</h6>}
            {shopowner?.firstName && <h6>Sale Your Products</h6>}
          </div>
        </div>
        <img src={hero} class="img-fluid animated col-xl-6 col-sm-12 mb-12 " />
      </div>
    </section>
  );
}

export default HeroSection;
