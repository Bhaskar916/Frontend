import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Grid,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Paper,
    Modal,
    Snackbar,
  } from "@material-ui/core";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import headerCurve from '../../../assets/images/header-curve.webp'; // Adjust the path as needed
import clientLogo from '../../../assets/images/client_logo.png'; // Adjust the path as needed
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Constants from "../Constants";
import { useNavigate } from "react-router-dom";
import commonStyles from "../common-css/CommonStyle";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HeadsetIcon from "@material-ui/icons/Headset";
import HelpIcon from "@material-ui/icons/Help";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { NavLink, Redirect } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

import DateFnsUtils from "@date-io/date-fns";
import { Context } from "../UserAuth";
import AuthService from "../../services/AuthService";
import Logo from "../../../assets/images/logo.png";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

const Header = () => {
  useEffect(() => {
    const createStyleSheet = () => {
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(styles));
      document.head.appendChild(style);
    };

    createStyleSheet();
  }, []);
  const commonClasses = commonStyles();
  const history = useNavigate();

  const [user, setUser] = useContext(Context);
  var userName = "Hello,";
  var userId = "";
  var resourceId = "";
  if (user.isLogin) {
    userName = userName + " " + user.userData.resourceName;
    userId = user.userData.userID;
    resourceId = user.userData.resourceID;
  }

  const [openModal, setOpenModal] = React.useState(false);

  const [openClosureModal, setOpenClosureModal] = React.useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [applicationName, setApplicationName] = React.useState(
    "Select Application Name"
  );
  const [applicationNameError, setApplicationNameError] = React.useState(false);

  const [applicationNameList, setApplicationNameList] = React.useState([]);

  const [issueTime, setIssueTime] = React.useState(new Date());
  const [issueErrorTime, setIssueTimeError] = React.useState(false);

  const [issueRaisedByID, setissueRaisedByID] = React.useState("");
  const [issueRaisedBy, setIssueRaisedBy] = React.useState("");
  const [IssueRaisedByError, setIssueRaisedByError] = React.useState(false);
  const [IssueRaisedByErrorMsg, setIssueRaisedByErrorMsg] = React.useState("");

  const [emailID, setEmailID] = React.useState("");
  const [EmailIDError, setEmailIDError] = React.useState(false);
  const [EmailIDErrorMsg, setEmailIDErrorMsg] = React.useState("");

  const [contactNumber, setcontactNumber] = React.useState("");
  const [contactNumberError, setcontactNumberError] = React.useState(false);
  const [contactNumberErrorMsg, setcontactNumberErrorMsg] = React.useState("");

  const [issueDescription, setIssueDescription] = React.useState("");
  const [issueDescriptionError, setIssueDescriptionError] =
    React.useState(false);
  const [issueDescriptionErrorMsg, setIssueDescriptionErrorMsg] =
    React.useState(false);

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const [alertSeverity, setAlertSeverity] = React.useState("warning");

  const [openProfile, setOpenProfile] = React.useState(false);

  const [formHeaderText, setFormHeaderText] = React.useState("Onboard Client");
  const [submitBtText, setSubmitBtText] = React.useState("Raise Alarm");

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => 
    {
      console.log("working");
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.sessionStorage.setItem("avekshaaeasySWATUser", "");
    setUser({
      isLogin: false,
      userData: {},
    });
    history(Constants.LOGIN_LINK);
    setOpen(false);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ zIndex: 1, top:'60px'}}
    >
      <List className={commonClasses.sideMenuList}>
        <ListItemButton
          className={commonClasses.sideMenuListItemButton}
          sx={{ pl: 3 }}
          onClick={() => {
            history(Constants.SETTINGS_LINK);
          }}
        >
          {/* <MenuItem onClick={handleMenuClose}> */}
          <ListItemIcon>
            <SettingsIcon
              className={commonClasses.sideMenuListItemIcon}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText
            className={commonClasses.profMenuListItemLonText}
            disableTypography={true}
            primary={Constants.SETTINGS}
          />
          {/* </MenuItem> */}
        </ListItemButton>

        <ListItemButton
          className={commonClasses.sideMenuListItemButton}
          onClick={() => {history(Constants.SUPPORT_LINK);}}
        >
          <ListItemIcon>
            <HeadsetIcon
              className={commonClasses.sideMenuListItemIcon}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText
            className={commonClasses.profMenuListItemLonText}
            disableTypography={true}
            primary={Constants.SUPPORT}
          />
        </ListItemButton>

        <ListItemButton
          className={commonClasses.sideMenuListItemButton}
          sx={{ pl: 3 }}
          onClick={() => {
            history(Constants.MY_PROFILE_LINK);
          }}
        >
          {/* <MenuItem onClick={handleMenuClose} > */}
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              className={commonClasses.sideMenuListItemIcon}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText
            className={commonClasses.profMenuListItemLonText}
            disableTypography={true}
            primary={Constants.MY_PROFILE}
          />
          {/* </MenuItem> */}
        </ListItemButton>
        
        <ListItemButton
          className={commonClasses.sideMenuListItemButton}
          sx={{ pl: 3 }}
          onClick={() => {history(Constants.HELP_LINK);}}
        >
          {/* <MenuItem onClick={handleMenuClose}> */}
          <ListItemIcon>
            <HelpIcon
              className={commonClasses.sideMenuListItemIcon}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText
            className={commonClasses.profMenuListItemLonText}
            disableTypography={true}
            primary={Constants.HELP}
          />
          {/* </MenuItem> */}
        </ListItemButton>
        <ListItemButton
          className={commonClasses.sideMenuListItemButton}
          sx={{ pl: 3 }}
          onClick={() => {}}
        >
          {/* <MenuItem onClick={handleMenuClose}> */}
          <ListItemIcon>
            <CreditScoreOutlinedIcon
              className={commonClasses.sideMenuListItemIcon}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText
            className={commonClasses.profMenuListItemLonText}
            disableTypography={true}
            primary={Constants.LICENSE_INFO}
          />
          {/* </MenuItem> */}
        </ListItemButton>
        <ListItemButton
          className={commonClasses.sideMenuListItemButton}
          sx={{ pl: 3 }}
          onClick={() => {
            history(Constants.CHANGE_PASSWORD_LINK);
          }}
        >
          {/* <MenuItem onClick={handleMenuClose}> */}
          <ListItemIcon>
            <LockResetOutlinedIcon
              className={commonClasses.sideMenuListItemIcon}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText
            className={commonClasses.profMenuListItemLonText}
            disableTypography={true}
            primary={Constants.CHANGE_PASSWORD}
          />
          {/* </MenuItem> */}
        </ListItemButton>
        {/* <NavLink to={Constants.LICENSE_INFO_LINK} style={{ textDecoration: 'none' }} className={commonClasses.textDecorations}>
                <MenuItem onClick={handleMenuClose}>
                    <BusinessCenterIcon />&nbsp;&nbsp;{Constants.LICENSE_INFO}
                </MenuItem>
            </NavLink> */}
        <ListItemButton
          className={commonClasses.sideMenuListItemButton}
          sx={{ pl: 3 }}
          onClick={logout}
        >
          {/* <MenuItem onClick={logout}> */}
          <ListItemIcon>
            <LogoutOutlinedIcon
              className={commonClasses.sideMenuListItemIcon}
              fontSize="small"
            />
          </ListItemIcon>
          <ListItemText
            className={commonClasses.profMenuListItemLonText}
            disableTypography={true}
            primary={Constants.LOGOUT}
          />
          {/* </MenuItem> */}
        </ListItemButton>
      </List>
    </Menu>
  );

  useEffect(() => {
    AuthService.getAppDropDown().then((response) => {
      setApplicationNameList(response);
    });
  }, []);

  const resetField = () => {
    setApplicationName("Select Application Name");
    setIssueTime(new Date());
    setIssueTimeError(false);
    setIssueRaisedBy("");
    setIssueRaisedByError(false);
    setEmailID("");
    setEmailIDError(false);
    setcontactNumber("");
    setcontactNumberError(false);
    setIssueDescription("");
    setIssueDescriptionError(false);
    setFormHeaderText("Raise Alarm");
    setSubmitBtText("Raise Alarm");
  };

  const validateForm = () => {
    let tempIssueTime = new Date(issueTime).getTime();
    if (issueRaisedBy === "") {
      setIssueRaisedByError(true);
      setIssueRaisedByError("Please Enter Name");
      setError(true);
      setErrorMsg("Please Enter Name");
    } else if (applicationName === "Select Application Name") {
      setApplicationNameError(true);
      setError(true);
      setErrorMsg("Please Select Application Name");
    } else if (tempIssueTime !== new Date(issueTime).getTime()) {
      setIssueTimeError(true);
      setError(true);
      setErrorMsg(
        "Please Select Issue Time. (Format : DD/MM/YYYY, Ex : 01/01/2021 12:00 PM)"
      );
    } else if (emailID === "") {
      setEmailIDError(true);
      setEmailIDErrorMsg("Please Enter Email ID");
      setError(true);
      setErrorMsg("Please Enter Email ID");
    } else if (
      !/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}[, \n]*)+$/.test(emailID)
    ) {
      setEmailIDError(true);
      setEmailIDErrorMsg(
        "Please enter correct email ID.Eg : Example@domain.com"
      );
      setError(true);
      setErrorMsg("Please enter correct email ID.Eg : Example@domain.com");
    } else if (contactNumber === "") {
      setcontactNumberError(true);
      setcontactNumberErrorMsg("Please Enter Contact Number");
      setError(true);
      setErrorMsg("Please Enter Contact Number");
    } else if (
      !/^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})+$/.test(contactNumber)
    ) {
      setcontactNumberError(true);
      setcontactNumberErrorMsg("Please enter correct contact Number");
      setError(true);
      setErrorMsg("Please enter correct contact Number");
    } else if (issueDescription === "") {
      issueDescriptionError(true);
      issueDescriptionErrorMsg("Please Enter Brief About Issue Raised");
      setError(true);
      setErrorMsg("Please Enter Brief About Issue Raised");
    } else {
      let formData = {
        applicationName: applicationName.split("::")[1],
        issueTime: issueTime,
        issueRaisedBy: issueRaisedBy,
        emailID: emailID,
        contactNumber: contactNumber,
        issueDescribe: issueDescription,
      };
      AuthService.raiseAlarm(formData).then((response) => {
        if (response === "Successful") {
          setAlertSeverity("success");
          setError(true);
          setErrorMsg("Alarm Raised Successfully");
          resetField();
        }
        else {
          setError(true);
          setErrorMsg("Error while Raising the alarm");
        }

      });
    }
  };


  return (
           <div>
             {user.isLogin ? (
              <>
      <div className="top-header">
        <div className="top-header-content">
        </div>
      </div>

      <div className="bottom-header">
        <div className="logo-container">
          <div className="logo">
            <img src={clientLogo} alt="Client Logo" />
          </div>
          <div className="curve">
            <img src={headerCurve} alt="Curve" />
          </div>
          <nav className="navbar">
  <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', color: 'black', marginLeft: '60px' }}>
    <List className={commonClasses.sideMenuList} style={{ display: 'flex' }}>
      <ListItemButton
        className={commonClasses.sideMenuListItemButton}
        onClick={() => { history(Constants.DASHBOARD_LINK); }}
        style={{ backgroundColor: 'transparent', color: 'black', textDecoration: 'none', fontWeight: 'bold' }}
      >
        <ListItemIcon style={{ marginRight: '-30px', backgroundColor: 'transparent', color: 'black' }}>
        </ListItemIcon>
        <ListItemText
          className={commonClasses.MenuListItemText}
          disableTypography={true}
          primary={Constants.DASHBOARD}
          style={{ fontWeight: 'bold', fontFamily: 'Lato,sans-serif', fontSize: '12px' }}
        />
      </ListItemButton>
      <ListItemButton
        className={commonClasses.sideMenuListItemButton}
        onClick={() => { history(Constants.ONBOARD_USER_LINK); }}
        style={{ backgroundColor: 'transparent', color: 'black', textDecoration: 'none', fontWeight: 'bold' }}
      >
        <ListItemIcon style={{ marginRight: '-30px', backgroundColor: 'transparent', color: 'black' }}>
        </ListItemIcon>
        <ListItemText
          className={commonClasses.MenuListItemText}
          disableTypography={true}
          primary={Constants.ONBOARD_USER}
          style={{ fontWeight: 'bold', fontFamily: 'Lato,sans-serif', fontSize: '12px' }}
        />
      </ListItemButton>
    </List>
  </div>
  <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', color: 'black' }}> {/* Set color to black */}
    <div style={{ fontFamily: 'Lato,sans-serif', fontSize: '12px',fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'black', marginTop:'-25px' }}> {/* Ensure username is black */}
      {userName} 
    </div>
    <Tooltip title="Profile Menu">
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
      >
        <AccountCircle fontSize="large" style={{ color: 'black',marginRight:'20px', marginTop:'-25px' }} />
      </IconButton>
    </Tooltip>
  </div>
</nav>
</div>
{/* {renderMobileMenu} */}
         {renderMenu}

      </div>

</>                 ) : null}
                   </div>
               );  
             }

