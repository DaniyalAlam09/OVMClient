import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import OtherHeroSections from "../HomePage/OtherHeroSections";
import { styled, alpha } from "@mui/material/styles";
import Hero from "../Images/Hero.png";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { slice } from "lodash";
import { Divider } from "@mui/material";
import CountUp from "react-countup";
import "./styles.css";
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
        width: "60ch",
      },
    },
  },
}));

function Products() {
  const [value, setValue] = React.useState([]);
  const [product, setProduct] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [catagories, setCatagories] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [searchCatagories, setSearchCatagories] = React.useState("");
  const [searchBrand, setSearchBrand] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(9);
  const initialPosts = slice(product, 0, index);
  const [state, setState] = useState({
    name: "",
    id: "",
    price: "",
    min: "",
    max: "",
  });
  const { _id } = useParams();
  const loadMore = () => {
    setIndex(index + 9);

    if (index >= product.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  const allProduct = () => {
    axios
      .post("http://localhost:4000/shops/sentiment")
      .then((res) => {
        setProduct(res.data.pro);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(
    function () {
      allProduct();
    },

    [searchCatagories, searchBrand]
  );

  return (
    <>
      <div class="container">
        <div class="row">
          <main class=" mt-2">
            <header class="border-bottom mb-4 pb-3">
              <div class="form-inline">
                <span class="mr-md-auto">
                  <strong>
                    {" "}
                    <CountUp end={product.length} duration={1} />
                  </strong>{" "}
                  Items found
                </span>
                <Box>
                  <Toolbar>
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="product name..."
                        inputProps={{ "aria-label": "search" }}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                    </Search>
                  </Toolbar>
                </Box>
              </div>
            </header>

            <div className=" container">
              <h2>
                {!loading && product.length === 0 && <h1>No Products</h1>}
              </h2>
              <div>
                {loading ? (
                  <></>
                ) : (
                  <section>
                    <div class="container">
                      <div class="row">
                        {/* <div class=" col-md-6 col-lg-4 mb-4 mb-md-0"> */}
                        {initialPosts
                          .filter((person) => {
                            if (search == "") {
                              return person;
                            } else if (
                              person.product_name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return person;
                            }
                          })
                          .map((product, index) => (
                            <div key={index} class=" col-md-4 col-lg-3">
                              <Link
                                key={index}
                                to={`../singleProduct/${product._id}/${product.owner}`}
                              >
                                <div
                                  class="border mb-4 p-3 card-hover"
                                  style={{
                                    height: "380px",
                                    borderRadius: "5px",

                                    // backgroundColor:
                                    //   " rgba(236, 235, 235, 0.137)",
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
                                        Stoke: {`${product.product_stoke}`}
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
              {product.length >= 8 && (
                <div className="d-grid mt-3 mb-5">
                  {isCompleted ? (
                    <div class="text-center">
                      {" "}
                      <button
                        onClick={loadMore}
                        type="button"
                        className="btn btn-danger disabled"
                      >
                        No More Items
                      </button>
                    </div>
                  ) : (
                    <div class="text-center">
                      <button
                        onClick={loadMore}
                        type="button"
                        class="btn btn-primary signin ml-2"
                      >
                        Load More
                        {/* <KeyboardDoubleArrowDownSharpIcon /> */}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Products;
