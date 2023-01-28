import React, { useEffect, useState } from "react";
import { UilShoppingBag, UilHeart, UilSearch } from "@iconscout/react-unicons";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import Navbar from './Navbar';
import { Component } from "react";
import axios from "axios";
import { useCart } from "react-use-cart";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation } from "react-router-dom";
import {
  UilUserCircle,
  UilUser,
  UilSignout,
  UilFacebook,
  UilGithub,
  UilYoutube,
  UilTwitter,
  UilInstagram,
} from "@iconscout/react-unicons";
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
      width: "20ch",
      "&:focus": {
        width: "27ch",
      },
    },
  },
}));

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isEmpty, totalItems } = useCart();
  const [user, setUser] = React.useState([]);
  const [shopowner, setShopowner] = React.useState([]);
  const [search, setSearch] = useState("");
  const [catagories, setCatagories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  const handleLogout = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    setUser([]);
    axios
      .get("http://localhost:4000/users/logout", config)
      .then((response) => {
        navigate("../../account");
        navigate(0);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getCategory = () => {
    axios
      .get("http://localhost:4000/category")
      .then((res) => {
        setCatagories(res.data.categories);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  React.useEffect(function () {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get("http://localhost:4000/users/user", config)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err.response.data);
        setUser([]);
      });
    axios
      .get("http://localhost:4000/shopowners/shopowner", config)
      .then((res) => {
        setShopowner(res.data.user);
      })
      .catch((err) => {
        console.log(err.response.data);
        setShopowner([]);
      });
    axios
      .get("http://localhost:4000/product/cart", config)
      .then((res) => {
        setProducts(res.data.items);

        // console.log("product");
      })
      .catch((err) => {
        console.log(err);
      });
    getCategory();
  }, []);

  // if (pathname === "/user/customer-dashboard") return null;
  // if (pathname === "/user/customer-orders") return null;
  // if (pathname === "/user/edit-profile") return null;
  // if (pathname === "/user/logout") return null;

  return (
    <div classNameName="navbar container">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          // position: "fixed",
          // width: "100%",
          backgroundColor: "#F8FBFE",
        }}
      >
        <Link to="/" className="navbar-brand ml-4">
          {/* <img src="/images/logo.jpg" alt="" width="100" height="40" /> */}
          <div className="text-logo">
            <span className="textlogo">O</span>
            <span className="textlogo">V</span>
            <span className="textlogo">M</span>
          </div>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Catagories
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {catagories?.map((catagory, index) => (
                  <Link
                    to={`/category/${catagory.name}`}
                    key={index}
                    className="dropdown-item"
                  >
                    {catagory.name}
                  </Link>
                ))}
              </div>
            </li>
            <li className="nav-item">
              <Link to="products" className="nav-link">
                Products <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/shops" className="nav-link">
                Shops
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Virtal Tour
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://kuula.co/post/NsNl6/collection/79km6"
                >
                  Ground Floor
                </a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://kuula.co/post/n1/collection/79T5s"
                >
                  First Floor
                </a>
                <a
                  class="dropdown-item"
                  target="_blank"
                  href="https://kuula.co/post/n1/collection/79TlB"
                >
                  Second Floor
                </a>
              </div>
            </li>

            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="row mr-4">
            <div className="icon">
              <Link to="/cart">
                <UilShoppingBag className="icons mt-2" />
              </Link>
            </div>
            {user?.firstName && (
              <div class="nav-item dropdown nav-user">
                <a
                  class="nav-link nav-user-img"
                  href="#"
                  id="navbarDropdownMenuLink2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <UilUserCircle
                    className="icons"
                    style={{ marginLeft: "-8px" }}
                  />
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right nav-user-dropdown"
                  aria-labelledby="navbarDropdownMenuLink2"
                >
                  <div class="nav-user-info">
                    <h5 class="mb-0 text-white nav-user-name">
                      Hi, {user.firstName}
                    </h5>
                  </div>
                  <Link to="user/customer-dashboard" type="submit">
                    <button class="">
                      {" "}
                      <UilUser
                        className="icons"
                        style={{
                          marginTop: "4px",
                          marginRight: "2px",
                          width: "20%",
                        }}
                      />
                      Profile
                    </button>
                  </Link>
                  <br />
                  <Link to="/logout" type="submit" class="">
                    <button class="" onClick={handleLogout}>
                      <UilSignout
                        style={{
                          marginTop: "4px",
                          marginRight: "2px",
                          width: "20%",
                        }}
                        className="icons"
                      />
                      Logout
                    </button>
                  </Link>
                </div>
              </div>
            )}
            {!user?.firstName && !shopowner?.firstName && (
              <Link to="/account" type="submit">
                <button class="btn btn-primary signin ml-2">Sign IN</button>
              </Link>
            )}
            {shopowner?.firstName && (
              <div class="nav-item dropdown nav-user">
                <a
                  class="nav-link nav-user-img"
                  href="#"
                  id="navbarDropdownMenuLink2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <UilUserCircle
                    className="icons"
                    style={{ marginLeft: "-8px" }}
                  />
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right nav-user-dropdown"
                  aria-labelledby="navbarDropdownMenuLink2"
                >
                  <div class="nav-user-info">
                    <h5 class="mb-0 text-white nav-user-name">
                      Hi, {shopowner.firstName}
                    </h5>
                  </div>
                  <Link to="shopowner/shoponwer-dashboard" type="submit">
                    <button class="">
                      {" "}
                      <UilUser
                        className="icons"
                        style={{
                          marginTop: "4px",
                          marginRight: "2px",
                          width: "20%",
                        }}
                      />
                      Profile
                    </button>
                  </Link>
                  <br />
                  <Link to="/logout" type="submit" class="">
                    <button class="" onClick={handleLogout}>
                      <UilSignout
                        style={{
                          marginTop: "4px",
                          marginRight: "2px",
                          width: "20%",
                        }}
                        className="icons"
                      />
                      Logout
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <form className="form-inline">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Shops"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Search>
        </form> */}
      </nav>
    </div>
  );
};

export default Navbar;
