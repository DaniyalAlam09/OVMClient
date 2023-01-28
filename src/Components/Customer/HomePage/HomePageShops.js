// import React from "react";
// import { useState } from "react";
import HeadPhone from "../Images/HeadPhone.png";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { slice } from "lodash";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import VerifiedIcon from "@mui/icons-material/Verified";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
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
function Shops() {
  const [user, setUser] = useState("");
  const [floorOne, setFloorOne] = useState("");
  const [index, setIndex] = useState(8);
  const [isCompleted, setIsCompleted] = useState(false);
  const [search, setSearch] = useState("");
  const initialPosts = slice(user, 0, index);
  const [selectValue, setSelectValue] = React.useState("");
  const onChange = (event) => {
    const value = event.target.value;
    setSelectValue(value);
    console.log(value);

    const floor = user?.filter((auto) => auto.floor == value);
    console.log(floor);
    setUser(floor);
  };
  useEffect(() => {
    fetch("http://localhost:4000/admins/viewshopowners")
      .then((response) => response.json())
      .then((actualData) => {
        // window.scrollTo(0, 0);
        setUser(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const loadMore = () => {
    setIndex(index + 8);
    if (index >= user.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  const sortAlpha = () => {
    // console.log("dfj");
    // user.floor == 1;
    console.log(user.sort((a, b) => a.shopName - b.shopName));
    setUser(user.sort((a, b) => a.shopName - b.shopName));
  };
  const verified = () => {
    const verify = user?.filter((auto) => auto.verified == true);
    console.log(verify);
    setUser(verify);
  };
  const firstFloor = () => {
    const floor = user?.filter((auto) => auto.floor == selectValue);
    console.log(floor);
    setUser(floor);
  };
  const secondFloor = () => {
    const floor = user?.filter((auto) => auto.floor == 2);
    console.log(floor);
    setUser(floor);
  };
  const thirdFloor = () => {
    const floor = user?.filter((auto) => auto.floor == 3);
    console.log(floor);
    setUser(floor);
  };
  const fourthFloor = () => {
    const floor = user?.filter((auto) => auto.floor == 4);
    console.log(floor);
    setUser(floor);
  };

  return (
    <Stack className="heading container " spacing={2}>
      <div className="featured-head">
        <h3>Shops</h3>
        <Link to="/shops" class="link-secondary see-all">
          All Shops
        </Link>
      </div>
      <div class=" container d-flex justify-content-center"></div>

      <div className="container products ">
        <div className="row text-center justify-content-start">
          {Object.values(initialPosts)
            .slice(0, 4)

            .map((elem) => (
              <div
                key={user.indexOf(elem)}
                className="block col-xl-3 col-sm-6 mb-5"
              >
                <Link to={`/singleshop/${elem._id}/${elem.shopName}`}>
                  <img
                    className=" rounded product-image"
                    style={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={`http://localhost:4000${elem.shopImage}`}
                  />
                  {elem?.verified === true && (
                    <Tooltip
                      title="Verified"
                      style={{
                        color: "#1C99E6",
                        fontSize: "25px",
                        position: "absolute",
                        top: "25px",
                        left: "190px",
                      }}
                    >
                      {/* <IconButton> */}
                      <VerifiedIcon />
                      {/* </IconButton> */}
                    </Tooltip>
                  )}
                  <p className="brand-name" style={{ marginTop: "-4px" }}>
                    Shop no {`${elem.shopNo}`}
                  </p>

                  <p className="product-name">{`${elem.shopName}`} </p>
                  <></>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Stack>
  );
}
export default Shops;
