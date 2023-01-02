import React, { useEffect, useState } from "react";
import HeadPhone from "../Images/HeadPhone.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function FeaturedCatagories() {
  const [catagories, setCatagories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const getCategory = () => {
    axios
      .get("http://localhost:4000/category")
      .then((res) => {
        setCatagories(res.data.categories);
        setLoading(false);
        console.log(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(function () {
    getCategory();
  }, []);
  return (
    <div className=" container">
      <div className="featured-head mb-4">
        <h3>Featured Catagories</h3>
        <Link to="/allcatagories" class="link-secondary see-all">
          All Catagories
        </Link>
      </div>
      <div className="mt-5">
        {loading ? (
          <div className="d-flex justify-content-around">
            <div>
              <Skeleton variant="rectangular" width={210} height={200} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton width={210} />
              </Box>
            </div>
            <div>
              <Skeleton variant="rectangular" width={210} height={200} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton width={210} />
              </Box>
            </div>
            <div>
              <Skeleton variant="rectangular" width={210} height={200} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton width={210} />
              </Box>
            </div>
            <div>
              <Skeleton variant="rectangular" width={210} height={200} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton width={210} />
              </Box>
            </div>
          </div>
        ) : (
          <div className="row text-center">
            {catagories?.slice(0, 4).map((categorey) => (
              <div
                key={catagories.indexOf(categorey)}
                className="col-lg-3 col-md-6 mt-3"
              >
                <div class=" border rounded p-3 block">
                  <Link to={`/allproducts/${categorey.name}`}>
                    <img
                      src={`http://localhost:4000/${categorey.imageUrl}`}
                      alt=""
                      class="product-image"
                    />
                    <div class="p-4">
                      <p class="mb-0">{`${categorey.name}`}</p>
                      {/* <p class="small text-muted">CEO - Consultant</p> */}
                      <Link
                        to={`/allproducts/${categorey.name}`}
                        class="small-link text-right"
                      >
                        VISIT
                      </Link>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedCatagories;
