import React from "react";
import axios from "axios";
import HeroSection from "../HomePage/HeroSection";
import CartHero from "../Images/CartHero.png";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Divider } from "@material-ui/core";
import OtherHeroSections from "../HomePage/OtherHeroSections";
import Checkout from "./../Checkout/Checkout";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import SearchIcon from "@material-ui/icons/Search";
import RetrunPolicy from "./RetrunPolicy";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function CartPage() {
  const [products, setProducts] = React.useState([]);
  const [bill, setBill] = React.useState();
  const [loadig, setLoadig] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [delet, setDelete] = React.useState(false);
  const [counter, setCounter] = React.useState(1);
  const [user, setUser] = React.useState({});
  const [clientSecret, setClientSecret] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [load, setLoad] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    fname: "",
    lname: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    city: "",
  });
  const elements = useElements();
  const stripe = useStripe();
  React.useEffect(
    function () {
      getCart();
    },
    [delet]
  );
  const getFormData = () => {
    var form_data = new FormData();
    for (var key in state) {
      form_data.append(key, state[key]);
    }
    return form_data;
  };
  const getCart = () => {
    setLoadig(true);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .get("http://localhost:4000/product/cart", config)
      .then((res) => {
        setProducts(res.data.items);
        console.log(res.data);
        setBill(res.data.bill);
        setLoadig(false);

        // console.log("product");
      })
      .catch((err) => {
        console.log(err);
        setLoadig(false);
        setError(true);
      });
  };
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const confirmPayment = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setLoad(true);
    if (!stripe || !elements) {
      console.log("!stripe || !elements");
      return;
    }
    await axios
      .post(
        `http://localhost:4000/order/payment/create`,
        { amaount: bill },
        config
      )
      .then((user) => {
        setClientSecret(user.data.clientSecret);
        console.log(user.data.clientSecret);
      })
      .catch((error) => {
        console.log(error.message);
      });
    if (
      !state.email ||
      !state.fname ||
      !state.lname ||
      !state.address ||
      !state.city ||
      !state.phoneNo
    ) {
      toast.error("Please Fill all Required Details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const cardElements = elements.getElement(CardElement);
    if (stripe && elements) {
      await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            type: "card",
            card: cardElements,
            billing_details: {
              address: {
                city: state.city,
                line1: state.address,
              },

              name: state.fname + state.lname,
              email: state.email,
              phone: state.phoneNo,
            },
          },
        })
        .then((result) => {
          alert("Payment Received");
          makeOrder();
          handleDeleteCart();
          getCart();
          setLoad(false);
          console.log(result.error.message);
          setSuccess(true);
          navigate("/products");
          if (result.error.message === "Your card number is incomplete.") {
            setOpen(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Invalid card details");
      toast.error("Invalid card details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setSuccess(false);
  };

  const handleDelete = (id) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    // console.log(userID);
    axios
      .delete(`http://localhost:4000/product/cart/${id}`, config)
      .then((user) => {
        setDelete(true);
        // navigate(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
    // console.log("dcwj");
  };
  const makeOrder = (id) => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    // console.log(userID);
    axios
      .post(
        `http://localhost:4000/order`,
        {
          id,
        },
        config
      )
      .then((user) => {
        window.scrollTo(0, 0);
        toast.success("Order Placed Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.response.data.message, {
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
  const handleDeleteCart = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    // console.log(userID);
    axios
      .delete(`http://localhost:4000/product/cart/delete`, config)
      .then((user) => {})
      .catch((error) => {
        console.log(error.message);
      });
    // console.log("dcwj");
  };
  const promise = loadStripe(
    "pk_test_51MNbzESG2rFLRrIM8cP6C9Op0rv9dZDa1tPehKDuCvVBDgP7xK67KReSvJq3ipBsejS8lrAMZ3TgEi2hEn360gEx00ignv6O1a"
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loadig && <h1>Loading ...</h1>}

      {!products && (
        <div>
          <div class="container bootstrap snippets bootdey mb-5 mt-5">
            <div class="row">
              <div class="col-md-12">
                <div class="pull-right" style={{ marginTop: "10px" }}>
                  <div class="d-flex align-items-center justify-content-around text-center">
                    <img
                      // class="img-thumbnail "
                      style={{ width: "40%" }}
                      src="/images/No.png"
                    />
                    <div>
                      <h2>No Item In Cart</h2>
                      {/* <p>Requested page not found!</p> */}
                      {/* <div class="error-actions">
                              <Link
                                to="/"
                                class="btn btn-primary  signin btn-lg sign-in"
                              >
                                Back Home
                              </Link>
                            </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {products?.length > 0 && (
        <div className="App">
          <section class="section-pagetop bg">
            <div class="container">
              <section class="section-content padding-y">
                <div class="container">
                  {/* <div class="card"> */}
                  <div class="">
                    <main class="">
                      <h4 class="d-flex justify-content-around align-items-center mb-3">
                        <span class="text-muted">Your cart</span>
                        <span class="badge badge-secondary badge-pill">
                          <CountUp end={products?.length} duration={1} />
                        </span>
                      </h4>
                      <div class="card">
                        <div>
                          <table class="table table-borderless table-shopping-cart">
                            <thead class="text-muted">
                              <tr class="small text-uppercase">
                                <th scope="col">Sr #</th>
                                <th scope="col">Product</th>
                                <th scope="col" width="120">
                                  Quantity
                                </th>
                                <th scope="col" width="120">
                                  Price
                                </th>
                                <th scope="col" class="text-right" width="200">
                                  {" "}
                                </th>
                              </tr>
                            </thead>
                            {products
                              // .filter((person) => {
                              //   if (search == "") {
                              //     return person;
                              //   } else if (
                              //     person.name
                              //       .toLowerCase()
                              //       .includes(search.toLowerCase())
                              //   ) {
                              //     return person;
                              //   }
                              // })
                              ?.map((product, index) => {
                                return (
                                  <tbody key={index}>
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>
                                        <figure class="itemside">
                                          <figcaption class="info">
                                            <Link
                                              to={`../singleProduct/${product._id}/${product.owner}`}
                                              class="title text-dark"
                                            >
                                              {`${product?.name}`}
                                            </Link>
                                          </figcaption>
                                        </figure>
                                      </td>
                                      <td>
                                        <var class="price">{`${product?.quantity}`}</var>
                                      </td>
                                      <td>
                                        <div class="price-wrap">
                                          <var class="price">{`${product?.price}`}</var>
                                        </div>
                                      </td>

                                      <td class="text-right">
                                        <button
                                          onClick={() =>
                                            handleDelete(product.productId)
                                          }
                                          class="btn btn-danger"
                                        >
                                          {" "}
                                          Remove
                                        </button>
                                      </td>
                                    </tr>
                                    <tr></tr>
                                  </tbody>
                                );
                              })}
                          </table>
                        </div>
                        <div class="card-body border-top d-flex justify-content-between">
                          <Link to="/" class="btn btn-light">
                            Continue shopping
                          </Link>
                          <button
                            class="buttons btn text-white btn-primary"
                            onClick={() => {
                              window.scrollTo(0, 1350);
                            }}
                          >
                            Continue to Checkout
                          </button>
                        </div>
                      </div>
                    </main>
                    <aside class="">
                      <div class="card ">
                        <div class="card-body">
                          <Divider />

                          <dl class="dlist-align">
                            <dt>Total:</dt>
                            <dd class="text-right  h5">
                              <strong>{bill && <dd>Total: {bill}</dd>}</strong>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </aside>
                  </div>
                  {/* </div> */}
                </div>
              </section>
              <div class="alert alert-success">
                <p class="icontext">
                  <i class="icon text-success fa fa-truck"></i> Free Delivery
                  within 1-2 weeks
                </p>
              </div>
              <RetrunPolicy />
            </div>
          </section>
        </div>
      )}

      {/* Payment and Billing Information */}

      {products?.length > 0 && (
        <div className="container mb-5">
          <div class="row">
            {/* Cart Information */}

            <div class="col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your cart</span>
                <span class="badge badge-secondary badge-pill">
                  {products?.length}
                </span>
              </h4>
              {products?.map((product, index) => {
                return (
                  <ul class="list-group mb-3" key={index}>
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 class="my-0">{`${product?.name}`}</h6>
                        {/* <small class="text-muted">{`${product?.product_brand}`}</small> */}
                      </div>

                      <span class="text-muted">{`${product?.price}`}</span>
                    </li>
                  </ul>
                );
              })}
            </div>

            {/*Billing Form */}

            <div class="col-md-8 order-md-1">
              <h4 class="mb-3">Billing address</h4>
              <form class="needs-validation" novalidate>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      placeholder=""
                      value={state.fname}
                      name="fname"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      placeholder=""
                      value={state.lname}
                      name="lname"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="email">Phone Number</label>
                  <input
                    type="Num"
                    class="form-control"
                    placeholder="0300-000 0000"
                    name="phoneNo"
                    value={state.phoneNo}
                    onChange={handleChange}
                  />
                </div>

                <div class="mb-3">
                  <label for="email">
                    Email <span class="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="you@example.com"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                  />
                </div>

                <div class="mb-3">
                  <label for="address">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    name="address"
                    value={state.address}
                    onChange={handleChange}
                  />
                </div>

                <div class="row">
                  <div class="col-md-3 mb-3">
                    <label for="zip">City</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                      name="city"
                      value={state.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <hr class="mb-4" />

                <h4 class="mb-3">Payment</h4>

                <div class="d-block my-3">
                  <CardElement style={{ fontSize: "30px" }} />
                </div>
                <hr class="mb-4" />
                <button
                  onClick={confirmPayment}
                  class="btn btn-primary signin btn-lg btn-block"
                  type="submit"
                  // disabled={load}
                >
                  Confirm Order
                </button>
              </form>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Your card number is incomplete.
                </Alert>
              </Snackbar>
              <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Payment is successful
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartPage;
