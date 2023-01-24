import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import HeroSection from "../../Customer/HomePage/HeroSection";
import SingleShopHero from "../../Customer/Images/SingleShopHero.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating";
import OtherHeroSections from "../HomePage/OtherHeroSections";
import SingleShop from "../Shops/SingleShop/SingleShop";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Detail() {
  let { productId, shopId } = useParams();

  const [product, setProduct] = React.useState({});
  const [shop, setShop] = React.useState({});
  const [user, setUser] = useState({});
  const [counter, setCounter] = React.useState(1);
  const [value, setValue] = React.useState(0);
  const { _id } = useParams();
  const navigate = useNavigate();

  const item = { _id };
  // const Cart = (e) => {
  //   console.log(product._id);
  // };

  const Cart = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .post(
        `http://localhost:4000/product/cart`,
        {
          productId: product._id,
          quantity: counter,
        },
        config
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log("SUCCESSS");
          console.log(response.data);
          toast.success("Product Sucessfully Added to Cart", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // navigate("../product-list");
        } else {
          console.log("SOMETHING WENT WRONG");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  React.useEffect(
    function () {
      axios
        .get("http://localhost:4000/shops/" + productId)
        .then((res) => {
          setProduct(res.data);
          console.log(res.data);
          // window.scrollTo(0, 0);
          // console.log(res.data);
          // console.log(product);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get("http://localhost:4000/shopowners/" + shopId)
        .then((res) => {
          setShop(res.data);
          console.log(shopId);
          console.log(res.data);
          console.log(shop);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      axios
        .get("http://localhost:4000/shopowners/shopproducts/" + shopId)
        .then((actualData) => {
          console.log(actualData.data.products);
          setUser(actualData.data.products);
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [productId, shopId]
  );

  const [state, setState] = useState({
    comment: "",
    name: "",
    rating: "",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("comment", state.comment);
    formData.append("rating", value);
    // formData.append("product_sku", state.color);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .post(`http://localhost:4000/shops/review/${productId}`, formData, config)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          navigate(0);
          console.log(response.data.message);
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (
          response.response.data.message === "Comment and Rating is Required"
        ) {
          toast.error("Comment and Rating is Required", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <ToastContainer />
      <OtherHeroSections Name1={"Shops"} ImageSource={SingleShopHero} />
      <div className="container">
        <div className="card">
          <div className="container-fliud">
            <div className="wrapper row">
              <div className=" col-md-4">
                <div className="row">
                  <div className=" large">
                    <div className="tab-pane active" id="pic-1">
                      <img
                        src={`http://localhost:4000/${product.product_image}`}
                        style={{ height: "20em" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="details col-md-8">
                <h3 className="product-title">{product.product_name}</h3>

                <div className="rating">
                  <span className="review-no">
                    <strong>
                      {product.reviews ? product.reviews.length : "No"}
                    </strong>{" "}
                    Review on this Product
                  </span>
                </div>
                <Divider />
                <p className="product-description">
                  Brand <strong> {product.product_brand}</strong>
                </p>
                <p className="product-description">
                  Colour <strong> {product.product_color}</strong>
                </p>
                <p class="small text-danger">
                  <s
                    style={{
                      textDecoration: "line-through",
                    }}
                  >{`${product.product_price}`}</s>
                </p>
                <Divider />
                <div className=" row">
                  <h4 className="colors col-6 col-sm-4">Price:</h4>
                  <h5 className="col-6 col-sm-4">RS.{product.product_price}</h5>
                </div>
                <Divider />
                <div className=" d-flex justify-content-between mt-4">
                  <ButtonGroup
                    size="small"
                    aria-label="small outlined button group"
                  >
                    {
                      <Button
                        disabled={counter <= 0}
                        onClick={() => {
                          setCounter((pre) => pre - 1);
                        }}
                      >
                        -
                      </Button>
                    }

                    {<Button>{counter}</Button>}
                    <Button
                      disabled={counter >= product["countInStock"]}
                      onClick={() => {
                        setCounter((pre) => pre + 1);
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>

                  <div className="d-flex flex-row-reverse ">
                    <button
                      className="btn btn-primary signin justify-end"
                      type="button"
                      onClick={() => Cart()}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="wrapper row mt-5">
              <h3>Description</h3>
              <p className="product-description">
                {product.product_description}
              </p>

              <div
                className="border rounded p-4 m-4 container row text-dark"
                style={{ backgroundColor: "#a1e1fa", color: "#3b7197" }}
              >
                <div className=" col-xl-4 col-sm-6 mb-5 ">
                  <Link to={`/singleshop/${shop._id}/${shop.shopName}`}>
                    <div className="ship-style text-dark block">
                      <h6 className="fw-bold">
                        Shop Name: <span className="">{shop.shopName}</span>{" "}
                      </h6>
                      <h6>
                        Owner:{" "}
                        <span className=" ">
                          {shop.firstName} {shop.lastName}
                        </span>
                      </h6>
                    </div>
                  </Link>
                </div>
                <div className="  col-xl-4 col-sm-6 mb-5  text-center">
                  <Link to={`/singleshop/${shop._id}/${shop.shopName}`}>
                    <div className="ship-style text-dark">
                      <h6>
                        Contact: <span className=" ">{shop.phone}</span>
                      </h6>
                      <h6>
                        Provide Delivery:{" "}
                        <span className="">{shop.delivery}</span>
                      </h6>
                    </div>
                  </Link>
                </div>
                <div className=" col-xl-4 col-sm-6 mb-5 ">
                  <Link to={`/singleshop/${shop._id}/${shop.shopName}`}>
                    <div className="ship-style text-dark">
                      <h6>
                        Shop Number: <span className=" ">{shop.shopNo}</span>{" "}
                      </h6>
                      <h6>
                        Shop Floor: <span className=" ">{shop.floor}</span>
                      </h6>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="preview col-md-6">
                <h2>Reviews</h2>
                {product.reviews?.map((product) => (
                  <div>
                    <div className="">
                      <div className="">
                        <div>
                          <p className="mt-3 ml-4 review-name">{`${product.name}`}</p>
                        </div>
                        <div className="d-flex justify-content-start">
                          <div className="ml">
                            <p className="ml-5 comment">{`${product.comment}`}</p>
                          </div>
                          <div className="">
                            <Rating
                              className="ml-5"
                              size="small"
                              readOnly
                              value={product.rating}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="preview col-md-6">
                <h3>Enter Your Review</h3>
                <form onSubmit={handleSubmit} className="container">
                  <div className="">
                    {/* <label for="inputZip" className="form-label">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      value={state.name}
                    /> */}
                    <label for="inputZip" className="form-label">
                      Enter Your Review
                    </label>
                    <textarea
                      name="comment"
                      type="text"
                      className="form-control"
                      rows="3"
                      onChange={handleChange}
                      value={state.comment}
                    ></textarea>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="buttons btn   btn-primary mt-3"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <h3 className="heading">Related Items</h3>
        <div className="row text-center d-flex jus  tify-content-start mt-5">
          {Object.values(user)
            .slice(0, 4)
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
                          <Rating
                            size="small"
                            value={product.reviews[0]?.rating}
                            readOnly
                          />
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

      {/* {item.brand} */}
    </div>
  );
}

export default Detail;
// import React from "react";

// function Detail() {
//   return <div>Detail</div>;
// }

// export default Detail;
