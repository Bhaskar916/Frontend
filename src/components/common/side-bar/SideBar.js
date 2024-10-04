/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import commonStyles from "../common-css/CommonStyle";
import { Context } from "../UserAuth";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Logo from "../../../assets/images/logo.png";
import clientLogo from "../../../assets/images/client_logo.png";
import DeleteIcon from "../../../assets/images/delete_icon.png";
import Constants from "../Constants";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Paper,
  Modal,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import AuthService from "../../services/AuthService";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import DescriptionIcon from "@material-ui/icons/Description";
import CancelIcon from "@material-ui/icons/Cancel";
import Alert from "@mui/material/Alert";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import AdbOutlinedIcon from "@mui/icons-material/AdbOutlined";
import ReduceCapacityOutlinedIcon from "@mui/icons-material/ReduceCapacityOutlined";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import AssessmentIcon from "@mui/icons-material/Assessment";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import ViewCompactAltOutlinedIcon from "@mui/icons-material/ViewCompactAltOutlined";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeviceHubOutlinedIcon from "@mui/icons-material/DeviceHubOutlined";

import AlarmOutlinedIcon from "@mui/icons-material/AlarmOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import VerticalSplitOutlinedIcon from "@mui/icons-material/VerticalSplitOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import { makeStyles } from "@mui/styles";

const tableStyles = makeStyles(() => ({
  root: {
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: "#f8f8f8",
      color: "black",
    },
  },
}));

