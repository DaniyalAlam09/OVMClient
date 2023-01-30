import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Divider } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputBase from "@mui/material/InputBase";
import RetrunPolicy from "./RetrunPolicy";
import Cart from "./Cart";
import "./CartStyle.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text?.slice(0, 60) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide underline"
        style={{ color: "grey", cursor: "pointer" }}
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};
function CartPage() {
  const [products, setProducts] = React.useState([]);
  const [bill, setBill] = React.useState();
  const [loadig, setLoadig] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [delet, setDelete] = React.useState(false);
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
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      axios
        .get(`http://localhost:4000/users/user`, config)
        .then((res) => {
          setUser(res.data?.user);
          console.log(res.data);
          setState((pre) => ({ ...pre, fname: res?.data?.user?.firstName }));
          setState((pre) => ({ ...pre, lname: res?.data?.user?.lastName }));
          setState((pre) => ({ ...pre, email: res?.data.user?.email }));
          setState((pre) => ({ ...pre, phoneNo: res?.data?.user?.phoneNo }));
          setState((pre) => ({ ...pre, address: res?.data?.user?.address }));
          setState((pre) => ({ ...pre, city: res?.data?.user?.city }));
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
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
  function multiplyNumbers(x, y) {
    return x * y;
  }
  var z = 0;
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
                      <table
                        id="cart"
                        class="table table-hover table-condensed border "
                      >
                        <thead>
                          <tr>
                            <th style={{ width: "50%" }}>Product</th>
                            <th style={{ width: "10%" }}>Price</th>
                            <th style={{ width: "8%" }}>Quantity</th>
                            <th style={{ width: "22%" }} class="text-center">
                              Subtotal
                            </th>
                            <th style={{ width: "10%" }}></th>
                          </tr>
                        </thead>
                        {products?.map((product, index) => {
                          return (
                            <tbody className="">
                              <tr>
                                <td data-th="Product">
                                  <div class="row">
                                    <div class="col-sm-2 hidden-xs">
                                      <img
                                        src={`http://localhost:4000/${product.image}`}
                                        alt={product?.name}
                                        class="img-responsive"
                                      />
                                    </div>
                                    <div class="col-sm-10">
                                      <h5 class="nomargin">
                                        {" "}
                                        <Link
                                          class="text-dark"
                                          to={`../singleProduct/${product.productId}/${product.owner}`}
                                        >{`${product?.name}`}</Link>
                                      </h5>
                                      <ReadMore>
                                        {product?.description}
                                      </ReadMore>{" "}
                                    </div>
                                  </div>
                                </td>
                                <td data-th="Price">{`${product?.price}`}</td>
                                <td data-th="Quantity">
                                  <div class="border p-2 rounded text-center">
                                    {`${product?.quantity}`}
                                  </div>
                                </td>
                                <td data-th="Subtotal" class="text-center">
                                  {
                                    (z = multiplyNumbers(
                                      product?.price,
                                      product?.quantity
                                    ))
                                  }
                                </td>
                                <td class="actions" data-th="">
                                  <button onClick={() => getCart()}>
                                    <RefreshOutlinedIcon
                                      style={{
                                        color: "white",
                                        backgroundColor: "#2b8ab7",
                                        padding: "2px",
                                        borderRadius: "3px",
                                        fontSize: "30px",
                                        cursor: "pointer",
                                        marginRight: "10px",
                                      }}
                                    />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDelete(product.productId)
                                    }
                                  >
                                    <DeleteForeverOutlinedIcon
                                      style={{
                                        color: "white",
                                        backgroundColor: "#D9534F",
                                        padding: "3px",
                                        borderRadius: "3px",
                                        fontSize: "30px",
                                        marginLeft: "10px",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}

                        <tfoot>
                          <tr>
                            <td>
                              <button class="btn btn-secondary ">
                                <ArrowBackIosNewOutlinedIcon
                                  style={{
                                    fontSize: "10px",
                                  }}
                                />
                                <ArrowBackIosNewOutlinedIcon
                                  style={{
                                    fontSize: "10px",
                                  }}
                                />{" "}
                                <Link className="text-white" to="/">
                                  Continue shopping
                                </Link>
                              </button>
                            </td>
                            <td colspan="2" class="hidden-xs"></td>
                            <td class="hidden-xs text-center">
                              <strong>
                                {bill && <dd>Total: RS.{bill}</dd>}
                              </strong>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  window.scrollTo(0, 1550);
                                }}
                                class="btn btn-primary signin"
                              >
                                Continue to Checkout{" "}
                                <ArrowForwardIosOutlinedIcon
                                  style={{
                                    fontSize: "10px",
                                  }}
                                />
                                <ArrowForwardIosOutlinedIcon
                                  style={{
                                    fontSize: "10px",
                                  }}
                                />
                              </button>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </main>
                  </div>
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
                    <Link
                      class="text-dark"
                      to={`../singleProduct/${product.productId}/${product.owner}`}
                    >
                      <li class="list-group-item d-flex justify-content-between lh-condensed block">
                        <div>
                          <h6 class="my-0">
                            <Link
                              class="text-dark"
                              to={`../singleProduct/${product.productId}/${product.owner}`}
                            >{`${product?.name}`}</Link>
                          </h6>
                          {/* <small class="text-muted">{`${product?.product_brand}`}</small> */}
                        </div>

                        <span class="text-muted">{`${product?.price}`}</span>
                      </li>
                    </Link>
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
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">+92</div>
                    </div>
                    <input
                      type="Num"
                      class="form-control"
                      placeholder="3XX XXXXXXX"
                      name="phoneNo"
                      value={state.phoneNo}
                      onChange={handleChange}
                    />
                  </div>
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
