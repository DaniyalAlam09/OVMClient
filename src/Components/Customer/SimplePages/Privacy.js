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
        We build a range of services that help millions of people daily to
        explore and interact with the world in new ways. Our services include:
        Google apps, sites, and devices, like Search, YouTube, and Google Home
        Platforms like the Chrome browser and Android operating system Products
        that are integrated into third-party apps and sites, like ads,
        analytics, and embedded Google Maps You can use our services in a
        variety of ways to manage your privacy. For example, you can sign up for
        a Google Account if you want to create and manage content like emails
        and photos, or see more relevant search results. And you can use many
        Google services when you’re signed out or without creating an account at
        all, like searching on Google or watching YouTube videos. You can also
        choose to browse the web in a private mode, like Chrome Incognito mode.
        And across our services, you can adjust your privacy settings to control
        what we collect and how your information is used. To help explain things
        as clearly as possible, we’ve added examples, explanatory videos, and
        definitions for key terms. And if you have any questions about this
        Privacy Policy, you can contact us
      </Typography>
    </div>
  );
}

export default Privacy;
