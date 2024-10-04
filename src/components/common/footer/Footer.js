/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import commonStyles from "../common-css/CommonStyle";
import { Link } from "@material-ui/core";
import AuthService from "../../services/AuthService";
import avekshaaLogo from "../../../assets/images/avekshaa_name_logo.png";

var grayFooterBar = {
  backgroundColor: "#4B4B4B",
      width: "100%",
  height: "40px",
  position: "fixed",       // Make the footer sticky
  bottom: "0",             // Stick it to the bottom of the viewport
  left: "0",
  zIndex: "1000",          // Ensure it stays above the content
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderTop: "1px solid #cbd5e1",
};

var footerBar = {
  backgroundColor: "#4B4B4B",
  width: "100%",
  height: "60px",
  justifyContent: "center",
};

export default function Footer(props) {
  const commonClasses = commonStyles();

  const [version, setVersion] = React.useState("");

  const [footerStyle, setFooterStyle] = React.useState({});

  useEffect(() => {
    AuthService.getVersion().then((response) => {
      setVersion(response.version);
    });
    if (
      props &&
      props !== null &&
      props.pageName &&
      props.pageName !== null &&
      props.pageName === "loginPage"
    )
      setFooterStyle(footerBar);
    else setFooterStyle(grayFooterBar);
  }, []);
  return (
    <div style={footerStyle}>
      <div
        style={{
          display: "inline-block",
          lineHeight: "40px",
          width: "50%",
          textAlign: "right",
          fontSize: "12px",
        }}
      >
        Powered By
        <Link color="inherit" href="https://www.avekshaa.com/">
          <img
            alt="App Logo"
            height={20}
            width={102}
            className={commonClasses.footerAppLogo}
            src={avekshaaLogo}
          />
        </Link>
      </div>
      <div
        style={{
          display: "inline-block",
          lineHeight: "40px",
          width: "2%",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        {" "}
        |{" "}
      </div>
      <div
        style={{
          display: "inline-block",
          lineHeight: "40px",
          width: "38%",
          textAlign: "left",
          fontSize: "12px",
        }}
      >
        {version}
      </div>
    </div>
  );
}
