import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import verify from "./Account/Assests/Verify.png";
import "./Verify.css";
// import { Fragment } from "react/cjs/react.production.min";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://red-gorgeous-bandicoot.cyclic.app/shopowners/${param.id}/verify/${param.tokenverify}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error.response.data);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <div style={{ marginBottom: "50px" }}>
      {validUrl ? (
        <div className="container">
          <img src={verify} alt="success_img" />
          <div className="row">
            <h1>Email verified successfully</h1>
            <Link to="/login">
              <button className="green_btn">Login</button>
            </Link>
          </div>
        </div>
      ) : (
        <h1>Session Out</h1>
      )}
    </div>
  );
};

export default EmailVerify;
