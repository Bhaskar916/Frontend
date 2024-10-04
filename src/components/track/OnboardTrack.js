/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import commonStyles from '../common/common-css/CommonStyle';
import Paper from '@material-ui/core/Paper';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Footer from '../common/footer/Footer';
import TextField from '@material-ui/core/TextField';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import DescriptionIcon from '@material-ui/icons/Description';
import AuthService from '../services/AuthService';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '../../assets/images/editicon.png';
import DeleteIcon from '../../assets/images/delete_icon.png';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Context } from '../common/UserAuth';
import Authentication from '../common/AuthComponent';
import QuickSearchToolbar from '../common/QuickSearchToolbar';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';

const tableStyles = makeStyles(() => ({
    root: {
        '& .MuiDataGrid-columnsContainer': {
            backgroundColor: '#f8f8f8',
            color: 'black',
        },
    },
}));

export default function OnboardTrack() {

    const commonClasses = commonStyles();
    const tableClasses = tableStyles();

    const [user, setUser] = useContext(Context);

    const [action, setAction] = React.useState("add");
    const [alertSeverity, setAlertSeverity] = React.useState("warning");

    const [formHeaderText, setFormHeaderText] = React.useState("Onboard Track");
    const [submitBtText, setSubmitBtText] = React.useState("Onboard Track");

    const [deleteTrackData, setDeleteTrackData] = React.useState("");
    const [deleteAlert, setDeleteAlert] = React.useState(false);

    const [trackID, setTrackID] = React.useState("");

    const [searched, setSearched] = React.useState("");

    const [trackName, setTrackName] = React.useState("Select Track Name");
    const [trackNameError, setTrackNameError] = React.useState(false);
    const [trackNameList, setTrackNameList] = React.useState([]);

    const [clientName, setClientName] = React.useState("Select Client Name");
    const [clientNameError, setClientNameError] = React.useState(false);
    const [clientNameList, setClientNameList] = React.useState([]);

    const [projectName, setProjectName] = React.useState("Select Project Name");
    const [projectNameError, setProjectNameError] = React.useState(false);
    const [projectNameList, setProjectNameList] = React.useState([]);

    const [appName, setAppName] = React.useState("Select Application Name");
    const [appNameError, setAppNameError] = React.useState(false);
    const [appNameList, setAppNameList] = React.useState([]);

    const [startDate, setStartDate] = React.useState(new Date());
    const [startDateError, setStartDateError] = React.useState(false);

    const [endDate, setEndDate] = React.useState(new Date());
    const [endDateError, setEndDateError] = React.useState(false);

    const [trackOwner, setTrackOwner] = React.useState("Select Track Owner");
    const [trackOwnerError, setTrackOwnerError] = React.useState(false);
    const [trackOwnerList, setTrackOwnerList] = React.useState([]);

    const [briefAbout, setBriefAbout] = React.useState("");
    const [briefAboutError, setBriefAboutError] = React.useState(false);
    const [briefAboutErrorMsg, setBriefAboutErrorMsg] = React.useState("");

    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const [noteError, setNoteError] = React.useState(false);
    const [noteErrorMsg, setNoteErrorMsg] = React.useState("");

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

    const reloadTrackList = () => {
        AuthService.getTrackDetailsList(user.userData.userRole, user.userData.resourceEmail).then((response) => {
            setTbRows(response);
            setOriginalTBRows(response);
        });
    }

    const resetField = () => {
        setTrackName("Select Track Name");
        setClientName("Select Client Name");
        setProjectNameList([]);
        setProjectName("Select Project Name");
        setAppNameList([]);
        setAppName("Select Application Name");
        setStartDate(new Date());
        setEndDate(new Date());
        setTrackOwner("Select Track Owner");
        setBriefAbout("");
        setFormHeaderText("Onboard Track");
        setSubmitBtText("Onboard Track");
        setNoteErrorMsg("");
        setNoteError(false);
    }

    const handleDeleteAlertSubmit = () => {
        AuthService.deleteOnboardedTrack(deleteTrackData.trackID).then((response) => {
            if (response === "Deleted") {
                setAlertSeverity("success");
                setError(true);
                setErrorMsg("Track deleted successfully");
                reloadTrackList();
            }
            else {
                setError(true);
                setErrorMsg("Error while Deleting the Track");
            }
        });
        resetField();
        setDeleteAlert(false);
    }

    const handleSubmitAction = () => {

        let tempStartDate = new Date(startDate).getTime();
        let tempEndDate = new Date(endDate).getTime();

        if (trackName === '' || trackName === 'Select Track Name' || !(trackNameList.includes(trackName))) {
            setTrackNameError(true);
            setError(true);
            setErrorMsg("Please Select Track Name");
        } else if (clientName === 'Select Client Name') {
            setClientNameError(true);
            setError(true);
            setErrorMsg("Please Select Client Name");
        } else if (projectName === 'Select Project Name') {
            setProjectNameError(true);
            setError(true);
            setErrorMsg("Please Select Project Name");
        } else if (appName === 'Select Application Name') {
            setAppNameError(true);
            setError(true);
            setErrorMsg("Please Select Application Name");
        } else if (tempStartDate !== new Date(startDate).getTime()) {
            setStartDateError(true);
            setError(true);
            setErrorMsg("Please Select Start Date. (Format : DD/MM/YYYY, Ex : 01/01/2021)");
        } else if (tempEndDate !== new Date(endDate).getTime()) {
            setEndDateError(true);
            setError(true);
            setErrorMsg("Please Select End Date. (Format : DD/MM/YYYY, Ex : 01/01/2021)");
        } else if (startDate.getTime() > endDate.getTime()) {
            setEndDateError(true);
            setErrorMsg("Please select valid Start Date & End Date. End Date should be greater Start Date.");
            setError(true);
        } else if (trackOwner === 'Select Track Owner') {
            setProjectNameError(true);
            setError(true);
            setErrorMsg("Please Select Track Owner");
        } else if (briefAbout === '') {
            setBriefAboutError(true);
            setBriefAboutErrorMsg("Please Enter Brief About")
            setError(true);
            setErrorMsg("Please Enter Brief About");
        } else {

            var clientData = clientName.split("::");
            var projectData = projectName.split("::");
            var appData = appName.split("::");
            var trackOwnerData = trackOwner.split("::");

            let formData = {
                trackName: trackName,
                clientID: clientData[0],
                clientName: clientData[1],
                projectID: projectData[0],
                projectName: projectData[1],
                applicationID: appData[0],
                applicationName: appData[1],
                trackOwnerID: trackOwnerData[0],
                startDate: startDate,
                endDate: endDate,
                trackBrief: briefAbout
            }

            console.log(formData);


            if (action === "update") {
                formData["trackID"] = trackID;
                AuthService.updateOnboardedTrack(formData).then((response) => {
                    if (response === "Updated") {
                        setAlertSeverity("success");
                        setError(true);
                        setErrorMsg("Track Updated Successfully");
                        setAction("add");
                    }
                    else {
                        setError(true);
                        setErrorMsg("Error while updating the Track");
                    }
                    reloadTrackList();
                    resetField();
                });
            }
            else {
                AuthService.onboardTrack(formData).then((response) => {
                    if (response === "Added") {
                        setAlertSeverity("success");
                        setError(true);
                        setErrorMsg("Track Onboarded Successfully");
                        resetField();
                    } else if (response === "Duplicate") {
                        setAlertSeverity("warning");
                        setError(true);
                        setErrorMsg("Track Already Exists");
                    } else {
                        setError(true);
                        setErrorMsg("Error while Onboarding the track");
                    }
                    reloadTrackList();
                });
            }
        }
    };

    const tbColumns = [
        { field: 'id', headerName: 'Row ID', hide: true, filterable: false },
        { field: 'trackID', headerName: 'Track ID', hide: true, filterable: false },
        { field: 'trackName', headerName: 'Track Name', width: 160, align: 'center', headerAlign: 'center' },
        { field: 'trackOwnerName', headerName: 'Track Owner', width: 160, align: 'center', headerAlign: 'center' },
        { field: 'clientName', headerName: 'Client', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'projectName', headerName: 'Project', width: 155, align: 'center', headerAlign: 'center' },
        { field: 'applicationName', headerName: 'Application', width: 150, align: 'center', headerAlign: 'center' },
        {
            field: 'action', headerName: 'Action', width: 100, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="Update client" onClick={() => {

                        setTrackID(params.row.trackID);
                        setTrackName(params.row.trackName);
                        setClientName(params.row.clientID + "::" + params.row.clientName);

                        AuthService.getClientBasedProjectList(params.row.clientID, user.userData.userRole, user.userData.resourceEmail).then((proResp) => {
                            setProjectNameList(proResp);
                            setProjectName(params.row.projectID + "::" + params.row.projectName);

                            AuthService.getClntPrjctBasedProjectList(params.row.clientID, params.row.projectID, user.userData.userRole, user.userData.resourceEmail).then((appResp) => {
                                setAppNameList(appResp);
                                setAppName(params.row.applicationID + "::" + params.row.applicationName);
                            });

                        });

                        setTrackOwner(params.row.trackOwnerID + "::" + params.row.trackOwnerEmail + "::" + params.row.trackOwnerName);
                        setStartDate(new Date(params.row.startDateL));
                        setEndDate(new Date(params.row.endDateL));
                        setBriefAbout(params.row.trackBrief);
                        setFormHeaderText("Update Track");
                        setSubmitBtText("Update Track");
                        setAction("update");
                    }}>
                        <img src={EditIcon} width='20' height='20' title='Update Track' alt='Update Track' />
                    </IconButton>
                    <IconButton color="primary" aria-label="Delete Track" onClick={() => {
                        setDeleteTrackData(params.row);
                        setDeleteAlert(true);
                    }}>
                        <img src={DeleteIcon} width='20' height='20' title='Delete Track' alt='Delete Track' />
                    </IconButton>
                </div>
            )
        }
    ];


    const [tbRows, setTbRows] = React.useState([]);
    const [originalTBRows, setOriginalTBRows] = React.useState([]);

    const noRow = () => {
        return (
            <GridOverlay className={commonClasses.emptyMsg}><DescriptionIcon />  No Tracks Found</GridOverlay>
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

    useEffect(() => {
        if (user.isLogin) {
            document.title = "File Upload | AmlFileUploader";

            AuthService.getClientNameList(user.userData.userRole, user.userData.resourceEmail).then((response) => {
                setClientNameList(response);
            });

            AuthService.getResourceNameList().then((response) => {
                setTrackOwnerList(response);
            });

            AuthService.getTrackDetailsList(user.userData.userRole, user.userData.resourceEmail).then((response) => {
                setTbRows(response);
                setOriginalTBRows(response);
            });

            AuthService.getDropDownValues("Track_Type").then((response) => {
                setTrackNameList(response);
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
                    <WarningAmberRoundedIcon className={commonClasses.warningIcon} /> Are you sure want to delete Track <b>{deleteTrackData.trackName}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDeleteAlert} className={commonClasses.cancelSubmitButton}>Cancel</Button>
                <Button onClick={handleDeleteAlertSubmit} className={commonClasses.deleteAlertSubmit}>Delete</Button>
            </DialogActions>
        </Dialog>

        <br />
        <br />

        <Paper variant="outlined" className={commonClasses.formPageMediumOuter} >
            <div className={commonClasses.formPageHeader} >{formHeaderText} </div>
            <div className={commonClasses.formPageBody} >
                <Grid container >

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
                            onChange={event => {
                                setTrackName(event.target.value);
                                setTrackNameError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Track Name">Select Track Name</MenuItem>

                            {trackNameList.map(track =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={track} value={track}>{track}</MenuItem>
                            )}
                        </Select>
                    </Grid>

                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }}>
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
                                if (event.target.value !== "Select Client Name") {
                                    AuthService.getClientBasedProjectList(event.target.value.split("::")[0], user.userData.userRole, user.userData.resourceEmail).then((response) => {
                                        setProjectNameList(response);
                                        setProjectName("Select Project Name");
                                    });
                                }
                                else {
                                    setProjectNameList([]);
                                }
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Client Name">Select Client Name</MenuItem>

                            {clientNameList.map(client =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={client.clientID} value={client.clientID + "::" + client.clientName}>{client.clientName}</MenuItem>
                            )}
                        </Select>
                    </Grid>

                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }}>
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

                                if (event.target.value !== "Select Project Name") {
                                    AuthService.getClntPrjctBasedProjectList(clientName.split("::")[0], event.target.value.split("::")[0], user.userData.userRole, user.userData.resourceEmail).then((response) => {
                                        setAppNameList(response);
                                        setAppName("Select Application Name");
                                    });
                                }
                                else {
                                    setAppNameList([]);
                                    setAppName("Select Application Name");
                                }

                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Project Name">Select Project Name</MenuItem>

                            {projectNameList.map(project =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={project.projectID} value={project.projectID + "::" + project.projectName}>{project.projectName}</MenuItem>
                            )}
                        </Select>
                    </Grid>

                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }}>
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
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Application Name">Select Application Name</MenuItem>

                            {appNameList.map(app =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={app.applicationID} value={app.applicationID + "::" + app.applicationName}>{app.applicationName}</MenuItem>
                            )}
                        </Select>
                    </Grid>


                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <label className={commonClasses.formPageBodyLabel} >Start Date</label>
                            <KeyboardDatePicker
                                style={{
                                    width: '200px',
                                    height: '30px',
                                    display: 'flex',
                                    color: '#3b4452',
                                    fontSize: '14px',
                                }}
                                id="startDate"
                                format="dd/MM/yyyy"
                                value={startDate}
                                onChange={
                                    date => {
                                        setStartDate(date);
                                        setStartDateError(false);
                                        setError(false);
                                        setErrorMsg("");
                                        if (new Date(date).getTime() > endDate.getTime()) {
                                            setEndDateError(true);
                                            setNoteErrorMsg("Please select valid Start Date & End Date. End Date should be greater Start Date.");
                                            setNoteError(true);
                                        } else {
                                            setEndDateError(false);
                                            setNoteErrorMsg("");
                                            setNoteError(false);
                                        }
                                    }
                                }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                error={startDateError}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }} >
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <label className={commonClasses.formPageBodyLabel} >End Date</label>
                            <KeyboardDatePicker
                                style={{
                                    width: '200px',
                                    height: '30px',
                                    display: 'flex',
                                    color: '#3b4452',
                                    fontSize: '14px',
                                }}
                                id="endDate"
                                format="dd/MM/yyyy"
                                value={endDate}
                                onChange={
                                    date => {
                                        setEndDate(date);
                                        setEndDateError(false);
                                        setError(false);
                                        setErrorMsg("");
                                        if (startDate.getTime() > new Date(date).getTime()) {
                                            setEndDateError(true);
                                            setNoteErrorMsg("Please select valid Start Date & End Date. End Date should be greater Start Date.");
                                            setNoteError(true);
                                        }
                                        else {
                                            setNoteErrorMsg("");
                                            setNoteError(false);
                                        }
                                    }
                                }
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                error={endDateError}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    {
                        noteError ? <Grid item xs={12} className={commonClasses.projectError}><p>Note : {noteErrorMsg}</p></Grid> : null
                    }

                    <Grid item xs={12} sx={{ mt: '10px', mb: '10px' }} >
                        <label className={commonClasses.formPageBodyLabel} >Track Owner Name</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}
                            id="trackOwner"
                            error={trackOwnerError}
                            value={trackOwner}
                            onChange={event => {
                                setTrackOwner(event.target.value);
                                setTrackOwnerError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Track Owner">Select Track Owner</MenuItem>

                            {trackOwnerList.map(owner =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={owner.resourceEmail} value={owner.resourceID + "::" + owner.resourceEmail + "::" + owner.resourceName}>{owner.resourceName + "(" + owner.resourceEmail + ")"}</MenuItem>
                            )}

                        </Select>
                    </Grid>


                    <Grid item xs={12} sx={{ mt: '10px', mb: '10px' }} >
                        <label className={commonClasses.formPageBodyLabel} >Brief About Track</label>

                        <textarea
                            className={commonClasses.formPageBodyTextarea}
                            id="briefAbout"
                            placeholder="Enter Brief About Track"
                            rows='4'
                            value={briefAbout}
                            onChange={event => {
                                setBriefAbout(event.target.value);
                                setBriefAboutErrorMsg("");
                                setBriefAboutError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                            helperText={briefAboutErrorMsg}
                            error={briefAboutError}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: '10px', mb: '10px' }} className={commonClasses.formPageBodyButtonField}>
                        <button className={commonClasses.formPageBodyButton} onClick={handleSubmitAction}> {submitBtText} </button>
                    </Grid>
                </Grid >
            </div>
        </Paper>

        <br />
        <br />

        <Paper variant="outlined" className={commonClasses.formPageMediumOuter} >
            <div className={commonClasses.formPageHeader} >Track List</div>
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
        <br />
        <br />

        <Footer />
    </div >)
}



