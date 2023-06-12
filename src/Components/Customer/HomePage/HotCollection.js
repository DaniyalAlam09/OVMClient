import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";

function HotCollection() {
  const [value, setValue] = React.useState([]);
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [state, setState] = useState({
    name: "",
    id: "",
    price: "",
  });
  const { _id } = useParams();
  const item = { _id };
  const handleChange = (e) => {
    console.log(item);
  };

  React.useEffect(function () {
    axios
      .post("https://red-gorgeous-bandicoot.cyclic.app/shops/sentiment")
      .then((res) => {
        setProduct(res.data.pro);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="heading container ">
      <div className="featured-head">
        <h3>Hot Collection</h3>
        <Link to="/sentimental-products" class="link-secondary see-all">
          All Offers
        </Link>
      </div>
      <div className=" container">
        <h2>{!loading && product.length === 0 && <h1>No Products</h1>}</h2>
        <div>
          {loading ? (
            <>
              <div className="row d-flex justify-content-around mt-4 mb-4 ">
                <div className="col-md-3 mt-1">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                    <Skeleton width={210} />
                  </Box>
                </div>
                <div className="col-md-3 mt-1">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                    <Skeleton width={210} />
                  </Box>
                </div>
                <div className="col-md-3 mt-1">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                    <Skeleton width={210} />
                  </Box>
                </div>
                <div className="col-md-3 mt-1">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                    <Skeleton width={210} />
                  </Box>
                </div>
              </div>
            </>
          ) : (
            <section>
              <div class="container">
                <div class="row">
                  {/* <div class=" col-md-6 col-lg-4 mb-4 mb-md-0"> */}
                  {Object.values(product)
                    .slice(0, 8)
                    .map((product, index) => (
                      <div key={index} class=" col-md-6 col-lg-3">
                        <Link
                          key={index}
                          to={`singleProduct/${product._id}/${product.owner}`}
                        >
                          <div
                            class="border mb-4 p-3 card-hover"
                            style={{
                              height: "380px",
                              borderRadius: "5px",
                              // backgroundColor: " rgba(236, 235, 235, 0.137)",
                            }}
                          >
                            <div className="text -center">
                              <div></div>
                              <img
                                src={`https://red-gorgeous-bandicoot.cyclic.app/${product.product_image}`}
                                style={{
                                  height: "200px",
                                  width: "200px",
                                }}
                                class="product-image"
                                alt="Laptop"
                              />
                            </div>

                            <div class="negativemargine">
                              <div class="d-flex justify-content-between">
                                <p class="small">
                                  <a class="text-muted">
                                    {`${product.product_brand}`}
                                  </a>
                                </p>
                                <p class="small text-danger">
                                  {product.discounted_price && (
                                    <s
                                      style={{
                                        textDecoration: "line-through",
                                      }}
                                    >{`${product.product_price}`}</s>
                                  )}
                                  <s></s>
                                </p>
                              </div>
                              <Divider />
                              <div class="d-flex justify-content-between mb-3">
                                <p
                                  className="product-name"
                                  // class="mb-0"
                                >{`${product.product_name}`}</p>
                                <p
                                  className="product-price"
                                  // class="text-dark mb-0"
                                >
                                  {product.discounted_price && (
                                    <s>{`${product.discounted_price}`}</s>
                                  )}
                                  {!product.discounted_price && (
                                    <s>{`${product.product_price}`}</s>
                                  )}
                                </p>
                              </div>

                              <div class="d-flex justify-content-between">
                                <p class="rating text-muted">
                                  Stock: {`${product.product_stoke}`}
                                </p>
                                <div class="rating">
                                  {/* { */}
                                  {/* // product.reviews?.rating && (
                                            // ? product.reviews?.map((rew) => ( */}
                                  <Rating
                                    size="small"
                                    value={product.reviews[0]?.rating}
                                    readOnly
                                  />
                                  {/* // )

                                          // : "kj" */}
                                  {/* } */}
                                  {/* {product.reviews.rating ?(
                                  <p>oid</p>)
                                  : <p>dsk</p>} */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  {/* </div> */}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotCollection;
