import React,{ useEffect, useContext} from 'react'
import commonStyle from "../../../common/common-css/CommonStyle";
import Constants from "../../../common/Constants";
import Snackbar from "@material-ui/core/Snackbar";
import AuthService from "../../../services/AuthService";
import Alert from "@mui/material/Alert";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from '@mui/material/Switch';

import Authentication from "../../../common/AuthComponent";
import { Context } from "../../../common/UserAuth";
import Footer from "../../../common/footer/Footer";
import QuickSearchToolbar from "../../../common/QuickSearchToolbar";
import EditIcon from "../../../../assets/images/editicon.png";
import DeleteIcon from "../../../../assets/images/delete_icon.png";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import CircularProgress from "@mui/material/CircularProgress";


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";


import { makeStyles } from "@mui/styles";


const tableStyles = makeStyles(() => ({
    root: {
      "& .MuiDataGrid-columnsContainer": {
        backgroundColor: "#f8f8f8",
        color: "black",
      },
    },
  }));


export default function DropDownMaster() {
    const commonClasses = commonStyle();
    const tableClasses = tableStyles();

    const [user, setUser] = useContext(Context);

    const [errorMsg, setErrorMsg] = React.useState("");
    const [error, setError] = React.useState(false);

    const [checked, setChecked] = React.useState(false);

    const [valueID,setValueID] = React.useState()
    const [masterType, setMasterType] = React.useState("Select Master Type");
    const [masterTypeList, setMasterTypeList] = React.useState([])
    const [masterSubType,setMasterSubType] = React.useState("Select Master Sub Type");
    const [masterSubTypeList,setMasterSubTypeList] = React.useState([])
    const [dropdownValue, setDropdownValue] = React.useState("")

    const [severity, setSeverity] = React.useState("warning");
    const [deleteAlert, setDeleteAlert] = React.useState(false);
    const [deleteDropdownValue,setDeleteDropdownValue] = React.useState({})

    const [formHeaderText, setFormHeaderText] = React.useState(
        "Static Master Data"
      );

    const [disablePublishBtn, setDisablePublishBtn] = React.useState(true);  
    const [onBoardBT, setOnBoardBT] = React.useState("Add Dropdown value");

    const [searchText, setSearchText] = React.useState("");

    
    
    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setErrorMsg("");
        setError(false);
      };

    const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = originalTBRows.filter((row) => {
        return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
        });
    });
    setTbRows(filteredRows);
    };

    const reloadPage = () => {
      setMasterType("Select Master Type")
      setMasterSubType("Select Master Sub Type")
      setDropdownValue("")
    };

    const reloadAppList = () => {
      AuthService.getDropDownMaster().then((response) => {
        console.log(response)
          if (response.tbRows !== null) {
            setTbRows(response.tbRows);
            setOriginalTBRows(response.tbRows);
          } else {
            setTbRows([]);
            setOriginalTBRows([]);
          }
        });
    };

    const noRow = () => {
        return (
          <GridOverlay className={commonClasses.emptyMsg}>
            <DescriptionIcon />
            No Drop down data Found
          </GridOverlay>
        );
      };

    const escapeRegExp = (value) => {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      };

    const [tbRows, setTbRows] = React.useState([]);
    const [originalTBRows, setOriginalTBRows] = React.useState([]);

    const tbColumns = [
        { field: "id", headerName: "Dropdown Value ID", hide: true },
        {
          field: "valueName",
          headerName: "Value",
          width: 250,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "masterType",
          headerName: "Master Type",
          width: 250,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "masterSubType",
          headerName: "Master Sub Type",
          width: 250,
          align: "center",
          headerAlign: "center",
        },
        {
          field: "action",
          headerName: "Action",
          width: 220,
          align: "center",
          headerAlign: "center",
          renderCell: (params) => (
            <div>
              <IconButton
                color="primary"
                aria-label="Edit dropdown data"
                component="span"
                onClick={(props) => {
                  console.log("params", params.row);
                  setValueID(params.row.id)
                  setMasterType(params.row.masterType)
                  AuthService.getMasterTypeList().then((response) => {
                    setMasterTypeList(response)
                    });
                  AuthService.getMasterSubTypeList(
                    params.row.masterType
                  ).then((response) => {
                    setMasterSubTypeList(response);
                  });
                  setMasterSubType(params.row.masterSubType)
                  setDropdownValue(params.row.valueName)
                  setOnBoardBT("Update Dropdown value");
                  setFormHeaderText("Update Static Master Data ");
                }}
              >
                <img
                  src={EditIcon}
                  width="20"
                  height="20"
                  title="Edit Application Details"
                  alt="Edit Application Details"
                />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Delete User"
                component="span"
                onClick={() => {
                  setDeleteDropdownValue(params.row);
                  setDeleteAlert(true);
                }}
              >
                <img
                  src={DeleteIcon}
                  width="20"
                  height="20"
                  title="Delete Application"
                  alt="Delete Application"
                />
              </IconButton>
            </div>
          ),
        },
      ];

    const closeDeleteAlert = () => {
    setDeleteAlert(false);
    };


    const handleDeleteAlertSubmit = () => {
      AuthService.deleteDropdownMaster(deleteDropdownValue.id).then((response)=>{
        if (response.data.status === "Deleted") {
          setSeverity("success");
          setErrorMsg("Dropdown Value Deleted Successfully");
          setError(true);
          reloadPage();
          reloadAppList();
        } else {
          setSeverity("error");
          setErrorMsg("failed to delete the dropdown Value");
          setError(true);
        }
      }).catch((error)=>{
        setSeverity("error");
        setErrorMsg("failed to delete the dropdown Value");
        setError(true);
      })
      setDeleteAlert(false);
    };
