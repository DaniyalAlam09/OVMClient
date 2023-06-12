// import React from "react";
// import { useState } from "react";
import HeadPhone from "../Images/HeadPhone.png";
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
import "./ShopStyle.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { slice } from "lodash";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import VerifiedIcon from "@mui/icons-material/Verified";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";

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
  const [loading, setLoading] = React.useState(true);
  const onChange = (event) => {
    const value = event.target.value;
    setSelectValue(value);
    console.log(value);

    const floor = user?.filter((auto) => auto.floor == value);
    console.log(floor);
    setUser(floor);
  };
  useEffect(() => {
    fetchShops();
  }, []);
  const fetchShops = () => {
    fetch("https://red-gorgeous-bandicoot.cyclic.app/admins/viewshopowners")
      .then((response) => response.json())
      .then((actualData) => {
        // window.scrollTo(0, 0);
        setLoading(false);
        setUser(actualData);
        onChange();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
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
    <Stack className="container heading " spacing={2}>
      <div className=" d-flex justify-content-center">
        <h1 style={{ marginTop: "-40px" }}>All Shops</h1>
      </div>
      <div class=" container d-flex justify-content-center">
        <div className="">
          <Box>
            <Toolbar>
              <span class="mr-md-auto" style={{ width: "90px" }}>
                <strong>
                  {" "}
                  <CountUp end={user.length} duration={1} />
                </strong>{" "}
                Shops
              </span>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </Search>
            </Toolbar>
          </Box>
        </div>
      </div>
      <div className=" container d-flex justify-content-between mb-4">
        <button
          className="btn btn-primary signin mt-3 ml-5"
          style={{ height: "40px" }}
          onClick={verified}
        >
          Verified Shops
        </button>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Floor</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            // value={age}
            onChange={onChange}
            label="Floor"
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        <button
          className="btn  mt-3 "
          style={{ height: "40px", backgroundColor: "black", color: "white" }}
          onClick={fetchShops}
        >
          Clear All Filters
        </button>
      </div>
      {loading ? (
        <div className="row d-flex justify-content-around mt-4 mb-5">
          <div className="col-md-3 mt-1">
            <Skeleton
              variant="rectangular"
              width={210}
              height={150}
              className="rounded "
            />
          </div>
          <div className="col-md-3 mt-1">
            <Skeleton
              variant="rectangular"
              width={210}
              height={150}
              className="rounded"
            />
          </div>
          <div className="col-md-3 mt-1">
            <Skeleton
              variant="rectangular"
              width={210}
              height={150}
              className="rounded"
            />
          </div>
          <div className="col-md-3 mt-1">
            <Skeleton
              variant="rectangular"
              width={210}
              height={150}
              className="rounded"
            />
          </div>
          <div className="col-md-3 mt-3">
            <Skeleton
              variant="rectangular"
              width={210}
              height={150}
              className="rounded"
            />
          </div>
          <div className="col-md-3 mt-3">
            <Skeleton
              variant="rectangular"
              width={210}
              height={150}
              className="rounded"
            />
          </div>
          <div className="col-md-3 mt-3">
            <Skeleton
              variant="rectangular"
              width={210}
              height={150}
              className="rounded"
            />
          </div>
          <div className="col-md-3 mt-3">
            <Skeleton
              variant="rectangular"
              width={210}
              height={150}
              className="rounded"
            />
          </div>
        </div>
      ) : (
        <div className="container products ">
          <div className="row text-center justify-content-start">
            {Object.values(initialPosts)
              // .slice(0, 8)

              .filter((person) => {
                if (search == "") {
                  return person;
                } else if (
                  person.shopName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return person;
                }
              })
              .map((elem) => (
                <div
                  key={user.indexOf(elem)}
                  className=" col-xl-3 col-sm-6 mb-5 block"
                >
                  <Link to={`/singleshop/${elem._id}/${elem.shopName}`}>
                    <img
                      className=" rounded product-image"
                      style={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "contain",
                      }}
                      src={`https://red-gorgeous-bandicoot.cyclic.app${elem.shopImage}`}
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
                    <p className="brand-name">Shop no {`${elem.shopNo}`}</p>

                    <p className="product-name">{`${elem.shopName}`}</p>
                  </Link>
                </div>
              ))}
          </div>
          {user.length >= 8 && (
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
      )}
    </Stack>
  );
}
export default Shops;
