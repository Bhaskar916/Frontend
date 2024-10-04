import { makeStyles } from '@material-ui/core/styles';

var useStyles = makeStyles((theme) => ({
    
    
    detailsBox: {
        margin: theme.spacing(2),
        background: '#F4F3EE'
    },
    subHeaderText:{
        margin: 'auto',
        padding: theme.spacing(1),
        backgroundColor: "#C0C0C0"
    },
    leftSidebox:{
        textAlign: 'right',
        paddingRight: theme.spacing(2),
        fontWeight: 650
    },
    rightSidebox:{
        textAlign: 'left',
        paddingLeft: theme.spacing(2)
    },
    profilePicBox:{
        margin: theme.spacing(2),
        backgroundColor: "#F4F3EE",
        height:270,
        width:280
    },
    profilePic:{
        margin: theme.spacing(1),
        width: 265,
        height: 265
    },
    editIcon: {
		height: "3rem",
		width: "3rem",
		position: "absolute",
		top: "360px;",
		left: "455px",
		backgroundColor: "white",
        color: "#000000",

		"&:hover": {
			backgroundColor: "white",
		},
	},
    modalBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPopup: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 900,
        height: 500
    },
    cancelIconButtonBox: {
		float: "right",
        marginTop: "-15px",
        marginRight: "-30px"
	},
	cancelIconButton: {
		color: "#00a3c8",
		fontSize: "25px",
		"&:hover": {
			color: "red",
		},
	},
    containerButtons : {
        height: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    containerCropper:{
        height: "90%",
	    padding: "10px"
    },
    cropper: {
        height: "90%",
        position: "relative"
    },
    slider: {
        height: "10%",
        display: "flex",
        alignItems: "center",
        margin: "auto",
        width: "60%"
    },
    

}));

export default useStyles;