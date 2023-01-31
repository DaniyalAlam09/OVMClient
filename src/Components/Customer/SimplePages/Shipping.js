import React from "react";
import VR from "./Images/Shipping.png";
import VR2 from "./Images/Shipping2.png";
function Shipping() {
  window.scroll(0, 0);
  return (
    <div>
      {" "}
      <div class="bg-white py-5">
        <div class="container py-5">
          <div class="row align-items-center mb-5">
            <div class="col-lg-6 order-2 order-lg-1">
              <i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
              <h3 class="font-weight-light">Shipping All over the Pakistan </h3>
              <p class="font-italic text-muted mb-4">
                At OVM, we are proud to offer shipping to all corners of
                Pakistan. No matter where you are located, we can get your order
                to you quickly and efficiently. Our shipping partners are
                reliable and experienced, and we work hard to ensure that your
                order arrives on time and in perfect condition.
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
              <h3 class="font-weight-light">Provide Safe Dilivery</h3>
              <p class="font-italic text-muted mb-4">
                At OVM, we are dedicated to ensuring that your orders are
                delivered to you safely and securely. We understand the
                importance of protecting your purchases, and we take every
                precaution to ensure that your order arrives in the same
                condition it left our warehouse. Our delivery partners are well
                trained and experienced, and we monitor every shipment to ensure
                that it is handled properly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
