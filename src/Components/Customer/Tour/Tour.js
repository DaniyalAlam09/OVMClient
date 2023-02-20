import React from "react";
import { Link } from "react-router-dom";
import tourimage from "./Tour.jpeg";

function Tour() {
  return (
    <div className="">
      <div className="heading container pt-4">
        <h3>Tour Guide Lines</h3>
        <div className="row">
          <div className=" col-md-8 mt-5 container text-left">
            <p> Click on the link to start the tour.</p>
            <p>
              {" "}
              Use your mouse or finger to look around the virtual environment by
              clicking and dragging.
            </p>
            <p>
              {" "}
              Use arrows or on-screen buttons to move to different locations
              within the mall.
            </p>
            <p>
              {" "}
              Use the information provided to learn about the mall's stores,
              amenities, and features.
            </p>
            <p>
              {" "}
              Participate in the quiz or scavenger hunt for a more interactive
              experience.
            </p>
            <p>
              {" "}
              Follow the tips and suggestions for a visit to the physical mall.
            </p>
            <p> Use the controls to exit the tour when finished.</p>
          </div>
          <div className="col-md-4">
            <img
              style={{
                height: "auto",
                width: "300px",
              }}
              // className="product-image"
              src={tourimage}
            />
          </div>
        </div>
        <div class="container col-md-10 ">
          <div class="row d-flex justify-content-between pb-5">
            <div class="card-team col-md-3 mt-100 text-center block">
              <div class="card-content">
                <div class="card-body-team mb-4">
                  <div class="card-title mt-4">Floor 1</div>
                  <div class="card-subtitle">
                    <a
                      target="_blank"
                      href="https://kuula.co/post/NsNl6/collection/79km6"
                      class="link-secondary learn-more "
                      style={{ color: "#318EAA" }}
                    >
                      Take Tour
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-team col-md-3 mt-100 text-center block">
              <div class="card-content">
                <div class="card-body-team p-0">
                  <div class="card-title mt-4">Floor 2</div>
                  <div class="card-subtitle">
                    <a
                      target="_blank"
                      href="https://kuula.co/post/n1/collection/79T5s"
                      class="link-secondary learn-more "
                      style={{ color: "#318EAA" }}
                    >
                      Take Tour
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-team col-md-3 mt-100 text-center block">
              <div class="card-content">
                <div class="card-body-team p-0">
                  <div class="card-title mt-4">Floor 3</div>
                  <div class="card-subtitle">
                    <a
                      target="_blank"
                      href="https://kuula.co/post/n1/collection/79TlB"
                      class="link-secondary learn-more "
                      style={{ color: "#318EAA" }}
                    >
                      Take Tour
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tour;
