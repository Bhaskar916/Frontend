/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import useStyles from "../css/OnboardUserStyle";
import Paper from "@material-ui/core/Paper";
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";

import TextField from "@material-ui/core/TextField";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import DescriptionIcon from "@material-ui/icons/Description";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "../../../assets/images/editicon.png";
import DeleteIcon from "../../../assets/images/delete_icon.png";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { Context } from "../../common/UserAuth";
import Authentication from "../../common/AuthComponent";
import QuickSearchToolbar from "../../common/QuickSearchToolbar";
import commonStyles from "../../common/common-css/CommonStyle";
import Footer from "../../common/footer/Footer";
import AuthService from "../../services/AuthService";
import { makeStyles } from "@mui/styles";

const tableStyles = makeStyles(() => ({
  root: {
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: "#f8f8f8",
      color: "black",
    },
  },
}));

export default function OnboardUser() {
  const classes = useStyles();
  const commonClasses = commonStyles();
  const tableClasses = tableStyles();

  const [formHeaderText, setFormHeaderText] = React.useState("Onboard User");
  const [submitBtText, setSubmitBtText] = React.useState("Add User");

  const [deleteUserData, setDeleteUserData] = React.useState({});
  const [deleteAlert, setDeleteAlert] = React.useState(false);

  const [action, setAction] = React.useState("add");

  const [userID, setUserID] = React.useState("");

  const [alertSeverity, setAlertSeverity] = React.useState("warning");

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

  const [resourceType, setResourceType] = React.useState(
    "Select Resource Type"
  );
  const [resourceTypeError, setResourceTypeError] = React.useState(false);
  const [resourceTypeList, setResourceTypeList] = React.useState([]);

  const [resourceRole, setResourceRole] = React.useState(
    "Select Resource Role"
  );
  const [resourceRoleError, setResourceRoleError] = React.useState(false);
  const [resourceRoleList, setResourceRoleList] = React.useState([]);

  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState("");

  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] =
    React.useState("");

  const [role, setRole] = React.useState("Select User Role");
  const [roleError, setRoleError] = React.useState(false);
  const [roleList, setRoleList] = React.useState([]);

  const [subRole, setSubRole] = React.useState([]);
  const [subRoleError, setSubRoleError] = React.useState(false);
  const [subRoleList, setSubRoleList] = React.useState([]);

  const [isSubroleDisabled, setIsSubRoleDisabled] = React.useState(false);

  const [userCurrentStatus, setUserCurrentStatus] = React.useState(
    "Select Current Status"
  );
  const [userCurrentStatusError, setUserCurrentStatusError] =
    React.useState(false);
  const [userCurrentStatusList, setUserCurrentStatusList] = React.useState([]);

  const [team, setTeam] = React.useState("Select Team");
  const [teamError, setTeamError] = React.useState(false);
  const [teamErrorMsg, setTeamErrorMsg] = React.useState("");
  const [teamList, setTeamList] = React.useState([]);

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMsg("");
    setError(false);
    setAlertSeverity("warning");
  };

  const closeDeleteAlert = () => {
    setDeleteAlert(false);
  };

  const reloadUserList = () => {
    AuthService.getOnboardedUserList().then((response) => {
      setTBRows(response);
      setOriginalTBRows(response);
    });
  };

  const handleDeleteAlertSubmit = () => {
    AuthService.deleteOnboardedUser(deleteUserData.userId).then((response) => {
      if (response === "Deleted") {
        setAlertSeverity("success");
        setError(true);
        setErrorMsg("User deleted successfully");
        reloadUserList();
      } else {
        setError(true);
        setErrorMsg("Error while Deleting the user");
      }
    });
    resetField();
    setDeleteAlert(false);
  };

  const resetField = () => {
    setResourceName("");
    setPassword("");
    setConfirmPassword("");
    setResourceEmail("");
    setcontactNumber("");
    setResourceRole("Select Resource Role");
    setResourceType("Select Resource Type");
    setRole("Select User Role");
    setRole("Select User Role");
    setUserCurrentStatus("Select Current Status");
    setSubmitBtText("Add User");
    setFormHeaderText("Onboard User");
    reloadUserList();
    setResourceNameError(false);
    setRoleError(false);
    setPasswordError(false);
    setPasswordErrorMsg("");
    setConfirmPasswordError(false);
    setConfirmPasswordErrorMsg("");
    setUserCurrentStatusError(false);
    setSubRole([]);
  };

  const handleSubmitAction = () => {
    if (resourceName === "") {
      setResourceNameError(true);
      setResourceNameErrorMsg("Please Enter Resource Name");
      setError(true);
      setErrorMsg("Please Enter Resource Name");
    } else if (resourceEmail === "") {
      setResourceEmailError(true);
      setResourceEmailErrorMsg("Please Enter Resource Email");
      setError(true);
      setErrorMsg("Please Enter Resource Email");
    } else if (
      !/^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}[, \n]*)+$/.test(resourceEmail)
    ) {
      setResourceEmailError(true);
      setResourceEmailErrorMsg(
        "Please enter correct email ID.Eg : Example@domain.com"
      );
      setError(true);
      setErrorMsg("Please enter correct email ID.Eg : Example@domain.com");
    } else if (
      !/^\(?([0-9]{3})\)?([0-9]{3})?([0-9]{4})+$/.test(contactNumber)
    ) {
      setcontactNumberError(true);
      setcontactNumberErrorMsg("Please enter correct contact Number");
      setError(true);
      setErrorMsg("Please enter correct contact Number");
    } else if (resourceRole.length === "Select Resource Role") {
      setResourceRoleError(true);
      setError(true);
      setErrorMsg("Please Select Resource Role");
    } else if (resourceRole === "Select Resource Role") {
      setResourceRoleError(true);
      setError(true);
      setErrorMsg("Please Select Resource Role");
    } else if (resourceType === "Select Resource Type") {
      setResourceTypeError(true);
      setError(true);
      setErrorMsg("Please Select Resource Type");
    } else if (role === "Select User Role") {
      setRoleError(true);
      setError(true);
      setErrorMsg("Please Select Resource Type");
    } else if (userCurrentStatus === "Select Current Status") {
      setUserCurrentStatusError(true);
      setError(true);
      setErrorMsg("Please Select Resource Type");
    } else if (password === "") {
      setPasswordError(true);
      setPasswordErrorMsg("Please enter the password");
      setErrorMsg("Please enter the password");
      setError(true);
    } else if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMsg(
        "Please lengthen this text to 8 characters or more(you are currently using " +
          password.length +
          " characters)"
      );
      setErrorMsg(
        "Please lengthen this text to 8 characters or more(you are currently using " +
          password.length +
          " characters)"
      );
      setError(true);
    } else if (confirmPassword === "") {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMsg(
        "Please lengthen this text to 8 characters or more(you are currently using " +
          password.length +
          " characters)"
      );
      setErrorMsg(
        "Please lengthen this text to 8 characters or more(you are currently using " +
          password.length +
          " characters)"
      );
      setError(true);
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setError(true);
      setConfirmPasswordErrorMsg("Password must be same");
      setErrorMsg("Password must be same");
      setError(true);
    } else if (role.length === 0) {
      setRoleError(true);
      setError(true);
      setErrorMsg("Please select Role");
    } else if (userCurrentStatus === "Select Current Status") {
      setUserCurrentStatusError(true);
      setError(true);
      setErrorMsg("Please select Current Status");
    } else {
      let formData = {
        resourceID: resourceID,
        resourceName: resourceName,
        resourceContactNO: contactNumber,
        resourceEmail: resourceEmail,
        resourceRole: resourceRole,
        resourceType: resourceType,
        password: password,
        role: role,
        currentStatus: userCurrentStatus,
        onBoardedById: user.userData.resourceID,
      };
      if (action === "update") {
        formData["userId"] = userID;
        AuthService.updateOnboardedUser(formData).then((response) => {
          if (response === "Updated") {
            setAlertSeverity("success");
            setError(true);
            setErrorMsg("User Updated Successfully");
            setAction("add");
          } else {
            setError(true);
            setErrorMsg("Error while updating the user");
          }
          reloadUserList();
          resetField();
        });
      } else {
        AuthService.onboardUser(formData).then((response) => {
          if (response === "Onboarded") {
            setAlertSeverity("success");
            setError(true);
            setErrorMsg("User Onboarded Successfully");
            resetField();
            formData["onboardedByName"] = user.userData.resourceName;
            formData["onboardedByEmail"] = user.userData.resourceEmail;
            AuthService.publishUser(formData).then((response) => {
              console.log(response);
            });
          } else if (response === "Duplicate") {
            setAlertSeverity("warning");
            setError(true);
            setErrorMsg("User Already Exists");
          } else {
            setError(true);
            setErrorMsg("Error while Onboarding the user");
          }
          reloadUserList();
        });
      }
    }
  };

  const tbColumns = [
    { field: "id", headerName: "user ID", hide: true, filterable: false },
    { field: "userId", headerName: "User ID", hide: true, filterable: false },
    {
      field: "resourceID",
      headerName: "Resource ID",
      hide: true,
      filterable: false,
    },
    {
      field: "password",
      headerName: "Password",
      hide: true,
      filterable: false,
    },
    {
      field: "resourceName",
      headerName: "User Name",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Role",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "currentStatus",
      headerName: "Current Status",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="Update mom"
            onClick={() => {
              setResourceID(params.row.resourceID);
              setUserID(params.row.userId);
              setResourceName(params.row.resourceName);
              setResourceEmail(params.row.resourceEmail);
              setcontactNumber(params.row.resourceContactNO);
              setResourceRole(params.row.resourceRole);
              setResourceType(params.row.resourceType);
              setPassword(params.row.password);
              setConfirmPassword(params.row.password);
              setRole(params.row.role);
              setUserCurrentStatus(params.row.currentStatus);
              setFormHeaderText("Update User");
              setSubmitBtText("Update User");
              setAction("update");
            }}
          >
            <img
              src={EditIcon}
              width="20"
              height="20"
              title="Update User"
              alt="Update User"
            />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Delete User"
            onClick={() => {
              setDeleteUserData(params.row);
              setDeleteAlert(true);
            }}
          >
            <img
              src={DeleteIcon}
              width="20"
              height="20"
              title="Delete User"
              alt="Delete User"
            />
          </IconButton>
        </div>
      ),
    },
  ];

  const noRow = () => {
    return (
      <GridOverlay className={commonClasses.emptyMsg}>
        <DescriptionIcon /> No User Found
      </GridOverlay>
    );
  };

  const [tbRows, setTBRows] = React.useState([]);
  const [originalTBRows, setOriginalTBRows] = React.useState([]);

  const [searchText, setSearchText] = React.useState("");

  const [user, setUser] = useContext(Context);

  useEffect(() => {
    if (user.isLogin) {
      document.title = "Onboard User | AmfFileUploader  "; 
      AuthService.getDropValuesList("User_Role").then((response) => {
        setRoleList(response);
      });
      AuthService.getDropValuesList("User_Sub_Role").then((response) => {
        setSubRoleList(response);
      });
      AuthService.getDropValuesList("User_Current_Status").then((response) => {
        setUserCurrentStatusList(response);
      });

      AuthService.getTeamDropValues().then((response) => {
        setTeamList(response);
      });
      AuthService.getDropValuesList("Resource_Role").then((response) => {
        setResourceRoleList(response);
      });
      AuthService.getDropValuesList("Resource_Type").then((response) => {
        setResourceTypeList(response);
      });
      reloadUserList();
    }
  }, [user]);

  if (!user.isLogin) {
    return <Authentication />;
  }

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = originalTBRows.filter((row) => {
      return searchRegex.test(row.resourceName.toString());
    });
    setTBRows(filteredRows);
  };

  return (
    <div className={commonClasses.page}>
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
      <Dialog
        open={deleteAlert}
        onClose={closeDeleteAlert}
        className={commonClasses.deleteAlert}
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <WarningAmberRoundedIcon className={commonClasses.warningIcon} />{" "}
            Are you sure want to delete user{" "}
            <b>{deleteUserData.resourceName}</b>
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

      <br />
      <br />

      <Paper variant="outlined" className={commonClasses.formPageMiniOuter}>
        <div className={commonClasses.formPageHeader}>{formHeaderText}</div>
        <div className={commonClasses.formPageBody}>
          <Grid container>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel} style={{ color: '#98314F' }}>
                Resource Name
              </label>
              <input
                  className={commonClasses.formPageBodyInput}  
                  type="text"
                  id="resourceName"
                  placeholder="Enter Resource Name"
                  value={resourceName}
                  onChange={(event) => {
                    setResourceName(event.target.value);
                    setResourceNameErrorMsg("");
                    setResourceNameError(false);
                    setError(false);
                    setErrorMsg("");
                  }}
                  style={{
                    width: '200px', 
                    padding: '10px 15px',  
                    borderRadius: '20px',  
                    border: '1px solid #ccc', 
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',  
                    outline: 'none',  
                    transition: 'border-color 0.3s, box-shadow 0.3s',  
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#821045'; 
                    e.target.style.boxShadow = '0 0 5px rgba(130, 20, 69, 0.5)'; 
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ccc'; 
                    e.target.style.boxShadow = 'none';
                  }}
                  helperText={resourceNameErrorMsg}
                  error={resourceNameError}
                />

            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel} style={{ color: '#98314F' }}>
                Resource Email
              </label>
              <input
                  className={commonClasses.formPageBodyInput}  
                  id="resourceEmail"
                  placeholder="Enter Resource Email"
                  value={resourceEmail}
                  onChange={(event) => {
                    setResourceEmail(event.target.value);
                    setResourceEmailErrorMsg("");
                    setResourceEmailError(false);
                    setError(false);
                    setErrorMsg("");
                  }}
                  style={{
                    width: '200px',  
                    padding: '10px 15px',  
                    borderRadius: '20px',  
                    border: '1px solid #ccc',  
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',  
                    outline: 'none',  
                    transition: 'border-color 0.3s, box-shadow 0.3s',  
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#821045'; 
                    e.target.style.boxShadow = '0 0 5px rgba(130, 20, 69, 0.5)'; 
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ccc'; 
                    e.target.style.boxShadow = 'none'; 
                  }}
                  helperText={resourceEmailErrorMsg}
                  error={resourceEmailError}
                />
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel} style={{ color: '#98314F' }}>
                Resource Contact Number
              </label>
              <input
                  className={commonClasses.formPageBodyInput}  
                  id="contactNumber"
                  placeholder="Enter Contact Number"
                  value={contactNumber}
                  onChange={(event) => {
                    setcontactNumber(event.target.value);
                    setcontactNumberErrorMsg("");
                    setcontactNumberError(false);
                    setError(false);
                    setErrorMsg("");
                  }}
                  style={{
                    width: '200px',  
                    padding: '10px 15px',  
                    borderRadius: '20px',  
                    border: '1px solid #ccc',  
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',  
                    outline: 'none',  
                    transition: 'border-color 0.3s, box-shadow 0.3s',  
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#821045'; 
                    e.target.style.boxShadow = '0 0 5px rgba(130, 20, 69, 0.5)'; 
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ccc'; 
                    e.target.style.boxShadow = 'none'; 
                  }}
                  helperText={contactNumberErrorMsg}
                  error={contactNumberError}
                />
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel} style={{ color: '#98314F' }}>
                Resource Role
              </label>
              <Select
                style={{
                  width: "225px",
                  height: "30px",
                  display: "flex",
                  color: "#3b4452",
                  fontSize: "14px",
                }}
                id="resourceRole"
                error={resourceRoleError}
                value={resourceRole}
                onChange={(event) => {
                  setResourceRole(event.target.value);

                  setResourceRoleError(false);
                  setError(false);
                  setErrorMsg("");
                }}
              >
                <MenuItem
                  style={{ fontSize: "14px", height: "30px" }}
                  value="Select Resource Role"
                >
                  Select Resource Role
                </MenuItem>

                {resourceRoleList.map((role) => (
                  <MenuItem
                    style={{ fontSize: "14px", height: "30px" }}
                    key={role.value_ID}
                    value={role}
                  >
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel} style={{ color: '#98314F' }}>
                Resource Type
              </label>
              <Select
                style={{
                  width: "225px",
                  height: "30px",
                  display: "flex",
                  color: "#3b4452",
                  fontSize: "14px",
                }}
                id="resourceType"
                error={resourceTypeError}
                value={resourceType}
                onChange={(event) => {
                  setResourceType(event.target.value);
                  setResourceTypeError(false);
                  setError(false);
                  setErrorMsg("");
                }}
              >
                <MenuItem
                  style={{ fontSize: "14px", height: "30px" }}
                  value="Select Resource Type"
                >
                  Select Resource Type
                </MenuItem>

                {resourceTypeList.map((type) => (
                  <MenuItem
                    style={{ fontSize: "14px", height: "30px" }}
                    key={type.value_ID}
                    value={type}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel} style={{ color: '#98314F' }}>Role</label>
              <Select
                style={{
                  width: "225px",
                  height: "30px",
                  display: "flex",
                  color: "#3b4452",
                  fontSize: "14px",
                }}
                id="role"
                error={roleError}
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                  setRoleError(false);
                  setError(false);
                  setErrorMsg("");
                  event.target.value === "Admin"
                    ? setIsSubRoleDisabled(true)
                    : setIsSubRoleDisabled(false);
                }}
              >
                <MenuItem
                  style={{ fontSize: "14px", height: "30px" }}
                  value="Select User Role"
                >
                  Select User Role
                </MenuItem>

                {roleList.map((role) => (
                  <MenuItem
                    style={{ fontSize: "14px", height: "30px" }}
                    key={role}
                    value={role}
                  >
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel} style={{ color: '#98314F' }}>
                Current Status
              </label>
              <Select
                style={{
                  width: "225px",
                  height: "30px",
                  display: "flex",
                  color: "#3b4452",
                  fontSize: "14px",
                }}
                id="userCurrentStatus"
                error={userCurrentStatusError}
                value={userCurrentStatus}
                onChange={(event) => {
                  setUserCurrentStatus(event.target.value);
                  setUserCurrentStatusError(false);
                  setError(false);
                  setErrorMsg("");
                }}
              >
                <MenuItem
                  style={{ fontSize: "14px", height: "30px" }}
                  value="Select Current Status"
                >
                  Select Current Status
                </MenuItem>

                {userCurrentStatusList.map((status) => (
                  <MenuItem
                    style={{ fontSize: "14px", height: "30px" }}
                    key={status}
                    value={status}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel} style={{ color: '#98314F' }}>
                Password
              </label>
              <input
                  className={commonClasses.formPageBodyInput}  
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setPasswordError(false);
                    setError(false);
                    setErrorMsg("");
                    setPasswordErrorMsg("");
                  }}
                  style={{
                    width: '200px',  
                    padding: '10px 15px',  
                    borderRadius: '20px',  
                    border: '1px solid #ccc',  
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',  
                    outline: 'none',  
                    transition: 'border-color 0.3s, box-shadow 0.3s',  
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#821045'; 
                    e.target.style.boxShadow = '0 0 5px rgba(130, 20, 69, 0.5)'; 
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ccc'; 
                    e.target.style.boxShadow = 'none'; 
                  }}
                  helperText={passwordErrorMsg}
                  error={passwordError}
                />
            </Grid>

            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel} style={{ color: '#98314F' }}>
                Confirm Password
              </label>
              <input
                  className={commonClasses.formPageBodyInput}  
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Please confirm the password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setConfirmPasswordError(false);
                    setError(false);
                    setErrorMsg("");
                    setConfirmPasswordErrorMsg("");
                  }}
                  style={{
                    width: '200px',  
                    padding: '10px 15px',  
                    borderRadius: '20px',  
                    border: '1px solid #ccc',  
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',  
                    outline: 'none',  
                    transition: 'border-color 0.3s, box-shadow 0.3s',  
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#821045'; 
                    e.target.style.boxShadow = '0 0 5px rgba(130, 20, 69, 0.5)'; 
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ccc'; 
                    e.target.style.boxShadow = 'none'; 
                  }}
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMsg}
                />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ mt: "10px", mb: "10px" }}
              className={commonClasses.formPageBodyButtonField}
            >
              <button
                className={commonClasses.formPageBodyButton}
                onClick={handleSubmitAction}
              >
                {" "}
                {submitBtText}{" "}
              </button>
            </Grid>
          </Grid>
        </div>
      </Paper>

      <br />
      <br />

      <Paper variant="outlined" className={commonClasses.formPageMiniOuter}>
        <div className={commonClasses.formPageHeader}>Onboarded User</div>
        <div className={commonClasses.formPageBody}>
          <DataGrid
            style={{ padding: 20, fontSize: 12 }}
            rows={tbRows}
            columns={tbColumns}
            rowHeight={34}
            headerHeight={34}
            className={tableClasses.root}
            pageSize={10}
            components={{
              NoRowsOverlay: noRow,
              Toolbar: QuickSearchToolbar,
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

