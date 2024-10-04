/* eslint-disable no-unused-vars */
import React, { useState , useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import useStyles from '../css/ChangePasswordStyle';
import commonStyle from '../../../common/common-css/CommonStyle';
import service from '../../../services/AuthService';
import { Context } from '../../../common/UserAuth';
import Footer from '../../../common/footer/Footer';
import Authentication from '../../../common/AuthComponent';
import Snackbar from '@material-ui/core/Snackbar';


function ChangePassword() {
    const classes = useStyles();
    const commonClasses = commonStyle();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [oldPasswordErrorMsg, setOldPasswordErrorMsg] = useState("");
    const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("");
    const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = React.useState(false)
    const [severity, setSeverity] = React.useState("warning");
  

    const [user, setUser] = useContext(Context);
    var userId = user.userData.userID;
    if (!user.isLogin) {
        return <Authentication />
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorMsg('');
        setError(false);
    };

    const reSetFields = () => {
        setOldPassword("");
        setConfirmPassword("");
        setNewPassword("");
    }

    function formValidation() {
        console.log("Update has been hit");
        
        if (oldPassword === "") {
            setError(true);
            setErrorMsg("Old Password field cannot be empty.");
        } 
        else if (newPassword === "") {
            setError(true);
            setErrorMsg("New Password field cannot be empty.");
        } 
        else if (newPassword.length < 8) {
            setError(true);
            setErrorMsg("Please lengthen the new password to 8 characters or more (you are currently using " + newPassword.length + " characters).");
        } 
        else if (confirmPassword === "") {
            setError(true);
            setErrorMsg("Confirm Password field cannot be empty.");
        } 
        else if (confirmPassword.length < 8) {
            setError(true);
            setErrorMsg("Please lengthen the confirm password to 8 characters or more (you are currently using " + confirmPassword.length + " characters).");
        } 
        else if (oldPassword === newPassword) {
            setError(true);
            setErrorMsg("Old password and New password cannot be the same.");
        } 
        else if (newPassword !== confirmPassword) {
            setError(true);
            setErrorMsg("New password and Confirmed New password are not matching.");
        } 
        else {
            let data = {
                "userid": userId,
                "oldPassword": oldPassword,  // Include the old password for server-side validation
                "password": newPassword
            };
            
            service.changePassword(data).then(res => {
                console.log(res);
                if (res.status === 200) {
                    setSeverity("success");
                    setError(true);
                    setErrorMsg("Password Updated Successfully!");
                } else if (res.status === 404) {
                    setSeverity("warning");
                    setError(true);
                    setErrorMsg("Old password is not correct!");  // Updated message for incorrect old password
                } else {
                    setSeverity("error");
                    setError(true);
                    setErrorMsg("Internal Server Error!");
                }
                reSetFields();
            });
        }
    }
    
    return (
    <div className={commonClasses.page}>
        <br /> <br />
        <Snackbar
                open={error}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        <Paper className={commonClasses.formPageMiniOuter}>
        <div className={commonClasses.formPageHeader} >Change Password</div>
                <div className={commonClasses.formPageBody} >
                <Grid item xs={12}>
                 <Grid container >
                 <Grid item xs={4} sx={{mt: '10px', mb: '10px', ml: '36%'}}>
                 <label className={commonClasses.formPageBodyLabel} >Old Password</label>
                <input
                    required
                    className={commonClasses.formPageBodyInput}
                    error={error}
                    helperText={errorMsg}
                    id="oldPassword"
                    name="oldPassword"
                    label="Old Password"
                    fullWidth
                    autoComplete="Old Password"
                    type="password"
                    onChange={event => {
                        if (event.target.value === "") {
                            setError(true);
                            setErrorMsg("Please fill out this field.");
                        }
                        else {
                            setError(false);
                            setErrorMsg("");
                        }

                        setErrorMsg("");
                        setError(false);
                        setOldPassword(event.target.value);
                    }}
                />
            </Grid>
            <Grid item xs={12} sx={{mt: '10px', mb: '10px', ml: '36%'}}>
            <label className={commonClasses.formPageBodyLabel} >New Password</label>
                <input
                    required
                    className={commonClasses.formPageBodyInput}
                    error={error}
                    helperText={errorMsg}
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    fullWidth
                    autoComplete="New Password"
                    type="password"
                    onChange={event => {
                        if (event.target.value === "") {
                            setError(true);
                            setErrorMsg("Please fill out this field.");
                        }
                        else {
                            setError(false);
                            setErrorMsg("");
                        }

                        setErrorMsg("");
                        setError(false);
                        setNewPassword(event.target.value);
                    }}
                />
            </Grid>
<Grid item xs={12} sx={{mt: '10px', mb: '10px', ml: '36%'}}>
<label className={commonClasses.formPageBodyLabel} >Confirm New Password</label>
    <input
        required
        className={commonClasses.formPageBodyInput}
        error={error}
        helperText={errorMsg}
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        fullWidth
        autoComplete="Confirm Password"
        type="password"
        onChange={event => {
            if (event.target.value === "") {
                setError(true);
                setErrorMsg("Please fill out this field.");
            }
            else {
                setError(false);
                setErrorMsg("");
            }

            setErrorMsg("");
            setError(false);
            setConfirmPassword(event.target.value);
        }}
    />
</Grid>
            <br />
            <br />           
            <br />
            <Grid item xs={12}sx={{mt: '30px', mb: '10px'}} className={commonClasses.formPageBodyButtonField}>
                <button className={commonClasses.formPageBodyButton} variant="contained"
                    color="primary"
                    onClick={formValidation}>Change Password</button>
            </Grid>
            </Grid>
            </Grid>
            </div>
        </Paper>
        <br /><br /><br />
        <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
    </div>);

}

export default ChangePassword;

