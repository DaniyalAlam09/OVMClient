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
                At OVM, we understand that security and privacy are major
                concerns for our customers when it comes to making online
                payments. That's why we take extra measures to ensure the safety
                and security of all financial transactions on our site. We use
                industry-standard SSL encryption technology to protect sensitive
                information during transmission and employ advanced fraud
                detection systems to prevent unauthorized access to payment
                information.
              </p>
              <p class="font-italic text-muted mb-4">
                Our payment methods are thoroughly vetted and comply with PCI
                DSS standards to ensure the highest level of security. We also
                never store complete credit card information on our servers.
                Rest assured, your payment information is in safe hands with
                OVM. If you have any questions or concerns about our payment
                security, please feel free to contact us.
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
