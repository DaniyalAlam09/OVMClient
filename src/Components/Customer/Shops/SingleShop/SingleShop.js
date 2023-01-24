import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CountUp from "react-countup";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Divider } from "@mui/material";
import HeroSection from "../../HomePage/HeroSection";
import ShopHero from "../../Images/ShopHero.png";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { slice } from "lodash";

import ReactStars from "react-rating-stars-component";
import { CartProvider, useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import "./Style.css";
import OtherHeroSections from "../../HomePage/OtherHeroSections";
import VerifiedIcon from "@mui/icons-material/Verified";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: " rgba(218, 216, 216, 0.26)",
  "&:hover": {
    backgroundColor: "rgba(218, 216, 216, 0.26)",
    // width: "80%",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "100%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50ch",
      "&:focus": {
        width: "70ch",
      },
    },
  },
}));

function SingleShop() {
  let { shopId, shopName } = useParams();
  let params = useParams();
  const [shop, setShop] = React.useState({});
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = React.useState(true);
  const [index, setIndex] = useState(8);
  const initialPosts = slice(user, 0, index);
  // console.log(params);
  React.useEffect(
    function () {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      axios
        .get("http://localhost:4000/shopowners/" + shopId)
        .then((res) => {
          setShop(res.data);
          console.log(shopId);
          console.log(res.data);
          console.log(shop);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get("http://localhost:4000/shopowners/shopproducts/" + shopId)
        .then((actualData) => {
          console.log(actualData.data.products);
          setUser(actualData.data.products);
          console.log(user);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      window.scrollTo(0, 0);
    },

    [shopId]
  );
  console.log(user._id);

  return (
    <div>
      {/* <OtherHeroSections Name1={"Shops"} /> */}
      <div className="container">
        <div className=" d-flex justify-content-center mb-5 mt-5">
          <h1>{shopName}</h1>
          <h6>
            {shop?.verified === true && (
              <VerifiedIcon style={{ color: "#1C99E6" }} />
            )}
          </h6>

          {/* <h1>{ShopId}</h1> */}
        </div>
        <div
          className="border rounded p-4  row mb-4 text-dark"
          style={{ backgroundColor: "#0C8AA0" }}
        >
          <div className=" col-xl-4 col-sm-6 mb-5 ">
            <div className="ship-style text-dark">
              <h6>
                Shop Name: <span className="text-white">{shop.shopName}</span>{" "}
              </h6>

              <h6>
                Owner:{" "}
                <span className="text-white">
                  {shop.firstName} {shop.lastName}
                </span>
              </h6>
            </div>
          </div>
          <div className="  col-xl-4 col-sm-6 mb-5  text-center">
            <div className="ship-style text-dark">
              <h6>
                Contact: <span className="text-white">{shop.phone}</span>
              </h6>
              <h6>
                Provide Delivery:{" "}
                <span className="text-white">{shop.delivery}</span>
              </h6>
            </div>
          </div>
          <div className=" col-xl-4 col-sm-6 mb-5 ">
            <div className="ship-style text-dark">
              <h6>
                Shop Number: <span className="text-white">{shop.shopNo}</span>{" "}
              </h6>
              <h6>
                Shop Floor: <span className="text-white">{shop.floor}</span>
              </h6>
            </div>
          </div>
        </div>
        <div class=" container d-flex justify-content-center">
          <div className="">
            <Box>
              <Toolbar>
                <span class="mr-md-auto" style={{ width: "90px" }}>
                  <strong>
                    {" "}
                    <CountUp end={user.length} duration={1} />
                  </strong>{" "}
                  Shops
                </span>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </Search>
              </Toolbar>
            </Box>
          </div>
        </div>
        <div className="text-center mt-5">
          <h2>
            {!loading && user.length === 0 && (
              <h5>
                No Products in List <SentimentVeryDissatisfiedIcon />{" "}
                <SentimentVeryDissatisfiedIcon />
              </h5>
            )}
          </h2>
        </div>
        <div className="row text-center d-flex justify-content-start mt-5">
          {Object.values(initialPosts)
            .filter((person) => {
              if (search == "") {
                return person;
              } else if (
                person.product_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return person;
              }
            })
            ?.map((product, index) => (
              <div key={index} class=" col-md-6 col-lg-3">
                <Link
                  key={index}
                  to={`../singleProduct/${product._id}/${product.owner}`}
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
                        src={`http://localhost:4000/${product.product_image}`}
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
                          <a class="text-muted">{`${product.product_brand}`}</a>
                        </p>
                        <p class="small text-danger">
                          <s
                            style={{ textDecoration: "line-through" }}
                          >{`${product.product_price}`}</s>
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
                        >{`${product.product_price}`}</p>
                      </div>

                      <div class="d-flex justify-content-between">
                        <p class="rating text-muted">
                          Stoke: {`${product.product_stoke}`}
                        </p>
                        <div class="rating">
                          {product.reviews
                            ? product.reviews?.map((rew) => (
                                <Rating
                                  size="small"
                                  value={rew.rating}
                                  readOnly
                                />
                              ))
                            : "kj"}
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
        </div>
      </div>
    </div>
  );
}

export default SingleShop;
