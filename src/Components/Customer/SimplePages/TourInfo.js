import React from "react";
import VR from "./Images/VR.png";
import VR2 from "./Images/VR2.png";
function TourInfo() {
  window.scroll(0, 0);
  return (
    <div>
      {" "}
      <div class="bg-white py-5">
        <div class="container py-5">
          <div class="row align-items-center mb-5">
            <div class="col-lg-6 order-2 order-lg-1">
              <i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
              <h3 class="font-weight-light">Vitual Reality </h3>
              <p class="font-italic text-muted mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a href="#" class="button btn btn-light px-5 ">
                Learn More
              </a>
            </div>
            <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2">
              <img src={VR} alt="" class="img-fluid mb-4 mb-lg-0" />
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-lg-5 px-5 mx-auto">
              <img src={VR2} alt="" class="img-fluid mb-4 mb-lg-0" />
            </div>
            <div class="col-lg-6">
              <i class="fa fa-leaf fa-2x mb-3 text-primary"></i>
              <h3 class="font-weight-light">Tours of All Floors</h3>
              <p class="font-italic text-muted mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button class="button btn btn-light px-5 rounded-pill shadow-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourInfo;
