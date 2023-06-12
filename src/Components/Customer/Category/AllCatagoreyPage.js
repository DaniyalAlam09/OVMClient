import React from "react";
import axios from "axios";
import "./Style.css";
import { map } from "lodash";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

function AllCatagoreyPage() {
  const [catagories, setCatagories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const getCategory = () => {
    axios
      .get("https://red-gorgeous-bandicoot.cyclic.app/category")
      .then((res) => {
        setCatagories(res.data.categories);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(function () {
    getCategory();
  }, []);
  return (
    <Container maxWidth={"md"}>
      <div classame="container">
        <div classame="container mt-100">
          {loading ? (
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
              <div className="row d-flex justify-content-around">
                <div className="col-md-4 mt-1">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                  </Box>
                </div>
                <div className="col-md-4 mt-1">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                  </Box>
                </div>
                <div className="col-md-4 mt-1">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                  </Box>
                </div>
                <div className="col-md-4 mt-4">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                  </Box>
                </div>
                <div className="col-md-4 mt-4">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                  </Box>
                </div>
                <div className="col-md-4 mt-4">
                  <Skeleton variant="rectangular" width={210} height={200} />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton width={210} />
                  </Box>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {catagories?.map((categorey) => (
                <div className="col-md-4 col-sm-6 block">
                  <div key={catagories.indexOf(categorey)}>
                    <Link
                      to={`/category/${categorey.name}`}
                      className="text-dark"
                    >
                      <div
                        className="card card1 mb-30"
                        style={{
                          height: "320px",
                          backgroundColor: " rgba(236, 235, 235, 0.137)",
                        }}
                      >
                        <a class="card-img-tiles" href="#" data-abc="true">
                          <div class="inner" style={{ height: "2px" }}>
                            <div class="main-img">
                              <img
                                src={`https://red-gorgeous-bandicoot.cyclic.app/${categorey.imageUrl}`}
                                alt="Category"
                              />
                            </div>
                            <div class="thumblist">
                              <img
                                src={`https://red-gorgeous-bandicoot.cyclic.app/${categorey.imageUrl}`}
                                alt="Category"
                              />
                              <img
                                src={`https://red-gorgeous-bandicoot.cyclic.app/${categorey.imageUrl}`}
                                alt="Category"
                              />
                            </div>
                          </div>
                        </a>
                        <div class="card-body text-center">
                          <h5 class="card-title">{categorey.name}</h5>
                          {/* <p class="text-muted">Starting from $499</p> */}
                          <button class="buttons btn text-white btn-block btn-primary">
                            View Products
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default AllCatagoreyPage;