const styles = `
  header {
  display: flex;
  flex-direction: column; /* Stack sections vertically */
  position: sticky;      /* Make the header sticky */
  top: 0;                /* Position it at the top of the viewport */
  background-color: white; /* Optional: background color for better visibility */
  z-index: 1000;        /* Optional: ensure it sits above other elements */
}


  .top-header {
    background-color: #97144D; /* Burgundy color */
    height: 29px; /* Height of the top header */
    width: 100%; /* Full width */
    display: flex; /* Flex container */
    align-items: center; /* Center items vertically */
    padding-left: 40px; /* Left padding */
    color: white; /* White text color */
  }

  .top-header-content {
    display: flex;
    gap: 20px; /* Space between header details */
  }

  .bottom-header {
    background-color: #97144D; /* Burgundy color */
    display: flex; /* Flex container */
    align-items: center; /* Center items vertically */
  }

  .logo-container {
    display: flex; /* Flex container */
    align-items: center; /* Center items vertically */
    margin-left: 50px; /* Margin left for bottom header */
    width: 100%; /* Full width for bottom header */
  }

  .logo img {
    height: 40px; /* Adjust logo height */
    filter: brightness(0) invert(1);
    margin-left: 35px;
  padding-bottom: 20px;
  }

  .curve img {
    height: 62px; /* Adjust height of the curve image */
    margin-left: 29px; /* Gap between logo and curve */
    margin-bottom: -6px;
  }

  .navbar {
    display: flex; /* Flex container for navbar */
    background-color: white; /* Set background color of navbar to white */
    padding: 10px 0; /* Add padding to the navbar */
    width: 100%;
    height: 60px;
    margin-bottom: -20px;    

  }

  .navbar ul {
    list-style: none; /* Remove default list styles */
    margin: 0; /* Remove default margins */
    padding: 0; /* Remove default padding */
    display: flex; /* Display items in a row */
    gap: 20px; /* Space between menu items */
  }

  .navbar a {
    color: black; /* Black text color */
    text-decoration: none; /* Remove underline */
    font-weight: bold; /* Bold text */
    transition: color 0.3s; /* Smooth color transition */
  }

  .navbar a:hover {
    color: #555; /* Slightly darker shade on hover */
  }
`;
export default Header;