const handleOnClick = () => {
  if (!masterType || masterType === "" ) {
    setError(true);
    setErrorMsg("Master Type cannot be empty.");
  }else if (masterType === "Select Master Type"){
    setError(true);
    setErrorMsg("Please select a valid Master Type.");
  }else if (!dropdownValue || dropdownValue === "") {
    setError(true);
    setErrorMsg("Dropdown Value cannot be empty.");
  }else{
    setDisablePublishBtn(true);
   
    let reqData = {
      MASTER_TYPE : masterType,
      MASTER_SUB_TYPE : masterSubType === "Select Master Sub Type"?"":masterSubType,
      VALUE_NAME : dropdownValue
    }
    if (onBoardBT === "Add Dropdown value") {
     AuthService.createDropdownMaster(reqData).then((res)=>{
      if (res.data.status === "Inserted") {
        setSeverity("success");
        setErrorMsg("Value Added Successfully");
        setError(true);
        reloadPage();
        reloadAppList();
      } else if (res.data.status === "Duplicate") {
        setSeverity("warning");
        setErrorMsg("Value already exists");
        setError(true);
      } else {
        setSeverity("error");
        setErrorMsg("Error in Adding Value");
        setError(true);
      }
    }).catch((error)=>{
      setSeverity("error");
      setErrorMsg("Error in Adding Value");
      setError(true);
     })
     setDisablePublishBtn(false);
  }else if (onBoardBT === "Update Dropdown value"){
    AuthService.updateDropdownMaster({VALUE_ID:valueID, ...reqData}).then((res)=>{
      if (res.data.status === "Updated") {
        setSeverity("success");
        setError(true);
        setErrorMsg("Value updated Successfully");
        reloadPage();
        reloadAppList();
        setOnBoardBT("Add Dropdown value")
        setFormHeaderText("Static Master Data")
      } else if (res.data.status === "Duplicate") {
        setSeverity("warning");
        setErrorMsg("Value already exists");
        setError(true);
      } else {
        setSeverity("error");
        setErrorMsg("Error in updating Value");
        setError(true);
      }
    }).catch((error)=>{
      setSeverity("error");
      setErrorMsg("Error in updating Value");
      setError(true);
     })
     setDisablePublishBtn(false);
  }

  }
};

    useEffect(() => {
        document.title = "Static Master Data | easyPACS";

        AuthService.getDropDownMaster().then((response) => {
          console.log(response)
            if (response.tbRows !== null) {
              setTbRows(response.tbRows);
              setOriginalTBRows(response.tbRows);
            } else {
              setTbRows([]);
              setOriginalTBRows([]);
            }
          });
        AuthService.getMasterTypeList().then((response) => {
          setMasterTypeList(response)
          });
          
          setDisablePublishBtn(false);

        }, [user]);   

    if (!user.isLogin) {
        return <Authentication />;
      }

  return (
    <div className={commonClasses.page}>
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
            Are you sure want to delete dropdown value{" "}
            <b>{deleteDropdownValue.valueName}</b>
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
      <Paper variant="outlined" className={commonClasses.formPageLargeOuter}>
        <div className={commonClasses.formPageHeader}>{formHeaderText}</div>
        <div className={commonClasses.formPageBody}>
        <Grid container>
        <Grid item xs={12} sx={{ mt: "10px", mb: "10px" }}>
            <label className={commonClasses.formPageBodyLabel}>
                Create New Master Type
              </label>
            <Switch
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
              />
           </Grid>

           {checked?(
            <>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>
                Master Type
              </label>
              <input
                className={commonClasses.formPageBodyInput}
                type="text"
                id="masterType"
                placeholder="Enter Master Type"
                labelPlacement="start"
                value={masterType === "Select Master Type"? "":masterType}
                onChange={(event) => {
                  setMasterType(event.target.value);
                  setError(false);
                  setErrorMsg("")
                }}
              />
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>
                Master Sub Type
              </label>
              <input
                className={commonClasses.formPageBodyInput}
                type="text"
                id="masterSubType"
                placeholder="Enter Master Sub Type"
                labelPlacement="start"
                value={masterSubType === "Select Master Sub Type"? "":masterSubType}
                onChange={(event) => {
                  setMasterSubType(event.target.value);
                  setError(false);
                  setErrorMsg("")
                }}
              />
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>
                Dropdown Value
              </label>
              <input
                className={commonClasses.formPageBodyInput}
                type="text"
                id="dropdownValue"
                placeholder="Enter Dropdown Value"
                labelPlacement="start"
                value={dropdownValue}
                onChange={(event) => {
                  setDropdownValue(event.target.value);
                  setError(false);
                  setErrorMsg("")
                }}
              />
            </Grid>
            </>
            ):(
              <>
              <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>
                Master Type
              </label>
              <Select
                style={{
                  width: "200px",
                  height: "30px",
                  display: "flex",
                  color: "#3b4452",
                  fontSize: "14px",
                }}
                labelId="master-type-id"
                id="masterType"
                value={masterType}
                onChange={(event) => {
                  setMasterType(event.target.value);
                  setError(false);
                  setErrorMsg("");
                  AuthService.getMasterSubTypeList(
                    event.target.value
                  ).then((response) => {
                    setMasterSubTypeList(response);
                  });
                }}
              >
                <MenuItem
                  style={{ fontSize: "14px", height: "30px" }}
                  value="Select Master Type"
                >
                  Select Master Type
                </MenuItem>
                {masterTypeList.map((masterTypeVal,index) => (
                  <MenuItem
                    style={{ fontSize: "14px", height: "30px" }}
                    key={index}
                    value={masterTypeVal}
                  >
                    {masterTypeVal}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>
                Master Sub Type
              </label>
              <Select
                style={{
                  width: "200px",
                  height: "30px",
                  display: "flex",
                  color: "#3b4452",
                  fontSize: "14px",
                }}
                labelId="master-sub-type-id"
                id="masterSubType"
                value={masterSubType}
                onChange={(event) => {
                  setMasterSubType(event.target.value);
                  setError(false);
                  setErrorMsg("");
                }}
              >
                <MenuItem
                  style={{ fontSize: "14px", height: "30px" }}
                  value="Select Master Sub Type"
                >
                  Select Master Sub Type
                </MenuItem>
                {masterSubTypeList.map((masterSubTypeVal,index) => (
                  <MenuItem
                    style={{ fontSize: "14px", height: "30px" }}
                    key={index}
                    value={masterSubTypeVal}
                  >
                    {masterSubTypeVal}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
              <label className={commonClasses.formPageBodyLabel}>
                Dropdown Value
              </label>
              <input
                className={commonClasses.formPageBodyInput}
                type="text"
                id="dropdownValue"
                placeholder="Enter Dropdown Value"
                labelPlacement="start"
                value={dropdownValue}
                onChange={(event) => {
                  setDropdownValue(event.target.value);
                  setError(false);
                  setErrorMsg("")
                }}
              />
            </Grid></>
          )}

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
                variant="contained"
                color="primary"
                onClick={handleOnClick}
              >
                {onBoardBT}
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
      <br />
      <br />
      <br />
      <Paper variant="outlined" className={commonClasses.formPageLargeOuter}>
        <div className={commonClasses.formPageHeader}>{Constants.DROPDOWN_MASTER_LIST}</div>
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
      <br/>
      <br/>
      <br/>
      <Footer />
    </div>
  )
}
