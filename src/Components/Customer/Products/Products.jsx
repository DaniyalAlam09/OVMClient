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
  const item = { _id };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const loadMore = () => {
    setIndex(index + 9);

    if (index >= product.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  const getCategory = () => {
    axios
      .get("https://red-gorgeous-bandicoot.cyclic.app/category")
      .then((res) => {
        setCatagories(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrands = () => {
    axios
      .get("https://red-gorgeous-bandicoot.cyclic.app/brand")
      .then((res) => {
        setBrands(res.data.brand);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const bestReviewd = () => {
    axios
      .post("https://red-gorgeous-bandicoot.cyclic.app/shops/sentiment")
      .then((res) => {
        setProduct(res.data.pro);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const catagoryFilter = () => {
    axios
      .get(
        `https://red-gorgeous-bandicoot.cyclic.app/shops?category=${searchCatagories}&brand=${searchBrand}`
      )
      .then((res) => {
        setProduct(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const apply = () => {
    axios
      .get(
        `https://red-gorgeous-bandicoot.cyclic.app/shops?category=${searchCatagories}&brand=${searchBrand}&price[gte]=${state.min}&price[lt]=${state.max}`
      )
      .then((res) => {
        setProduct(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const allProduct = () => {
    axios
      .get("https://red-gorgeous-bandicoot.cyclic.app/shopowners/viewProducts")
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(
    function () {
      axios
        .get("https://red-gorgeous-bandicoot.cyclic.app/shopowners/viewProducts")
        .then((res) => {
          setProduct(res.data);
          setReviews(res.data.reviews);
          // window.scrollTo(0, 0);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
        });

      getCategory();
      getBrands();
      catagoryFilter();
    },

    [searchCatagories, searchBrand]
  );

  return (
    <>
      {/* <HeroSection /> */}
      {/* <OtherHeroSections
        Name1={"All Products are available "}
        Name2={"Tech Products"}
        ImageSource="/images/ProductsHero.png"
      /> */}
      <div class="container">
        <div class="row">
          <aside class="col-md-3">
            <div class="border mb-4 p-3 mt-5">
              <div>
                <button
                  onClick={() => allProduct()}
                  className="btn  mt-3 mb-3 "
                  style={{
                    height: "40px",
                    backgroundColor: "black",
                    color: "white",
                    width: "80%",
                  }}
                >
                  Clear All Filters
                </button>
              </div>
              <article class="filter-group">
                <header class="card-header">
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapse_1"
                    aria-expanded="true"
                    class=""
                  >
                    {/* <ExpandMoreIcon size="small" /> */}
                    <h6 class="title">Top Reviewed</h6>
                  </a>
                </header>
                <div
                  class="filter-content collapse show"
                  id="collapse_1"
                  // style=""
                >
                  <div class="card-body">
                    <button
                      onClick={() => bestReviewd()}
                      className="btn btn-primary signin mt-2"
                      style={{ width: "80%" }}
                    >
                      Best Reviewd
                    </button>
                  </div>
                </div>
              </article>
              <article class="filter-group">
                <header class="card-header">
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapse_5"
                    aria-expanded="true"
                    class=""
                  >
                    {/* <ExpandMoreIcon size="small" /> */}
                    <h6 class="title">Catagories</h6>
                  </a>
                </header>
                <div
                  class="filter-content collapse show"
                  id="collapse_5"
                  // style=""
                >
                  <div class="card-body">
                    {catagories?.map((catagory, index) => {
                      return (
                        <div
                        // className="d-flex justify-content-around"
                        // style={{ display: "flex", direction: "row" }}
                        >
                          <div key={index} className="">
                            <button
                              onClick={() => setSearchCatagories(catagory.name)}
                              className="btn btn-primary signin mt-2"
                              style={{ width: "80%" }}
                            >
                              {catagory.name}
                            </button>
                          </div>
                          {/* <div key={index} className="">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value={catagory}
                                id="flexCheckChecked"
                                name="brand"
                                onChange={() =>
                                  setSearchCatagories(catagory.name)
                                }
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                {catagory.name}
                              </label>
                            </div>
                          </div> */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
              <article class="filter-group">
                <header class="card-header">
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapse_2"
                    aria-expanded="true"
                    class=""
                  >
                    <i class="icon-control fa fa-chevron-down"></i>
                    <h6 class="title">Brands </h6>
                  </a>
                </header>
                <div
                  class="filter-content collapse show"
                  id="collapse_2"
                  // style=""
                >
                  <div class="card-body">
                    {brands?.map((brands, index) => {
                      return (
                        <div
                        // className="d-flex justify-content-around"
                        // style={{ display: "flex", direction: "row" }}
                        >
                          <div key={index} className="">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                value=""
                                id="flexCheckChecked"
                                name="brand"
                                onChange={() => setSearchBrand(brands.name)}
                              />
                              <label
                                class="form-check-label"
                                for="flexCheckChecked"
                              >
                                {brands.name}
                              </label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
              <article class="filter-group">
                <header class="card-header">
                  <a
                    href="#"
                    data-toggle="collapse"
                    data-target="#collapse_3"
                    aria-expanded="true"
                    class=""
                  >
                    <i class="icon-control fa fa-chevron-down"></i>
                    <h6 class="title">Price range </h6>
                  </a>
                </header>
                <div
                  class="filter-content collapse show"
                  id="collapse_3"
                  // style=""
                >
                  <div class="card-body">
                    <div class="">
                      <div class="form-group">
                        <label>Min</label>
                        <input
                          name="min"
                          class="form-control"
                          placeholder="RS.0"
                          type="number"
                          onChange={handleChange}
                          value={state.min}
                        />
                      </div>
                      <div class="form-group">
                        <label>Max</label>
                        <input
                          name="max"
                          class="form-control"
                          placeholder="RS. 1,0000"
                          type="number"
                          onChange={handleChange}
                          value={state.max}
                        />
                      </div>
                    </div>
                    <button
                      class="btn btn-block btn-primary signin"
                      onClick={apply}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </aside>
          <main class="col-md-9 mt-2">
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
                  <div className="col">
                    <div
                      className="row d-flex col-md-6 col-lg-4  justify-content-around mb-5"
                      style={{ marginLeft: "-90px" }}
                    >
                      <div className="ml-3 col-md-3">
                        <Skeleton
                          variant="rectangular"
                          width={350}
                          height={200}
                        />
                      </div>
                    </div>
                    <div
                      className="row d-flex col-md-6 col-lg-4  justify-content-around mb-5"
                      style={{ marginLeft: "-90px" }}
                    >
                      <div className="ml-3 col-md-3">
                        <Skeleton
                          variant="rectangular"
                          width={350}
                          height={200}
                        />
                      </div>
                    </div>
                  </div>
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
                            <div key={index} class=" col-md-6 col-lg-4">
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
