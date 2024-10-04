import React, { useState, useContext, useEffect, useRef } from "react";
import {
  connectToConnectionLogs,
  connectToProgressLogs,
  disconnectWebSockets,
} from "../services/websocketService";
import Paper from "@mui/material/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/material/Alert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { alpha, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { Context } from "../common/UserAuth";
import { useSpring, animated } from "@react-spring/web";
import Authentication from "../common/AuthComponent";
import Footer from "../common/footer/Footer";
import commonStyles from "../common/common-css/CommonStyle";
import AuthService from "../services/AuthService";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const CHUNK_SIZE = 1024 * 1024 * 1024; // 5MB chunk size
// CSS styling
const containerStyle = {
  display: "flex",
  flexDirection: "row",
  height: "calc(100vh - 350px)", // Adjust height to make room for buttons and progress
  border: "1px solid #ccc",
};

const panelStyle = {
  flex: 1,
  padding: "10px",
  borderRight: "1px solid #ccc",
  overflowY: "auto",
  maxHeight: "calc(100vh - 400px)", // Adjusted height to allow space for buttons
};

const inputContainerStyle = {
  display: "flex",
  gap: "3px",
  marginBottom: "5px",
};

const inputStyle = {
  fontSize: "0.8rem",
};

const logStyle = {
  fontSize: "0.8rem", // Smaller font size
  marginBottom: "4px",
};

const rightPanelStyle = {
  ...panelStyle,
  borderRight: "none",
};

const tabsStyle = {
  border: "1px solid #ccc",
  background: "#fff", // Make sure it has a background to cover content scrolling under it
};

const progressStyle = {
  flex: 1,
  height: "120px",
  padding: "10px",
  border: "1px solid #ccc",
  overflow: "auto",
};
// Custom Expand/Collapse Icons
function MinusSquare(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M15 12.75C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H15Z"
          fill="#000000"
        ></path>{" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62177 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62177 21.25 12C21.25 14.3782 21.2484 16.0864 21.0736 17.3864C20.9018 18.6648 20.5749 19.4355 20.0052 20.0052C19.4355 20.5749 18.6648 20.9018 17.3864 21.0736C16.0864 21.2484 14.3782 21.25 12 21.25C9.62177 21.25 7.91356 21.2484 6.61358 21.0736C5.33517 20.9018 4.56445 20.5749 3.9948 20.0052C3.42514 19.4355 3.09825 18.6648 2.92637 17.3864C2.75159 16.0864 2.75 14.3782 2.75 12C2.75 9.62177 2.75159 7.91356 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z"
          fill="#000000"
        ></path>{" "}
      </g>
    </svg>
  );
}

function PlusSquare(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="Edit / Add_Plus_Square">
          {" "}
          <path
            id="Vector"
            d="M8 12H12M12 12H16M12 12V16M12 12V8M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20.0002 5.51962 20.0002 6.07967 20.0002 7.19978V16.7998C20.0002 17.9199 20.0002 18.48 19.7822 18.9078C19.5905 19.2841 19.2842 19.5905 18.9079 19.7822C18.4805 20 17.9215 20 16.8036 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
// Animation Component
function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}
TransitionComponent.propTypes = {
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const actionButtonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  margin: "10px",
  padding: "10px",
};

// Function to initialize logs from localStorage
const initializeLogs = () => {
  const storedLogs = localStorage.getItem("uploadDownloadLogs");
  return storedLogs ? JSON.parse(storedLogs) : [];
};
// Function to save logs to localStorage
const saveLogsToLocalStorage = (logs) => {
  localStorage.setItem("uploadDownloadLogs", JSON.stringify(logs));
};
const useStyles = makeStyles({
  root: {
    height: "78%",
    flexGrow: 1,
    overflow: "auto",
  },
});

