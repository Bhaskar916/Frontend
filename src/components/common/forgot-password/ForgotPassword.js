import React, { useState } from "react";
import AuthService from "../../services/AuthService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";
import commonStyles from "../common-css/CommonStyle";
import image from "../../../assets/images/image.jpg";


export default function ForgotPassword() {
  const commonClasses = commonStyles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMsg("");
    setError(false);
    setSuccess(false);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError(true);
      setErrorMsg("Please enter your email address");
      return;
    }

    AuthService.forgotPassword(email)
      .then((response) => {
        console.log(response);
        if (response.Status === "Mail sent") {
          setSuccess(true);
          setErrorMsg("Password reset email sent!");
        } else {
          setError(true);
          setErrorMsg("Error: " + (response.Status ?? "Unknown error occurred"));
        }
      })
      .catch(() => {
        setError(true);
        setErrorMsg("Internal Server Error");
      });
  };
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
//   return (
//     <div>
//       <Snackbar
//         open={error || success}
//         autoHideDuration={6000}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={error ? "warning" : "success"}>
//           {errorMsg}
//         </Alert>
//       </Snackbar>

//       <div className={commonClasses.loginCard}>
//         <h2>Forgot Password</h2>
//         <label>Email Address</label>
//         <input
//           className={commonClasses.loginCardInput}
//           type="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//         />
//         <button
//           className={commonClasses.loginCardButton}
//           onClick={handleForgotPassword}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
return (
  <div style={styles.container}>
    <div style={styles.innerContainer}>
    <Snackbar
        open={error || success}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={error ? "warning" : "success"}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <div style={styles.leftSection}>
        <h2>Forget Password</h2>
        <input
          type="text"
          placeholder="Enter Email Address"
          style={styles.inputField}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        
        <button
          style={styles.loginButton}
          onClick={handleForgotPassword}
        >
          Submit
        </button>
        
      </div>
      <div style={styles.rightSection}>
          <img src={image} alt="Illustration" style={styles.rightImage} />
        </div>
    </div>
  </div>
);
};
