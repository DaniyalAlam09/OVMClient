import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import warning from "../Assests//Warning.png";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get("https://red-gorgeous-bandicoot.cyclic.app/users/logout", config)
      .then((response) => {
        console.log(response.data);

        navigate("../../account");
        navigate(0);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="  d-flex " style={{ width: "100%", marginLeft: "10em" }}>
      <div>
        <img
          src={warning}
          style={{
            height: "200px",
            // width: "200px",
            marginBottom: "50px",
          }}
          class="product-image"
          alt="Warning"
        />
        <h6 style={{ marginBottom: "30px" }}>Are You Sure To Logout?</h6>
        <button
          className="buttons btn text-white btn-block"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
