/* eslint-disable no-unused-vars */
import React, { Component, useEffect, useContext } from 'react';
import { Redirect } from "react-router";
import Constants from '../../common/Constants';
import useStyles from '../css/AppOnboardStyle';
import commonStyle from '../../common/common-css/CommonStyle';
import Paper from '@material-ui/core/Paper';
import { Button, Fab, TextField } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AuthService from '../../services/AuthService';
import Snackbar from '@material-ui/core/Snackbar';

import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import EditIcon from '../../../assets/images/editicon.png';
import DeleteIcon from '../../../assets/images/delete_icon.png'
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Authentication from '../../common/AuthComponent';
import { Context } from '../../common/UserAuth';
import Footer from '../../common/footer/Footer';
import QuickSearchToolbar from '../../common/QuickSearchToolbar';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { makeStyles } from '@mui/styles';

const tableStyles = makeStyles(() => ({
    root: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#f8f8f8',
            color: 'black',
        },
    },
}));

export default function AppOnboard() {

    const classes = useStyles();
    const commonClasses = commonStyle();
    const tableClasses = tableStyles();

    const [user, setUser] = useContext(Context);

    const [projectID, setProjectID] = React.useState("");
    const [projectName, setProjectName] = React.useState("Select Project Name");
    const [projectNameError, setProjectNameError] = React.useState(false);
    const [projectNameErrorMsg, setProjectNameErrorMsg] = React.useState("");
    const [projectNameList, setProjectNameList] = React.useState([]);

    const [clientName, setClientName] = React.useState("Select Client Name");
    const [clientNameError, setClientNameError] = React.useState(false);
    const [clientNameList, setClientNameList] = React.useState([]);

    const [appId, setAppId] = React.useState("");

    const [appName, setAppName] = React.useState("");
    const [appNameError, setAppNameError] = React.useState("");
    const [appNameErrorMsg, setAppNameErrorMsg] = React.useState("");

    const [projectManagerName, setProjectManagerName] = React.useState("");
    const [projectManagerNameError, setProjectManagerNameError] = React.useState("");
    const [projectManagerNameErrorMsg, setProjectManagerNameErrorMsg] = React.useState("");

    const [appOwnerName, setAppOwnerName] = React.useState("");
    const [appOwnerNameError, setAppOwnerNameError] = React.useState("");
    const [appOwnerNameErrorMsg, setAppOwnerNameErrorMsg] = React.useState("");

    const [appOwnerEmail, setAppOwnerEmail] = React.useState("");
    const [appOwnerEmailError, setAppOwnerEmailError] = React.useState("");
    const [appOwnerEmailErrorMsg, setAppOwnerEmailErrorMsg] = React.useState("");

    const [projectManagerEmail, setProjectManagerEmail] = React.useState("");
    const [projectManagerEmailError, setProjectManagerEmailError] = React.useState("");
    const [projectManagerEmailErrorMsg, setProjectManagerEmailErrorMsg] = React.useState("");

    const [appOwnerMobile, setAppOwnerMobile] = React.useState("");
    const [appOwnerMobileError, setAppOwnerMobileError] = React.useState("");
    const [appOwnerMobileErrorMsg, setAppOwnerMobileErrorMsg] = React.useState("");

    const [projectManagerMobile, setProjectManagerMobile] = React.useState("");
    const [projectManagerMobileError, setProjectManagerMobileError] = React.useState("");
    const [projectManagerMobileErrorMsg, setProjectManagerMobileErrorMsg] = React.useState("");

    const [groupDL, setGroupDL] = React.useState("");
    const [groupDLError, setGroupDLError] = React.useState("");
    const [groupDLErrorMsg, setGroupDLErrorMsg] = React.useState("");

    const [slackChannel, setSlackChannel] = React.useState("");
    const [slackChannelError, setSlackChannelError] = React.useState("");
    const [slackChannelErrorMsg, setSlackChannelErrorMsg] = React.useState("");

    const [meetingID, setMeetingID] = React.useState("");
    const [meetingIDError, setMeetingIDError] = React.useState("");
    const [meetingIDErrorMsg, setMeetingIDErrorMsg] = React.useState("");

    const [criticality, setCriticality] = React.useState("Select Criticality");
    const [criticalityError, setCriticalityError] = React.useState("");
    const [criticalityErrorMsg, setCriticalityErrorMsg] = React.useState("");

    const [criticalityMenuItem, setCriticalityMenuItem] = React.useState([]);

    // const criticalityMenuItem = [
    //     { value: 'Tier 1', label: 'Tier 1' },
    //     { value: 'Tier 2', label: 'Tier 2' },
    //     { value: 'Tier 3', label: 'Tier 3' },
    // ]

    const [environment, setEnvironment] = React.useState("Select Environment");
    const [environmentError, setEnvironmentError] = React.useState("");
    const [environmentErrorMsg, setEnvironmentErrorMsg] = React.useState("");

    const [environmentMenuItem, setEnvironmentMenuItem] = React.useState([]);

    // const environmentMenuItem = [
    //     { value: 'DEV', label: 'DEV' },
    //     { value: 'UAT', label: 'UAT' },
    //     { value: 'SIT', label: 'SIT' },
    //     { value: 'PRE-PROD', label: 'PRE-PROD' },
    //     { value: 'PROD', label: 'PROD' },

    // ]

    const [emailFrequency, setEmailFrequency] = React.useState("Select Email Frequency");
    const [emailFrequencyError, setEmailFrequencyError] = React.useState("");
    const [emailFrequencyErrorMsg, setEmailFrequencyErrorMsg] = React.useState("");

    const [emailFrequencyMenuItem, setEmailFrequencyMenuItem] = React.useState([]);

    // const emailFrequencyMenuItem = [
    //     { value: 'Immediate', label: 'Immediate' },
    //     { value: 'None', label: 'None' },
    // ]

    const [emailThreshold, setEmailThreshold] = React.useState("");
    const [emailThresholdError, setEmailThresholdError] = React.useState("");
    const [emailThresholdErrorMsg, setEmailThresholdErrorMsg] = React.useState("");

    const [emailAttachmentSizeLimit, setEmailAttachmentSizeLimit] = React.useState("")
    const [emailAttachmentSizeLimitError, setEmailAttachmentSizeLimitError] = React.useState("")
    const [emailAttachmentSizeLimitErrorMsg, setEmailAttachmentSizeLimitErrorMsg] = React.useState("")

    const [statisticsEmailFrequency, setStatisticsEmailFrequency] = React.useState("Select Email Frequency Statistics");
    const [statisticsEmailFrequencyError, setStatisticsEmailFrequencyError] = React.useState("");
    const [statisticsEmailFrequencyErrorMsg, setStatisticsEmailFrequencyErrorMsg] = React.useState("");

    const [emailFrequencyStatisticsMenuItem, setEmailFrequencyStatisticsMenuItem] = React.useState([]);

    // const emailFrequencyStatisticsMenuItem = [
    //     { value: 'Daily Basis', label: 'Daily Basis' },
    //     { value: 'None', label: 'None' },
    // ]

    const [errorMsg, setErrorMsg] = React.useState("");
    const [error, setError] = React.useState(false);

    const [isVisible, setIsVisible] = React.useState(false);

    const [severity,setSeverity] = React.useState("warning")
    const [deleteOnboardedApp, setdeleteOnboardedApp] = React.useState({});
    const [deleteAlert, setDeleteAlert] = React.useState(false);

    const [onBoardBT, setOnBoardBT] = React.useState("Onboard Application");
    const [formHeaderText, setFormHeaderText] = React.useState("Onboard Application");

    const [searchText, setSearchText] = React.useState('');

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = originalTBRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setTbRows(filteredRows);
    };

    const escapeRegExp = (value) => {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    const handleOnClick = () =>{
console.log("Inside On Click")
        if (appName === "") {
            setAppNameError(true);
            setAppNameErrorMsg("Please enter the application name")
            console.log("1")
        } else if (projectManagerName === "") {
            setProjectManagerNameError(true);
            setProjectManagerNameErrorMsg("Please enter manager name");
            console.log("2")
        } else if (appOwnerName === "") {
            setAppOwnerNameError(true);
            setAppOwnerNameErrorMsg("Please enter application name");
            console.log("3")
        } else if (projectManagerEmail === "") {
            setProjectManagerEmailError(true);
            setProjectManagerEmailErrorMsg("Please enter project manager email ID.");
            console.log("4")
        } else if (!(/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}[, \n]*)+$/.test(projectManagerEmail))) {
            setProjectManagerEmailError(true);
            setProjectManagerEmailErrorMsg("Please enter correct email ID. Eg : Example@domain.com");
            console.log("5")
        } else if (appOwnerEmail === "") {
            setAppOwnerEmailError(true);
            setAppOwnerEmailErrorMsg("Please enter application owner email id");
            console.log("6")
        } else if (!(/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}[, \n]*)+$/.test(appOwnerEmail))) {
            setAppOwnerEmailError(true);
            setAppOwnerEmailErrorMsg("Please enter correct email ID. Eg : Example@domain.com");
            console.log("7")
        } else if (projectManagerMobile === "") {
            setProjectManagerMobileError(true);
            setProjectManagerMobileErrorMsg("Please enter mobile number");
            console.log("8")
        } else if (projectManagerMobile.length > 10 || projectManagerMobile.length < 6) {
            setProjectManagerMobileError(true);
            setProjectManagerMobileErrorMsg("Please enter 10 digits number only");
            console.log("9")
        } else if (appOwnerMobile === "") {
            setAppOwnerMobileError(true);
            setAppOwnerMobileErrorMsg("Please enter mobile number");
            console.log("10")
        } else if (appOwnerMobile.length > 10 || appOwnerMobile.length < 6) {
            setAppOwnerMobileError(true);
            setAppOwnerMobileErrorMsg("Please enter 10 digits number only")
            console.log("11")
        } else if (groupDL === "") {
            setGroupDLError(true);
            setGroupDLErrorMsg("Please enter group DL");
            console.log("12")
        } else if (!(/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}[, \n]*)+$/.test(groupDL))) {
            setGroupDLError(true);
            setGroupDLErrorMsg("Please enter correct email ID. Eg : Example@domain.com");
            console.log("13")
        } else if (criticality === "Select Criticality") {
            setCriticalityError(true);
            setError(true);
            setErrorMsg("Please select criticality");
            setCriticalityErrorMsg("Please select criticality");
            console.log("14")
        } else if (environment === "Select Environment") {
            setEnvironmentError(true);
            setError(true);
            setErrorMsg("Please select environment");
            setEnvironmentErrorMsg("Please select environment");
            console.log("15")
        } else if (statisticsEmailFrequency === "Select Email Frequency Statistics") {
            setStatisticsEmailFrequencyError(true);
            setError(true);
            setErrorMsg("Please select frequncy statistics");
            setStatisticsEmailFrequencyErrorMsg("Please select frequncy statistics");
            console.log("16")
        } else if (emailFrequency === "Select Email Frequency") {
            setEmailFrequencyError(true);
            setError(true);
            setErrorMsg("Please select email frequency");
            setEmailFrequencyErrorMsg("Please select email frequency");
            console.log("17")
        } else if (emailThreshold === "") {
            setEmailThresholdError(true);
            setEmailThresholdErrorMsg("Please enter email threshold");
            console.log("18")
        } else if (emailAttachmentSizeLimit === "") {
            setEmailAttachmentSizeLimitError(true);
            setEmailAttachmentSizeLimitErrorMsg("Please enter PDF size limit");
            console.log("19")
        } else if (slackChannel === "") {
            setSlackChannelError(true);
            setSlackChannelErrorMsg("Please enter Slack Channel specific to your application");
            console.log("20")
        } else if (meetingID === "") {
            setMeetingIDError(true);
            setMeetingIDErrorMsg("Please enter Meeting ID specific to your application");
            console.log("20")
        } else {
            console.log("Creating Data Object")
            let reqData = {
                clientId: clientName,
                projectId: projectName,
                applicationId: appId,
                appName: appName,
                projectManagerName: projectManagerName,
                appOwnerName: appOwnerName,
                projectManagerEmail: projectManagerEmail,
                appOwnerEmail: appOwnerEmail,
                projectManagerMobile: projectManagerMobile,
                appOwnerMobile: appOwnerMobile,
                groupDl: groupDL,
                criticality: criticality,
                appEnvironment: environment,
                emailStatsFreq: statisticsEmailFrequency,
                emailFrequency: emailFrequency,
                emailThreshold: emailThreshold,
                emailAttachmentSizeLimit: emailAttachmentSizeLimit,
                slackChannel: slackChannel,
                meetingID: meetingID
            }
            if (onBoardBT === 'Onboard Application') {
            AuthService.appOnboard(reqData).then(res => {
                if (res === "Inserted") {
                    setSeverity("success");
                    setErrorMsg("Application Added Successfully");
                    setError(true);            
                } else if((res === "Duplicate")) {
                    setSeverity("warning");
                    setErrorMsg("Application already exists");
                    setError(true); 
                }else{
                    setSeverity("error");
                    setErrorMsg("Error in Adding Application");
                    setError(true)
                }
                reloadPage();
                reloadAppList();
            });
        }else if (onBoardBT === 'Update Application') {
            AuthService.updateApp(reqData).then(res => {
                console.log("Updating Application")
                if (res === "Updated") {
                    setSeverity("success");
                    setErrorMsg("Application Updated Successfully");
                    setError(true);
                } else{
                    setSeverity("error");
                    setErrorMsg("Error in Updating Application");
                    setError(true); 
                }
                reloadPage();
                reloadAppList();
            });
        }
        }

    }

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorMsg('');
        setError(false);
    };

    const reloadPage = () =>{

        setClientName('Select Client Name');
        setProjectName('Select Project Name');
        setAppName("");
        setProjectManagerEmail("");
        setProjectManagerName("");
        setProjectManagerMobile("");
        setAppOwnerName("");
        setAppOwnerEmail("");
        setAppOwnerMobile("");
        setGroupDL("");
        setCriticality("Select Criticality");
        setEnvironment("Select Environment");
        setStatisticsEmailFrequency("Select Email Frequency Statistics");
        setEmailFrequency("Select Email Frequency");
        setEmailThreshold("");
        setEmailAttachmentSizeLimit("");
        setSlackChannel("");
        setMeetingID("");
        setFormHeaderText("Onboard Application");
        setOnBoardBT("Onboard Application")

    }

    const reloadAppList = () => {
        AuthService.getAppList().then((response) => {
            if (response.tbRows !== null) {
                console.log(response.tbRows)
                setTbRows(response.tbRows);
            } else {
                setTbRows([]);
            }
        })
    }

    const tbColumns = [
        { field: 'id', headerName: 'Application ID', hide: true },
        { field: 'appName', headerName: 'Application Name', width: 200, align: 'center', headerAlign: 'center' },
        { field: 'appOwnerName', headerName: 'Application Owner Name', width: 300, align: 'center', headerAlign: 'center' },
        { field: 'tier', headerName: 'Tier', width: 95, align: 'center', headerAlign: 'center' },
        { field: 'appEnv', headerName: 'Enviornment', width: 200, align: 'center', headerAlign: 'center' },
        {
            field: 'action', headerName: 'Action', width: 200, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <div>
                    <IconButton color="primary" aria-label="Edit User Details" component="span" onClick={props => {
                                                setAppId(params.row.id)
                                                setAppName(params.row.appName);
                                                setClientName(params.row.clientID);
                                                AuthService.getClientBasedProjectList(params.row.clientID, user.userData.userRole, user.userData.resourceID).then((response) => {
                                                    console.log(response)
                                                    setProjectNameList(response)
                                                });
                                                setProjectName(params.row.projectID);
                                                setAppOwnerName(params.row.appOwnerName);
                                                setAppOwnerMobile(params.row.appOwnerMobile);
                                                setAppOwnerEmail(params.row.appOwnerEmail);
                                                setProjectManagerName(params.row.projectManagerName);
                                                setProjectManagerMobile(params.row.projectManagerMobile);
                                                setProjectManagerEmail(params.row.projectManagerEmail);
                                                setCriticality(params.row.tier);
                                                setEnvironment(params.row.appEnv);
                                                setGroupDL(params.row.groupDl);
                                                setEmailThreshold(params.row.emailThreshold);
                                                setEmailFrequency(params.row.emailFrequency);
                                                setStatisticsEmailFrequency(params.row.statsEmailFreq);
                                                setEmailAttachmentSizeLimit(params.row.attchSizeLimit);
                                                setSlackChannel(params.row.slackChannel);
                                                setMeetingID(params.row.meetingID);
                                                setOnBoardBT("Update Application")
                                                setFormHeaderText("Update Application");
                    
                                        }}>
                        <img src={EditIcon} width='20' height='20' title='Edit Application Details' alt='Edit Application Details' />
                    </IconButton>
                    <IconButton color="primary" aria-label="Delete User" component="span"onClick={() => {
                        setdeleteOnboardedApp(params.row);
                        setDeleteAlert(true);
                    }}>
                        <img src={DeleteIcon} width='20' height='20' title='Delete Application' alt='Delete Application' />
                    </IconButton>
                </div>
            )
        },
    ];

    const [tbRows, setTbRows] = React.useState([]);
    const [originalTBRows, setOriginalTBRows] = React.useState([]);

    const noRow = () => {
        return (
            <GridOverlay className={commonClasses.emptyMsg}><DescriptionIcon />No Application Found</GridOverlay>
        );
    }

    const closeDeleteAlert = () => {
        setDeleteAlert(false);
    };

    const handleDeleteAlertSubmit = () => {
        AuthService.deleteApp(deleteOnboardedApp.id).then((response) => {
            console.log(response)
            if (response === "Deleted") {
                // window.location.reload();
                setSeverity("success");
                setErrorMsg("Application Deleted Successfully");
                setError(true);
                reloadPage();
            }else{
                setSeverity("error");
                setErrorMsg("Error Deleting the Application");
                setError(true); 
                reloadPage();
            }
        reloadAppList();  
        });

        setDeleteAlert(false);
    };

    useEffect(() => {
        document.title = "Onboard Application | easySWAT";


        AuthService.getClientNameList(user.userData.userRole, user.userData.resourceEmail).then((response) => {
            // response.sort((row1, row2) => (row1.clientName > row2.clientName) ? 1 : -1);
            setClientNameList(response);
        });

        AuthService.getAppList().then((response) => {
            if (response.tbRows !== null) {
                console.log(response.tbRows)
                setTbRows(response.tbRows);
                setOriginalTBRows(response.tbRows);
            } else {
                setTbRows([]);
                setOriginalTBRows([]);
            }
        })

        AuthService.getDropDownValues("App_Env").then((response) => {
            console.log(response)
            setEnvironmentMenuItem(response);
        });

        AuthService.getDropDownValues("App_Tier").then((response) => {
            setCriticalityMenuItem(response);
        });

        AuthService.getDropDownValues("Stats_Email_Freq").then((response) => {
            setEmailFrequencyStatisticsMenuItem(response);
        });

        AuthService.getDropDownValues("App_Email_Freq").then((response) => {
            setEmailFrequencyMenuItem(response);
        });

    }, [user]);

    if (!user.isLogin) {
        return <Authentication />
    }

    return (
        <div className={commonClasses.page}>
    
            <Snackbar
                open={error}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity}>
                    {errorMsg}
                </Alert>
            </Snackbar>

            <Dialog open={deleteAlert} onClose={closeDeleteAlert} className={commonClasses.deleteAlert}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <WarningAmberRoundedIcon className={commonClasses.warningIcon}/> Are you sure want to delete Onboarded Application <b>{deleteOnboardedApp.appName}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDeleteAlert} className={commonClasses.cancelSubmitButton}>Cancel</Button>
                <Button onClick={handleDeleteAlertSubmit} className={commonClasses.deleteAlertSubmit}>Delete</Button>
            </DialogActions>
            </Dialog>

            <br />
            <br />

            <Paper variant="outlined" className={commonClasses.formPageLargeOuter}>
            <div className={commonClasses.formPageHeader}>{formHeaderText}</div>
                <div className={commonClasses.formPageBody}>
                <Grid container>
                    <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Client Name</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}   
                            labelId="client-name-label"
                            id="clientName"
                            error={clientNameError}
                            value={clientName}
                            onChange={event => {
                                setClientName(event.target.value);
                                setClientNameError(false);
                                setError(false);
                                setErrorMsg("");
                                AuthService.getClientBasedProjectList(event.target.value, user.userData.userRole, user.userData.resourceID).then((response) => {
                                    console.log(response)
                                    setProjectNameList(response)
                                });
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Client Name">Select Client Name</MenuItem>
                            {clientNameList.map(client =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={client.clientID} value={client.clientID}>{client.clientName}</MenuItem>
                            )}

                        </Select>
                </Grid>



                <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Project Name</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}
                            labelId="project-name-label"
                            id="projectName"
                            error={projectNameError}
                            value={projectName}
                            onChange={event => {
                                setProjectName(event.target.value);
                                setProjectNameError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Project Name">Select Project Name</MenuItem>
                            {projectNameList.map(project =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={project.projectID} value={project.projectID}>{project.projectName}</MenuItem>
                            )}

                        </Select>
                </Grid>
                <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Application Name</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="applicationName"
                                placeholder="Enter Application Name"
                                labelPlacement="start"
                                helperText={appNameErrorMsg}
                                error={appNameError}
                                value={appName}
                                onChange={(event) => {
                                    setAppName(event.target.value);
                                    setAppNameError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setAppNameErrorMsg("");
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Project Manager Name</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="projectManagerName"
                                placeholder="Enter Project Manager Name"
                                labelPlacement="start"
                                helperText={projectManagerNameErrorMsg}
                                error={projectManagerNameError}
                                value={projectManagerName}
                                onChange={(event) => {
                                    setProjectManagerName(event.target.value);
                                    setProjectManagerNameError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setProjectManagerNameErrorMsg("");
                                }}


                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Application Owner Name</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="appOwnerName"
                                placeholder="Enter Application Owner Name"
                                labelPlacement="start"
                                helperText={appOwnerNameErrorMsg}
                                error={appOwnerNameError}
                                value={appOwnerName}
                                onChange={(event) => {
                                    setAppOwnerName(event.target.value);
                                    setAppOwnerNameError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setAppOwnerNameErrorMsg("");
                                }}


                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Project Manager Email</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="projectManagerEmail"
                                placeholder="Enter Project Manager Email"
                                labelPlacement="start"
                                helperText={projectManagerEmailErrorMsg}
                                error={projectManagerEmailError}
                                value={projectManagerEmail}
                                onChange={(event) => {
                                    setProjectManagerEmail(event.target.value);
                                    setProjectManagerEmailError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setProjectManagerEmailErrorMsg("");
                                }}


                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Application Owner Email</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="appOwnerEmail"
                                placeholder="Enter Application Owner Email"
                                labelPlacement="start"
                                helperText={appOwnerEmailErrorMsg}
                                error={appOwnerEmailError}
                                value={appOwnerEmail}
                                onChange={(event) => {
                                    setAppOwnerEmail(event.target.value);
                                    setAppOwnerEmailError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setAppOwnerEmailErrorMsg("");
                                }}


                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Project Manager Mobile</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="projectManagerMobile"
                                placeholder="Enter Project Manager Mobile "
                                labelPlacement="start"
                                helperText={projectManagerMobileErrorMsg}
                                error={projectManagerMobileError}
                                value={projectManagerMobile}
                                onChange={(event) => {
                                    setProjectManagerMobile(event.target.value);
                                    setProjectManagerMobileError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setProjectManagerMobileErrorMsg("");
                                }}


                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} > Application Owner Mobile</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="appOwnerMobile"
                                placeholder="Enter Application Owner Mobile"
                                labelPlacement="start"
                                helperText={appOwnerMobileErrorMsg}
                                error={appOwnerMobileError}
                                value={appOwnerMobile}
                                onChange={(event) => {
                                    setAppOwnerMobile(event.target.value);
                                    setAppOwnerMobileError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setAppOwnerMobileErrorMsg("");
                                }}


                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Group DL</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="groupDl"
                                placeholder="Enter Group DL"
                                labelPlacement="start"
                                helperText={groupDLErrorMsg}
                                error={groupDLError}
                                value={groupDL}
                                onChange={(event) => {
                                    setGroupDL(event.target.value);
                                    setGroupDLError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setGroupDLErrorMsg("");
                                }}


                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Criticality</label>
                            <Select
                                style={{
                                    width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                                }} 
                                    labelId="Criticality"
                                    id="criticality"
                                    error={criticalityError}
                                    value={criticality}
                                    helperText={criticalityErrorMsg}
                                    onChange={event => {
                                        setCriticality(event.target.value);
                                        setCriticalityError(false);
                                        setCriticalityErrorMsg("");
                                        setError(false);
                                    }}
                                >
                                    <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Criticality">Select Criticality</MenuItem>

                                    {criticalityMenuItem.map(item =>
                                        <MenuItem style={{ fontSize: '14px', height: '30px' }} key={item} value={item}>{item}</MenuItem>
                                    )}
                                </Select>
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Enviornment</label>
                            <Select
                                style={{
                                    width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                                }} 
                                    labelId="Environment"
                                    id="environment"
                                    error={environmentError}
                                    value={environment}
                                    helperText={environmentErrorMsg}
                                    onChange={event => {
                                        setEnvironment(event.target.value);
                                        setEnvironmentError(false);
                                        setEnvironmentErrorMsg("");
                                        setError(false);
                                    }}
                                >
                                    <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Environment">Select Environment</MenuItem>

                                    {environmentMenuItem.map(item =>
                                        <MenuItem style={{ fontSize: '14px', height: '30px' }} key={item} value={item}>{item}</MenuItem>
                                    )}
                                </Select>
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Statistic Email Frequency</label>
                            <Select
                                style={{
                                    width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                                }} 
                                    labelId="Statistics Email Frequency"
                                    id="statisticsEmailFrequency"
                                    error={statisticsEmailFrequencyError}
                                    value={statisticsEmailFrequency}
                                    helperText={statisticsEmailFrequencyErrorMsg}
                                    onChange={event => {
                                        setStatisticsEmailFrequency(event.target.value);
                                        setStatisticsEmailFrequencyError(false);
                                        setStatisticsEmailFrequencyErrorMsg("");
                                        setError(false);
                                    }}
                                >
                                    <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Email Frequency Statistics">Select Email Frequency Statistics</MenuItem>

                                    {emailFrequencyStatisticsMenuItem.map(item =>
                                        <MenuItem style={{ fontSize: '14px', height: '30px' }} key={item} value={item}>{item}</MenuItem>
                                    )}
                                </Select>
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Email Frequency</label>
                            <Select
                                style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                                }} 
                                    labelId="Email Config"
                                    id="emailFrequency"
                                    error={emailFrequencyError}
                                    value={emailFrequency}
                                    helperText={emailFrequencyErrorMsg}
                                    onChange={event => {
                                        setEmailFrequency(event.target.value);
                                        setEmailFrequencyError(false);
                                        setEmailFrequencyErrorMsg("");
                                        setError(false);
                                    }}
                                >
                                    <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Email Frequency">Select Email Frequency</MenuItem>

                                    {emailFrequencyMenuItem.map(item =>
                                        <MenuItem style={{ fontSize: '14px', height: '30px' }} key={item} value={item}>{item}</MenuItem>
                                    )}
                                </Select>
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Email Threshold</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="emailThreshold"
                                placeholder="Enter Email Threshold"
                                labelPlacement="start"
                                helperText={emailThresholdErrorMsg}
                                error={emailThresholdError}
                                value={emailThreshold}
                                onChange={(event) => {
                                    setEmailThreshold(event.target.value);
                                    setEmailThresholdError(false);
                                    setEmailThresholdErrorMsg("");
                                    setError(false);
                                }}
                            />
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Enter PDF Size</label>
                        <input 
                            className={commonClasses.formPageBodyInput} 
                            type='text'
                            id="enterPdfSize"
                                placeholder="Enter PDF Size"
                                labelPlacement="start"
                                helperText={emailAttachmentSizeLimitErrorMsg}
                                error={emailAttachmentSizeLimitError}
                                value={emailAttachmentSizeLimit}
                                onChange={(event) => {
                                    setEmailAttachmentSizeLimit(event.target.value);
                                    setEmailAttachmentSizeLimitError(false);
                                    setEmailAttachmentSizeLimitErrorMsg("");
                                    setError(false);
                                }}
                            />
                        </Grid>
                        <Grid container>
                        <Grid item xs={6} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Slack Channel Name</label>
                        <input 
                            className={commonClasses.appOnboardPageBodyTextarea} 
                            type='text'
                            id="slackChannel"
                                placeholder="Enter Slack Channel specific to your Application"
                                labelPlacement="start"
                                helperText={slackChannelErrorMsg}
                                error={slackChannelError}
                                value={slackChannel}
                                onChange={(event) => {
                                    setSlackChannel(event.target.value);
                                    setSlackChannelError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setSlackChannelErrorMsg("");
                                }}
                            />
                        </Grid>
                        
                        <Grid item xs={6} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Meeting ID</label>
                        <input 
                            className={commonClasses.appOnboardPageBodyTextarea} 
                            type='text'
                            id="meetingID"
                                placeholder="Enter Meeting ID specific to your Application"
                                labelPlacement="start"
                                helperText={meetingIDErrorMsg}
                                error={meetingIDError}
                                value={meetingID}
                                onChange={(event) => {
                                    setMeetingID(event.target.value);
                                    setMeetingIDError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setMeetingIDErrorMsg("");
                                }}
                            />
                        </Grid>

                        </Grid>
                        
                        <Grid item xs={12} sx={{mt: '10px', mb: '10px'}} className={commonClasses.formPageBodyButtonField}>
                            <button className={commonClasses.formPageBodyButton}  variant="contained" color="primary" onClick={handleOnClick}>{onBoardBT}</button>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
            <br /><br /><br />
            <Paper variant="outlined" className={commonClasses.formPageLargeOuter}>
            <div className={commonClasses.formPageHeader}>{Constants.APP_LIST}</div>
            <div className={commonClasses.formPageBody} >
                <DataGrid 
                 style={{ padding: 10, fontSize: 12 }}
                rows={tbRows} 
                columns={tbColumns}
                className={tableClasses.root} 
                rowHeight={34}
                headerHeight={34}
                pageSize={10} 
                components={{ 
                    Toolbar: QuickSearchToolbar,
                    NoRowsOverlay: noRow 
                }}
                componentsProps={{
                    toolbar: {
                        value: searchText,
                        onChange: (event) => requestSearch(event.target.value),
                        clearSearch: () => requestSearch(''),
                    },
                }}
                disableSelectionOnClick
                disableColumnMenu
                autoHeight
                 />
                </div>
            </Paper>
            
            <br />
            <br />
            <br />
            
            <Footer />
        </div>
    )

}


 