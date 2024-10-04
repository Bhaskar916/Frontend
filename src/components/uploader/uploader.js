/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import commonStyles from "../common/common-css/CommonStyle";
import Paper from "@material-ui/core/Paper";
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Footer from "../common/footer/Footer";
import TextField from "@material-ui/core/TextField";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import DescriptionIcon from "@material-ui/icons/Description";
import AuthService from "../services/AuthService";
import IconButton from "@material-ui/core/IconButton";
import DownloadIcon from "../../assets/images/download_icon.png";
import DeleteIcon from "../../assets/images/delete_icon.png";
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
import { Context } from "../common/UserAuth";
import Authentication from "../common/AuthComponent";
import QuickSearchToolbar from "../common/QuickSearchToolbar";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

const tableStyles = makeStyles(() => ({
  root: {
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: "#f8f8f8",
      color: "black",
    },
  },
}));

export default function OnboardTrack() {
  const commonClasses = commonStyles();
  const tableClasses = tableStyles();

  const [user, setUser] = useContext(Context);
  const [alertSeverity, setAlertSeverity] = React.useState("warning");

  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [totalTime, setTotalTime] = useState(0); // Store total upload time
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
    setUploadComplete(false);
    setTotalTime(0); // Reset total time on file change
  };
  // Fetch the last uploaded chunk index from the server
  const getLastUploadedChunk = async (fileName) => {
    const response = await fetch(
      `http://192.168.0.192:8080/api/upload-status?fileName=${fileName}&chunkSize=${CHUNK_SIZE}`
    );
    if (response.ok) {
      const { lastUploadedChunk } = await response.json();
      return lastUploadedChunk;
    } else {
      return 0; // If no chunks have been uploaded, start from 0
    }
  };
  const uploadChunk = async (chunk, chunkIndex, totalChunks, fileName) => {
    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("chunkIndex", chunkIndex);
    formData.append("totalChunks", totalChunks);
    formData.append("fileName", fileName);
    formData.append("userID", "U0001");
    const response = await fetch("http://192.168.0.192:8080/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Upload failed for chunk ${chunkIndex}`);
    }
  };
  const uploadFile = async () => {
    if (!file) return;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    // Get the last uploaded chunk from the backend
    const lastUploadedChunk = await getLastUploadedChunk(file.name);
    let uploadedChunks = lastUploadedChunk;
    console.log("uploaded chunks", uploadedChunks);
    const startTime = Date.now(); // Record the start time
    for (
      let chunkIndex = lastUploadedChunk;
      chunkIndex < totalChunks;
      chunkIndex++
    ) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      try {
        await uploadChunk(chunk, chunkIndex, totalChunks, file.name); // Pass the file name
        uploadedChunks += 1;
        // Update progress
        setProgress(Math.round((uploadedChunks / totalChunks) * 100));
      } catch (error) {
        console.error(`Error uploading chunk ${chunkIndex}`, error);
        return;
      }
    }
    const endTime = Date.now(); // Record the end time
    const totalTimeTaken = (endTime - startTime) / 1000; // Calculate total time in seconds
    // Set upload complete state when all chunks are uploaded
    setTotalTime(totalTimeTaken); // Set the total time state
    setUploadComplete(true);
    alert("Upload completed successfully!");
  };

  const downloadFile = async (filePath) => {
    if (!filePath) {
      alert("Please enter a valid file path");
      return;
    }
    const response = await fetch(
      `http://192.168.0.192:8080/api/download?filePath=${filePath}&userID=U0001`
    );
    if (!response.ok) {
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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMsg("");
    setError(false);
    setAlertSeverity("warning");
  };

  const tbColumns = [
    { field: "id", headerName: "Row ID", hide: true, filterable: false },
    {
      field: "fileName",
      headerName: "File Name",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "filePath",
      headerName: "File Path",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "userID",
      headerName: "Uploaded By",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Download",
      width: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="Update client"
            onClick={() => {
              downloadFile(params.row.filePath);
            }}
          >
            <img
              src={DownloadIcon}
              width="20"
              height="20"
              title="Update Track"
              alt="Update Track"
            />
          </IconButton>
        </div>
      ),
    },
  ];

  const [tbRows, setTbRows] = React.useState([]);
  const [originalTBRows, setOriginalTBRows] = React.useState([]);

  const noRow = () => {
    return (
      <GridOverlay className={commonClasses.emptyMsg}>
        <DescriptionIcon /> No Uploaded Files found
      </GridOverlay>
    );
  };

  const [searchText, setSearchText] = React.useState("");

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

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user.isLogin) {
        document.title = "File Upload | AmfFileUploader";

        try {
          const response = await fetch("http://192.168.0.192:8080/api/audits");

          if (response.ok) {
            const data = await response.json(); // Assuming you need to parse JSON
            setTbRows(data);
            setOriginalTBRows(data);
          } else {
            console.error("Fetch error:", response.statusText);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();
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
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity}>
          {errorMsg}
        </Alert>
      </Snackbar>

      <Paper variant="outlined" className={commonClasses.formPageMediumOuter}>
        <div className={commonClasses.formPageHeader}>Upload a File </div>
        <div className={commonClasses.formPageBody}>
          <Grid item xs={4} sx={{ mt: "10px", mb: "10px" }}>
            <label className={commonClasses.formPageBodyLabel}>
              Select a File
            </label>
            <input
              className={commonClasses.formPageBodyInput}
              id="password"
              type="file"
              name="file"
              label="file"
              placeholder="Select a file"
              labelplacement="start"
              onChange={handleFileChange}
            />
          </Grid>
          {file && (
            <div>
              <button onClick={uploadFile}>Upload File</button>
              <div style={{ marginTop: "20px" }}>
                <progress
                  value={progress}
                  max="100"
                  style={{ width: "100%" }}
                ></progress>
                <p>{progress}% uploaded</p>
              </div>
              {uploadComplete && (
                <div>
                  <p>File upload completed!</p>
                  <p>Total time taken: {totalTime} seconds</p>{" "}
                </div>
              )}
            </div>
          )}
        </div>
      </Paper>
      <br />
      <br />
      <Paper variant="outlined" className={commonClasses.formPageMediumOuter}>
        <div className={commonClasses.formPageHeader}>Files Uploaded</div>
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
