// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../UserAuth";
// import Grid from "@mui/material/Grid";
// import AuthService from "../../services/AuthService";
// import Footer from "../footer/Footer";
// import Snackbar from "@material-ui/core/Snackbar";
// import Logo from "../../../assets/images/logo.png";
// import commonStyles from "../common-css/CommonStyle";
// import Constants from "../Constants";
// import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router";
// import Alert from "@mui/material/Alert";
// import image from "../../../assets/images/image.png";


// const Login = () => {
//   const [activeTab, setActiveTab] = useState('existingUser'); // Manage active tab

//   const commonClasses = commonStyles();
//   const history = useNavigate();

//   const [user, setUser] = useContext(Context);

//   const [email, setEmail] = React.useState("");
//   const [emailError, setEmailError] = React.useState(false);
//   const [password, setPassword] = React.useState("");
//   const [passwordError, setPasswordError] = React.useState(false);
//   const [error, setError] = React.useState(false);
//   const [errorMsg, setErrorMsg] = React.useState("");

//   const styles = {
//     container: {
//       display: 'flex',
//       justifyContent: 'center', // Center the container horizontally
//       alignItems: 'center', // Center the container vertically
//       width: '100%', // Full width of the viewport
//       height: '100vh',
//       backgroundColor: '#f5f5f5', // Light background color for contrast
//     },
//     innerContainer: {
//       display: 'flex',
//       width: '80%', // Set the inner container to 80% of the viewport width
//       maxWidth: '1200px', // Optional: maximum width to prevent it from becoming too wide on large screens
//       borderRadius: '8px',
//       overflow: 'hidden', // Prevent overflow if needed
//       boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Optional: add shadow for better visibility
//     },
//     leftSection: {
//       width: '50%',
//       padding: '30px',
//       display: 'flex',
//       flexDirection: 'column',
//       backgroundColor: '#fff', // White background for the left section
//     },
//     rightSection: {
//       width: '50%',
//       position: 'relative',
//       backgroundColor: '#96023d',
//     },
//     rightImage: {
//       maxWidth: '100%',
//       height: 'auto',
//     },
//     closeButton: {
//       position: 'absolute',
//       top: '20px',
//       right: '20px',
//       background: 'none',
//       border: 'none',
//       cursor: 'pointer',
//     },
//     tabs: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       marginBottom: '20px',
//       borderBottom: '2px solid #ccc',
//     },
//     activeTab: {
//       padding: '10px',
//       borderBottom: '2px solid #000',
//       cursor: 'pointer',
//       color: '#000',
//     },
//     inactiveTab: {
//       padding: '10px',
//       cursor: 'pointer',
//       color: '#888',
//     },
//     form: {
//       paddingTop: '20px',
//     },
//     headingText: {
//       fontSize: '22px',
//       marginBottom: '20px',
//       color: '#000',
//     },
//     radioButtons: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       marginBottom: '15px',
//     },
//     radioOption: {
//       display: 'flex',
//       alignItems: 'center',
//     },
//     inputField: {
//       width: '100%',
//       padding: '10px',
//       fontSize: '16px',
//       border: '1px solid #ccc',
//       borderRadius: '4px',
//       marginBottom: '15px',
//     },
//     generateOtpBtn: {
//       width: '100%',
//       padding: '10px',
//       backgroundColor: '#c29fa1', // Disabled button color
//       border: 'none',
//       borderRadius: '4px',
//       fontSize: '16px',
//       color: '#fff',
//       cursor: 'pointer',
//     },
//     lockedUser: {
//       textAlign: 'center',
//       marginTop: '15px',
//     },
//     lockedUserLink: {
//       color: '#96023d',
//       cursor: 'pointer',
//       textDecoration: 'none',
//     },
//     registerSection: {
//       textAlign: 'center',
//       marginTop: '20px',
//     },
//     registerLink: {
//       color: '#96023d',
//       cursor: 'pointer',
//       textDecoration: 'none',
//     },
//   };

//   useEffect(() => {
//     document.title = "Login | AmfFileUploader";
//   }, []);

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setErrorMsg("");
//     setError(false);
//   };

//   const submitBtn = () => {
//     if (email === "") {
//       setError(true);
//       setErrorMsg("Please Enter Email Address");
//       setEmailError(true);
//     } else if (password === "") {
//       setError(true);
//       setErrorMsg("Please Enter Password");
//       setPasswordError(true);
//     } else if (
//       !/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}[, \n]*)+$/.test(email)
//     ) {
//       setError(true);
//       setErrorMsg("Please enter correct email ID.Eg : Example@domain.com");
//       setEmailError(true);
//     } else if (password.length < 8) {
//       setError(true);
//       setErrorMsg("Password must contain a minimum of 8 characters");
//       setPasswordError(true);
//     } else {
//       console.log(email);
//       AuthService.userLogin(email, password)
//         .then((response) => {
//           console.log(response);
//           if (
//             response &&
//             response.token &&
//             response.token !== "" &&
//             response.userID &&
//             response.userID !== "" &&
//             response.resourceID &&
//             response.resourceID !== ""
//           ) {
//             window.sessionStorage.setItem(
//               "avekshaaeasySWATUser",
//               JSON.stringify(response)
//             );
//             window.sessionStorage.setItem(
//               "avekshaaeasySWATToken",
//               response.token
//             );
//             window.sessionStorage.setItem(
//               "isConnected",
//                "false"
//             );
//             setUser({
//               isLogin: true,
//               userData: response,
//             });
//             history(Constants.DASHBOARD_LINK);
//           } else {
//             setError(true);
//             setErrorMsg(response.error);
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//           setError(true);
//           setErrorMsg("Internal Server Error");
//         });
//     }
//   };

