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
              <h3 class="font-weight-light">Virtual Shopping</h3>
              <p class="font-italic text-muted mb-4">
                At OVM, we understand that shopping in-person may not be
                possible or convenient for everyone. That's why we are proud to
                offer virtual tours of our mall, allowing you to browse our
                products and services from the comfort of your own home. Our
                virtual tour is an interactive and immersive experience that
                gives you a comprehensive look at what we have to offer.
              </p>
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
              <h3 class="font-weight-light">Convenient For Customer</h3>
              <p class="font-italic text-muted mb-4">
                You can explore our stores, check out our products, and get a
                feel for our mall layout, all without leaving your home. Whether
                you're looking to shop for specific items or just want to get a
                sense of what we have in store, our virtual tour is the perfect
                solution. With Tech Mart, you can enjoy a seamless shopping
                experience, no matter where you are.
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
