import React from "react";
import "./styles.scss";

const MyFooter = () => {
  return (
    <div>
      <div
        className="d-flex justify-content-between mx-auto"
        style={{ width: "85%", backgroundColor: "transparent" }}
      >
        <div className="">
          <h1 className="footerHeading">
            2022© <a className="footerHeadingLink">Kairos</a> Version
            20220921-104033
          </h1>
        </div>
        <div className=" text-end">
          <a
            className="footerLink"
            href="https://kairossolutions.co/about-us/"
            target="_blank"
          >
            About
          </a>
          <a
            className="footerLink"
            href="https://kairossolutions.co/"
            target="_blank"
          >
            Team
          </a>
          <a
            className="footerLink"
            href="https://kairossolutions.co/contact-us/"
            target="_blank"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
};
export default MyFooter;
