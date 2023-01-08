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
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
function CartPage() {
  const [products, setProducts] = React.useState([]);
  const [bill, setBill] = React.useState();
  const [loadig, setLoadig] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [delet, setDelete] = React.useState(false);
  const [counter, setCounter] = React.useState(1);
  const [user, setUser] = React.useState({});
  const [clientSecret, setClientSecret] = React.useState("");
  const [state, setState] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneNo: "",
    address: "",
  });
  const elements = useElements();
  const stripe = useStripe();
  React.useEffect(
    function () {
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
      axios
        .get(`http://localhost:4000/users/user`, config)
        .then((res) => {
          setUser(res.data.user);
          console.log(res.data);
          setState((pre) => ({ ...pre, fname: res.data.user.firstName }));
          setState((pre) => ({ ...pre, lname: res.data.user.lastName }));
          setState((pre) => ({ ...pre, email: res.data.user.email }));
          setState((pre) => ({ ...pre, phoneNo: res.data.user.phoneNo }));
          setState((pre) => ({ ...pre, address: res.data.user.address }));
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .post(`http://localhost:4000/order/payment/create`, { bill }, config)
        .then((user) => {
          setClientSecret(user.data.clientSecret);
          console.log(user.data.clientSecret);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    [delet]
  );
  console.log(clientSecret);

  const confirmPayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.log("!stripe || !elements");
      return;
    }
    const cardElements = elements.getElement(CardElement);
    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          type: "card",
          card: cardElements,
          billing_details: {
            name: state.fname + state.lname,
          },
        },
      })
      .then((result) => {
        alert("dku");
        console.log(result);
        // axios.post("/orders/add", {
        //   basket: basket,
        //   price: getBasketTotal(basket),
        //   email: user?.email,
        //   address: address,
        // });
      })
      .catch((err) => console.log(err));
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
        console.log("user delete");
        toast.success("Product Remove Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
        console.log("order Done");
        handleDelete(id);
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
  const promise = loadStripe(
    "pk_test_51MNbzESG2rFLRrIM8cP6C9Op0rv9dZDa1tPehKDuCvVBDgP7xK67KReSvJq3ipBsejS8lrAMZ3TgEi2hEn360gEx00ignv6O1a"
  );

  return (
    <>
      {/* <Elements stripe={promise}> */}
      {/* <OtherHeroSections
        Name1={"Your Cart Is Here"}
        ImageSource={CartHero}
        className="shopimage"
      /> */}
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

      {products?.length <= 0 ? (
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
      ) : (
        <div className="App">
          <section class="section-pagetop bg">
            <div class="container">
              <section class="section-content padding-y">
                <div class="container">
                  {/* <div class="card"> */}
                  <div class="">
                    <main class="">
                      <div class="card">
                        <div>
                          <table class="table table-borderless table-shopping-cart">
                            <thead class="text-muted">
                              <tr class="small text-uppercase">
                                {/* <th scope="col">Sr #</th> */}
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
                            {products?.map((product, index) => {
                              return (
                                <tbody key={index}>
                                  <tr>
                                    {/* <td>{index + 1}</td> */}
                                    <td>
                                      <figure class="itemside">
                                        {/* <div class="aside">
                                            <img
                                              src={`http://localhost:4000/${product.product_image}`}
                                              class="img-sm"
                                            />
                                          </div> */}
                                        <figcaption class="info">
                                          <a href="#" class="title text-dark">
                                            {`${product?.name}`}
                                          </a>
                                        </figcaption>
                                      </figure>
                                    </td>
                                    <td>
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
                                          disabled={
                                            counter >= product["countInStock"]
                                          }
                                          onClick={() => {
                                            setCounter((pre) => pre + 1);
                                          }}
                                        >
                                          +
                                        </Button>
                                      </ButtonGroup>
                                    </td>
                                    <td>
                                      <div class="price-wrap">
                                        <var class="price">{`${product?.price}`}</var>
                                      </div>
                                    </td>
                                    <td class="">
                                      <button
                                        onClick={() =>
                                          makeOrder(product.productId)
                                        }
                                        class="buttons btn text-white btn-primary"
                                      >
                                        {" "}
                                        Make Purchase
                                      </button>
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
                            onClick={() => window.scrollTo(0, 1350)}
                          >
                            {" "}
                            Make Purchase
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
              <section class="section-name bg padding-y">
                <div class="container">
                  <h6>Payment and refund policy</h6>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </section>
            </div>
          </section>
        </div>
      )}

      <CardElement />

      <button onClick={confirmPayment}>Place Order</button>
      {/* <Checkout /> */}
      {/* </Elements> */}
    </>
  );
}

export default CartPage;
