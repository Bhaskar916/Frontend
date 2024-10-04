/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import noprofile from '../../../../assets/images/noprofile.png';
import IconButton from "@material-ui/core/IconButton";
import useStyles from '../../../common/common-css/CommonStyle';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import getCroppedImg from './CropImage';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AuthService from '../../../services/AuthService';
import { Context } from '../../../common/UserAuth';
import Authentication from '../../../common/AuthComponent';



function MyProfile(){


    const commonClasses = useStyles();
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [managerName, setManagerName] = React.useState("");
    const [managerEmail, setManagerEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [onBoardedBy, setOnBoardedBy] = React.useState("");
    const [onBoardedDate, setOnBoardedDate] = React.useState("");
    const [applicationList, setApplicationList] = React.useState([]);
    const [rolesList, setRolesList] = React.useState([]);
    const [orgRole, setOrgRole] = React.useState("");
    const [resourceType, setResourceType] = React.useState("");
    const [appRole, setAppRole] = React.useState("");
    const [appSubRole, setAppSubRole] = React.useState("");

    const [showSubRole, setShowSubrole] = React.useState(false);
    
    const [user, setUser] = useContext(Context);
    var userId = user.userData.resourceID;

    useEffect(() => {
        document.title = "My Profile | easySwat";
        AuthService.getProfileData(userId).then((response) => {
            console.log(response);
            setUserName(response.resourceName);
             setEmail(response.resourceEmail);
            setManagerName(response.reportManagName);
            setManagerEmail(response.reportManagEmail);
            setPhone(response.resourceContact);
            // setGender(response.gender);
            setOnBoardedBy(response.onBoardedBy);
            // setOnBoardedDate(response.onBoardedDate);
            // setApplicationList(response.applicationList);
            setOrgRole(response.resourceRole);
            setResourceType(response.resourceType)
            setAppRole(response.role);
            if(response.role !== "Admin"){
                setShowSubrole(true)
            setAppSubRole(response.subRole);
            }

        })
    },[]);
    
    
    const [openModal, setOpenModal] = useState(false);

    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const [cropImage, setCropImage] = React.useState(null);
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [zoom, setZoom] = React.useState(1);

    const [profileImage, setProfileImage] = React.useState(noprofile);
    
    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

    const handleCloseModal = () => {
        setOpenModal(false);
        setCropImage(null);
        setError(false);
    };
    const inputRef = React.useRef();

    const triggerFileSelectPopup = () => inputRef.current.click();

    const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setCropImage(reader.result);
			});
		}
	};

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
    
        while (n--) u8arr[n] = bstr.charCodeAt(n);
    
        return new File([u8arr], filename, { type: mime });
    };

    const onUpload = async () => {
		if (!cropImage){
            setError(true);
            setErrorMsg("Please select an image!");
        }

        else{
		    const canvas = await getCroppedImg(cropImage, croppedArea);
		    const canvasDataUrl = canvas.toDataURL("image/jpeg");
		    const convertedUrlToFile = dataURLtoFile(
			    canvasDataUrl,
			    "cropped-image.jpeg"
		        );
		    console.log(convertedUrlToFile);
            setProfileImage(canvasDataUrl);
            setCropImage(null);
            setOpenModal(false);
            setErrorMsg('');
            setError(false);
        }
	};

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        setErrorMsg('');
        setError(false);
      };

      if (!user.isLogin) {
        return <Authentication />
    }

    return (<div className={commonClasses.page}>
                <br/><br/><br/><br/>
                
                    
                    <Paper className={commonClasses.formPageMediumOuter}>
                    <div className={commonClasses.formPageHeader} >
                    <i><h2>Hello !! {userName}</h2></i>
                    </div>
                    <Grid container>
                        <Grid item xs={4}>
                            <Paper style={{ margin: "16px",backgroundColor: "#c2bfb2",height:230,width:240}}>
                                <Avatar style={{ margin: "8px", width: 230, height: 230 }} alt="Profile Picture" src={profileImage} />
                                <IconButton
                                style={{ 	
                                height: "3rem",
                                width: "3rem",
                                //position: "fixed",
                                top: "250px;",
                                left: "220px",
                                backgroundColor: "white",
                                color: "#000000",
                                "&:hover": {
                                    backgroundColor: "white",
                                },}}   
					                aria-haspopup='true'
                                    onClick={(event) => {
                                        setError(true);
                                        setErrorMsg("Coming Soon");
                                        //setOpenModal(true);
                                    }}>
					                <EditIcon fontSize='large' />
				                </IconButton>
                            </Paper>
                            <Modal
                                open={openModal}
                                onClose={handleCloseModal}
                                aria-labelledby="My-Profile-Image"
                                aria-describedby="Uploading profile picture model"
                                className={commonClasses.modalBox}
                            >
                                <Paper className={commonClasses.modalPopup}>
                                
                                    <Snackbar 
                                        open={error} 
                                        autoHideDuration={4000} 
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        onClose={handleCloseSnackbar}>
                                            <Alert onClose={handleCloseSnackbar} severity='warning'>
                                                {errorMsg}
                                            </Alert>
                                    </Snackbar>

                                    <IconButton className={commonClasses.cancelIconButtonBox} onClick={handleCloseModal}>
				                        <CancelIcon className={commonClasses.cancelIconButton} />
			                        </IconButton>

                                    <div className={commonClasses.containerCropper}>
				                        {cropImage ? (
					                        <>
						                    <div className={commonClasses.cropper}>
							                    <Cropper
								                    image={cropImage}
								                    crop={crop}
								                    zoom={zoom}
								                    aspect={1}
								                    onCropChange={setCrop}
								                    onZoomChange={setZoom}
								                    onCropComplete={onCropComplete}
							                    />
						                    </div>

						                    <div className={commonClasses.slider}>
							                    <Slider
								                    min={1}
								                    max={3}
								                    step={0.1}
								                    value={zoom}
								                    onChange={(e, zoom) => setZoom(zoom)}
								                    color='secondary'
							                    />
						                    </div>
					                        </>
				                        ) : null}
			                        </div>
                                    
                                    <div className={commonClasses.containerButtons}>
				                        <input
					                        type='file'
					                        accept='image/*'
					                        ref={inputRef}
					                        onChange={onSelectFile}
					                        style={{ display: "none" }}
				                        />

                                        <Button
					                        variant='contained'
					                        color='primary'
					                        onClick={triggerFileSelectPopup}
					                        style={{ marginRight: "20px" }}
				                        >Choose</Button>
				
                                        <Button 
                                            variant='contained' 
                                            color='primary'
                                            onClick={onUpload} 
                                        >Upload</Button>
			                        </div>
                                </Paper>
                            </Modal>
                            <div >                    
                                <b style={{fontSize:"20px"}}>Roles In</b>
                                &nbsp;
                            <b className={commonClasses.loginCardAppNameStart}>easy</b>
                        <b className={commonClasses.loginCardAppNameEnd}>SWAT</b>
                     
                                <ul style={{textAlign:"left", fontSize:"15px"}}>
                                {/* {
                                    rolesList.map(item =>
                                           <li key={item.role}>{item.role}</li>     
                                        )
                                } */}
                                <li>{appRole}</li> 
                                </ul>
                            </div>
                            {showSubRole ?
                            <div >                    
                                <b style={{fontSize:"18px"}}>Sub Roles</b>
                                <ul style={{textAlign:"left", fontSize:"15px"}}>
                                {/* {
                                    rolesList.map(item =>
                                           <li key={item.role}>{item.role}</li>     
                                        )
                                } */}
                                <li>{appSubRole}</li> 
                                </ul>
                            </div>
                            : null }
                        </Grid>
                        <Grid item xs={8}>
                            <Paper style={{ margin: "16px", background: '#F4F3EE'}}>
                                <h5 className={commonClasses.subHeaderText}>My Profile</h5>
                                <br/>
                                <Grid container>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'right',paddingRight: "8px",fontWeight: 650}}>
                                        <p>Name</p>
                                    </Grid>
                                    <Grid item xs={6}  style={{marginTop:"-20px",textAlign:'left', paddingLeft: "8px"}}>
                                        <p>{userName}</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'right',paddingRight: "8px",fontWeight: 650}}>
                                        <p>Email</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'left', paddingLeft: "8px"}}>
                                        <p>{email}</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'right',paddingRight: "8px",fontWeight: 650}}>
                                        <p>Manager Name</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'left', paddingLeft: "8px"}}>
                                        <p>{managerName}</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'right',paddingRight: "8px",fontWeight: 650}}>
                                        <p>Manager Email</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'left', paddingLeft: "8px"}}>
                                        <p>{managerEmail}</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'right',paddingRight: "8px",fontWeight: 650}}>
                                        <p>Phone</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'left', paddingLeft: "8px"}}>
                                        <p>{phone}</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'right',paddingRight: "8px",fontWeight: 650}}>
                                        <p>Role in Organization</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'left', paddingLeft: "8px"}}>
                                        <p>{orgRole}</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'right',paddingRight: "8px",fontWeight: 650}}>
                                        <p>Resource Type</p>
                                    </Grid>
                                    <Grid item xs={6} style={{marginTop:"-20px",textAlign:'left', paddingLeft: "8px"}}>
                                        <p>{resourceType}</p>
                                    </Grid>
                                    {/* <Grid item xs={6} className={commonClasses.leftSidebox}>
                                        <p>On-Boarded Date</p>
                                    </Grid>
                                    <Grid item xs={6} className={commonClasses.rightSidebox}>
                                        <p>{onBoardedDate}</p>
                                    </Grid> */}
                                    {/* <Grid item xs={6} className={commonClasses.leftSidebox}>
                                        <p>Application List</p>
                                    </Grid>
                                    <Grid item xs={6} className={commonClasses.rightSidebox}>
                                    <div >
                                        {
                                            applicationList.map(app =>
                                            <p key={app.name}>{app.name}</p>     
                                        )
                                        }
                                    </div>      
                                    </Grid> */}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
                <br/><br/><br/>
            </div>);
    
}

export default MyProfile;

