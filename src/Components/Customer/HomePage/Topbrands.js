import React, { useEffect, useState } from "react";
import HeadPhone from "../Images/HeadPhone.png";
import axios from "axios";
import { Link } from "react-router-dom";

import { Container } from "@material-ui/core";
import hero from "./assets/img/Samsung.png";
import hero2 from "./assets/img/clients/client-2.png";
import hero3 from "./assets/img/clients/client-4.png";
import hero4 from "./assets/img/clients/client-3.png";
import hero5 from "./assets/img/clients/client-5.png";
import hero6 from "./assets/img/clients/client-7.png";
import hero7 from "./assets/img/clients/client-8.png";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Carousel from "react-elastic-carousel";

function Topbrands() {
  const [brands, setBrands] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const getBrand = () => {
    axios
      .get("http://localhost:4000/brand")
      .then((res) => {
        setBrands(res.data.brand);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(function () {
    getBrand();
  }, []);
  return (
    <div className=" container">
      <div className="featured-head">
        <h3>Brands</h3>
        <Link to="/allbrands" class="link-secondary see-all">
          All Brands
        </Link>
      </div>

      <div className="">
        {loading ? (
          <div className="row d-flex justify-content-around mt-4">
            <div className="col-md-3 mt-1">
              <Skeleton
                variant="rectangular"
                width={210}
                height={150}
                className="rounded"
              />
            </div>
            <div className="col-md-3 mt-1">
              <Skeleton
                variant="rectangular"
                width={210}
                height={150}
                className="rounded"
              />
            </div>
            <div className="col-md-3 mt-1">
              <Skeleton
                variant="rectangular"
                width={210}
                height={150}
                className="rounded"
              />
            </div>
            <div className="col-md-3 mt-1">
              <Skeleton
                variant="rectangular"
                width={210}
                height={150}
                className="rounded"
              />
            </div>
          </div>
        ) : (
          <div>
            <Carousel breakPoints={breakPoints} className="row text-center">
              {brands?.slice(0, 6).map((brand) => (
                <div key={brands.indexOf(brand)} className="col-lg-3 col-md-6">
                  <Link to={`/brand/${brand.name}`}>
                    <div
                      class="clients card block manage"
                      style={{
                        height: "150px",
                        width: "250px",

                        marginLeft: "-100px",
                      }}
                    >
                      <div class="swiper-slide justify-content-between  align-items-center ">
                        <img
                          src={`http://localhost:4000/${brand.imageUrl}`}
                          style={{
                            height: "100px",
                            width: "100px",
                            cursor: "pointer",
                            objectFit: "contain",
                            marginTop: "-25px",
                          }}
                          // src={hero}
                          alt={brand.name}
                          // class="product-image"
                          // style={{ width: "100%" }}
                        />

                        {/* <div class="p-4">
                    <p class="mb-0">{`${brand.name}`}</p>
                    <p class="small text-muted">CEO - Consultant</p>
                  </div> */}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

const breakPoints = [
  { width: 50, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default Topbrands;
