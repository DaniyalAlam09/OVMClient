import "./Style.css";
import { Container } from "@material-ui/core";
import hero from "../Customer/HomePage/assets/img/clients/client-1.png";

import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./ShopStyle.css";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import { slice } from "lodash";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
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

function AllBrandPage() {
  const [brands, setBrands] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [index, setIndex] = useState(12);
  const [isCompleted, setIsCompleted] = useState(false);
  const [search, setSearch] = useState("");
  const initialPosts = slice(brands, 0, index);
  const getBrand = () => {
    axios
      .get("https://red-gorgeous-bandicoot.cyclic.app/brand")
      .then((res) => {
        setBrands(res.data.brand);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loadMore = () => {
    setIndex(index + 8);
    if (index >= brands.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  React.useEffect(function () {
    getBrand();
  }, []);
  return (
    <Container maxWidth={"md"} className="mb-5 mt-5">
      <div class=" container d-flex justify-content-center">
        <div className="">
          <Box>
            <Toolbar>
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
      {loading ? (
        <>
          <div className="row d-flex justify-content-around mt-4">
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
            <div className="col-md-3 mt-1">
              <Skeleton
                variant="rectangular"
                width={210}
                height={150}
                className="rounded"
              />
            </div>
          </div>
          <div className="row d-flex justify-content-around mt-4">
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
            <div className="col-md-3 mt-1">
              <Skeleton
                variant="rectangular"
                width={210}
                height={150}
                className="rounded"
              />
            </div>
          </div>
          <div className="row d-flex justify-content-around mt-4">
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
            <div className="col-md-3 mt-1">
              <Skeleton
                variant="rectangular"
                width={210}
                height={150}
                className="rounded"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="container ">
          <div className="container mt-100">
            <div className="row">
              {initialPosts
                ?.filter((person) => {
                  if (search == "") {
                    return person;
                  } else if (
                    person.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return person;
                  }
                })
                ?.map((brand) => (
                  <div className="col-md-3 col-sm-6 ">
                    <div key={brands.indexOf(brand)}>
                      <Link to={`/brand/${brand.name}`}>
                        <div
                          className="card card1 mb-10 block align-items-center justify-content-center"
                          style={{
                            height: "150px",
                            backgroundColor: " rgba(236, 235, 235, 0.137)",
                          }}
                        >
                          <a class="card-img-tiles" href="#" data-abc="true">
                            <div class="inner" style={{ height: "1px" }}>
                              <div class="main-img ">
                                <img
                                  src={`https://red-gorgeous-bandicoot.cyclic.app/${brand.imageUrl}`}
                                  style={{
                                    height: "70px",
                                    width: "70px",
                                    cursor: "pointer",
                                    objectFit: "contain",
                                    marginTop: "-25px",
                                  }}
                                  // src={hero}
                                  alt="Category"
                                />
                              </div>
                            </div>
                          </a>
                          <div class="mt-3 text-center">
                            <h6 class="card-title">{brand.name}</h6>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="d-grid mt-3 mb-5 mt-4">
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
        </div>
      )}
    </Container>
  );
}

export default AllBrandPage;
