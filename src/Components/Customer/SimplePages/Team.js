import React from "react";
import "./style.css";
import habib from "./Images/Habib.png";
import rooma from "./Images/Rooma.jpeg";
import me from "./Images/ME.jpeg";

function Team() {
  return (
    <div>
      <div class="container mx-auto mt-5 col-md-10 mt-100">
        <div class="header">
          <div class="title-text">Our Expert Team</div>
          <p>
            <small class="text-muted">
              At OVM, we have assembled a team of experts who are dedicated to
              providing our customers with the best possible shopping
              experience. Our team consists of seasoned professionals with a
              passion for technology and customer service. With their in-depth
              knowledge and experience, they are able to offer personalized
              advice and support to help you find the products that best meet
              your needs. Whether you need assistance with selecting the right
              product, navigating our virtual tour, or making a secure payment,
              our expert team is here to help. They are dedicated to delivering
              excellent customer service and ensuring that you have a positive
              experience with OVM. With their expertise, you can be confident
              that you are in good hands when you shop with us.
            </small>
          </p>
        </div>
        <div class="row d-flex justify-content-around pb-5">
          <div class="card-team col-md-3 mt-100 text-center block">
            <div class="card-content">
              <div class="card-body-teamz p-0">
                <div class="profile">
                  {" "}
                  <img src={me} />{" "}
                </div>
                <div class="card-title mt-4">
                  {" "}
                  Daniyal Alam
                  <br /> <small>Web Developer</small>{" "}
                </div>
                <div class="card-subtitle">
                  <p>
                    {" "}
                    <small class="text-muted">
                      {" "}
                      I expected anything less than perfect for the team of
                      experts. They are the best team ever!{" "}
                    </small>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-team col-md-3 mt-100 text-center block">
            <div class="card-content">
              <div class="card-body-teamz p-0">
                <div class="profile">
                  {" "}
                  <img src={rooma} />{" "}
                </div>
                <div class="card-title mt-4">
                  {" "}
                  Rooma Saher
                  <br /> <small>Web Developer</small>{" "}
                </div>
                <div class="card-subtitle">
                  <p>
                    {" "}
                    <small class="text-muted">
                      {" "}
                      I really enjoyed working with them, they are Group of
                      Professionals and they know what they're Doing{" "}
                    </small>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-team col-md-3 mt-100 text-center block">
            <div class="card-content">
              <div class="card-body-teamz p-0">
                <div class="profile">
                  {" "}
                  <img src={habib} />{" "}
                </div>
                <div class="card-title mt-4">
                  {" "}
                  Habib Ahmed Khan
                  <br /> <small>Tour Arrange</small>{" "}
                </div>
                <div class="card-subtitle">
                  <p>
                    {" "}
                    <small class="text-muted">
                      {" "}
                      I always wanted cool videos of my concerts never knew whom
                      to talk to but they are amazing!{" "}
                    </small>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
