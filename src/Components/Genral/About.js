import React from "react";
import About1 from "./Images/About1.svg";
import About2 from "./Images/About2.svg";
import About3 from "./Images/About3.svg";
import {
  UilFacebook,
  UilTwitter,
  UilInstagram,
} from "@iconscout/react-unicons";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      {/* <Navbar/> */}
      <div class="hero">
        <div class="container py-5">
          <div class="row h-100 align-items-center py-5">
            <div class="col-lg-6">
              <h2 class="display-6">About us</h2>
              <p class="lead text-muted mb-0">
                Discover the Endless Possibilities of Technology with Our Range
                of Cutting-Edge Devices and Solutions
              </p>
              <p class="lead text-muted">
                <Link to="/contact" class="">
                  <u>Contact Us</u>
                </Link>
              </p>
            </div>
            <div class="col-lg-6 d-none d-lg-block">
              <img src={About1} alt="" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white py-5">
        <div class="container py-5">
          <div class="row align-items-center mb-5">
            <div class="col-lg-6 order-2 order-lg-1">
              <i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
              <h3 class="font-weight-light">Tech Enthusiasts</h3>
              <p class="font-italic text-muted mb-4">
                OVM is your one-stop shop for all things technology. We're a
                team of tech enthusiasts who are passionate about bringing the
                latest and greatest in technology to your fingertips. From smart
                homes to cutting-edge gadgets, we've got you covered. Our
                mission is to make the power of technology accessible to
                everyone and we're dedicated to providing innovative solutions
                for all your tech needs.
              </p>
            </div>
            <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2">
              <img src={About2} alt="" class="img-fluid mb-4 mb-lg-0" />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-lg-5 px-5 mx-auto">
              <img src={About3} alt="" class="img-fluid mb-4 mb-lg-0" />
            </div>
            <div class="col-lg-6">
              <i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
              <h3 class="font-weight-light">Power Of Technology</h3>
              <p class="font-italic text-muted mb-4">
                At OVM, we believe in the power of technology to enhance our
                lives and we're here to share that with you. Whether you're
                looking for the latest smartphone, a connected home solution, or
                just a fun new gadget, we've got what you need. Our team is
                committed to staying ahead of the technology curve and providing
                exceptional customer service. Join us on a journey of discovery
                and innovation as we embrace the future with the latest and
                greatest in technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-light py-5">
        <div class="container py-5">
          <div class="row mb-4">
            <div class="">
              <h3 class="display-6 ">Our team</h3>
              <p class="font-italic text-muted">
                Our team is made up of individuals from diverse backgrounds,
                bringing unique perspectives to everything we do
              </p>
            </div>
          </div>

          <div class="row text-center justify-content-around">
            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src=""
                  alt=""
                  width="100"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Daniyal Alam</h5>
                <span class="small text-uppercase text-muted">
                  Web Developer
                </span>
                <ul class="social mb-0 list-inline mt-4">
                  <li class="list-inline-item">
                    <a href="#" class="social-link">
                      <UilFacebook className="icons" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" class="social-link">
                      <UilInstagram className="icons" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" class="social-link">
                      <UilTwitter className="icons" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src=""
                  alt=""
                  width="100"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Rooma Saher</h5>
                <span class="small text-uppercase text-muted">CEO</span>
                <ul class="social mb-0 list-inline mt-4">
                  <li class="list-inline-item">
                    <a href="#" class="social-link">
                      <UilFacebook className="icons" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" class="social-link">
                      <UilInstagram className="icons" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" class="social-link">
                      <UilTwitter className="icons" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-xl-3 col-sm-6 mb-5">
              <div class="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src=""
                  alt=""
                  width="100"
                  class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 class="mb-0">Habib Ahmed Khan</h5>
                <span class="small text-uppercase text-muted">
                  Tour Arrange
                </span>
                <ul class="social mb-0 list-inline mt-4">
                  <li class="list-inline-item">
                    <a href="#" class="social-link">
                      <UilFacebook className="icons" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" class="social-link">
                      <UilInstagram className="icons" />
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a href="#" class="social-link">
                      <UilTwitter className="icons" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
