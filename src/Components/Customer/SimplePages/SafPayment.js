import React from "react";
import VR from "./Images/VR.png";
import Payment from "./Images/Payment.png";
function SafPayment() {
  window.scroll(0, 0);
  return (
    <div>
      {" "}
      <div>
        <div class="container py-5">
          <div class=" ">
            <h3 class="font-weight-light">Different Safe Payments </h3>
            <div class="col-lg-5 px-5 mx-auto order-1 order-lg-2">
              <img src={Payment} alt="" class="img-fluid mb-4 mb-lg-0" />
            </div>
            <div class="">
              <i class="fa fa-bar-chart fa-2x mb-3 text-primary"></i>

              <p class="font-italic text-muted mb-4">
                Where you open your business and the types of items you sell
                could play an important role in deciding which payments systems
                to offer customers. If you expect to make a large portion of
                your sales online, accepting electronic payments will be a must.
                Similarly, if your products or services are expensive, customers
                might not feel comfortable carrying that much cash to your store
                to make a purchase — checks, cards or mobile payment could be
                better options. On the other hand, if you sell inexpensive items
                from a physical store, your customers may prefer to pay with
                cash. Customers may also expect you to accept cash if you open a
                shop in an area where many people don’t have bank accounts or
                where card processing networks, the companies that send and
                verify information when someone makes a purchase with a card,
                frequently go offline.
              </p>
              <a href="#" class="button btn btn-light px-5 ">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafPayment;