//   if (user.isLogin) {
//     return (
//       <Navigate path={Constants.DASHBOARD_LINK} to={Constants.DASHBOARD_LINK} />
//     );
//   }

  

//   return (
//     <div style={styles.container}>
//       <div style={styles.innerContainer}>
//         {/* Left Section (Tabs + Form) */}
//         <div style={styles.leftSection}>
//           <div style={styles.tabs}>
//             <span>
//               Working with us
//             </span>
            
//           </div>

//           {/* Login Form */}
//           <div style={styles.form}>
//             <h2 style={styles.headingText}>Login to Proceed</h2>
//             <input type="text" placeholder="Enter Email Address" style={styles.inputField} />

//             <input type="text" placeholder="Enter Password" style={styles.inputField} />

           
//                    <button style={styles.generateOtpBtn} 
//                    onClick={submitBtn}
//                    type="submit">
//             Log in 
//           </button>

//             {/* Locked User ID */}
//             <div style={styles.lockedUser}>
//               <a href="#" onClick={() => history(Constants.FORGOT_PASSWORD_LINK)} style={styles.lockedUserLink}>Forgot Password?</a>
//             </div>
            
//           </div>
//         </div>

//         {/* Right Section (Image and Close Icon) */}
//         <div style={styles.rightSection}>
//           <img src={image} alt="Illustration" style={styles.rightImage} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../UserAuth";
import Grid from "@mui/material/Grid";
import AuthService from "../../services/AuthService";
import Footer from "../footer/Footer";
import Snackbar from "@material-ui/core/Snackbar";
import Logo from "../../../assets/images/logo.png";
import commonStyles from "../common-css/CommonStyle";
import Constants from "../Constants";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
import Alert from "@mui/material/Alert";
import image from "../../../assets/images/image.jpg";

const Login = () => {
  const [activeTab, setActiveTab] = useState('existingUser'); // Manage active tab
  const commonClasses = commonStyles();
  const history = useNavigate();
  const [user, setUser] = useContext(Context);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [alertSeverity, setAlertSeverity] = React.useState("warning");

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    innerContainer: {
      display: 'flex',
      width: '75%',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    leftSection: {
      width: '50%',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
    },
    rightSection: {
      width: '50%',
      position: 'relative',
      backgroundColor: '#96023d',
    },
    rightImage: {
      width: '100%',
      height: '100%',
    },
    inputField: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '15px',
    },
    loginButton: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#97144d',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      color: '#fff',
      cursor: 'pointer',
    },
    lockedUser: {
      textAlign: 'center',
      marginTop: '15px',
    },
    lockedUserLink: {
      color: '#96023d',
      cursor: 'pointer',
      textDecoration: 'none',
    },
  };

  useEffect(() => {
    document.title = "Login | AmfFileUploader";

    AuthService.validateLicense().then((response) => {
    console.log(response.status);
    console.log(response.message);
    if(response.status === "invalid"){
      setAlertSeverity("error");
      setError(true);
      setErrorMsg(response.message);
    }

    })


  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMsg("");
    setError(false);
  };

  const submitBtn = () => {
    if (email === "") {
      setError(true);
      setErrorMsg("Please Enter Email Address");
      setEmailError(true);
    } else if (password === "") {
      setError(true);
      setErrorMsg("Please Enter Password");
      setPasswordError(true);
    } else if (!/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}[, \n]*)+$/.test(email)) {
      setError(true);
      setErrorMsg("Please enter a correct email ID. Eg : Example@domain.com");
      setEmailError(true);
    } else if (password.length < 8) {
      setError(true);
      setErrorMsg("Password must contain a minimum of 8 characters");
      setPasswordError(true);
    } else {
      AuthService.userLogin(email, password)
        .then((response) => {
          if (response && response.token) {
            window.sessionStorage.setItem("avekshaaeasySWATUser", JSON.stringify(response));
            window.sessionStorage.setItem("avekshaaeasySWATToken", response.token);
            setUser({ isLogin: true, userData: response });
            history(Constants.DASHBOARD_LINK);
          } else {
            setError(true);
            setErrorMsg(response.error || "Login failed");
          }
        })
        .catch((error) => {
          setError(true);
          setErrorMsg("Internal Server Error");
        });
    }
  };

  if (user.isLogin) {
    return <Navigate to={Constants.DASHBOARD_LINK} />;
  }

  return (
    <div style={styles.container}>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <div style={styles.innerContainer}>
        <div style={styles.leftSection}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Enter Email Address"
            style={styles.inputField}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            style={styles.inputField}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
          />
          <button
            style={styles.loginButton}
            onClick={submitBtn}
            disabled={email === "" || password === ""}
          >
            Log in
          </button>
          <div style={styles.lockedUser}>
            <a
              href="#"
              onClick={() => history(Constants.FORGOT_PASSWORD_LINK)}
              style={styles.lockedUserLink}
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <div style={styles.rightSection}>
          <img src={image} alt="Illustration" style={styles.rightImage} />
        </div>
      </div>
    </div>
  );
};

export default Login;