export default function SideBar() {
  const commonClasses = commonStyles();
  const tableClasses = tableStyles();
  const [user, setUser] = useContext(Context);
  const history = useNavigate();

  const [openSideMenu, setOpenSideMenu] = React.useState(true);

  const [openMODMenu, setOpenMODMenu] = React.useState(false);

  const [openOnboardingMenu, setOpenOnboardingMenu] = React.useState(false);
  const [openAppOnboardMenu, setOpenAppOnboardMenu] = React.useState(false);

  const [openMOMMenu, setOpenMOMMenu] = React.useState(false);

  const [openIncidentManagementMenu, setOpenIncidentManagementMenu] =
    React.useState(false);
  const [openPasGuidelinesMenu, setOpenPasGuidelinesMenu] =
    React.useState(false);
  const [openPatchReleaseMenu, setOpenPatchReleaseMenu] = React.useState(false);
  const [openIncidentReportMenu, setOpenIncidentReportMenu] =
    React.useState(false);

  const [openRecommendationMenu, setOpenRecommendationMenu] =
    React.useState(false);

  const [openTaskMenu, setOpenTaskMenu] = React.useState(false);
  const [openTaskReportMenu, setOpenTaskReportMenu] = React.useState(false);

  const [openToolsMenu, setOpenToolsMenu] = React.useState(false);

  const [openReportsMenu, setOpenReportsMenu] = React.useState(false);

  const [responseData, setResponseData] = React.useState([]);

  const [applicationName, setApplicationName] = React.useState(
    "Select Application Name"
  );
  const [applicationNameError, setApplicationNameError] = React.useState(false);

  const [applicationNameList, setApplicationNameList] = React.useState([]);

  const [trackName, setTrackName] = React.useState("Select Track Name");
  const [trackNameError, setTrackNameError] = React.useState(false);
  const [trackNameList, setTrackNameList] = React.useState([]);

  const [criticality, setCriticality] = React.useState("Select Criticality");
  const [criticalityError, setCriticalityError] = React.useState(false);
  const [criticalityErrorMsg, setCriticalityErrorMsg] = React.useState("");
  const [criticalityList, setCriticalityList] = React.useState([]);

  const [appStage, setAppStage] = React.useState("Select Application Stage");
  const [appStageError, setAppStageError] = React.useState(false);
  const [appStageErrorMsg, setAppStageErrorMsg] = React.useState("");
  const [appStageList, setAppStageList] = React.useState([]);

  const [reportedDate, setReportedDate] = React.useState(new Date());
  const [reportedDateError, setReportedDateError] = React.useState(false);
  const [reportedDateErrorMsg, setReportedDateErrorMsg] = React.useState("");

  const [issueTime, setIssueTime] = React.useState(new Date());
  const [issueErrorTime, setIssueTimeError] = React.useState(false);

  const [issueRaisedByID, setissueRaisedByID] = React.useState("");
  const [issueRaisedBy, setIssueRaisedBy] = React.useState("");
  const [IssueRaisedByError, setIssueRaisedByError] = React.useState(false);
  const [IssueRaisedByErrorMsg, setIssueRaisedByErrorMsg] = React.useState("");

  const [issueDescription, setIssueDescription] = React.useState("");
  const [issueDescriptionError, setIssueDescriptionError] =
    React.useState(false);
  const [issueDescriptionErrorMsg, setIssueDescriptionErrorMsg] =
    React.useState("");

  const [impactOfIssue, setImpactOfIssue] = React.useState("");
  const [impactOfIssueError, setImpactOfIssueError] = React.useState(false);
  const [impactOfIssueErrorMsg, setImpactOfIssueErrorMsg] = React.useState("");

  const [incidentNo, setIncidentNo] = React.useState("");
  const [incidentNoError, setIncidentNoError] = React.useState(false);
  const [incidentNoErrorMsg, setIncidentNoErrorMsg] = React.useState("");

  const [rcaIncidentNoList, setRcaIncidentNoList] = React.useState([]);

  const [rcaAnalysis, setRcaAnalysis] = React.useState("");
  const [rcaAnalysisError, setRcaAnalysisError] = React.useState(false);
  const [rcaAnalysisErrorMsg, setRcaAnalysisErrorMsg] = React.useState("");

  const [resolutionDesc, setResolutionDesc] = React.useState("");
  const [resolutionDescError, setResolutionDescError] = React.useState(false);
  const [resolutionDescErrorMsg, setResolutionDescErrorMsg] =
    React.useState("");

  const [preventiveMeasure, setPreventiveMeasure] = React.useState("");
  const [preventiveMeasureError, setPreventiveMeasureError] =
    React.useState(false);
  const [preventiveMeasureErrorMsg, setPreventiveMeasureErrorMsg] =
    React.useState("");

  const [mitigationStatergy, setMitigationStatergy] = React.useState("");
  const [mitigationStatergyError, setMitigationStatergyError] =
    React.useState(false);
  const [mitigationStatergyErrorMsg, setMitigationStatergyErrorMsg] =
    React.useState("");

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const [alertSeverity, setAlertSeverity] = React.useState("warning");

  const [tbRows, setTbRows] = React.useState([]);

  const [openModal, setOpenModal] = React.useState(false);
  const [openClosureListModal, setOpenClosureListModal] = React.useState(false);
  const [openClosureModel, setOpenClosureModel] = React.useState(false);

  const [showTable, setShowTable] = React.useState(false);

  const tbColumns = [
    { field: "id", headerName: "Application ID", hide: true },
    {
      field: "rcaIncNo",
      headerName: "Incident No",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "applicationName",
      headerName: "Application Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "trackName",
      headerName: "Track Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "reportedDateS",
      headerName: "Raised On",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "makerName",
      headerName: "Raised By",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    // { field: 'appEnv', headerName: 'Enviornment', width: 200, align: 'center', headerAlign: 'center' },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            aria-label="Stop MOD Alerts"
            component="span"
          >
            <button
              className={commonClasses.alarmStopBtn}
              variant="contained"
              color="primary"
              onClick={(props) => {
                closeAllModals();
                history(Constants.STOP_MOD_ALERT_LINK, {
                  state: {
                    alarmDetail: params.row,
                  },
                });
              }}
            >
              Stop Alert
            </button>
            {/* <img src={EditIcon} width='20' height='20' title='Edit User Details' alt='Edit User Details' /> */}
          </IconButton>
        </div>
      ),
    },
  ];

  const noRow = () => {
    return (
      <GridOverlay className={commonClasses.emptyMsg}>
        <DescriptionIcon />
        No Alarms Raised
      </GridOverlay>
    );
  };

  var userName = "Hello";
  var userId = "";
  var resourceId = "";
  var userRole = "";
  var contactNumber = "";
  if (user.isLogin) {
    userName = userName + " " + user.userData.resourceName;
    userId = user.userData.userID;
    resourceId = user.userData.resourceID;
    userRole = user.userData.userRole;
    contactNumber = user.userData.resourceNumber;
  }

  const handleCloseModal = () => {
    resetField();
    setOpenModal(false);
  };

  const handleClosureListModal = () => {
    setTbRows([]);
    setOpenClosureListModal(false);
    setShowTable(false);
  };

  const handleClosureModal = () => {
    setOpenClosureModel(false);
    setTbRows([]);
    resetClosureField();
  };

  const switchClosureModel = () => {
    setOpenClosureListModal(false);
    setOpenClosureModel(true);
  };

  const closeAllModals = () => {
    setOpenModal(false);
    setOpenClosureListModal(false);
    setOpenClosureModel(false);
    resetField();
    resetClosureField();
    setShowTable(false);
  };

  const resetField = () => {
    setApplicationName("Select Application Name");
    setTrackName("Select Track Name");
    setCriticality("Select Criticality");
    setAppStage("Select Application Stage");
    setIssueTime(new Date());
    setIssueDescription("");
    setImpactOfIssue("");
    setIssueDescriptionError(false);
    AuthService.getTrackBasedAppDropDown().then((response) => {
      setApplicationNameList(response);
    });
    AuthService.getDropValuesList("Criticality").then((response) => {
      setCriticalityList(response);
    });
    AuthService.getDropValuesList("App_Stage_List").then((response) => {
      setAppStageList(response);
    });
    AuthService.getNewIncidentId().then((response) => {
      setIncidentNo(response);
    });
    // setFormHeaderText("Raise Alarm");
    // setSubmitBtText("Raise Alarm");
  };

  const resetClosureField = () => {
    setApplicationName("Select Application Name");
    setTrackName("Select Track Name");
    setIssueDescription("");
    setImpactOfIssue("");
    setRcaAnalysis("");
    setResolutionDesc("");
    setPreventiveMeasure("");
    setMitigationStatergy("");
    setTbRows([]);
  };

  useEffect(() => {
    AuthService.getTrackBasedAppDropDown().then((response) => {
      setApplicationNameList(response);
    });
    AuthService.getDropValuesList("Criticality").then((response) => {
      setCriticalityList(response);
    });
    AuthService.getDropValuesList("App_Stage_List").then((response) => {
      setAppStageList(response);
    });
    AuthService.getNewIncidentId().then((response) => {
      setIncidentNo(response);
    });
  }, []);

  const validateForm = () => {
    console.log("Validate has been hit");
    let tempIssueTime = new Date(issueTime).getTime();
    if (applicationName === "Select Application Name") {
      setApplicationNameError(true);
      setError(true);
      setErrorMsg("Please Select Application Name");
    } else if (trackName === "Select Track Name") {
      setError(true);
      setErrorMsg("Please Select Track");
    } else if (tempIssueTime !== new Date(issueTime).getTime()) {
      setIssueTimeError(true);
      setError(true);
      setErrorMsg(
        "Please Select Issue Time. (Format : DD/MM/YYYY, Ex : 01/01/2021 12:00 PM)"
      );
    } else if (tempIssueTime !== new Date(issueTime).getTime()) {
      setIssueTimeError(true);
      setError(true);
      setErrorMsg(
        "Please Select Issue Time. (Format : DD/MM/YYYY, Ex : 01/01/2021 12:00 PM)"
      );
    } else if (issueDescription === "") {
      setError(true);
      setErrorMsg("Please Enter Brief About Issue Raised");
    } else {
      let formData = new FormData();

      let trackData = trackName.split("::");

      let reqData = {
        rcaIncidentNo: incidentNo,
        appId: applicationName.split("::")[0],
        appName: applicationName.split("::")[1],
        trackID: trackData[0],
        trackName: trackData[1],
        issueTime: issueTime,
        reportedDate: reportedDate,
        impactDesc: impactOfIssue,
        productionIssueDesc: issueDescription,
        makerName: user.userData.resourceName,
        makerEmail: user.userData.resourceEmail,
        modAlert: 1,
      };

      formData.append("reqData", JSON.stringify(reqData));

      AuthService.createIncident(formData).then((response) => {
        console.log(response);
        if (response.insertingStatus === "Inserted") {
          let formData = {
            applicationId: applicationName.split("::")[0],
            applicationName: applicationName.split("::")[1],
            trackID: trackData[0],
            trackName: trackData[1],
            contactNumber: user.userData.resourceContact,
            issueTime: issueTime,
            reportedDate: reportedDate,
            impactDesc: impactOfIssue,
            productionIssueDesc: issueDescription,
            makerName: user.userData.resourceName,
            makerEmail: user.userData.resourceEmail,
            rcaIncNo: response.incNo,
            makerId: user.userData.resourceID,
          };

          AuthService.raiseAlarm(formData).then((response) => {
            if (response === "Successful") {
              setAlertSeverity("success");
              setError(true);
              setErrorMsg("Alarm Raised Successfully");
              resetField();
              closeAllModals();
            } else if (response === "Duplicate") {
              setAlertSeverity("warning");
              setError(true);
              setErrorMsg("Alarm has raised already");
              closeAllModals();
            } else {
              setError(true);
              setErrorMsg("Error while Raising the alarm");
              closeAllModals();
            }

            // reloadClientList();
          });
        } else {
          setError(true);
          setAlertSeverity("success");
          setErrorMsg("Incident Added Successfully");
          closeAllModals();
        }
      });
      // }
    }
  };

  const updateForm = () => {
    console.log("Update is called");
    let tempIssueTime = new Date(issueTime).getTime();

    if (applicationName === "Select Application Name") {
      setApplicationNameError(true);
      setError(true);
      setErrorMsg("Please Select Application Name");
      console.log(1);
    } else if (trackName === "Select Track Name") {
      setRcaAnalysisError(true);
      setErrorMsg("Please Select TrackName");
      console.log(2);
    } else if (rcaAnalysis === "") {
      setRcaAnalysisError(true);
      setRcaAnalysisErrorMsg("Please enter analysis");
      console.log(2);
    } else if (resolutionDesc === "") {
      setResolutionDescError(true);
      setResolutionDescErrorMsg("Please enter resolution description");
      console.log(3);
    } else if (preventiveMeasure === "") {
      setPreventiveMeasureError(true);
      setPreventiveMeasureErrorMsg("Please enter preveentive measure");
      console.log(4);
    } else if (mitigationStatergy === null) {
      setMitigationStatergyError(true);
      setMitigationStatergyErrorMsg("Please enter app stage");
      console.log(5);
    } else if (tempIssueTime !== new Date(issueTime).getTime()) {
      setIssueTimeError(true);
      setError(true);
      setErrorMsg(
        "Please Select Issue Time. (Format : DD/MM/YYYY, Ex : 01/01/2021 12:00 PM)"
      );
      console.log(6);
    } else {
      let reqData = {
        rcaIncidentNo: incidentNo,
        appId: applicationName.split("::")[0],
        appName: applicationName.split("::")[1],
        issueTime: issueTime,
        reportedDate: reportedDate,
        rootCauseAnalysisDesc: rcaAnalysis,
        resolutionDesc: resolutionDesc,
        preventiveMeasuresDesc: preventiveMeasure,
        mitigationStrategyDesc: mitigationStatergy,
        makerName: user.userData.resourceName,
        makerEmail: user.userData.resourceEmail,
        modAlert: 1,
      };
      AuthService.UpdateIncidentfromMod(reqData).then((response) => {
        console.log(response);
        if (response === "Updated") {
          let formData = {
            applicationId: applicationName.split("::")[0],
            applicationName: applicationName.split("::")[1],
            contactNumber: user.userData.resourceContact,
            issueTime: issueTime,
            reportedDate: reportedDate,
            impactDesc: impactOfIssue,
            productionIssueDesc: issueDescription,
            rootCauseAnalysisDesc: rcaAnalysis,
            resolutionDesc: resolutionDesc,
            preventiveMeasuresDesc: preventiveMeasure,
            mitigationStrategyDesc: mitigationStatergy,
            makerName: user.userData.resourceName,
            makerEmail: user.userData.resourceEmail,
            rcaIncNo: incidentNo,
            makerId: user.userData.resourceID,
          };

          AuthService.stopAlarm(formData).then((response) => {
            console.log("Calling Stop Alarm Service");
            if (response === "Successful") {
              setAlertSeverity("success");
              setError(true);
              setErrorMsg("Alarm Stop Successfully");
              resetField();
              closeAllModals();
            } else if (response === "Duplicate") {
              setAlertSeverity("warning");
              setError(true);
              setErrorMsg("Alarm has raised already");
              closeAllModals();
            } else {
              setError(true);
              setErrorMsg("Error while Raising the alarm");
              closeAllModals();
            }

            // reloadClientList();
          });
        } else {
          setError(true);
          setAlertSeverity("success");
          setErrorMsg("Incident Added Successfully");
          closeAllModals();
          //alert("Failed to Update Incident");
        }
      });
      // }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMsg("");
    setError(false);
  };

  var userName = "Hello";

  if (user.isLogin) {
    userName = userName + " " + user.userData.resourceName;
  }

  return (
    <div>
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

      {user.isLogin ? (
        <div>
          <div id="sideMenuOuter">
          
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className={commonClasses.modalBox}
            >
              <Paper className={commonClasses.modRaiseModalPopup}>
                <Grid container>
                  <Grid item xs={11}>
                    <div className={commonClasses.formPageHeader}>
                      {Constants.RAISE_ALERT_HEADER}
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      className={commonClasses.cancelIconButtonBox}
                      onClick={handleCloseModal}
                    >
                      <CancelIcon className={commonClasses.cancelIconButton} />
                    </IconButton>
                  </Grid>
                  <div className={commonClasses.formPageBody}>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={4}
                          sx={{ mt: "10px", mb: "10px" }}
                          className={commonClasses.paddingLeft}
                        >
                          <label className={commonClasses.formPageBodyLabel}>
                            Application Name{" "}
                          </label>
                          <Select
                            style={{
                              width: "200px",
                              height: "30px",
                              display: "flex",
                              color: "#3b4452",
                              fontSize: "14px",
                            }}
                            id="applicationName"
                            error={applicationNameError}
                            value={applicationName}
                            onChange={(event) => {
                              setApplicationName(event.target.value);
                              setApplicationNameError(false);
                              setError(false);
                              if (
                                event.target.value !== "Select Application Name"
                              ) {
                                applicationNameList.forEach((element) => {
                                  if (
                                    element["applicationID"] ===
                                    event.target.value.split("::")[0]
                                  ) {
                                    setTrackName(
                                      element["trackID"] +
                                        "::" +
                                        element["trackName"]
                                    );
                                  }
                                });
                              } else {
                                setTrackName("Select Track Name");
                              }
                            }}
                          >
                            <MenuItem
                              style={{ fontSize: "14px", height: "30px" }}
                              value="Select Application Name"
                            >
                              {" "}
                              Select Application Name{" "}
                            </MenuItem>

                            {applicationNameList.map((application) => (
                              <MenuItem
                                style={{ fontSize: "14px", height: "30px" }}
                                key={application.applicationID}
                                value={
                                  application.applicationID +
                                  "::" +
                                  application.applicationName
                                }
                              >
                                {application.applicationName}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        {/* <Grid item xs={4} sx={{mt: '10px', mb: '10px'}} className={commonClasses.paddingLeft} >
                                <label className={commonClasses.formPageBodyLabel} >Track Name </label>
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
                                        onChange={
                                            event => {
                                                setTrackName(event.target.value);
                                                setTrackNameError(false);
                                                setError(false);
                                            }
                                        } >
                                        <MenuItem style={{fontSize: '14px', height: '30px'}} value='Select Track Name' > Select Track Name </MenuItem>

                                        {trackNameList.map(track =>
                                            <MenuItem style={{fontSize: '14px', height: '30px'}} key={track.trackID} value={track.trackID + "::" + track.trackName}>{track.trackName}</MenuItem>
                                        )}
                                    </Select>
                            </Grid> */}
                        <Grid
                          item
                          xs={4}
                          sx={{ mt: "10px", mb: "10px" }}
                          className={commonClasses.paddingLeft}
                        >
                          <label className={commonClasses.formPageBodyLabel}>
                            Criticality
                          </label>
                          <Select
                            style={{
                              width: "225px",
                              height: "30px",
                              display: "flex",
                              color: "#3b4452",
                              fontSize: "14px",
                            }}
                            id="criticality"
                            error={criticalityError}
                            value={criticality}
                            helperText={criticalityErrorMsg}
                            onChange={(event) => {
                              setCriticality(event.target.value);
                              setCriticalityError(false);
                              setError(false);
                            }}
                          >
                            <MenuItem
                              style={{ fontSize: "14px", height: "30px" }}
                              value="Select Criticality"
                            >
                              Select Criticality
                            </MenuItem>
                            {criticalityList.map((item) => (
                              <MenuItem
                                style={{ fontSize: "14px", height: "30px" }}
                                key={item}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{ mt: "10px", mb: "10px" }}
                          className={commonClasses.paddingLeft}
                        >
                          <label className={commonClasses.formPageBodyLabel}>
                            Application Stage
                          </label>
                          <Select
                            style={{
                              width: "225px",
                              height: "30px",
                              display: "flex",
                              color: "#3b4452",
                              fontSize: "14px",
                            }}
                            id="appStage"
                            error={appStageError}
                            value={appStage}
                            helperText={appStageErrorMsg}
                            onChange={(event) => {
                              setAppStage(event.target.value);
                              setAppStageError(false);
                              setError(false);
                            }}
                          >
                            <MenuItem
                              style={{ fontSize: "14px", height: "30px" }}
                              value="Select Application Stage"
                            >
                              Select Application Stage
                            </MenuItem>
                            {appStageList.map((item) => (
                              <MenuItem
                                style={{ fontSize: "14px", height: "30px" }}
                                key={item}
                                value={item}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{ mt: "10px", mb: "10px" }}
                          className={commonClasses.paddingLeft}
                        >
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <label className={commonClasses.formPageBodyLabel}>
                              Reported Date
                            </label>
                            <KeyboardDateTimePicker
                              style={{
                                width: "225px",
                                height: "30px",
                                display: "flex",
                                color: "#3b4452",
                                fontSize: "14px",
                              }}
                              id="reportedDate"
                              labelid="Reported Date"
                              value={reportedDate}
                              format="dd/MM/yyyy"
                              placeholder={"dd/MM/yyyy"}
                              onChange={(date) => {
                                setReportedDate(date);
                                setReportedDateError(false);
                                setError(false);
                              }}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                              error={reportedDateError}
                              disableFuture={true}
                            />
                          </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={12} sx={{ mt: "10px", mb: "10px" }}>
                          <label className={commonClasses.formPageBodyLabel}>
                            Issue Description
                          </label>
                          <textarea
                            className={commonClasses.formPageBodyTextarea}
                            id="issueOrObservation"
                            value={issueDescription}
                            error={issueDescriptionError}
                            helpertext={issueDescriptionErrorMsg}
                            name="issueOrObservation"
                            placeholder="Add Issue Description"
                            onChange={(event) => {
                              setIssueDescriptionError(false);
                              setError(false);
                              setIssueDescription(event.target.value);
                            }}
                            rows="4"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: "10px", mb: "10px" }}>
                          <label className={commonClasses.formPageBodyLabel}>
                            Impact of Issue
                          </label>
                          <textarea
                            className={commonClasses.formPageBodyTextarea}
                            id="impact"
                            name="impact"
                            placeholder="Add Impact"
                            labelPlacement="start"
                            error={impactOfIssueError}
                            value={impactOfIssue}
                            rows="4"
                            onChange={(event) => {
                              setImpactOfIssue(event.target.value);
                              setImpactOfIssueError(false);
                              setError(false);
                              setErrorMsg("");
                              setImpactOfIssueErrorMsg("");
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          className={commonClasses.formPageBodyButtonField}
                        >
                          <button
                            className={commonClasses.formPageBodyButton}
                            variant="contained"
                            color="primary"
                            onClick={validateForm}
                          >
                            Raise Alarm
                          </button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Paper>
            </Modal>
            <Modal
              open={openClosureListModal}
              onClose={handleClosureListModal}
              aria-labelledby="simple-modal-title-2"
              aria-describedby="simple-modal-description-2"
              className={commonClasses.modalBox}
            >
              <Paper
                variant="outlined"
                className={commonClasses.formPageLargeOuter}
              >
                <Grid container>
                  <Grid item xs={11}>
                    <div className={commonClasses.formPageHeader}>
                      List of MOD alarms raised
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      className={commonClasses.cancelIconButtonBox}
                      onClick={handleClosureListModal}
                    >
                      <CancelIcon className={commonClasses.cancelIconButton} />
                    </IconButton>
                  </Grid>
                  {/* <Grid item xs={12}>
                                <hr />
                            </Grid> */}
                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sx={{ mt: "10px", mb: "10px", ml: "35%" }}
                        >
                          <label className={commonClasses.formPageBodyLabel}>
                            Application Name{" "}
                          </label>
                          <Select
                            style={{
                              width: "300px",
                              height: "30px",
                              display: "flex",
                              color: "#3b4452",
                              fontSize: "14px",
                            }}
                            labelId="appName"
                            id="appName"
                            error={applicationNameError}
                            value={applicationName}
                            onChange={(event) => {
                              setApplicationName(event.target.value);
                              setApplicationNameError(false);
                              setError(false);
                              if (
                                event.target.value !== "Select Application Name"
                              ) {
                                let appData = event.target.value.split("::");
                                AuthService.getModAlerts(
                                  appData[0],
                                  resourceId,
                                  userRole
                                ).then((response) => {
                                  if (response.length === 0) {
                                    setShowTable(false);
                                    setTbRows([]);
                                    setErrorMsg("No alerts raised");
                                    setAlertSeverity("warning");
                                    setError(true);
                                  } else {
                                    setShowTable(true);
                                    console.log(response);
                                    setTbRows(response);
                                  }
                                });
                              } else {
                                setTbRows([]);
                                setErrorMsg("Please Select Application Name");
                              }
                            }}
                          >
                            <MenuItem value="Select Application Name">
                              {" "}
                              Select Application Name{" "}
                            </MenuItem>

                            {applicationNameList.map((application) => (
                              <MenuItem
                                style={{ fontSize: "14px", height: "30px" }}
                                key={application.applicationID}
                                value={
                                  application.applicationID +
                                  "::" +
                                  application.applicationName
                                }
                              >
                                {application.applicationName}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>
                    {showTable ? (
                      <DataGrid
                        style={{ padding: 10, fontSize: 12 }}
                        rows={tbRows}
                        rowHeight={34}
                        headerHeight={34}
                        columns={tbColumns}
                        className={tableClasses.root}
                        pageSize={10}
                        components={{ NoRowsOverlay: noRow }}
                        disableSelectionOnClick
                        disableColumnMenu
                        autoHeight
                      />
                    ) : null}
                  </Grid>
                </Grid>
              </Paper>
            </Modal>
          </div>
        </div>
      ) : null}
    </div>
  );
}