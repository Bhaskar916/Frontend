/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@mui/material/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Alert from '@material-ui/lab/Alert';
import AuthService from '../../../services/AuthService';
import commonStyles from '../../../common/common-css/CommonStyle';
import Footer from '../../../common/footer/Footer';
import { Snackbar } from '@material-ui/core';
import Authentication from '../../../common/AuthComponent';
import { Context } from '../../../common/UserAuth';
import TextField from '@mui/material/TextField';
import { addLeadingZeros } from '../../../common/StaticMethods';
import CircularProgress from '@mui/material/CircularProgress';




function Setting() {

        const commonClasses = commonStyles();

        const [user, setUser] = useContext(Context);

        const [userAction, setUserAction] = React.useState("");
        const [testSettingsEmailBtProgress, setTestSettingsEmailBtProgress] = React.useState(false);
        const [saveSettingsBtProgress, setSaveSettingsBtProgress] = React.useState(false);

        const [emailID, setEmailID] = React.useState("");
        const [password, setPassword] = React.useState("");
        const [emailSMTP, setEmailSMTP] = React.useState("");
        const [smtpPortTLS, setSmtpPortTLS] = React.useState(0);
        const [smtpPortSSL, setSmtpPortSSL] = React.useState(0);
        const [incidentMgmtArtifactPath,setIncidentMgmtArtifactPath] = React.useState("");
        const [incidentEventArtifactPath,setIncidentEventArtifactPath] = React.useState("");
        const [incidentAnalysisArtifactPath,setIncidentAnalysisArtifactPath] = React.useState("");
        const [stackHolderEmailList,setStackHolderEmailList] = React.useState("");
        const [recommArtifactPath,setRecommArtifactPath] = React.useState("");
        
        const [slackNotification, setSlackNotification] = React.useState(false);
        const [teamsNotification, setTeamsNotification] = React.useState(false);

        const [errorMsg, setErrorMsg] = React.useState("");
        const [error, setError] = React.useState(false);

        const [severity, setSeverity] = React.useState("warning");

        const clearFields = () => {

                setEmailID("");;
                setPassword("");
                setEmailSMTP("");
                setSmtpPortSSL("");
                setSmtpPortTLS("");
                setIncidentMgmtArtifactPath("");
                setIncidentEventArtifactPath("");
                setIncidentAnalysisArtifactPath("");
                setStackHolderEmailList("");
                setRecommArtifactPath("");  

        }

        useEffect(() => {
                AuthService.getAllSettings().then((response) => {
                    setEmailID(response.emailID);
                    setPassword(response.password);
                    setEmailSMTP(response.emailSMTP);
                    setSmtpPortSSL(response.smtpPortSSL);
                    setSmtpPortTLS(response.smtpPortTLS);
                    setIncidentMgmtArtifactPath(response.incMgmtArtifactPath);
                    setIncidentEventArtifactPath(response.incMgmtEventArtifactPath);
                    setIncidentAnalysisArtifactPath(response.incMgmtAnalysisArtifactPath);
                    setStackHolderEmailList(response.stackHolderEmailList);
                    setRecommArtifactPath(response.recommArtifactPath);
                    setSlackNotification(response.slackNotification);
                    setTeamsNotification(response.teamsNotification);    
                })
        }, []);

        const handleCloseSnackbar = (event, reason) => {
                if (reason === 'clickaway') {
                        return;
                }
                setErrorMsg('');
                setError(false);
        };

  
        const formValidation = (action) => {

                if (emailID === "") {
                        setError(true);
                        setErrorMsg("Please Enter Email ID");
                        document.getElementById("emailID").focus();
                } else if (!(/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})+$/.test(emailID))) {
                        setError(true);
                        setErrorMsg("Please enter correct email ID.Eg : example@domain.com");
                        document.getElementById("emailID").focus();
                } else if (password === "") {
                        setError(true);
                        setErrorMsg("Please Enter Password");
                        document.getElementById("password").focus();
                } else if (password.length < 8) {
                        setError(true);
                        setErrorMsg("Please lengthen this text to 8 characters or more(you are currently using " + password.length + " characters)");
                        document.getElementById("password").focus();
                } else if (emailSMTP === "") {
                        setError(true);
                        setErrorMsg("Please Enter Email SMTP");
                } else if (smtpPortTLS === "") {
                        setError(true);
                        setErrorMsg("Please Enter SMTP Port TLS");
                }else {
                        var updatedBy = user.userData.userID;

                        let reqData = {
                                emailID: emailID,
                                password: password,
                                emailSMTP: emailSMTP,
                                smtpPortTLS: smtpPortTLS,
                                smtpPortSSL: smtpPortSSL,
                                incMgmtArtifactPath: incidentMgmtArtifactPath,
                                incMgmtEventArtifactPath: incidentEventArtifactPath,
                                incMgmtAnalysisArtifactPath: incidentAnalysisArtifactPath,
                                stackHolderEmailList: stackHolderEmailList,
                                recommArtifactPath: recommArtifactPath,
                                slackNotification:slackNotification,
                                teamsNotification: teamsNotification
                        }
                        
                        if (action === "saveSettings") {

                                setSaveSettingsBtProgress(true);

                                AuthService.addSettings(reqData).then(res => {

                                        setSaveSettingsBtProgress(false);

                                        if (res === "success") {
                                                setErrorMsg("Settings Updated Successfully");
                                                setSeverity("success");
                                                setError(true);

                                                AuthService.getSettingsData().then((settings) => {
                                                        window.sessionStorage.setItem('avekshaaeasyConfigWatcherSettings', JSON.stringify(settings));
                                                        let userData = user;
                                                        userData.settings = settings;
                                                        setUser(userData);
                                                });

                                        } else {
                                                setErrorMsg("Error Updated Settings");
                                                setSeverity("error");
                                                setError(true);
                                        }
                                });
                        } else {

                                setTestSettingsEmailBtProgress(true);

                                AuthService.testSettingsEmail(reqData).then(response => {

                                        setTestSettingsEmailBtProgress(false);

                                        if (response === "sent") {

                                                setErrorMsg("Email sent successfully!!");
                                                setSeverity("success");
                                                setError(true);

                                        } else {
                                                setErrorMsg("Could not send email. Please check your SMTP configuration.");
                                                setSeverity("warning");
                                                setError(true);
                                        }
                                });
                        }

                }
        }

        if (!user.isLogin) {
                return <Authentication />
        }

        return (<div className={commonClasses.page}>
                <Snackbar
                        open={error}
                        autoHideDuration={6000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity={severity}>
                                {errorMsg}
                        </Alert>
                </Snackbar>

                <br />
                <br />

                <Paper variant="outlined" className={commonClasses.formPageMiniOuter}>
                        <div className={commonClasses.formPageHeader}>Settings</div>
                        <div className={commonClasses.formPageBody} >
                                <Grid container paddingLeft={3.5}>
                                <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >Email ID</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput} id="emailID" name="emailID" label="Email ID"
                                                        error={error}
                                                        value={emailID}
                                                        onChange={(event) => {
                                                                setEmailID(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");
                                                        }}
                                                />
                                        </Grid>
                                        <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >Email Password</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput} id="password" name="Password" label="Password" type="password"
                                                        error={error}
                                                        value={password}
                                                        onChange={(event) => {
                                                                setPassword(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");

                                                        }}
                                                />
                                        </Grid>
                                        <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >Email SMTP</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput}
                                                        id="emailSmtp"
                                                        name="emailSmtp"
                                                        label="EmailSmtp"
                                                        type="emailSmtp"
                                                        placeholder="Eg : smtp.gmail.com"
                                                        error={error}
                                                        value={emailSMTP}
                                                        onChange={(event) => {
                                                                setEmailSMTP(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");

                                                        }}

                                                />
                                        </Grid>
                                        <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >SMTP Port TLS</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput}
                                                        id="smtpPortTLS"
                                                        name="smtpPortTLS"
                                                        label="SMTP Port TLS"
                                                        type="number"
                                                        placeholder="Enter SMTP Port TLS. Eg : 587"
                                                        error={error}
                                                        value={smtpPortTLS}
                                                        onChange={(event) => {
                                                                setSmtpPortTLS(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");
                                                        }}
                                                />
                                        </Grid>
                                        <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >SMTP Port SSL</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput}
                                                        id="smtpPortSSL"
                                                        name="smtpPortSSL"
                                                        label="SMTP Port SSL"
                                                        type="number"
                                                        placeholder="Enter SMTP Port SSL. Eg : 465"
                                                        error={error}
                                                        value={smtpPortSSL}
                                                        onChange={(event) => {
                                                                setSmtpPortSSL(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");
                                                        }}
                                                />
                                        </Grid>
                                        <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >Incident Artifact Path</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput} id="incidentArtifactPath" name="incidentArtifactPath" label="Incident Artifact Path"
                                                        error={error}
                                                        value={incidentMgmtArtifactPath}
                                                        onChange={(event) => {
                                                            setIncidentMgmtArtifactPath(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");
                                                        }}
                                                />
                                        </Grid>
                                        <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >Incident Event Artifact Path</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput} id="incidentEventArtifactPath" name="incidentEventArtifactPath" label="incidentEventArtifactPath"
                                                        error={error}
                                                        value={incidentEventArtifactPath}
                                                        onChange={(event) => {
                                                            setIncidentEventArtifactPath(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");

                                                        }}
                                                />
                                        </Grid>
                                        <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >Incident Analysis Artifact Path</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput}
                                                        id="incidentAnalysisArtifactPath"
                                                        name="incidentAnalysisArtifactPath"
                                                        label="incidentAnalysisArtifactPath"
                                                        placeholder="Incident Analysis Artifact Path"
                                                        error={error}
                                                        value={incidentAnalysisArtifactPath}
                                                        onChange={(event) => {
                                                            setIncidentAnalysisArtifactPath(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");

                                                        }}

                                                />
                                        </Grid>
                                        <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >Stakeholders Email list</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput}
                                                        id="stackHolderList"
                                                        name="stackHolderList"
                                                        label="StakeHolders Email List"
                                                        placeholder="StakeHolders Email List"
                                                        error={error}
                                                        value={stackHolderEmailList}
                                                        onChange={(event) => {
                                                            setStackHolderEmailList(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");
                                                        }}
                                                />
                                        </Grid>
                                        <Grid item xs={6} sx={{ mt: '10px', mb: '10px' }}>
                                                <label className={commonClasses.settPageBodyLabel} >Recommendation Artifact Path</label>
                                                <input
                                                        className={commonClasses.settPageBodyInput}
                                                        id="recommArtofactPath"
                                                        name="recommArtofactPath"
                                                        label="Recommendation Artifact Path"
                                                        placeholder="Recommendation Artifact Path"
                                                        error={error}
                                                        value={recommArtifactPath}
                                                        onChange={(event) => {
                                                                setRecommArtifactPath(event.target.value);
                                                                setError(false);
                                                                setErrorMsg("");
                                                        }}
                                                />
                                        </Grid>
                                        <Grid item xs={6} className={commonClasses.checkBox} sx={{ mt: '10px', mb: '10px' }}>
                                                <table id="example"
                                                        style={{ width: "100%", border: "none" }}>

                                                        <tr>
                                                                <td style={{ textAlign: "left", verticalAlign: "middle" }}><label className={commonClasses.settPageBodyLabel} >Set Slack Notification</label></td>
                                                                <td style={{ textAlign: "center", verticalAlign: "middle" }}><Checkbox color="primary" checked={slackNotification}
                                                                        onChange={() => {
                                                                                setSlackNotification(!slackNotification);
                                                                                setTeamsNotification(false);
                                                                        }} /></td>
                                                        </tr>
                                                        <tr>
                                                                <td style={{ textAlign: "left", verticalAlign: "middle" }}><label className={commonClasses.settPageBodyLabel} >Set Teams Notification</label></td>
                                                                <td style={{ textAlign: "center", verticalAlign: "middle" }}><Checkbox color="primary" checked={teamsNotification}
                                                                        onChange={() => {
                                                                                setTeamsNotification(!teamsNotification);
                                                                                setSlackNotification(false);
                                                                        }} /></td>
                                                        </tr>
                                                </table>
                                        </Grid>
                                </Grid>

                                <br />

                                <div className={commonClasses.formPageBodyButtonField}>

                                        <button
                                                id="testSettingsEmailBtn"
                                                disabled={testSettingsEmailBtProgress}
                                                className={testSettingsEmailBtProgress ? commonClasses.formPageBodyMultipleDisabledButton : commonClasses.formPageBodyMultipleButton}
                                                onClick={() => {
                                                    console.log("is testing mail")
                                                        setUserAction("testSettingsEmail");
                                                        formValidation();
                                                }}>
                                                Test Email
                                                {
                                                        testSettingsEmailBtProgress ?
                                                                <CircularProgress color="inherit" style={{ height: 12, width: 12, marginLeft: 10 }} />
                                                                :
                                                                ""
                                                }
                                        </button>

                                        <button
                                                id="saveSettingsBtn"
                                                disabled={saveSettingsBtProgress}
                                                className={saveSettingsBtProgress ? commonClasses.formPageBodyMultipleDisabledButton : commonClasses.formPageBodyMultipleButton}
                                                onClick={() => {
                                                    console.log("is saving settings")
                                                        setUserAction("saveSettings");
                                                        formValidation("saveSettings");
                                                }}>
                                                Save Settings
                                                {
                                                        saveSettingsBtProgress ?
                                                                <CircularProgress color="inherit" style={{ height: 12, width: 12, marginLeft: 10 }} />
                                                                :
                                                                ""
                                                }
                                        </button>

                                        <button className={commonClasses.formPageBodyMultipleRedButton} onClick={clearFields} title="Clear Fields">Cancel</button>
                                </div>
                        </div>
                </Paper>

                <br />
                <br />
                <br />

                <Footer />
        </div>);

}

export default Setting;
