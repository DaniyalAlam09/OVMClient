import React from "react";
import axios from "axios";

function CheckOut() {
  const [products, setProducts] = React.useState([]);
  const [bill, setBill] = React.useState();
  const [loadig, setLoadig] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [delet, setDelete] = React.useState(false);
  const [counter, setCounter] = React.useState(1);
  const [user, setUser] = React.useState({});
  const [state, setState] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneNo: "",
    address: "",
  });

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
          console.log(res.data.items);
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
    },
    [delet]
  );
  return (
    <div className="container">
      <section className="py-5">
        <h2 className="h5 text-uppercase mb-4">Billing details</h2>
        <div className="row">
          <div className="col-lg-8">
            <form action="#">
              <div className="row gy-3 ">
                <div className="col-lg-6 py-3">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="firstName"
                  >
                    First name{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    value={state.fname}
                    id="firstName"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="col-lg-6 py-3">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="lastName"
                  >
                    Last name{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="col-lg-6 py-3">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="email"
                  >
                    Email address{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    id="email"
                    placeholder="e.g. Jason@example.com"
                  />
                </div>
                <div className="col-lg-6 py-3">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="phone"
                  >
                    Phone number{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="tel"
                    id="phone"
                    placeholder="e.g. +02 245354745"
                  />
                </div>
                <div className="col-lg-6 py-3">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="company"
                  >
                    Company name (optional){" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="company"
                    placeholder="Your company name"
                  />
                </div>
                <div className="col-lg-6 form-group">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="country"
                  >
                    Country
                  </label>
                  <select
                    className="country"
                    id="country"
                    data-customclassName="form-control form-control-lg rounded-0"
                  >
                    <option value>Choose your country</option>
                  </select>
                </div>
                <div className="col-lg-12">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="address"
                  >
                    Address line 1{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="address"
                    placeholder="House number and street name"
                  />
                </div>
                <div className="col-lg-12">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="addressalt"
                  >
                    Address line 2{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="addressalt"
                    placeholder="Apartment, Suite, Unit, etc (optional)"
                  />
                </div>
                <div className="col-lg-6 py-3">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="city"
                  >
                    Town/City{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="city"
                  />
                </div>
                <div className="col-lg-6 py-3">
                  <label
                    className="form-label text-sm text-uppercase"
                    for="state"
                  >
                    State/County{" "}
                  </label>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    id="state"
                  />
                </div>
                <div className="col-lg-6 py-3">
                  <button
                    className="btn btn-link text-dark p-0 shadow-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#alternateAddress"
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        id="alternateAddressCheckbox"
                        type="checkbox"
                      />
                      <label
                        className="form-check-label"
                        for="alternateAddressCheckbox"
                      >
                        Alternate billing address
                      </label>
                    </div>
                  </button>
                </div>
                <div className="collapse" id="alternateAddress">
                  <div className="row gy-3">
                    <div className="col-12 mt-4">
                      <h2 className="h4 text-uppercase mb-4">
                        Alternative billing details
                      </h2>
                    </div>
                    <div className="col-lg-6 py-3">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="firstName2"
                      >
                        First name{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="firstName2"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="col-lg-6 py-3">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="lastName2"
                      >
                        Last name{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="lastName2"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className="col-lg-6 py-3">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="email2"
                      >
                        Email address{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        id="email2"
                        placeholder="e.g. Jason@example.com"
                      />
                    </div>
                    <div className="col-lg-6 py-3">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="phone2"
                      >
                        Phone number{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="tel"
                        id="phone2"
                        placeholder="e.g. +02 245354745"
                      />
                    </div>
                    <div className="col-lg-6 py-3">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="company2"
                      >
                        Company name (optional){" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="company2"
                        placeholder="Your company name"
                      />
                    </div>
                    <div className="col-lg-6 form-group py-3">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="countryAlt"
                      >
                        Country
                      </label>
                      <select
                        className="country"
                        id="countryAlt"
                        data-customclassName="form-control form-control-lg rounded-0"
                      >
                        <option value>Choose your country</option>
                      </select>
                    </div>
                    <div className="col-lg-12">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="address2"
                      >
                        Address line 1{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="address2"
                        placeholder="House number and street name"
                      />
                    </div>
                    <div className="col-lg-12">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="addressalt2"
                      >
                        Address line 2{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="addressalt2"
                        placeholder="Apartment, Suite, Unit, etc (optional)"
                      />
                    </div>
                    <div className="col-lg-6 py-3">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="city2"
                      >
                        Town/City{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="city2"
                      />
                    </div>
                    <div className="col-lg-6 py-3">
                      <label
                        className="form-label text-sm text-uppercase"
                        for="state2"
                      >
                        State/County{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="state2"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 form-group">
                  <button className="btn btn-dark" type="submit">
                    Place order
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 rounded-0 p-lg-4 bg-light">
              <div className="card-body">
                <h5 className="text-uppercase mb-4">Your order</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between">
                    <strong className="small fw-bold">
                      Red digital smartwatch
                    </strong>
                    <span className="text-muted small">$250</span>
                  </li>
                  <li className="border-bottom my-2"></li>
                  <li className="d-flex align-items-center justify-content-between">
                    <strong className="small fw-bold">
                      Gray Nike running shoes
                    </strong>
                    <span className="text-muted small">$351</span>
                  </li>
                  <li className="border-bottom my-2"></li>
                  <li className="d-flex align-items-center justify-content-between">
                    <strong className="text-uppercase small fw-bold">
                      Total
                    </strong>
                    <span>$601</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckOut;
