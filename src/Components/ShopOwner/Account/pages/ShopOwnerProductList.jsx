// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import Products from "./../../../Customer/Products/Products";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};
const ShopOwnerProductList = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = (id) => {
    // console.log(userID);
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get(`https://red-gorgeous-bandicoot.cyclic.app/shopowners/deleteproduct/${id}`, config)
      .then((user) => {
        setOpen(false);
        fetchProducts();
        // navigate(0);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const fetchProducts = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get("https://red-gorgeous-bandicoot.cyclic.app/shopowners/myproducts", config)
      .then((response) => {
        setUser(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(function () {
    fetchProducts();
  }, []);

  return (
    <div className="text-center ml-5">
      <h5 style={{ display: "inline-block" }}>Total Live Items = &nbsp;</h5>
      <h5 style={{ display: "inline-block" }}>{user.length}</h5>
      <table
        className="table table-hover table-striped"
        style={{ cursor: "pointer" }}
      >
        <thead>
          <tr>
            <th>Sr #</th>
            <th scope="col">Product Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Categorey</th>
            <th scope="col">Color</th>
            <th scope="col">Price</th>
            <th scope="col">Picture</th>
            <th scope="col">SKU</th>
            <th scope="col">Visit</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {user.length > 0 ? (
            user
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.product_name}</td>
                  <td>{item?.product_brand}</td>
                  <td>{item?.category}</td>
                  <td>{item?.product_color}</td>
                  <td>{item?.product_price}</td>
                  <td>
                    {
                      <img
                        src={`https://red-gorgeous-bandicoot.cyclic.app/${item.product_image}`}
                        style={{ height: "3em", marginTop: "-5px" }}
                      />
                    }
                  </td>
                  <td>{item?.product_sku}</td>
                  <td>
                    <button className="buttons btn text-white btn-block btn-primary">
                      <Link
                        to={`../../singleProduct/${item._id}/${item.owner}`}
                        className="text-white"
                      >
                        Visit Product
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button className="buttons btn text-white btn-block btn-primary">
                      <Link
                        to={`/shopowner/edit-profile/${item?._id}`}
                        className="text-white"
                      >
                        Edit
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      className="buttons btn text-white btn-block btn-danger"
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <>
              <h1>No Products</h1>
            </>
          )}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ShopOwnerProductList;
