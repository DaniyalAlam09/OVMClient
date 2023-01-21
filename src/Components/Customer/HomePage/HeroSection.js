import React from "react";
import "./Homepage.css";
import Hero from "../Images/Hero.png";
// import Hero1 from "/images/Hero1.png";
import { Link } from "react-router-dom";
import hero from "./assets/img/hero-carousel/hero-carousel-3.svg";

function HeroSection({ Name1, Name2, ImageSource }) {
  return (
    <section
      id="hero-animated"
      class="hero-fullscreen hero-animated d-flex align-items-center"
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
            <Link to="/create-account">
              <button class="btn-get-started scrollto"> Get Started</button>
            </Link>{" "}
            {/* <a
              href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
              class="glightbox btn-watch-video d-flex align-items-center"
            >
              <i class="bi bi-play-circle"></i>
              <span>Take Tour</span>
            </a> */}
          </div>
        </div>
        <img src={hero} class="img-fluid animated col-xl-6 col-sm-12 mb-12 " />
      </div>
    </section>
  );
}

export default HeroSection;
