/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import useStyles from '../css/DeployResourceStyle';
import Paper from '@material-ui/core/Paper';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@mui/material/Alert';
import commonStyles from '../../../common/common-css/CommonStyle';
import Footer from '../../../common/footer/Footer';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import DescriptionIcon from '@material-ui/icons/Description';
import AuthService from '../../../services/AuthService';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '../../../../assets/images/editicon.png';
import DeleteIcon from '../../../../assets/images/delete_icon.png';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {Context} from '../../../common/UserAuth';
import Authentication from '../../../common/AuthComponent';
import QuickSearchToolbar from '../../../common/QuickSearchToolbar';

import { makeStyles } from '@mui/styles';

const tableStyles = makeStyles(() => ({
    root: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#f8f8f8',
            color: 'black',
        },
    },
}));


export default function DeployResource() {

    

    const classes = useStyles();
    const commonClasses = commonStyles();
    const tableClasses = tableStyles();
    
    const [formHeaderText, setFormHeaderText] = React.useState("Resource Deployment");
    const [submitBtText, setSubmitBtText] = React.useState("Deploy Resource");

    const [action, setAction] = React.useState("add");

    const [deleteDeployedResource, setDeleteDeployedResource] = React.useState({});
    const [deleteAlert, setDeleteAlert] = React.useState(false);

    const [alertSeverity, setAlertSeverity] = React.useState("warning");

    const [deploymentID, setDeploymentID] = React.useState("");

    const [resourceName, setResourceName] = React.useState("Select Resource Name");
    const [resourceNameError, setResourceNameError] = React.useState(false);
    const [resourceNameList, setResourceNameList] = React.useState([]);

    const [clientName, setClientName] = React.useState("Select Client Name");
    const [clientNameError, setClientNameError] = React.useState(false);
    const [clientNameList, setClientNameList] = React.useState([]);

    const [projectName, setProjectName] = React.useState("Select Project Name");
    const [projectNameError, setProjectNameError] = React.useState(false);
    const [projectNameList, setProjectNameList] = React.useState([]);

    const [appName, setAppName] = React.useState("Select Application Name");
    const [appNameError, setAppNameError] = React.useState(false);
    const [appNameList, setAppNameList] = React.useState([]);

    const [billabilityStatus, setbillabilityStatus] = React.useState("Select Billability Status");
    const [billabilityStatusError, setbillabilityStatusError] = React.useState(false);
    const [billabilityStatusList, setbillabilityStatusList] = React.useState([]);

    const [deployedCurrentStatus, setDeployedCurrentStatus] = React.useState("Select Current Status");
    const [deployedCurrentStatusError, setDeployedCurrentStatusError] = React.useState(false);
    const [deployedCurrentStatusList, setDeployedCurrentStatusList] = React.useState([]);

    const [deployDesignation, setDeployDesignation] = React.useState("Select Deploy Designation");
    const [deployDesignationError, setDeployDesignationError] = React.useState(false);
    const [deployDesignationList, setDeployDesignationList] = React.useState([]);

    const [deployStartDate, setDeployStartDate] = React.useState(new Date());
    const [deployStartDateError, setDeployStartDateError] = React.useState(false);

    const [deployEndDate, setDeployEndDate] = React.useState(new Date());
    const [deployEndDateError, setDeployEndDateError] = React.useState(false);

    const [trackName, setTrackName] = React.useState([]);
    const [trackNameError, setTrackNameError] = React.useState(false);
    const [trackNameErrorMsg, setTrackNameErrorMsg] = React.useState("");
    const [trackNameList, setTrackNameList] = React.useState([]);
    
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const [noteError, setNoteError] = React.useState(false);
    const [noteErrorMsg, setNoteErrorMsg] = React.useState("");

    const [searched, setSearched] = React.useState("");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorMsg('');
        setError(false);
        setAlertSeverity("warning");
    };

    const closeDeleteAlert = () => {
        setDeleteAlert(false);
    };

    const handleDeleteAlertSubmit = () => {
        AuthService.deleteDeployedResource(deleteDeployedResource.depResid).then((response) => {
            if(response === "Deleted"){
                setAlertSeverity("success");
                setError(true);
                setErrorMsg("Deployed resource deleted successfully");
                
                setResourceName("Select Resource Name");
                setClientName("Select Client Name");
                setProjectName("Select Project Name");
                setAppName("Select Application Name");
                setTrackName([]);
                setDeployDesignation("Select Deploy Designation");
                setbillabilityStatus("Select Billability Status");
                setDeployedCurrentStatus("Select Current Status");
                setDeployStartDate(new Date());
                setDeployEndDate(new Date());
                setFormHeaderText("Resource Deployment");
                setSubmitBtText("Deploy Resource");

                reloadDeployedResourceList();
            }
            else{
                setError(true);
                setErrorMsg("Error while Deleting the deployed resource");
            }
        });

        setDeleteAlert(false);
    }

    const reloadDeployedResourceList = () => {
        AuthService.getDeployedResourceList(user.userData.userRole, user.userData.resourceName).then((response) => {
            setTbRows(response);
            setOriginalTBRows(response);
            setSearchText("");
        });
    }

    const reSetFields = () => {
        setResourceName("Select Resource Name");
        setClientName("Select Client Name");
        setProjectName("Select Project Name");
        setAppName("Select Application Name");
        setTrackName([]);
        setDeployDesignation("Select Deploy Designation");
        setbillabilityStatus("Select Billability Status");
        setDeployedCurrentStatus("Select Current Status");
        setDeployStartDate(new Date());
        setDeployEndDate(new Date());
        setFormHeaderText("Resource Deployment");
        setSubmitBtText("Deploy Resource");
        setSearchText("");
    }

    const handleSubmitAction = () => {
        let tempDeployStartDate = new Date(deployStartDate).getTime();
        let tempDeployEndDate = new Date(deployEndDate).getTime();
        if (resourceName === 'Select Resource Name'){
            setResourceNameError(true);
            setError(true);
            setErrorMsg("Please select Resource Name");
        } else if (clientName === 'Select Client Name') {
            setClientNameError(true);
            setError(true);
            setErrorMsg("Please Select Client Name");
        } else if (projectName === 'Select Project Name'){
            setProjectNameError(true);
            setError(true);
            setErrorMsg("Please Select Project Name");
        } else if (appName === 'Select Application Name'){
            setAppNameError(true);
            setError(true);
            setErrorMsg("Please Select Application Name");
        } else if (trackName === ""){
            setTrackNameError(true);
            setError(true);
            setErrorMsg("Please Select Track Name");
        } else if (tempDeployStartDate  !== new Date(deployStartDate).getTime()) {
            setDeployStartDateError(true);
            setError(true);
            setErrorMsg("Please Select Deploy Start Date. (Format : DD/MM/YYYY, Ex : 01/01/2021)");
        } else if (tempDeployEndDate  !== new Date(deployEndDate).getTime()) {
            setDeployEndDateError(true);
            setError(true);
            setErrorMsg("Please Select Deploy End Date. (Format : DD/MM/YYYY, Ex : 01/01/2021)");
        } else if (deployStartDate.getTime() > deployEndDate.getTime()) {
            setDeployEndDateError(true);
            setErrorMsg("Please select valid Deploy Start Date & End Date. End Date should be greater Start Date.");
            setError(true);
        } else if (deployDesignation === 'Select Deploy Designation'){
            setDeployDesignationError(true);
            setError(true);
            setErrorMsg("Please Select Deploy Designation");
        } else if (billabilityStatus === 'Select Billability Status'){
            setbillabilityStatusError(true);
            setError(true);
            setErrorMsg("Please Select Billability Status");
        } else if(deployedCurrentStatus === "Select Current Status" || deployedCurrentStatus === null) {
            setDeployedCurrentStatusError(true);
            setError(true);
            setErrorMsg("Please Select Current Status");
        } else {

            let resourceNameData = resourceName.split("::");
            //let deployDesignationData = deployDesignation.split("::");
            let projectData = projectName.split("::");
            let clientData = clientName.split("::");
            // let trackData = trackName.split("::") ;
            let appData = appName.split("::");
            // console.log("designation", deployDesignationData)
            let formData = {
                resourceID: resourceNameData[0],
                resourceName: resourceNameData[1],
                deployDesignation: deployDesignation,
                // deployDesignation: deployDesignationData[1],
                // deployDesignationGrade: deployDesignationData[0],
                deployStartDate: deployStartDate,
                deployEndDate: deployEndDate,
                deployByName: user.userData.resourceName,
                deployByEmail: user.userData.resourceEmail,
                billabilityStatus: billabilityStatus,
                deployedCurrentStatus: deployedCurrentStatus,
                projectID: projectData[0],
                projectName: projectData[1],
                // trackID: trackData[0],
                // trackName: trackData[1],
                trackID: trackName,
                clientID: clientData[0],
                clientName: clientData[1],
                applicationID: appData[0],
                applicationName: appData[1]
            }

            if(action === "update"){
                formData["depResid"] = deploymentID;
                AuthService.updateDeployedResource(formData).then((response) => {
                    if(response === "Updated"){
                        setAlertSeverity("success");
                        setError(true);
                        setErrorMsg("Deployed Resource Updated Successfully");
                        setAction("add");
                    }
                    else{
                        setError(true);
                        setErrorMsg("Error while updating the deployed resource");
                    }
                    reloadDeployedResourceList();
                    reSetFields();
                });
            }
            else{
                AuthService.deployResource(formData).then((response) => {
                    if(response === "Added"){
                        setAlertSeverity("success");
                        setError(true);
                        setErrorMsg("Resource Deployed Successfully");
                        reSetFields();
                        // formData["onboardedByName"] = user.userData.resourceName;
                        // formData["onboardedByEmail"] = user.userData.resourceEmail;
                        AuthService.publishDeployedResource(formData).then((response) => {
                            console.log(response);
                        })
                    } else if(response === "Duplicate"){
                        setAlertSeverity("warning");
                        setError(true);
                        // setErrorMsg("Resource already deployed in " + clientData[1] +" - "+  projectData[1] + " - "+ appData[1] );
                        setErrorMsg("Resource is already deployed");
                        reSetFields();
                    } else{
                        setError(true);
                        setErrorMsg("Error while deploying the Resource");
                        reSetFields();
                    }

                    reloadDeployedResourceList();
                });
            }

        }
    };

    const tbColumns = [
        { field: 'id', headerName: 'Deployment ID', hide: true, filterable: false },
        { field: 'deploymentID', headerName: 'Deployment ID', hide: true, filterable: false },
        { field: 'resourceID', headerName: 'Resource ID', hide: true, filterable: false },
        { field: 'resourceName', headerName: 'Resource Name', width: 160, align: 'center', headerAlign: 'center' },
        { field: 'clientID', headerName: 'client ID', hide: true, filterable: false },
        { field: 'clientName', headerName: 'Client Name', width: 160, align: 'center', headerAlign: 'center' },
        { field: 'projectID', headerName: 'Project ID', hide: true, filterable: false },
        { field: 'projectName', headerName: 'Project Name', width: 160, align: 'center', headerAlign: 'center' },
        { field: 'applicationName', headerName: 'Application Name', width: 180, align: 'center', headerAlign: 'center' },
        { field: 'trackName', headerName: 'Track Name', width: 160, align: 'center', headerAlign: 'center' },
        { field: 'deployDesignation', headerName: 'Deploy Designation', hide: true, width: 250, align: 'center', headerAlign: 'center' },
        // { field: 'deployDesignationGrade', headerName: 'Deploy Designation', hide: true, filterable: false },
        { field: 'deployStartDate', headerName: 'Start Date', hide: true, width: 130, align: 'center', headerAlign: 'center'   },
        { field: 'deployStartDateL', headerName: 'Start Date L', hide: true, filterable: false },
        { field: 'deployEndDate', headerName: 'End Date',  hide: true, width: 120, align: 'center', headerAlign: 'center'  },
        { field: 'deployEndDateL', headerName: 'End Date L', hide: true, filterable: false },
        { field: 'billabilityStatus', headerName: 'Billability', width: 120, align: 'center', headerAlign: 'center' },
        { field: 'deployedCurrentStatus', headerName: 'Current Status', width: 150, align: 'center', headerAlign: 'center'  },
        { field: 'action', headerName: 'Action', width: 105, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="Update Deployed Resource" onClick={() => {
                        setDeploymentID(params.row.id);
                        {/* setDeploymentID(params.row.deploymentID); */}
                        setResourceName(params.row.resourceID + "::" + params.row.resourceName);
                        setClientName(params.row.clientID + "::" + params.row.clientName);
                        AuthService.getClientBasedProjectList(params.row.clientID, user.userData.userRole, user.userData.resourceID).then((response) => {
                            setProjectNameList(response);
                            setProjectName(params.row.projectID + "::" + params.row.projectName);
                        });

                        AuthService.getClntPrjctBasedProjectList(params.row.clientID, params.row.projectID, user.userData.userRole, user.userData.resourceEmail).then((response) => {
                            setAppNameList(response);
                            setAppName(params.row.applicationID + "::" + params.row.applicationName);
                        });
                        AuthService.appBasedTrackNameList(params.row.applicationID, user.userData.userRole, user.userData.resourceEmail).then((response) => {
                            setTrackNameList(response);
                        });
                        {/* setProjectName(params.row.projectID + "::" + params.row.projectName); */}
                        
                        setTrackName(params.row.trackID);
                        setDeployStartDate(new Date(params.row.deployStartDate));
                        setDeployEndDate(new Date(params.row.deployEndDate));
                        setDeployDesignation(params.row.deployDesignation);
                        setbillabilityStatus(params.row.billabilityStatus);
                        setDeployedCurrentStatus(params.row.deployedCurrentStatus);
                        setFormHeaderText("Update Deployed Resource");
                        setSubmitBtText("Update Deployed Resource");
                        setAction('update');
                    }}>
                        <img src={EditIcon} width='20' height='20' title='Update Deployed Resource' alt='Update Deployed Resource' />
                    </IconButton>
                    <IconButton color="primary" aria-label="Delete Deployed Resource" onClick={() => {
                        setDeleteDeployedResource(params.row);
                        setDeleteAlert(true);
                     }}>
                        <img src={DeleteIcon} width='20' height='20' title='Delete Deployed Resource' alt='Delete Deployed Resource' />
                    </IconButton>
                </div>
            )
        }
    ];

    const [tbRows, setTbRows] = React.useState([]);
    const [originalTBRows, setOriginalTBRows] = React.useState([]);

    const noRow = () => {
        return (
            <GridOverlay className={commonClasses.emptyMsg}><DescriptionIcon />  No Resource Found</GridOverlay>
        );
    }

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

    const [ user, setUser ]  = useContext(Context);
    
    useEffect(() => {

        if (user.isLogin) {
            document.title = "Deploy Resource | easySWAT";
            // AuthService.getResourceNameListForDeploy(user.userData.role, user.userData.resourceID, user.userData.email).then((response) => {
            //     response.sort((row1, row2) => (row1.resourceName > row2.resourceName) ? 1 : -1);
            //     setResourceNameList(response);
            // });
            AuthService.getResourceNameList().then((response) => {
                setResourceNameList(response);
            });
            AuthService.getClientDetailsList(user.userData.userRole, user.userData.resourceID).then((response) => {
                // response.sort((row1, row2) => (row1.clientName > row2.clientName) ? 1 : -1);
                setClientNameList(response);
            });
            AuthService.getDropDownValues("Resource_Billability_Status").then((response) => {
                setbillabilityStatusList(response);
            });
            AuthService.getDropDownValues("Resource_Current_Status").then((response) => {
                setDeployedCurrentStatusList(response);
            });
            AuthService.getDropDownValues("External_Designation").then((response) => {
                setDeployDesignationList(response);
            });
            AuthService.getDeployedResourceList(user.userData.userRole, user.userData.resourceName).then((response) => {
                setTbRows(response);
                setOriginalTBRows(response);
                setSearchText("");
            });
        }
    }, [user]);

    if (!user.isLogin) {
        return <Authentication />
    }

    return (<div className={commonClasses.page}>
        <Snackbar
            open={error}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
                {errorMsg}
            </Alert>
        </Snackbar>
        <Dialog open={deleteAlert} onClose={closeDeleteAlert} className={commonClasses.deleteAlert}>
            <DialogTitle>Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <WarningAmberRoundedIcon className={commonClasses.warningIcon}/> Are you sure want to delete deployed resource <b>{deleteDeployedResource.resourceName}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDeleteAlert} className={commonClasses.cancelSubmitButton}>Cancel</Button>
                <Button onClick={handleDeleteAlertSubmit} className={commonClasses.deleteAlertSubmit}>Delete</Button>
            </DialogActions>
        </Dialog>
        
        <br />
        <br />

        <Paper variant="outlined" className={commonClasses.formPageMediumOuter}>
            <div className={commonClasses.formPageHeader} >{formHeaderText} </div>
            <div className={commonClasses.formPageBody} >
            <Grid container paddingLeft={6}>
                <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                <label className={commonClasses.formPageBodyLabel} >Resource Name</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            id="resourceName"
                            error={resourceNameError}
                            value={resourceName}
                            onChange={event => {
                                setResourceName(event.target.value);
                                setResourceNameError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Resource Name">Select Resource Name</MenuItem>

                            {resourceNameList.map(resource =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={resource.resourceID} value={resource.resourceID + "::" + resource.resourceName}>{resource.resourceName}</MenuItem>
                            )}
                        </Select>
                    
                </Grid>
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
                                id="clientName"
                                error={clientNameError}
                                value={clientName}
                                onChange={event => {
                                    setClientName(event.target.value);
                                    setClientNameError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    if(event.target.value !== "Select Client Name"){
                                        AuthService.getClientBasedProjectList(event.target.value.split("::")[0], user.userData.userRole, user.userData.resourceEmail).then((response) => {
                                            setProjectNameList(response);
                                            setProjectName("Select Project Name");
                                        });
                                    }
                                    else{
                                        setProjectNameList([]);
                                    }
                                }}
                            >
                                <MenuItem style={{fontSize: '14px', height: '30px'}} value="Select Client Name">Select Client Name</MenuItem>

                                {clientNameList.map(client =>
                                    <MenuItem style={{fontSize: '14px', height: '30px'}} key={client.clientID} value={client.clientID + "::" + client.clientName}>{client.clientName}</MenuItem>
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
                                id="projectName"
                                error={projectNameError}
                                value={projectName}
                                onChange={event => {
                                    setProjectName(event.target.value);
                                    setProjectNameError(false);
                                    setError(false);
                                    setErrorMsg("");

                                    if(event.target.value !== "Select Project Name"){
                                        AuthService.getClntPrjctBasedProjectList(clientName.split("::")[0], event.target.value.split("::")[0], user.userData.userRole, user.userData.resourceEmail).then((response) => {
                                            setAppNameList(response);
                                            setAppName("Select Application Name");
                                        });
                                    }
                                    else{
                                        setAppNameList([]);
                                        setAppName("Select Application Name");
                                    }

                                }}
                            >
                                <MenuItem style={{fontSize: '14px', height: '30px'}} value="Select Project Name">Select Project Name</MenuItem>

                                {projectNameList.map(project =>
                                    <MenuItem style={{fontSize: '14px', height: '30px'}} key={project.projectID} value={project.projectID + "::" + project.projectName}>{project.projectName}</MenuItem>
                                )}
                            </Select>
                    </Grid>

                    <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <label className={commonClasses.formPageBodyLabel} >Application Name</label>
                            <Select
                                style={{
                                    width: '200px',
                                    height: '30px',
                                    display: 'flex',
                                    color: '#3b4452',
                                    fontSize: '14px',
                                }}
                                id="appName"
                                error={appNameError}
                                value={appName}
                                onChange={event => {
                                    setAppName(event.target.value);
                                    setAppNameError(false);
                                    setError(false);
                                    setErrorMsg("");
                                    setTrackName([]);

                                    if (event.target.value !== 'Select Application Name') {
                                        AuthService.appBasedTrackNameList(event.target.value.split("::")[0], user.userData.userRole, user.userData.resourceEmail).then((response) => {
                                            setTrackNameList(response);
                                        });
                                    }

                                }}
                            >
                                <MenuItem style={{fontSize: '14px', height: '30px'}} value="Select Application Name">Select Application Name</MenuItem>

                                {appNameList.map(app =>
                                    <MenuItem style={{fontSize: '14px', height: '30px'}} key={app.applicationID} value={app.applicationID + "::" + app.applicationName}>{app.applicationName}</MenuItem>
                                )}
                            </Select>
                </Grid>
                <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }}>
                <label className={commonClasses.formPageBodyLabel} >Track Name</label>
                    <Select
                                style={{
                                    width: '200px',
                                    height: '30px',
                                    display: 'flex',
                                    color: '#3b4452',
                                    fontSize: '14px',
                                }}
                                id="trackName"
                                error={trackNameError}
                                value={trackName}
                                multiple
                                onChange={event => {

                                    const { target: { value }, } = event;
                                    setTrackName(typeof value === 'string' ? value.split(',') : value,);
                                    setTrackName(event.target.value);
                                    setTrackNameError(false);
                                    setError(false);
                                    setErrorMsg("");

                                }}
                            >
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Track Name">Select Track Name</MenuItem>

                                {trackNameList.map(track =>
                                    <MenuItem style={{ fontSize: '14px', height: '30px' }} key={track.trackID} value={track.trackID}>{track.trackName}</MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <label className={commonClasses.formPageBodyLabel} >Deploy Start Date</label>
                            <KeyboardDatePicker
                                style={{
                                    width: '200px',
                                    height: '30px',
                                    display: 'flex',
                                    color: '#3b4452',
                                    fontSize: '14px',
                                }}
                                id="deployStartDate"
                                labelid="deploy-start-date-label"
                                format="dd/MM/yyyy"
                                value={deployStartDate}
                                onChange={
                                    date => {
                                        setDeployStartDate(date);
                                        setDeployStartDateError(false);
                                        setDeployEndDateError(false);
                                        setError(false);
                                        setErrorMsg("");
                                        if (new Date(date).getTime() > deployEndDate.getTime()) {
                                            setDeployEndDateError(true);
                                            setNoteErrorMsg("Please select valid Start Date & End Date. End Date should be greater Start Date.");
                                            setNoteError(true);
                                        } else{
                                            setNoteErrorMsg("");
                                            setNoteError(false);
                                        }
                                    }
                                }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                error={deployStartDateError}
                            />
                        </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <label className={commonClasses.formPageBodyLabel} >Deploy End Date</label>
                            <KeyboardDatePicker
                                style={{
                                    width: '200px',
                                    height: '30px',
                                    display: 'flex',
                                    color: '#3b4452',
                                    fontSize: '14px',
                                }}
                                id="deployEndDate"
                                format="dd/MM/yyyy"
                                value={deployEndDate}
                                onChange={
                                    date => {
                                        setDeployEndDate(date);
                                        setDeployStartDateError(false);
                                        setDeployEndDateError(false);
                                        setError(false);
                                        setErrorMsg("");
                                        if (deployStartDate.getTime() > new Date(date).getTime()) {
                                            setDeployEndDateError(true);
                                            setNoteErrorMsg("Please select valid Start Date & End Date. End Date should be greater Start Date.");
                                            setNoteError(true);
                                        }
                                        else{
                                            setNoteErrorMsg("");
                                            setNoteError(false);
                                        }
                                    }
                                }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                error={deployEndDateError}
                            />
                        </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                <label className={commonClasses.formPageBodyLabel} >Deploy Designation</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}
                            id="deployDesignation"
                            error={deployDesignationError}
                            value={deployDesignation}
                            onChange={event => {
                                setDeployDesignation(event.target.value);
                                setDeployDesignationError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >

                                <MenuItem style={{fontSize: '14px', height: '30px'}} value="Select Deploy Designation">Select Deploy Designation</MenuItem>
                                {deployDesignationList.map(designation =>
                                    <MenuItem style={{fontSize: '14px', height: '30px'}} key={designation} value={designation}>{designation}</MenuItem>
                                )}
                        </Select>
                </Grid>
                {/* {
                    noteError ? <Grid item xs={12} className={classes.error}><p>Note : {noteErrorMsg}</p></Grid> : null
                } */}
                <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                <label className={commonClasses.formPageBodyLabel} >Billability Status</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}
                            id="billabilityStatus"
                            error={billabilityStatusError}
                            value={billabilityStatus}
                            onChange={event => {
                                setbillabilityStatus(event.target.value);
                                setbillabilityStatusError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >
                            <MenuItem style={{fontSize: '14px', height: '30px'}} value="Select Billability Status">Select Billability Status</MenuItem>
                                {billabilityStatusList.map(billstatus =>
                                    <MenuItem style={{fontSize: '14px', height: '30px'}} key={billstatus} value={billstatus}>{billstatus}</MenuItem>
                                )}
                        </Select>
                </Grid>
                <Grid item xs={4} sx={{mt: '10px', mb: '10px'}}>
                <label className={commonClasses.formPageBodyLabel} >Current Status</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}
                            id="deployedCurrentStatus"
                            error={deployedCurrentStatusError}
                            value={deployedCurrentStatus}
                            onChange={event => {
                                setDeployedCurrentStatus(event.target.value);
                                setDeployedCurrentStatusError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >

                            <MenuItem style={{fontSize: '14px', height: '30px'}} value="Select Current Status">Select Current Status</MenuItem>
                                {deployedCurrentStatusList.map(curstatus =>
                                    <MenuItem style={{fontSize: '14px', height: '30px'}} key={curstatus} value={curstatus}>{curstatus}</MenuItem>
                                )}
                        </Select>
                </Grid>
            </Grid>
            <br />
            <Grid item sx={{mt: '10px', mb: '10px'}} className={commonClasses.formPageBodyButtonField}>
            <button className={commonClasses.formPageBodyButton} onClick={handleSubmitAction}> {submitBtText} </button>
                {/* <Button variant="contained" className={commonClasses.submitButton} onClick={handleSubmitAction} >{submitBtText}</Button> */}
            </Grid >
            </div>
            <br />
        </Paper>
        <br />
        <br />
       
        <Paper variant="outlined" className={commonClasses.formPageMediumOuter}>
        <div className={commonClasses.formPageHeader} >Deployed Resources</div>
            <div className={commonClasses.formPageBody} >   
                <DataGrid 
                    style={{ padding: 10, fontSize: 12 }}
                    rows={tbRows} 
                    columns={tbColumns}
                    className={tableClasses.root}
                    rowHeight={34}
                    headerHeight={34}
                    pageSize={10} 
                    components={
                        { 
                            Toolbar: QuickSearchToolbar,
                            NoRowsOverlay: noRow 
                        }
                    }
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
        <Footer />
    </div>)
}

 