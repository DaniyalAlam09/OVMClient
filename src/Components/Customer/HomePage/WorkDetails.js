import React from "react";
import {
  UilTruck,
  UilTransaction,
  UilHeadphonesAlt,
  UilUserCircle,
} from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

function WorkDetails() {
  return (
    <div className="">
      <div className="heading container pt-4">
        <h3 style={{ marginBottom: "-50px" }}>How Its works</h3>
        <div class="container col-md-10 ">
          <div class="row d-flex justify-content-between pb-5">
            <div class="card-team col-md-3 mt-100 text-center block">
              <div class="card-content">
                <div class="card-body-team mb-4">
                  <div class="profile">
                    {" "}
                    <LocalShippingOutlinedIcon
                      className="icons"
                      style={{
                        width: "68px",
                        height: "68px",
                        borderRadius: "50%",
                        backgroundColor: "white",
                      }}
                    />
                  </div>
                  <div class="card-title mt-4">Shipping</div>
                  <div class="card-subtitle">
                    <p>
                      {" "}
                      <small class="text-muted">
                        {" "}
                        I expected anything less than perfect for the team of
                        experts. They are the best team ever!{" "}
                      </small>{" "}
                    </p>
                    <Link to="/shipping" class="link-secondary learn-more ">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-team col-md-3 mt-100 text-center block">
              <div class="card-content">
                <div class="card-body-team p-0">
                  <div class="profile">
                    {" "}
                    <UilTransaction
                      className="icons"
                      style={{
                        width: "68px",
                        height: "68px",
                        backgroundColor: "white",
                      }}
                    />
                  </div>
                  <div class="card-title mt-4">Safe Payment</div>
                  <div class="card-subtitle">
                    <p>
                      {" "}
                      <small class="text-muted">
                        {" "}
                        I expected anything less than perfect for the team of
                        experts. They are the best team ever!{" "}
                      </small>{" "}
                    </p>
                    <Link to="/safepayment" class="link-secondary learn-more">
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-team col-md-3 mt-100 text-center block">
              <div class="card-content">
                <div class="card-body-team p-0">
                  <div class="profile">
                    {" "}
                    <UilHeadphonesAlt
                      className="icons"
                      style={{
                        width: "68px",
                        height: "68px",
                        backgroundColor: "white",
                      }}
                    />
                  </div>
                  <div class="card-title mt-4">Take Virtual Tour</div>
                  <div class="card-subtitle">
                    <p>
                      {" "}
                      <small class="text-muted">
                        {" "}
                        I expected anything less than perfect for the team of
                        experts. They are the best team ever!{" "}
                      </small>{" "}
                    </p>
                    <Link to="/tour" class="link-secondary learn-more">
                      Learn more
                    </Link>
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

export default WorkDetails;