export default function Dashboard() {
  const [user, setUser] = useContext(Context);
  const commonClasses = commonStyles();
  const classes = useStyles();
  const [fileName, setFileName] = useState(""); // State to store file name
  const [downloadLink, setDownloadLink] = useState("");
  // const [selectedHost, setSelectedHost] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [isConnected, setIsConnected] = useState(() => {
    const storedValue = window.sessionStorage.getItem("isConnected");
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const [toRemotePath, setToRemotePath] = useState("");
  const [selectedFileSize, setSelectedFilesize] = useState("");
  const [uplodedFileSize, setUploadedFileSize] = useState(0);
  const [uploadStartTime, setUploadStartTime] = useState("");
  const [uploadEndTime, setUploadEndTime] = useState("");
  const [uploadStatusMessage, setUploadStatusMessage] = useState("");
  const [selectedRemoteFilePath, setSelectedRemoteFilePath] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [totalTime, setTotalTime] = useState(0); // Store total upload time
  // const [directoryData, setDirectoryData] = useState([]);
  const [remoteDirectoryData, setRemoteDirectoryData] = useState([]);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("warning");
  const [resetTree, setResetTree] = useState(false);
  const [hostname, setHostname] = useState("192.168.0.236");
  const [port, setPort] = useState("2024");
  const [username, setUsername] = useState("foo");
  const [password, setPassword] = useState("password");
  const [remoteDirectoryPath, setRemoteDirectoryPath] =
    useState("/home/foo/upload/");
  const [logs, setLogs] = useState([]);
  const [expanded, setExpanded] = useState([]); // To track expanded state for each item
  const [progressLogs, setProgressLogs] = useState(initializeLogs);
  // const [connectionLogs, setConnectionLogs] = useState([]);
  const connectionLogClientRef = useRef(null);
  const progressLogClientRef = useRef(null);
  // Event handler for icon click
  const handleIconClick = () => {
    console.log("Icon button clicked!");
  };

  const getMessageStyle = (type) => {
    switch (type) {
      case "error":
        return { color: "red" };
      case "success":
        return { color: "green" };
      case "info":
      default:
        return { color: "black" };
    }
  };

  const handleConnect = async () => {
    const time = new Date().toLocaleTimeString();
    setLogs([
      ...logs,
      { message: `Connecting to ${hostname}...`, type: "info", time },
    ]);
    window.sessionStorage.setItem("isConnected", "false");
    setIsConnected(false);
    setRemoteDirectoryData([]);

    AuthService.testSFTPConnection(username, hostname, port, password)
      .then((response) => {
        if (response.status === 200) {
          window.sessionStorage.setItem("isConnected", "true");
          setIsConnected(true);
        }
        setLogs((prevLogs) => [
          ...prevLogs,
          { message: response.data, type: "success", time },
        ]);
      })
      .catch((error) => {
        const errorMessage = error?.response?.data || error;
        setLogs((prevLogs) => [
          ...prevLogs,
          { message: errorMessage, type: "error", time },
        ]);
      });
  };

  const handleCancel = () => {
    setFile(null);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorMsg("");
    setError(false);
    setAlertSeverity("warning");
  };
  const fetchRemoteDirectoryContents = async (dirPath) => {
    try {
      const response = await AuthService.getSFTPDirectory(
        hostname,
        port,
        username,
        password,
        dirPath
      );
      // Check if response data is empty
      if (response.data.length === 0) {
        return [
          {
            name: "No files",
            path: "",
            isDirectory: false,
            children: [],
          },
        ];
      }

      return response.data.map((item) =>
        item.isDirectory
          ? {
              ...item,
              children: [{ name: "Loading...", path: "", isDirectory: false }],
            }
          : item
      );
    } catch (error) {
      console.error("Error fetching directory contents:", error);
      return [];
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    setIsUploading(true);
    setSelectedFilesize(file.size);
    setUploadProgress(0);
    setSelectedFilePath(file.name);
    setToRemotePath(remoteDirectoryPath + file.name);
    setUploadStartTime(
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    );
    setUploadStatusMessage("Uploading");
    try {
      await AuthService.uploadFileChunk(
        username,
        hostname,
        port,
        password,
        file,
        remoteDirectoryPath
      );
    } catch (error) {}
    setUploadComplete(true);
    setError(true);
    setUploadEndTime(
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    );
    setAlertSeverity("success");
    setErrorMsg("Upload completed successfully!");
    // setIsUploading(false);
    const remoteData = await fetchRemoteDirectoryContents(remoteDirectoryPath);
    setRemoteDirectoryData(remoteData);
  };

  const downloadFile = async (filePath) => {
    if (!filePath) {
      alert("Please enter a valid file path");
      return;
    }
    const response = await AuthService.sftpFileDownload(
      filePath,
      user.userData.userID,
      username,
      hostname,
      port,
      password
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
    setSelectedRemoteFilePath("");
    setError(true);
    setAlertSeverity("success");
    setErrorMsg("File downloaded succesfuly");
  };

  useEffect(() => {
    // Connect to connection logs WebSocket
    connectToConnectionLogs(
      (content) => {
        console.log(content);
      },
      (error) => {
        console.error("Connection Logs Error:", error); // Handle error
      }
    );
    // Connect to progress logs WebSocket
    connectToProgressLogs(
      (progress) => {
        setUploadProgress(progress); // Handle progress logs
        console.log(progress);
      },
      (error) => {
        console.error("Progress Logs Error:", error); // Handle error
      }
    );
    // Cleanup WebSocket connections when the component unmounts
    return () => {
      disconnectWebSockets();
    };
  }, []);

  useEffect(() => {
    const fetchRootDirectory = async () => {
      const remoteData = await fetchRemoteDirectoryContents(
        remoteDirectoryPath
      );
      setRemoteDirectoryData(remoteData);
    };
    if (isConnected) fetchRootDirectory();
  }, [isConnected]);

  useEffect(() => {
    saveLogsToLocalStorage(progressLogs);
  }, [progressLogs]);

  const handleRemoteDirectoryClick = async (item) => {
    if (item.isDirectory) {
      if (item.children[0]?.name === "Loading...") {
        // Fetch and update directory contents
        const directoryContents = await fetchRemoteDirectoryContents(item.path);
        setRemoteDirectoryData(
          updateRemoteDirectoryChildren(
            remoteDirectoryData,
            item.path,
            directoryContents
          )
        );
      }
    } else {
      // If not a directory, log the full path to the console
      setSelectedRemoteFilePath(item.path);
    }
  };

  const updateDirectoryChildren = (data, path, children) => {
    return data.map((item) => {
      if (item.path === path) return { ...item, children };
      if (item.isDirectory && item.children)
        return {
          ...item,
          children: updateDirectoryChildren(item.children, path, children),
        };
      return item;
    });
  };

  const updateRemoteDirectoryChildren = (data, path, children) => {
    return data.map((item) => {
      if (item.path === path) return { ...item, children };
      if (item.isDirectory && item.children)
        return {
          ...item,
          children: updateRemoteDirectoryChildren(
            item.children,
            path,
            children
          ),
        };
      return item;
    });
  };

  const renderRemoteTreeItems = (items) => {
    return items.map((item) => (
      <StyledTreeItem
        key={item.path}
        nodeId={item.path}
        label={item.name}
        onClick={() => handleRemoteDirectoryClick(item)}
        children={item.children && renderRemoteTreeItems(item.children)}
      />
    ));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const progressList = [];
  const toggleExpand = (index) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  if (!user.isLogin) {
    return <Authentication />;
  }

  return (
    <div
      className={commonClasses.page}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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

      <Paper variant="outlined" className={commonClasses.formPageMiniOuter}>
        <div style={inputContainerStyle}>
          <span
            style={{
              color: "#821045",
              fontFamily: "Lato Black, sans-serif",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            <b>Connection</b>
          </span>
        </div>

        <div style={inputContainerStyle}>
          <input
            type="text"
            value={hostname}
            onChange={(e) => setHostname(e.target.value)}
            placeholder="Hostname"
            id="hostname" // Added ID for specificity
            className="sprite-img-top-nav sprite-top-search" // Maintain consistent classes
            style={{
              width: "150px", // Adjust width as necessary
              padding: "10px 15px", // Adjust padding for better spacing
              borderRadius: "20px", // Rounded corners
              border: "1px solid #ccc", // Light border
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow
              outline: "none", // No outline on focus
              transition: "border-color 0.3s, box-shadow 0.3s", // Smooth transition
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#821045"; // Change border color on focus
              e.target.style.boxShadow = "0 0 5px rgba(130, 20, 69, 0.5)"; // Add shadow on focus
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc"; // Revert border color
              e.target.style.boxShadow = "none"; // Remove shadow
            }}
          />

          <input
            type="text"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            placeholder="Port"
            id="port" // Added ID for specificity
            className="sprite-img-top-nav sprite-top-search"
            style={{
              width: "150px", // Adjust width as necessary
              padding: "10px 15px", // Adjust padding for better spacing
              borderRadius: "20px", // Rounded corners
              border: "1px solid #ccc", // Light border
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow
              outline: "none", // No outline on focus
              transition: "border-color 0.3s, box-shadow 0.3s", // Smooth transition
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#821045"; // Change border color on focus
              e.target.style.boxShadow = "0 0 5px rgba(130, 20, 69, 0.5)"; // Add shadow on focus
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc"; // Revert border color
              e.target.style.boxShadow = "none"; // Remove shadow
            }}
          />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            id="username" // Added ID for specificity
            className="sprite-img-top-nav sprite-top-search"
            style={{
              width: "150px", // Adjust width as necessary
              padding: "10px 15px", // Adjust padding for better spacing
              borderRadius: "20px", // Rounded corners
              border: "1px solid #ccc", // Light border
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow
              outline: "none", // No outline on focus
              transition: "border-color 0.3s, box-shadow 0.3s", // Smooth transition
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#821045"; // Change border color on focus
              e.target.style.boxShadow = "0 0 5px rgba(130, 20, 69, 0.5)"; // Add shadow on focus
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc"; // Revert border color
              e.target.style.boxShadow = "none"; // Remove shadow
            }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="password" // Added ID for specificity
            className="sprite-img-top-nav sprite-top-search"
            style={{
              width: "150px", // Adjust width as necessary
              padding: "10px 15px", // Adjust padding for better spacing
              borderRadius: "20px", // Rounded corners
              border: "1px solid #ccc", // Light border
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow
              outline: "none", // No outline on focus
              transition: "border-color 0.3s, box-shadow 0.3s", // Smooth transition
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#821045"; // Change border color on focus
              e.target.style.boxShadow = "0 0 5px rgba(130, 20, 69, 0.5)"; // Add shadow on focus
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc"; // Revert border color
              e.target.style.boxShadow = "none"; // Remove shadow
            }}
          />

          <input
            type="text" // Corrected type from "test" to "text"
            value={remoteDirectoryPath}
            onChange={(e) => setRemoteDirectoryPath(e.target.value)}
            placeholder="Remote Directory path"
            id="remoteDirectoryPath" // Added ID for specificity
            className="sprite-img-top-nav sprite-top-search"
            style={{
              width: "150px", // Adjust width as necessary
              padding: "10px 15px", // Adjust padding for better spacing
              borderRadius: "20px", // Rounded corners
              border: "1px solid #ccc", // Light border
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow
              outline: "none", // No outline on focus
              transition: "border-color 0.3s, box-shadow 0.3s", // Smooth transition
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#821045"; // Change border color on focus
              e.target.style.boxShadow = "0 0 5px rgba(130, 20, 69, 0.5)"; // Add shadow on focus
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc"; // Revert border color
              e.target.style.boxShadow = "none"; // Remove shadow
            }}
          />

          <button
            type="button"
            className="button-native"
            part="native"
            onClick={handleConnect}
            style={{
              padding: "10px 20px", // Adjust padding for better spacing
              borderRadius: "20px", // Rounded corners
              border: "none", // Remove default border
              backgroundColor: "#821045", // Example background color
              color: "white", // Text color
              cursor: "pointer", // Pointer cursor on hover
              position: "relative", // Required for ripple effect positioning
              overflow: "hidden", // Hide overflow for ripple effect
              transition: "background-color 0.3s",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: "500",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#6c0e30"; // Darker shade on hover
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#821045"; // Revert to original color
            }}
          >
            <span className="button-inner">Connect</span>
            <ion-ripple-effect
              role="presentation"
              className="md hydrated"
            ></ion-ripple-effect>
          </button>
        </div>

        <div style={{ margin: "3px" }}>
          {logs.map((log, index) => (
            <div
              key={index}
              style={{ ...logStyle, ...getMessageStyle(log.type) }}
            >
              {`${log.time} - ${log.message}`}
            </div>
          ))}
        </div>
      </Paper>

      <Paper
        variant="outlined"
        className={commonClasses.formPageMiniOuter}
        style={{ marginTop: "10px" }}
      >
        <div style={containerStyle}>
          <div style={panelStyle}>
            <div
              className={commonClasses.formPageHeader}
              style={{
                color: "#821045",
                fontFamily: "Lato Black, sans-serif",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              <b>Local Directory</b>
            </div>
            <div className={commonClasses.formPageBody}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6} sx={{ mt: "10px", mb: "10px", ml: "36%" }}>
                    <label
                      className={commonClasses.formPageBodyLabel}
                      style={{ color: "#821045" }}
                    >
                      Select a file
                    </label>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <input
                        required
                        className={commonClasses.formPageBodyInput}
                        id="selectFile"
                        name="selectfile"
                        type="file"
                        onChange={(event) => {
                          const selectedFile = event.target.files[0];
                          setFile(selectedFile); // Update the state with the selected file
                        }}
                        style={{
                          display: "none",
                        }}
                      />

                      <label
                        htmlFor="selectFile"
                        style={{
                          width: "180px", // Set width for consistency
                          height: "15px", // Set height for consistency
                          display: "flex", // Align text inside the label
                          alignItems: "center", // Center vertically
                          justifyContent: "center", // Center horizontally
                          padding: "10px 15px", // Adjust padding for better spacing
                          borderRadius: "20px", // Rounded corners
                          border: "1px solid #ccc", // Light border
                          backgroundColor: "#f5f5f5", // Background color for the label
                          color: "#821045", // Text color
                          cursor: "pointer", // Pointer cursor on hover
                          transition: "background-color 0.3s", // Smooth background color transition
                          marginLeft: "-70px",
                          marginBottom: "20px", // Space between the Browse and Upload buttons
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#e0e0e0"; // Darker shade on hover
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#f5f5f5"; // Revert to original color
                        }}
                      >
                        <span
                          style={{
                            padding: "0 10px", // Padding for the "Browse" text
                            color: "white",
                            backgroundColor: "#821045", // Browse button color
                            borderRadius: "5px",
                            marginRight: "10px",
                          }}
                        >
                          Browse
                        </span>
                        <span>
                          {file ? file.name : "No file selected"}{" "}
                          {/* Display file name or default text */}
                        </span>
                      </label>

                      <button
                        type="button"
                        className={`button-native ${commonClasses.formPageBodyButton}`}
                        part="native"
                        onClick={uploadFile}
                        style={{
                          width: "200px", // Ensure the same width as the Browse button
                          height: "30px", // Ensure the same height as the Browse button
                          borderRadius: "20px", // Rounded corners
                          border: "none", // Remove default border
                          backgroundColor: "#821045", // Example background color
                          color: "white", // Text color
                          cursor: "pointer", // Pointer cursor on hover\\
                          marginLeft: "-70px",
                          transition: "background-color 0.3s", // Smooth background color transition
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#6c0e30"; // Darker shade on hover
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#821045"; // Revert to original color
                        }}
                      >
                        Upload
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={rightPanelStyle}>
            <span
              style={{
                color: "#821045",
                fontFamily: "Lato Black, sans-serif",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              <b>Remote Directory</b>
            </span>
            {isConnected ? (
              <>
                <TreeView
                  key={resetTree}
                  className={classes.root}
                  defaultCollapseIcon={<MinusSquare />}
                  defaultExpandIcon={<PlusSquare />}
                >
                  {renderRemoteTreeItems(remoteDirectoryData)}
                </TreeView>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input
                    value={
                      selectedRemoteFilePath
                        ? selectedRemoteFilePath
                        : "No File Selected"
                    }
                    disabled
                    style={{
                      width: "450px",
                      justifyContent: "center",
                      marginTop: "5px", // Adjust width as necessary
                      padding: "10px 15px", // Adjust padding for better spacing
                      borderRadius: "20px", // Rounded corners
                      border: "1px solid #ccc", // Light border
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Light shadow
                      outline: "none", // No outline on focus
                      position: "relative", // Required for ripple effect positioning
                      transition: "border-color 0.3s, box-shadow 0.3s", // Smooth transition
                      marginRight: "15px", // Space between input and button
                      backgroundColor: "#f5f5f5", // Background color for the input
                      color: "#821045", // Text color
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  />
                  <button
                    // onClick={() => {
                    //   downloadFile(selectedRemoteFilePath);
                    // }}
                    disabled={!selectedRemoteFilePath}
                    style={{
                      justifyContent: "center",
                      padding: "10px 16px",
                      marginTop: "5px",
                      marginLeft: "10px",
                      borderRadius: "20px", // Rounded corners
                      border: "none", // Remove default border
                      backgroundColor: "#821045", // Button background color
                      color: "white", // Text color
                      cursor: "pointer", // Pointer cursor on hover
                      position: "relative", // Required for ripple effect positioning
                      overflow: "hidden", // Hide overflow for ripple effect
                      transition: "background-color 0.3s", // Smooth background color transition
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#6c0e30"; // Darker shade on hover
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#821045"; // Revert to original color
                    }}
                  >
                    <a
                      href={`http://localhost:9090/common-module/api/download?remoteFilePath=${selectedRemoteFilePath}`}
                      download
                      target="/"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        display: "block",
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        lineHeight: "normal",
                      }}
                      rel="noopener noreferrer"
                    >
                      download
                    </a>
                  </button>
                </div>
              </>
            ) : (
              <div style={{ justifyContent: "center", margin: "20px" }}>
                Connect the remote host
              </div>
            )}
          </div>
        </div>
      </Paper>

      <Paper
        variant="outlined"
        className={commonClasses.formPageMiniOuter}
        style={{ marginTop: "10px" }}
      >
        <Tabs value={tabValue} onChange={handleTabChange} style={tabsStyle}>
          <b>
            <Tab
              style={{
                color: "#821045",
                fontFamily: "Lato Black, sans-serif",
                fontSize: "18px",
                fontWeight: "500",
              }}
              label="Logs"
            />
          </b>
        </Tabs>

        {progressList.map((progressData, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                marginBottom: "8px",
                color: "#333",
              }}
            >
              <IconButton
                size="medium"
                onClick={() => toggleExpand(index)}
                style={{ fontSize: "30px" }}
              >
                {expanded[index] ? "↑" : "↓"}
              </IconButton>
              <span>
                {progressData.localPath} -- {progressData.remotePath}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: "10px" }}>
              <progress
                value={progressData.progress}
                max="100"
                style={{
                  width: "100%",
                  height: "20px",
                  borderRadius: "5px", // Rounded edges for progress bar
                  backgroundColor: "#e0e0e0",
                }}
              ></progress>
              <div
                style={{
                  textAlign: "right",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                {progressData.progress}% complete
              </div>
            </div>

            {/* Conditionally render metadata when expanded */}
            {expanded[index] && (
              <>
                {/* File Size and Uploaded Bytes (side by side) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#555",
                  }}
                >
                  <div>
                    <strong>File Size:</strong> {progressData.fileSize} bytes
                  </div>
                  <div>
                    <strong>Uploaded:</strong> {progressData.uploadedSize} bytes
                  </div>
                </div>

                {/* Start Time and End Time (after file size and uploaded size) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#888",
                    color: "#555",
                  }}
                >
                  <div>
                    <strong>Start Time:</strong> {progressData.startTime}
                  </div>
                  <div>
                    <strong>End Time:</strong>{" "}
                    {progressData.endTime || "In progress..."}
                  </div>
                </div>

                {/* Message Info (below progress and times) */}
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "8px",
                    color: "#0077cc",
                  }}
                >
                  <strong>Message:</strong> {progressData.message}
                </div>
              </>
            )}
          </div>
        ))}
        {isUploading && (
          <div style={{ marginBottom: "20px" }}>
            {/* Local Path --> Remote Path and Toggle Button */}
            <div
              style={{
                display: "flex",
                // justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                marginBottom: "8px",
                color: "#333",
              }}
            >
              <IconButton
                size="small"
                onClick={() => toggleExpand(progressList.length)}
                style={{ fontSize: "30px" }}
              >
                {expanded[progressList.length] ? "↑" : "↓"}
              </IconButton>
              <span>
                {selectedFilePath} -- {toRemotePath}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: "10px" }}>
              <progress
                value={uploadProgress}
                max="100"
                style={{
                  width: "100%",
                  height: "20px",
                  borderRadius: "5px",
                  backgroundColor: "#e0e0e0",
                }}
              ></progress>
              <div
                style={{
                  textAlign: "right",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                {uploadProgress}% complete
              </div>
            </div>

            {/* Conditionally render metadata when expanded */}
            {expanded[progressList.length] && (
              <>
                {/* File Size and Uploaded Bytes (side by side) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#555",
                  }}
                >
                  <div>
                    <strong>File Size:</strong> {selectedFileSize} bytes
                  </div>
                  <div>
                    <strong>Uploaded:</strong> {uplodedFileSize} bytes
                  </div>
                </div>

                {/* Start Time and End Time (after file size and uploaded size) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#555",
                    marginTop: "8px",
                  }}
                >
                  <div>
                    <strong>Start Time:</strong> {uploadStartTime}
                  </div>
                  <div>
                    <strong>End Time:</strong>{" "}
                    {uploadEndTime || "In progress..."}
                  </div>
                </div>

                {/* Message Info (below progress and times) */}
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "8px",
                    color: "#0077cc",
                  }}
                >
                  <strong>Message:</strong> {uploadStatusMessage}
                </div>
              </>
            )}
          </div>
        )}
      </Paper>
      <Footer />
    </div>
  );
}
