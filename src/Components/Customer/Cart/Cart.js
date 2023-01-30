import React from "react";
import "./CartStyle.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
function Cart() {
  return (
    <div>
      <div class="container">
        <table id="cart" class="table table-hover table-condensed">
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
          <tbody>
            <tr>
              <td data-th="Product">
                <div class="row">
                  <div class="col-sm-10">
                    <h4 class="nomargin">Product 1</h4>
                    <p>
                      Quis aute iure reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor
                      sit amet.
                    </p>
                  </div>
                </div>
              </td>
              <td data-th="Price">$1.99</td>
              <td data-th="Quantity">
                <div class="border p-2 rounded text-center">1</div>
              </td>
              <td data-th="Subtotal" class="text-center">
                1.99
              </td>
              <td class="actions" data-th="">
                <button>
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
                <button>
                  <DeleteForeverOutlinedIcon
                    style={{
                      color: "white",
                      backgroundColor: "#D9534F",
                      padding: "2px",
                      borderRadius: "3px",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                  />
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button class="btn btn-secondary">
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
                  Continue Shopping
                </button>
              </td>
              <td colspan="2" class="hidden-xs"></td>
              <td class="hidden-xs text-center">
                <strong>Total $1.99</strong>
              </td>
              <td>
                <button class="btn btn-primary signin">
                  Continue Shopping{" "}
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
      </div>
    </div>
  );
}

export default Cart;
