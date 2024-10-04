/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import useStyles from '../css/OnboardResourcesStyle';
import Paper from '@material-ui/core/Paper';
import Grid from '@mui/material/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@mui/material/Alert';
import commonStyles from '../../../common/common-css/CommonStyle';
import Footer from '../../../common/footer/Footer';
import {
    DataGrid,
    GridOverlay,
} from '@material-ui/data-grid';
import DescriptionIcon from '@material-ui/icons/Description';
import AuthService from '../../../services/AuthService';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '../../../../assets/images/editicon.png';
import DeleteIcon from '../../../../assets/images/delete_icon.png';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Context } from '../../../common/UserAuth';
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


export default function OnboardResource() {

    const classes = useStyles();
    const tableClasses = tableStyles();
    const commonClasses = commonStyles();

    const [formHeaderText, setFormHeaderText] = React.useState("Onboard Resource");
    const [submitBtText, setSubmitBtText] = React.useState("Add Resource");

    const [action, setAction] = React.useState("add");

    const [alertSeverity, setAlertSeverity] = React.useState("warning");

    const [deleteResourceData, setDeleteResourceData] = React.useState({});
    const [deleteAlert, setDeleteAlert] = React.useState(false);

    const [resourceID, setResourceID] = React.useState("");
    const [resourceName, setResourceName] = React.useState("");
    const [resourceNameError, setResourceNameError] = React.useState(false);
    const [resourceNameErrorMsg, setResourceNameErrorMsg] = React.useState("");

    const [resourceEmail, setResourceEmail] = React.useState("");
    const [resourceEmailError, setResourceEmailError] = React.useState(false);
    const [resourceEmailErrorMsg, setResourceEmailErrorMsg] = React.useState("");


    const [contactNumber, setcontactNumber] = React.useState("");
    const [contactNumberError, setcontactNumberError] = React.useState(false);
    const [contactNumberErrorMsg, setcontactNumberErrorMsg] = React.useState("");

    const [internalDesignation, setInternalDesignation] = React.useState("Select Internal Designation");
    const [internalDesignationError, setInternalDesignationError] = React.useState(false);
    const [internalDesignationList, setInternalDesignationList] = React.useState([]);

    const [skills, setSkills] = React.useState("");
    const [skillsError, setSkillsError] = React.useState(false);

    const [reportManagName, setReportManagName] = React.useState("Select Reporting Manager");
    const [reportManagNameError, setReportManagNameError] = React.useState(false);
    const [reportManagNameList, setReportManagNameList] = React.useState([]);



    const [resourceType, setResourceType] = React.useState("Select Resource Type");
    const [resourceTypeError, setResourceTypeError] = React.useState(false);
    const [resourceTypeList, setResourceTypeList] = React.useState([]);

    const [resourceRole, setResourceRole] = React.useState("Select Resource Role");
    const [resourceRoleError, setResourceRoleError] = React.useState(false);
    const [resourceRoleList, setResourceRoleList] = React.useState([]);



    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const [searched, setSearched] = React.useState("");

    const [user, setUser] = useContext(Context);

    const reloadResourceList = () => {
        AuthService.getResourceDetailsList(user.userData.userRole, user.userData.resourceEmail).then((response) => {
            setTbRows(response);
            setSearchText("");
        });
    }

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
        AuthService.deleteOnboardedResource(deleteResourceData.resourceID).then((response) => {
            if (response === "Deleted") {
                setAlertSeverity("success");
                setError(true);
                setErrorMsg("Resource deleted successfully");
                reloadResourceList();
                resetField();
            }
            else {
                setError(true);
                setErrorMsg("Error while Deleting the resource");
            }
        });

        setDeleteAlert(false);
    }

    const resetField = () => {
        setResourceName("");
        setResourceNameError(false);
        setResourceEmail("");
        setResourceEmailError(false);
        setcontactNumber("");
        setcontactNumberError(false);
        setReportManagName("Select Reporting Manager");
        setReportManagNameError(false);
        setResourceRole("Select Resource Role");
        setResourceRoleError(false);
        setResourceType("Select Resource Type");
        setResourceTypeError(false);
        setFormHeaderText("Onboard Resource");
        setSubmitBtText("Add Resource");
        reloadResourceList();
    }

    const handleSubmitAction = () => {
        if (resourceName === '') {
            setResourceNameError(true);
            setResourceNameErrorMsg("Please Enter Resource Name")
            setError(true);
            setErrorMsg("Please Enter Resource Name");
        } else if (resourceEmail === '') {
            setResourceEmailError(true);
            setResourceEmailErrorMsg("Please Enter Resource Email")
            setError(true);
            setErrorMsg("Please Enter Resource Email");
        } else if (!(/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}[, \n]*)+$/.test(resourceEmail))) {
            setResourceEmailError(true);
            setResourceEmailErrorMsg("Please enter correct email ID.Eg : Example@domain.com");
            setError(true);
            setErrorMsg("Please enter correct email ID.Eg : Example@domain.com");
        } else if (!(/^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})+$/.test(contactNumber))) {
            setcontactNumberError(true);
            setcontactNumberErrorMsg("Please enter correct contact Number");
            setError(true);
            setErrorMsg("Please enter correct contact Number")
        } else if (reportManagName === 'Select Reporting Manager') {
            setReportManagNameError(true);
            setError(true);
            setErrorMsg("Please Select Manager Name");
        } else if (resourceRole.length === "Select Resource Role") {
            setResourceRoleError(true);
            setError(true);
            setErrorMsg("Please Select Resource Role");
        } else if (resourceType === 'Select Resource Type') {
            setResourceTypeError(true);
            setError(true);
            setErrorMsg("Please Select Resource Type");
        } else {
            let reportManagData = reportManagName.split("::");
            let formData = {
                resourceName: resourceName,
                resourceEmail: resourceEmail,
                resourceContact: contactNumber,
                reportManagEmail: reportManagData[0],
                reportManagName: reportManagData[1],
                resourceRole: resourceRole,
                resourceType: resourceType,
            }
            if (action === "update") {
                formData["resourceID"] = resourceID;
                AuthService.updateOnboardedResource(formData).then((response) => {
                    if (response === "Updated") {
                        setAlertSeverity("success");
                        setError(true);
                        setErrorMsg("Resource Updated Successfully");
                        setAction("add");
                    }
                    else {
                        setError(true);
                        setErrorMsg("Error while updating the resource");
                    }
                    reloadResourceList();
                    resetField();
                });
            }
            else {

                AuthService.onboardResource(formData).then((response) => {
                    if (response === "Onboarded") {
                        setAlertSeverity("success");
                        setError(true);
                        setErrorMsg("Resource Onboarded Successfully");
                        resetField();
                        formData["onboardedByName"] = user.userData.resourceName;
                        formData["onboardedByEmail"] = user.userData.resourceEmail;
                        AuthService.publishResource(formData).then((response) => {
                            console.log(response);
                        })
                    }
                    else if (response === "Duplicate") {
                        setAlertSeverity("warning");
                        setError(true);
                        setErrorMsg("Resource Email Already Exists");
                    } else {
                        setError(true);
                        setErrorMsg("Error while Onboarding the Resource");
                    }
                    reloadResourceList();
                });
            }
        }
    };

    const tbColumns = [
        { field: 'id', headerName: 'Resource ID', hide: true, filterable: false },
        { field: 'resourceID', headerName: 'Resource ID', hide: true, filterable: false },
        { field: 'resourceName', headerName: 'Resource Name', width: 230, align: 'center', headerAlign: 'center' },
        { field: 'resourceEmail', headerName: 'Resource Email', hide: true, filterable: false },
        { field: 'reportManagName', headerName: 'Manager Name', width: 230, align: 'center', headerAlign: 'center' },
        { field: 'reportManagEmail', headerName: 'Reporting Manager Email', hide: true, filterable: false },
        { field: 'resourceRole', headerName: 'Role', width: 318, align: 'center', headerAlign: 'center' },
        { field: 'resourceType', headerName: 'Resource Type', hide: true, filterable: false },
        {
            field: 'action', headerName: 'Action', width: 100, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <div>
                    <IconButton aria-label="Update Resource" onClick={() => {
                        console.log(params.row);
                        setResourceID(params.row.resourceID);
                        setResourceName(params.row.resourceName);
                        setResourceEmail(params.row.resourceEmail);
                        setcontactNumber(params.row.resourceContact);
                        setSkills(params.row.skills);
                        setReportManagName(params.row.reportManagEmail + "::" + params.row.reportManagName);
                        setResourceRole(params.row.resourceRole);
                        setResourceType(params.row.resourceType);
                        setFormHeaderText("Update Resource");
                        setSubmitBtText("Update Resource");
                        setAction("update")
                    }}>
                        <img src={EditIcon} width='20' height='20' title='Update Resource' alt='Update Resource' />
                    </IconButton>
                    <IconButton color="primary" aria-label="Delete Resource" onClick={() => {
                        setDeleteResourceData(params.row);
                        setDeleteAlert(true);
                    }}>
                        <img src={DeleteIcon} width='20' height='20' title='Delete Resource' alt='Delete Resource' />
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
        console.log(searchValue)
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = originalTBRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row["resourceName"].toString());
            });
        });
        setTbRows(filteredRows);
    };

    const escapeRegExp = (value) => {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    useEffect(() => {

        if (user.isLogin) {
            document.title = "Onboard Resource | easySWAT";

            AuthService.getDropValuesList("Resource_Role").then((response) => {
                setResourceRoleList(response);
            });
            AuthService.getDropValuesList("Resource_Type").then((response) => {
                setResourceTypeList(response);
            });
            AuthService.getManagerList().then((response) => {
                response.sort((row1, row2) => (row1.resourceName > row2.resourceName) ? 1 : -1);
                setReportManagNameList(response);
            });

            AuthService.getResourceDetailsList(user.userData.userRole, user.userData.resourceEmail).then((response) => {
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
                    <WarningAmberRoundedIcon className={commonClasses.warningIcon} /> Are you sure want to delete resource <b>{deleteResourceData.resourceName}</b>
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
            <div className={commonClasses.formPageHeader} >{formHeaderText}</div>
            <div className={commonClasses.formPageBody} >
                <Grid container >
                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }} >
                        <label className={commonClasses.formPageBodyLabel} >Resource Name</label>
                        <input
                            className={commonClasses.formPageBodyInput}
                            type='text'
                            id="resourceName"
                            placeholder="Enter Resource Name"
                            value={resourceName}
                            onChange={event => {
                                setResourceName(event.target.value);
                                setResourceNameErrorMsg("");
                                setResourceNameError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                            helperText={resourceNameErrorMsg}
                            error={resourceNameError}
                        />
                    </Grid>
                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }} >
                        <label className={commonClasses.formPageBodyLabel} >Resource Email</label>
                        <input
                            className={commonClasses.formPageBodyInput}
                            id="resourceEmail"
                            placeholder="Enter Resource Email"
                            value={resourceEmail}
                            onChange={event => {
                                setResourceEmail(event.target.value);
                                setResourceEmailErrorMsg("");
                                setResourceEmailError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                            helperText={resourceEmailErrorMsg}
                            error={resourceEmailError}
                        />
                    </Grid>
                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }} >
                        <label className={commonClasses.formPageBodyLabel} >Resource Contact Number</label>
                        <input
                            className={commonClasses.formPageBodyInput}
                            id="contactNumber"
                            placeholder="Enter Contact Number"
                            value={contactNumber}
                            onChange={event => {
                                setcontactNumber(event.target.value);
                                setcontactNumberErrorMsg("");
                                setcontactNumberError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                            helperText={contactNumberErrorMsg}
                            error={contactNumberError}
                        />
                    </Grid>
                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }} >

                        <label className={commonClasses.formPageBodyLabel} >Reporting Manager Name</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}
                            id="reportManagName"
                            error={reportManagNameError}
                            value={reportManagName}
                            onChange={event => {
                                setReportManagName(event.target.value);
                                setReportManagNameError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Reporting Manager">Select Reporting Manager</MenuItem>

                            {reportManagNameList.map(Manag =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={Manag.resourceID} value={Manag.resourceEmail + "::" + Manag.resourceName}>{Manag.resourceName}</MenuItem>
                            )}

                        </Select>
                    </Grid>
                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }} >
                        <label className={commonClasses.formPageBodyLabel} >Resource Role</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}
                            id="resourceRole"
                            error={resourceRoleError}
                            value={resourceRole}
                            onChange={event => {

                                setResourceRole(event.target.value);

                                setResourceRoleError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Resource Role">Select Resource Role</MenuItem>

                            {resourceRoleList.map(role =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={role.value_ID} value={role}>{role}</MenuItem>
                            )}

                        </Select>
                    </Grid>
                    <Grid item xs={4} sx={{ mt: '10px', mb: '10px' }} >
                        <label className={commonClasses.formPageBodyLabel} >Resource Type</label>
                        <Select
                            style={{
                                width: '200px',
                                height: '30px',
                                display: 'flex',
                                color: '#3b4452',
                                fontSize: '14px',
                            }}
                            id="resourceType"
                            error={resourceTypeError}
                            value={resourceType}
                            onChange={event => {
                                setResourceType(event.target.value);
                                setResourceTypeError(false);
                                setError(false);
                                setErrorMsg("");
                            }}
                        >
                            <MenuItem style={{ fontSize: '14px', height: '30px' }} value="Select Resource Type">Select Resource Type</MenuItem>

                            {resourceTypeList.map(type =>
                                <MenuItem style={{ fontSize: '14px', height: '30px' }} key={type.value_ID} value={type}>{type}</MenuItem>
                            )}

                        </Select>
                    </Grid>


                    <Grid item xs={12} sx={{ mt: '10px', mb: '10px' }} className={commonClasses.formPageBodyButtonField}>
                        <button className={commonClasses.formPageBodyButton} onClick={handleSubmitAction}> {submitBtText} </button>
                    </Grid>
                </Grid>
            </div>
        </Paper>

        <br />
        <br />

        <Paper variant="outlined" className={commonClasses.formPageMediumOuter} >
            <div className={commonClasses.formPageHeader} >Onboarded Resources</div>
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
    </div>)
}

