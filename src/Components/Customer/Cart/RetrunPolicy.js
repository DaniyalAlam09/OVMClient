import React from "react";

function RetrunPolicy() {
  return (
    <div>
      <section class="section-name bg padding-y">
        <div class="container">
          <h5 class="text-muted">
            Our Refund Policy Allows You To Exchange Or Refund A Product In Two
            Cases:
          </h5>
          <h6>1. The Customer Received A Wrong Product</h6>
          <ul style={{ textAlign: "left" }}>
            <li style={{ textAlign: "left" }}>
              If a wrong product is delivered to the customer, we will get it
              picked up for free.
            </li>
            <li style={{ textAlign: "left" }}>
              Once the wrong product is received by us, We will dispatch the
              correct product or refund the amount within 7 working days.
            </li>
            <li style={{ textAlign: "left" }}>
              {" "}
              The product should be unused and the packaging should not be
              damaged.
            </li>
          </ul>

          <h6>2. The Customer receives damaged goods</h6>
          <ul style={{ textAlign: "justify" }}>
            <li style={{ textAlign: "justify" }}>
              Customers may claim refund if they receive damaged goods however
              they must provide video proof of this.
            </li>
            <li style={{ textAlign: "justify" }}>
              Customers are advised to make video while unwrapping and unboxing
              their product from delivery packaging. This video will be used as
              a proof that customer received damaged good.
            </li>
            <li style={{ textAlign: "justify" }}>
              In case of Mobile Phones: Mobile Performance issues, refund,
              replacement, and repair services will be decided and given by the
              Aftersales department.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default RetrunPolicy;
