/* eslint-disable no-unused-vars */
import React, { useEffect, useContext, useRef } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Constants from "../../common/Constants";
import { Paper } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Grid from "@mui/material/Grid";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import AuthService from "../../services/AuthService";
import commonStyles from "../../common/common-css/CommonStyle";
import Snackbar from "@material-ui/core/Snackbar";
import { Context } from "../../common/UserAuth";
import EditIcon from "../../../assets/images/editicon.png";
import DeleteIcon from "../../../assets/images/delete_icon.png";
import DownloadIcon from "../../../assets/images/download_icon.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../../common/footer/Footer";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import { useSpring, animated } from "@react-spring/web";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Authentication from "../../common/AuthComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@mui/styles";
import QuickSearchToolbar from "../../common/QuickSearchToolbar";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const tableStyles = makeStyles(() => ({
  root: {
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: "#f8f8f8",
      color: "black",
    },
  },
}));



function Support() {
  const [popoverData, setPopoverData] = React.useState({});
  const [formHeaderText, setFormHeaderText] = React.useState("Rasie Ticket");
  const fileInputRef = React.useRef(null);
  const tableClasses = tableStyles();

  const [fileRowEl, setFileRowEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setFileRowEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setFileRowEl(null);
  };

  const openPopover = Boolean(fileRowEl);

  const commonClasses = commonStyles();

  const [ticketId, setTicketId] = React.useState("");

  const [issueType, setIssueType] = React.useState("Select Issue Type");
  const [issueTypeList, setIssueTypeList] = React.useState([]);

  const [priority, setPriority] = React.useState("Select Priority");
  const [priorityList, setPriorityList] = React.useState([]);

  const [status, setStatus] = React.useState("Select Status");
  const [statusList, setStatusList] = React.useState([]);

  var uploadImageRef = useRef(null);

  const [uploadImage, setUploadImage] = React.useState(null);
  const [issueDetails, setIssueDetails] = React.useState("");

  const [filePath, setFilePath] = React.useState("");

  const [issueResolution, setIssueResolution] = React.useState("");

  const [issueTypeError, setIssueTypeError] = React.useState(false);
  const [priorityError, setPriorityError] = React.useState(false);
  const [statusError, setStatusError] = React.useState(false);
  const [issueDetailsError, setIssueDetailsError] = React.useState(false);

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [disablePublishBtn, setDisablePublishBtn] = React.useState(true);

  const [tbRows, setTbRows] = React.useState([]);
  const [originalTbRows, setOriginalTbRows] = React.useState([]);

  const [eventHistory, setEventHistory] = React.useState([]);
  const [eventHistoryOg, setEventHistoryOg] = React.useState([]);

  const [severity, setSeverity] = React.useState("warning");
  const [searchText, setSearchText] = React.useState("");

  const [user, setUser] = useContext(Context);
  const [deleteTicketData, setDeleteTicketData] = React.useState("");
  const [deleteAlert, setDeleteAlert] = React.useState(false);

  const [supportTicketSearch, setSupportTicketSearch] = React.useState("");
  const [supportHistorySearch, setSupportHistorySearch] = React.useState("");
  // const [supportTicketSearchList, setSupportTicketSearchList] = React.useState([])

  const [supportPage, setSupportPage] = React.useState(0);
  const [ticketRowsPerPage, setTicketRowsPerPage] = React.useState(10);

  const [eventPage, setEventPage] = React.useState(0);
  const [ticketEventsPerPage, setEventsRowsPerPage] = React.useState(10);

  const [showResolution, setShowResolution] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [disableRes, setDisabledRes] = React.useState(false);
  const [showEventHist, setShowEventHist] = React.useState(false);

  const [updateTicketFileExists, setUpdateTicketFileExists] =
    React.useState(false);
  const [updateTicketFileName, setUpdateTicketFileName] = React.useState("");
  const [updateTicketFileBase64, setUpdateTicketFileBase64] =
    React.useState("");
  const [showTicketFile, setShowTicketFile] = React.useState(false);
  const [ticketFileChanged, setTicketFileChanged] = React.useState(false);

  const [submitBtn, setSubmitBtn] = React.useState("Raise Ticket");

  
  const downloadFile = async (ticketID) => {
    
    const response = await fetch(
      `http://localhost:9090/support/download?ticketID=${ticketID}`
    );
    
    if (!response.ok) {
      console.log("Failed to download the file")
      alert("Failed to download the file");
      return;
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filePath.split("/").pop();
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  
  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = originalTbRows.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setTbRows(filteredRows);
  };
  const handleClose = () => {
    setShowEventHist(false);
  };

  const closeDeleteAlert = () => {
    setDeleteAlert(false);
  };

  const handleDeleteAlertSubmit = () => {
    AuthService.deleteSupportTicket(deleteTicketData.id).then((response) => {
      if (response.status === "deleted") {
        reloadTicketList();
        setSeverity("success");
        setError(true);
        setErrorMsg("Ticket deleted successfully");
      } else {
        setSeverity("error");
        setError(true);
        setErrorMsg("Error while Deleting the Track");
      }
    });
    setDeleteAlert(false);
  };

  const closeTicketFileImageModal = () => {
    setShowTicketFile(false);
  };

  const noRow = () => {
    return (
      <GridOverlay className={commonClasses.emptyMsg}>
        <DescriptionIcon /> No Tickets Found
      </GridOverlay>
    );
  };

  const tbColumns = [
    { field: "id", headerName: "Row ID", hide: true, filterable: false },
    {
      field: "issueType",
      headerName: "Issue Type",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 155,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "issueDetails",
      headerName: "Issue Details",
      width: 300,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="Update client"
            onClick={() => {
              setTicketId(params.row.id);
              setIssueType(params.row.issueType);
              setPriority(params.row.priority);
              setStatus(params.row.status);
              setIssueDetails(params.row.issueDetails);
              setFormHeaderText("Update Ticket");
              setSubmitBtn("Update Ticket");
              
            }}
          >
            <img
              src={EditIcon}
              width="20"
              height="20"
              title="Update Track"
              alt="Update Track"
            />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Delete Track"
            onClick={() => {
              setDeleteTicketData(params.row);
              setDeleteAlert(true);
            }}
          >
            <img
              src={DeleteIcon}
              width="20"
              height="20"
              title="Delete Track"
              alt="Delete Track"
            />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Download Track"
            onClick={() => {
              
              //setTicketId(params.row.id);
              downloadFile(params.row.id)
              // setIssueType(params.row.issueType);
              // setPriority(params.row.priority);
              // setStatus(params.row.status);
              // setIssueDetails(params.row.issueDetails);
              // setFormHeaderText("Update Ticket");
              // setSubmitBtn("Update Ticket");
            }}
          >
            <img
              src={DownloadIcon}
              width="20"
              height="20"
              title="Download Track"
              alt="Download Track"
            />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMsg("");
    setError(false);
  };

  const reloadTicketList = () => {
    AuthService.getSupportTicketList().then((response) => {
      if (response.tbRows !== null) {
        setTbRows(response.tbRows);
        setOriginalTbRows(response.tbRows);
      } else {
        setTbRows([]);
        setOriginalTbRows([]);
      }
    });
  };
  const reloadTicket = () => {
    setIssueType("Select Issue Type");
    setPriority("Select Priority");
    setStatus("Select Status");
    setIssueDetails("");
    setSubmitBtn("Raise Ticket");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const supportHandleChangePage = (event, newPage) => {
    setSupportPage(newPage);
  };

  const supportHandleChangeRowsPerPage = (event) => {
    setTicketRowsPerPage(+event.target.value);
    setSupportPage(0);
  };

  const handleSubmitAction = () => {
    if (issueType === "Select Issue Type") {
      setError(true);
      setErrorMsg("Please select Issue Type");
    } else if (priority === "Select Priority") {
      setError(true);
      setErrorMsg("Please select Priority");
    } else if (status === "Select Status") {
      setError(true);
      setErrorMsg("Please select Status");
    } else if (issueDetails === "") {
      setError(true);
      setErrorMsg("Please Enter Issue Details");
    } else {
      if (uploadImage) {
        
        if (uploadImage.size > Constants.MAX_IMAGE_SIZE) {
          setError(true);
          setErrorMsg(
            `File size should not exceed ${
              Constants.MAX_IMAGE_SIZE / 1024 / 1024
            } MB.`
          );
          setUploadImage(null);
          return;
        }
      }
      setDisablePublishBtn(true);
      console.log("Creating Data Object");
      let formData = new FormData();
      formData.append("file", uploadImage);

      let reqData = {
        ticketID: ticketId,
        issueType: issueType,
        priority: priority,
        status: status,
        issueDetails: issueDetails,
      };
      
      formData.append("reqData", JSON.stringify(reqData));
      setDisablePublishBtn(false);
      if (submitBtn === "Raise Ticket") {
        AuthService.createSupportTicket(formData).then((res) => {
          if (res === "Inserted") {
            
            setSeverity("success");
            setErrorMsg("Create Ticket Successfully");
            setError(true);
            reloadTicket();
            reloadTicketList();
            
          } else {
            setSeverity("error");
            setErrorMsg("Error in Creating Ticket");
            setError(true);
            
          }
          setDisablePublishBtn(false);
        });
      } else if (submitBtn === "Update Ticket") {
        AuthService.updateSupportTicket(formData).then((res) => {
          if (res === "Updated") {
            setSeverity("success");
            setErrorMsg("Updated Ticket Successfully");
            setError(true);
            reloadTicket();
            reloadTicketList();
          } else {
            setSeverity("error");
            setErrorMsg("Error in updating Ticket");
            setError(true);
          }
          setDisablePublishBtn(false);
        });
      }
    }
  };

  useEffect(() => {
    if (user.isLogin) {
      document.title = "Support | easyPACS";

      AuthService.getSupportTicketList().then((response) => {
        if (response.tbRows !== null) {
          setTbRows(response.tbRows);
          setOriginalTbRows(response.tbRows);
        } else {
          
          setTbRows([]);
          setOriginalTbRows([]);
        }
      });

      AuthService.getDropDownValues("Issue_Type").then((response) => {
        if (response !== null) {
          
          setIssueTypeList(response);
        } else {
          setIssueTypeList([]);
        }
      });

      AuthService.getDropDownValues("Priority").then((response) => {
        if (response !== null) {
          
          setPriorityList(response);
        } else {
          setPriorityList([]);
        }
      });

      AuthService.getDropDownValues("Support_Ticket_Status").then(
        (response) => {
          if (response !== null) {
            setStatusList(response);
          } else {
            setStatusList([]);
          }
        }
      );
    }
    setDisablePublishBtn(false);
  }, [user]);

  if (!user.isLogin) {
    return <Authentication />;
  }

  return (
    <div className={commonClasses.page}>
      <br />
      <br />

      <Popover
        id="today-changed-config-file-popover"
        sx={{
          pointerEvents: "none",
          fontSize: 14,
          fontStyle: "normal",
          fontStretch: "normal",
          letterSpacing: "normal",
          lineHeight: "normal",
        }}
        open={openPopover}
        anchorEl={fileRowEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className={commonClasses.popoverHeader}>
          {popoverData.issueType + " - " + popoverData.priority}
        </div>
        <Divider />
        <div className={commonClasses.popoverBody}>
          <Grid container sx={{ fontSize: 12, width: 700 }}>
            <Grid item xs={2} sx={{ fontWeight: 600, p: "4px" }}>
              Description
            </Grid>
            <Grid item xs={0.3} sx={{ fontWeight: 600, p: "4px" }}>
              :
            </Grid>
            <Grid item xs={9.7} sx={{ fontWeight: 400, p: "4px" }}>
              {popoverData.issueDescription}
            </Grid>

            <Grid item xs={2} sx={{ fontWeight: 600, p: "4px" }}>
              File Path
            </Grid>
            <Grid item xs={0.3} sx={{ fontWeight: 600, p: "4px" }}>
              :
            </Grid>
            <Grid item xs={9.7} sx={{ fontWeight: 400, p: "4px" }}>
              {popoverData.filePath}
            </Grid>
          </Grid>
        </div>
      </Popover>

      <Snackbar
        open={error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteAlert}
        onClose={closeDeleteAlert}
        className={commonClasses.deleteAlert}
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <WarningAmberRoundedIcon className={commonClasses.warningIcon} />{" "}
            Are you sure want to delete the ticket ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDeleteAlert}
            className={commonClasses.cancelSubmitButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAlertSubmit}
            className={commonClasses.deleteAlertSubmit}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Paper variant="outlined" className={commonClasses.formPageMediumOuter}>
        <div className={commonClasses.formPageHeader}>{formHeaderText} </div>
        <div className={commonClasses.formPageBody}>
          <Grid container>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>
                Issue Type
              </label>
              <Select
                style={{
                  width: "200px",
                  height: "30px",
                  display: "flex",
                  color: "#3b4452",
                  fontSize: "14px",
                }}
                id="issueType"
                error={issueTypeError}
                value={issueType}
                onChange={(event) => {
                  setIssueType(event.target.value);
                  setIssueTypeError(false);
                  setError(false);
                  setErrorMsg("");
                }}
              >
                <MenuItem
                  style={{ fontSize: "14px", height: "30px" }}
                  value="Select Issue Type"
                >
                  Select Issue Type
                </MenuItem>

                {issueTypeList.map((issue, index) => (
                  <MenuItem
                    style={{ fontSize: "14px", height: "30px" }}
                    key={index}
                    value={issue}
                  >
                    {issue}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>
                Priority
              </label>
              <Select
                style={{
                  width: "200px",
                  height: "30px",
                  display: "flex",
                  color: "#3b4452",
                  fontSize: "14px",
                }}
                id="priority"
                error={priorityError}
                value={priority}
                onChange={(event) => {
                  setPriority(event.target.value);
                  setPriorityError(false);
                  setError(false);
                  setErrorMsg("");
                }}
              >
                <MenuItem
                  style={{ fontSize: "14px", height: "30px" }}
                  value="Select Priority"
                >
                  Select Priority
                </MenuItem>

                {priorityList.map((priority, index) => (
                  <MenuItem
                    style={{ fontSize: "14px", height: "30px" }}
                    key={index}
                    value={priority}
                  >
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>Status</label>
              <Select
                style={{
                  width: "200px",
                  height: "30px",
                  display: "flex",
                  color: "#3b4452",
                  fontSize: "14px",
                }}
                id="status"
                error={statusError}
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setStatusError(false);
                  setError(false);
                  setErrorMsg("");
                }}
              >
                <MenuItem
                  style={{ fontSize: "14px", height: "30px" }}
                  value="Select Status"
                >
                  Select Status
                </MenuItem>

                {statusList.map((status, index) => (
                  <MenuItem
                    style={{ fontSize: "14px", height: "30px" }}
                    key={index}
                    value={status}
                  >
                    {status}
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
                Upload Image
              </label>
              <input
                className={commonClasses.formPageBodyInput}
                id="uploadImage"
                name="uploadImage"
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.tif,.webp,.svg"
                ref={fileInputRef}
                onChange={(event) => {
                  setUploadImage(event.target.files.item(0));
                }}
              ></input>
            </Grid>
            <Grid item xs={8} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>
                Issue Details
              </label>

              <textarea
                className={commonClasses.formPageBodyTextarea}
                id="issueDetails"
                placeholder="Enter Issue Details"
                rows="4"
                value={issueDetails}
                onChange={(event) => {
                  setIssueDetails(event.target.value);
                  setIssueDetailsError(false);
                  setError(false);
                  setErrorMsg("");
                }}
                error={issueDetailsError}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ mt: "10px", mb: "10px" }}
              className={commonClasses.formPageBodyButtonField}
            >
              <button
                disabled={disablePublishBtn}
                className={
                  disablePublishBtn
                    ? commonClasses.formPageBodyDisabledButton
                    : commonClasses.formPageBodyButtons
                }
                onClick={handleSubmitAction}
              >
                {" "}
                {submitBtn}
                {disablePublishBtn ? (
                  <CircularProgress
                    color="inherit"
                    style={{ height: 12, width: 12, marginLeft: 10 }}
                  />
                ) : (
                  ""
                )}
              </button>
            </Grid>
          </Grid>
        </div>
      </Paper>

      <br></br>
      <br></br>
      <Paper variant="outlined" className={commonClasses.formPageMediumOuter}>
        <div className={commonClasses.formPageHeader}>Support Ticket List</div>
        <div className={commonClasses.formPageBody}>
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
              NoRowsOverlay: noRow,
            }}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(""),
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
  );
}

export default Support;
