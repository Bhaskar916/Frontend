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

export default function OnboardClient() {
    // const classes = useStyles();
    const commonClasses = commonStyles();
    const tableClasses = tableStyles();
    const [user, setUser] = useContext(Context);

    const [action, setAction] = React.useState("add");
    const [alertSeverity, setAlertSeverity] = React.useState("warning");

    const [formHeaderText, setFormHeaderText] = React.useState("Onboard Client");
    const [submitBtText, setSubmitBtText] = React.useState("Onboard Client");

    const [deleteClientData, setDeleteClientData] = React.useState("");
    const [deleteAlert, setDeleteAlert] = React.useState(false);

    const [clientID, setClientID] = React.useState("");

    const [searched, setSearched] = React.useState("");

    const [clientName, setClientName] = React.useState("");
    const [clientNameError, setClientNameError] = React.useState(false);
    const [clientNameErrorMsg, setClientNameErrorMsg] = React.useState("");

    const [location, setLocation] = React.useState("Select Location");
    const [locationError, setLocationError] = React.useState(false);
    const [locationList, setLocationList] = React.useState([]);

    const [briefAbout, setBriefAbout] = React.useState("");
    const [briefAboutError, setBriefAboutError] = React.useState(false);
    const [briefAboutErrorMsg, setBriefAboutErrorMsg] = React.useState("");

    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

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

    const reloadClientList = () => {
        AuthService.getClientDetailsList(user.userData.userRole, user.userData.resourceEmail).then((response) => {
            setTbRows(response);
            setOriginalTBRows(response);
        });
    }

    const resetField = () => {
        setClientName("");
        setBriefAbout("");
        setLocation("Select Location");
        setFormHeaderText("Onboard Client");
        setSubmitBtText("Onboard Client");
    }

    const handleDeleteAlertSubmit = () => {
        AuthService.deleteOnboardedClient(deleteClientData.clientID).then((response) => {
            if (response === "Deleted") {
                setAlertSeverity("success");
                setError(true);
                setErrorMsg("Client deleted successfully");
                reloadClientList();
            }
            else {
                setError(true);
                setErrorMsg("Error while Deleting the client");
            }
        });
        resetField();
        setDeleteAlert(false);
    }

    const handleSubmitAction = () => {
        if (clientName === '') {
            setClientNameError(true);
            setClientNameErrorMsg("Please Enter Client Name");
            setError(true);
            setErrorMsg("Please Enter Client Name");
        } else if (location === 'Select Location') {
            setLocationError(true);
            setError(true);
            setErrorMsg("Please Select Location");
        } else if (briefAbout === '') {
            setBriefAboutError(true);
            setBriefAboutErrorMsg("Please Enter Brief About")
            setError(true);
            setErrorMsg("Please Enter Brief About");
        } else {
            let formData = {
                clientName: clientName,
                location: location,
                clientBrief: briefAbout
            }


            if (action === "update") {
                formData["clientID"] = clientID;
                AuthService.updateOnboardedClient(formData).then((response) => {
                    if (response === "Updated") {
                        setAlertSeverity("success");
                        setError(true);
                        setErrorMsg("Client Updated Successfully");
                        setAction("add");
                    }
                    else {
                        setError(true);
                        setErrorMsg("Error while updating the client");
                    }
                    reloadClientList();
                    resetField();
                });
            }
            else {
                AuthService.onboardClient(formData).then((response) => {
                    if (response === "Added") {
                        setAlertSeverity("success");
                        setError(true);
                        setErrorMsg("Client Onboarded Successfully");
                        resetField();
                    } else if (response === "Duplicate") {
                        setAlertSeverity("warning");
                        setError(true);
                        setErrorMsg("Client Already Exists");
                    } else {
                        setError(true);
                        setErrorMsg("Error while Onboarding the client");
                    }
                    reloadClientList();
                });
            }
        }
    };

    const tbColumns = [
        { field: 'id', headerName: 'client ID', hide: true, filterable: false },
        { field: 'clientID', headerName: 'client ID', hide: true, filterable: false },
        { field: 'clientName', headerName: 'Client Name', width: 165, align: 'center', headerAlign: 'center'},
        { field: 'location', headerName: 'Location', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'clientBrief', headerName: 'Brief About', width: 360, align: 'left', headerAlign: 'center' },
        {
            field: 'action', headerName: 'Action', width: 100, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="Update client" onClick={() => {
                        setClientName(params.row.clientName);
                        setClientID(params.row.clientID);
                        setLocation(params.row.location);
                        setBriefAbout(params.row.clientBrief);
                        setFormHeaderText("Update Client");
                        setSubmitBtText("Update Client");
                        setAction("update");
                    }}>
                        <img src={EditIcon} width='20' height='20' title='Update client' alt='Update client' />
                    </IconButton>
                    <IconButton color="primary" aria-label="Delete client" onClick={() => {
                        setDeleteClientData(params.row);
                        setDeleteAlert(true);
                    }}>
                        <img src={DeleteIcon} width='20' height='20' title='Delete client' alt='Delete client' />
                    </IconButton>
                </div>
            )
        }
    ];


    const [tbRows, setTbRows] = React.useState([]);
    const [originalTBRows, setOriginalTBRows] = React.useState([]);

    const noRow = () => {
        return (
            <GridOverlay className={commonClasses.emptyMsg}><DescriptionIcon />  No Clients Found</GridOverlay>
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
            document.title = "Onboard Client | easySWAT";
            AuthService.getClientDetailsList(user.userData.userRole, user.userData.resourceEmail).then((response) => {
                response.sort((row1, row2) => (row1.clientName > row2.clientName) ? 1 : -1);
                setTbRows(response);
                setOriginalTBRows(response);
            });
            AuthService.getDropDownValues("Client_Location").then((response) => {
                setLocationList(response);
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
                    <WarningAmberRoundedIcon className={commonClasses.warningIcon} /> Are you sure want to delete client <b>{deleteClientData.clientName}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDeleteAlert} className={commonClasses.cancelSubmitButton}>Cancel</Button>
                <Button onClick={handleDeleteAlertSubmit} className={commonClasses.deleteAlertSubmit}>Delete</Button>
            </DialogActions>
        </Dialog>

        <br />
        <br />
        <Paper variant="outlined" className={commonClasses.formPageMiniOuter} >
            <div className={commonClasses.formPageHeader} >{formHeaderText}</div>
            <div className={commonClasses.formPageBody} >            
            <Grid container >
                <Grid item xs={6} sx={{mt: '10px', mb: '10px'}} >
                    
                    <label className={commonClasses.formPageBodyLabel} >Client Name</label>
                    <input 
                        className={commonClasses.formPageBodyInput} 
                        type='text'
                        id="clientName"
                        placeholder='Enter Client Name'
                        value={clientName}
                        onChange={event => {
                            setClientName(event.target.value);
                            setClientNameErrorMsg("");
                            setClientNameError(false);
                            setError(false);
                            setErrorMsg("");
                        }}
                        helpertext={clientNameErrorMsg}
                        error={clientNameError}
                        size="small"
                    />
                </Grid>
                <Grid item xs={6} sx={{mt: '10px', mb: '10px'}} >

                        <label className={commonClasses.formPageBodyLabel} >Location </label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}      
                            id="location"
                            error={locationError}
                            value={location}
                            onChange={event => {
                                setLocation(event.target.value);
                                setLocationError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >
                            <MenuItem style={{fontSize: '14px', height: '30px'}} value="Select Location">Select Location</MenuItem>

                            {locationList.map(location =>
                                <MenuItem style={{ fontSize: '14px',height: '30px'}} key={location} value={location}>{location}</MenuItem>
                            )}
                        </Select>
                </Grid>
                <Grid item xs={12} sx={{mt: '10px', mb: '10px'}}>
                    <label className={commonClasses.formPageBodyLabel} >Brief About Client</label>

                    <textarea 
                        className={commonClasses.formPageBodyTextarea} 
                        id="briefAbout"
                        placeholder="Enter Brief About Client"
                        rows="4"
                        value={briefAbout}
                        onChange={event => {
                            setBriefAbout(event.target.value);
                            setBriefAboutErrorMsg("");
                            setBriefAboutError(false);
                            setError(false);
                            setErrorMsg("");
                        }}
                        helpertext={briefAboutErrorMsg}
                        error={briefAboutError}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} sx={{mt: '10px', mb: '10px'}} className={commonClasses.formPageBodyButtonField}>
                    <button className={commonClasses.formPageBodyButton} onClick={handleSubmitAction}> {submitBtText} </button>
                </Grid>
            </Grid>
            </div>
        </Paper>

        <br/>
        <br/>

        <Paper variant="outlined" className={commonClasses.formPageMiniOuter} >
            <div className={commonClasses.formPageHeader} >Client's List</div>
            <div className={commonClasses.formPageBody} >          
                <DataGrid 
                    style={{ padding: 10, fontSize: 12 }}
                    rows={tbRows}
                    columns={tbColumns}
                    className={tableClasses.root}
                    rowHeight={34}
                    headerHeight={34}
                    headerFontWeight={600}
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



