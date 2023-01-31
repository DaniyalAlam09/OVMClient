import React from "react";
import privacy from "../Images/Privacy.svg";
import { Typography } from "@mui/material";

function Privacy() {
  return (
    <div className="container text-center" style={{ width: "50%" }}>
      <img src={privacy} />
      <h6>OVM PRIVACY POLICY</h6>
      <h4 className="text-justify">
        When you use our services, you’re trusting us with your information. We
        understand this is a big responsibility and work hard to protect your
        information and put you in control.
      </h4>
      <p className="font-italic">
        This Privacy Policy is meant to help you understand what information we
        collect, why we collect it, and how you can update, manage, export, and
        delete your information
      </p>
      <Typography
        padding={4}
        sx={{ padding: { xs: 2, md: 4 }, textAlign: "justify" }}
        style={{ whiteSpace: "pre-line" }}
      >
        At OVM, we are committed to protecting the privacy and security of our
        customers' personal information. We collect only the information
        necessary to provide our services, such as name, contact information,
        and payment details. This information is used to process transactions,
        fulfill orders, and improve our customer experience. We implement strict
        security measures to protect this information and do not share it with
        third parties except as required by law. We also give our customers the
        option to opt-out of receiving communications from us. If you have any
        questions or concerns about our privacy policy, please do not hesitate
        to contact us.
      </Typography>
    </div>
  );
}

export default Privacy;
