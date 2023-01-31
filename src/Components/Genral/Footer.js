import React from "react";
import {
  UilFacebook,
  UilTwitter,
  UilYoutube,
  UilInstagram,
  UilGithub,
} from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Products from "./../Customer/Products/Products";

function Footer() {
  const { pathname } = useLocation();
  if (pathname === "/user/customer-dashboard") return null;
  if (pathname === "/user/customer-orders") return null;
  if (pathname === "/user/edit-profile") return null;
  if (pathname === "/user/logout") return null;
  if (pathname === "/account") return null;
  if (pathname === "/cart") return null;
  if (pathname === "/privacy") return null;
  if (pathname === "/safepayment") return null;
  if (pathname === "/shipping") return null;
  if (pathname === "/tour") return null;
  if (pathname === "/shopowner-login") return null;
  if (pathname === "/create-account") return null;
  if (pathname === "/shopowner-account") return null;
  if (pathname === "/shopowner/shoponwer-dashboard") return null;
  if (pathname === "/shopowner/manage-orders") return null;
  if (pathname === "/shopowner/shoponwer-analytics") return null;
  if (pathname === "/shopowner/edit-profile") return null;
  if (pathname === "/shopowner/addproduct") return null;
  if (pathname === "/shopowner/product-list") return null;
  if (pathname === "/shopowner/logout") return null;
  if (pathname === "/shopowner/edit-profile/:itemId") return null;
  if (pathname === "/user/customer-dashboard") return null;
  return (
    <div class="hero pt-4">
      <div className="container footer-style">
        <div className="row justify-content-around">
          <div className="col-xl-3 col-sm-12 mb-3">
            <h5>Accessoriespace</h5>
            <p className="footer-info">
              Empower Your Daily Life with Our Smart Devices and Latest Tech
              Solutions
            </p>
            <a target="blank" href="https://www.facebook.com/">
              <UilFacebook className="icons" />
            </a>
            <a target="blank" href="https://www.instagram.com/">
              <UilInstagram className="icons" />
            </a>
            <a target="blank" href="https://www.twitter.com/">
              <UilTwitter className="icons" />
            </a>
            <a target="blank" href="https://www.youtube.com/">
              <UilYoutube className="icons" />
            </a>
            <a target="blank" href="https://github.com/DaniyalAlam09/">
              <UilGithub className="icons" />
            </a>
          </div>
          {/* <div className="col-md-2 ">
            <h6>Product</h6>
            <p className="footer-info">Features</p>
            <p className="footer-info">Enterpise</p>
            <p className="footer-info">Security</p>
            <p className="footer-info">Customer Stories</p>
            <p className="footer-info">Pricing</p>
            <p className="footer-info">Demo</p>
          </div> */}
          <div className="col-md-2">
            <h6>Team and Features</h6>
            <Link to="/team" className="footer-info">
              Team
            </Link>
            <br />
            <Link to="/allbrands" className="footer-info">
              Brands
            </Link>
            <br />
            <Link to="/tourguides" className="footer-info">
              Tour
            </Link>
            <br />
            <Link to="/sentimental-products" className="footer-info">
              Sentiment Products
            </Link>
          </div>
          <div className="col-md-2">
            <h6>Company</h6>
            <Link to="/about" className="footer-info">
              About Us
            </Link>{" "}
            <br />
            <Link to="/contact" className="footer-info">
              Contact
            </Link>
            <br />
            <Link to="/privacy" className="footer-info">
              Privacy Policy
            </Link>
          </div>
          <div className="col-md-2 ">
            <h6>Address</h6>
            <p className="footer-info">
              Hafeez CentreBlock E1 Block E 1 Gulberg III, Lahore, Punjab
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
