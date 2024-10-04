import { makeStyles } from '@material-ui/core/styles';

var useStyles = makeStyles((theme) => ({
    page: {
        background: '#f8f8f8'
    },
    header: {
        textAlign: "center",
        color: "#000",
        height: '38px',
        width: 1000,
        margin: 'auto',
        borderLeft: "5px solid #1976d2",
        borderTopLeftRadius: 8,
    },
    miniWidthheader: {
        textAlign: "center",
        color: "#000",
        height: '38px',
        width: 800,
        margin: 'auto',
        borderLeft: "5px solid #1976d2",
        borderTopLeftRadius: 8,
    },
    headerText: {
        width: 210,
        borderTop: "1px solid #FFA500",
        backgroundColor: "#ffffff",
        fontSize: 17,
        padding: '8px',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        fontWeight: 475
    },
    panelBody: {
        borderLeft: "5px solid #1976d2",
        marginBottom: '24px',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: '#ffffff',
        width: 1000,
        textAlign: "left",
        borderTopLeftRadius: 0,
    },
    miniWidthpanelBody: {
        borderLeft: "5px solid #1976d2",
        marginBottom: "24px",
        marginLeft: 'auto',
        marginRight: 'auto',
        background: '#ffffff',
        width: 800,
        textAlign: "left",
        borderTopLeftRadius: 0,
    },
    emptyMsg: {
        margin: 'auto',
        color: '#FFCC00',
        marginLeft: "auto",
        marginRight: "auto"
    },
    submitButton: {
        fontSize: "12px",
        margin: 5,
        width: 210,
        backgroundColor: '#1976d2',
        color: '#ffffff',
        "&:hover": {
            color: "#1976d2",
        },
    },
    overrides: {
        MuiTableRow: {
            head: {
                backgroundColor: 'lightgray',
                "& > th ": {
                    color: 'black',
                    fontWeight: 'bold',
                }
            },
        }
    },
    appName: {
        fontSize: 25,
        fontFamily: "Serif",
        color: "#1976d2",
        textShadow: "1px 1px #000000",
        fontWeight: 600,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabeleSearchBar: {
        padding: '16 16 16',
        height: '37px',
        borderRadius: '25px',
        border: '1px solid #ccc',
        padding: '10px 15px',
        width: '142px',
        float: "right",
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        marginRight: '2px',
    },

    // tabeleSearchBar: {
    //     padding: '16 16 16',
    //     justifyContent: 'space-between',
    //     display: 'flex',
    //     alignItems: 'flex-start',
    //     flexWrap: 'wrap',
    //     float: "right"
    // },

    
    appLevelMaindiv: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    formField: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '32px',
        width: 270
    },
    dataGrid: {
        padding: '16px',
    },
    // deleteAlert: {
    //     width: 1000,
    //     margin: 'auto'
    // },
    // deleteAlertSubmit: {
    //     backgroundColor: '#FF5C5C',
    //     color: "#fff",
    //     "&:hover": {
	// 		color: "#FF5C5C",
	// 	},
    // },
    // warningIcon: {
    //     color: "#ffcc00",
    //     marginBottom: '-4px',
    // },
    tableOuter: {
        border: "1px solid #1976d2",
        margin: '32px',
        borderRadius: 4,
    },
    tableHeader: {
        border: "1px solid #1976d2",
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,    
        backgroundColor: "#1976d2",
        color: "#fff",
        fontSize: 17,
        padding: 5
    },

    formPageMiniOuter: {
        width: '85%',
        margin: 'auto',
        padding: '15px',
        marginTop: '90px', // This will add space below the sticky header
    },
    formPageMediumOuter: {
        width: '900px',
        margin: 'auto',
        padding: '15px'
    },
    formPageLargeOuter: {
        width: '1000px',
        margin: 'auto',
        padding: '15px'
    },
    formPageExtraLargeOuter: {
        width: '1050px',
        margin: 'auto',
        padding: '15px'
    },
    changePassPageLargeOuter: {
        width: '1000px',
        margin: 'auto',
        padding: '15px'
    },
    formPageHeader: {
        fontSize: 18,
        marginTop: 0,
        color: '#98314F',
        marginBottom: 0,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 'bold',
        letterSpacing: 'normal',
        textAlign: 'left',
        lineHeight: 'normal',
    },
    formPageBody: {
        fontSize: '14px',
        fontWeight: 400,
        marginTop: 25,
        marginBottom: 15,
        fontFmily:'Open Sans,sans-serif',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#3b4452'
    },

    formPageBodyButtonField: {
        textAlign: 'center'
    },

    formPageBodyLabel: {
        fontSize: '12px',
        color: '#7f8fa4',
        display: 'inline-block',
        maxWidth: '100%',
        marginBottom: '5px',
        fontWeight: 600,
    },
    formPageBodyRadioLabel: {
        fontSize: '12px',
        color: '#7f8fa4',
        display: 'inline-block',
        width: '100%',
        marginBottom: '5px',
        fontWeight: 600,
    },
    formPageBodyRadio: {
        fontSize: '12px',
        color: '#7f8fa4',
        display: 'inline-block',
        marginBottom: '5px',
        fontWeight: 600,
    },

    formPageBodyInput: {
        width: '200px',
        height: '20px',
        border: '1px solid #cbd5e1',
        borderRadius: '4px',
        boxShadow: 'none',
        padding: '6px 12px',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        display: 'block',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        fontFamily: 'inherit',
        margin: 0,
        font: 'inherit',
    },
    formPageBodyUpload: {
        width: '400px',
        height: '20px',
        border: '1px solid #cbd5e1',
        borderRadius: '4px',
        boxShadow: 'none',
        padding: '6px 12px',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        display: 'block',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        fontFamily: 'inherit',
        margin: 0,
        font: 'inherit',
    },
    formPageBodySelect: {
        width: '200px',
        height: '30px',
        display: 'flex',
        color: '#3b4452',
        fontSize: '14px',
    },
    formPageBodySelectMenuItem: {
        fontSize: '14px',
        height: '30px',
    },
    formPageBodyTextarea: {
        width: '96%',
        border: '1px solid #cbd5e1',
        borderRadius: '4px',
        boxShadow: 'none',
        padding: '6px 12px',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        display: 'block',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        fontFamily: 'inherit',
        margin: 0,
        font: 'inherit',
        resize: 'none'
    },
    formPageBodyButton: {
        color: '#fff',
        borderColor: '#98314F',
        background: '#98314F',
        borderRadius: '16px',
        border: '1px solid transparent',
        minHeight: '30px',
        minWidth: '100px',
        fontSize: '14px',
        height: '30px',
        display: 'inline-block',
        marginBottom: 0,
        textTlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        touchAction: 'manipulation',
        cursor: 'pointer',
        textTransform: 'none',
    },

    formPageBodyDisabledButton: {
        color: 'rgba(0, 0, 0, 0.26)',
        borderColor: 'rgba(0, 0, 0, 0.12)',
        background: 'rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        border: '1px solid transparent',
        minHeight: '30px',
        minWidth: '85px',
        fontSize: '14px',
        height: '30px',
        display: 'inline-block',
        marginBottom: 0,
        textTlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        touchAction: 'manipulation',
        cursor: 'default',
        textTransform: 'none',
    },

    statusUpdateButtons: {
        color: '#fff',
        borderColor: '#ffffff',
        background: '#24a7f8',
        borderRadius: '4px',
        border: '1px solid transparent',
        minHeight: '40px',
        minWidth: '115px',
        fontSize: '20px',
        height: '30px',
        display: 'inline-block',
        marginBottom: 0,
        textTlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        touchAction: 'manipulation',
        cursor: 'pointer',
        textTransform: 'none',
    },
    reactTableHeader: {
        backgroundColor: '#f6f6f6',
    },

//Profile Menu
textDecorations: {
    fontSize: 9,
    color: 'black',
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.grey[10],
    }
},
sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
},
profMenuListItemLonText: {
    marginLeft: '-20px',
    marginRight: '15px',
    fontSize: '13px',
},

    //Header
    logo : {
        backgroundColor: "white",
        height: "20px",
        width: "120px",
        padding: "5px",
        borderRadius: "3px",
        marginLeft: '30px',
        marginTop: '-10px'
    },
    headerButton: {
        marginLeft: 5,
        paddingRight: theme.spacing(2),
    },
    passwordBtn: {
        marginLeft: 120,
        width: '15%',
        display: 'inline-block',
        textAlign: 'right',
        color: 'black',
    },
    appHeaderRoot: {
        color: '#f1f1f1',
        height: '40px',
        borderBottom: '1px solid #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px', // Ensures background goes edge to edge
        backgroundColor: '#821045',
        position: 'fixed',     // Make the header sticky
        top: '0',              // Stick it to the top of the viewport
        left: '0',
        width: '100%',         // Ensure it spans the full width of the page
        zIndex: '1000',        // Make sure it stays above other content
        boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
    },
    headerAppNameText: {
        fontWeight: 550,
        fontSize: '16px',
        color: "#24a7f8",
        width: '65%',
        display: 'inline-block',
        lineHeight: '60px',
        textAlign: 'center',
        marginLeft:50
    },
    headerAlertButton: {
        //width: "100%",
        display: 'inline-block',
        textAlign: 'centre',
        //marginLeft: 10,
        fontSize: '14px',
        height: '30px',
        marginBottom: 10,
        cursor: 'pointer',
        borderRadius: '4px',
        border: '1px solid transparent',
    },
    headerLogoutLogo: {
        width: '5%',
        display: 'inline-block',
        textAlign: 'center',
    },
    headerButton2:{
        marginRight: 10,
    },
    modAlert: {
        width: '8%',
        display: 'inline-block',
        textAlign: 'center',
    },
    footerAppLogo: {
        marginLeft: '10px',
        marginBottom: -6
    },

    



    //Side-Bar Menu
    sideMenuHeaderLogo: {
        borderRadius: "3px",
        padding: '1px',
        marginLeft:1,
        width: '100%',
    },
    sideMenuRoot:{
        padding: '10px',
    },
    sideMenuProfileLogo:{
        width: '10%', 
        display: 'inline-block',
        textAlign: 'center',
        color: '#394657'
    },
    sideMenuProfileText:{
        width: '60%',
        display: 'inline-block',
        marginLeft: '15px'
    },
    sideMenuProfileSettings: {
        width: '10%',
        display: 'inline-block',
    },
    sideMenuUserName: {
        fontSize: '14px',
        marginTop: 0,
        marginBottom: 0,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 600,
        letterSpacing: 'normal',
        textAlign: 'left',
        lineHeight: 'normal',
        color: '#394657'
    },
    sideMenuViewMyInfo:{
        display: 'inline-block',
        width: '100%',
        textDecoration: 'none',
        fontWeight: 400,
        marginTop: 0,
        marginBottom: 0,
        fontSize: '12px',
        fontStyle: 'normal',
        fontStretch: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        lineHeight: 'normal',
    },
    sideMenuList: {
        color: '#394657',
        fontSize: '12px'
    },
    sideMenuListItemButton:{
        height: 35,
    },
    sideMenuListItemIcon: {
        width: 10
    },
    sideMenuListItemText: {
        marginLeft: '-20px'
    },
    sideMenuListItemLonText: {
        marginLeft: '-20px',
        marginRight: '-23px'
    },
    sideMenuListItemExpand: {
        marginRight: '-15px'
    },
    modMenuNameStart: {
        // fontSize: 13,
        // fontFamily: "Serif",
        // fontWeight: 550,
    },
    modMenuNameEnd: {
        // fontSize: 13,
        // fontFamily: "Serif",
        color: "#FF0000",
        // fontWeight: 550,
    },
    alarmStopBtn: {
        color: '#fff',
        borderColor: '#f71418',
        background: '#f71418',
        borderRadius: '4px',
        border: '1px solid transparent',
        minHeight: '30px',
        minWidth: '85px',
        fontSize: '14px',
        height: '30px',
        display: 'inline-block',
        marginBottom: 0,
        textTlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        touchAction: 'manipulation',
        cursor: 'pointer',
        textTransform: 'none',
    },

    updateBtn: {
        color: '#fff',
        borderColor: '#f71418',
        background: '#f71418',
        borderRadius: '4px',
        border: '1px solid transparent',
        minHeight: '20px',
        minWidth: '55px',
        fontSize: '14px',
        height: '30px',
        display: 'inline-block',
        marginBottom: 0,
        textTlign: 'center',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        touchAction: 'manipulation',
        cursor: 'pointer',
        textTransform: 'none',
    },

    //Profile Page
    detailsBox: {
        margin: theme.spacing(2),
        background: '#F4F3EE'
    },
    subHeaderText:{
        margin: 'auto',
        padding: theme.spacing(2),
        backgroundColor: "#C0C0C0"
    },
    leftSidebox:{
        marginTop: "-20px",
        textAlign: 'right',
        paddingRight: theme.spacing(2),
        fontWeight: 650,
    },
    rightSidebox:{
        marginTop: "-20px",
        textAlign: 'left',
        paddingLeft: theme.spacing(2),
    },
    profilePicBox:{
        margin: theme.spacing(2),
        backgroundColor: "#c2bfb2",
        height:230,
        width:240
    },
    profilePic:{
        margin: theme.spacing(1),
        width: 265,
        height: 265
    },
    editIcon: {
		height: "3rem",
		width: "3rem",
		position: "fixed",
		top: "361px;",
		left: "520px",
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
    

    //Login Page
    center: {
        display: 'flex',
        justifyContent: 'center',
    },
    loginCardButton: {
        height: '43px',
                    borderRadius: '23px',
                    backgroundColor: '#97144d',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '700',
                    letterSpacing: '0',
                    outline: 'none',
                    border: 'none',
                    width: '144px',
                    marginLeft: '100px'

    },
    textFieldWidth: {
        width: '400px'
    },
    loginCard: {
        width: 415,
        height: 450,
        marginTop: '94px',
        backgroundColor: "#fff",
        marginLeft: '30%!important',

        /* border-radius */
        webkitBorderRadius: "10px",
        mozBorderRadius: "10px",
        borderRadius: "10px",
        /* box-shadow */
        webkitBoxShadow: "rgba(0,0,0,0.1) 0px 0 20px",
        mozBoxShadow: "rgba(0,0,0,0.1) 0 0 20px",
        boxShadow: "rgba(0,0,0,0.1) 0 0 20px",
    },
    loginCardHelloText: {
        color: '#000104',
        fontSize: '16px',
        fontWeight: '700',
        letterSpacing: '-.05px',
        lineHeight: '62px',
        textAlign: 'left'
        
    },
    loginCardContainer: {
        margin: '20px'
    },
    loginCardAppNameStart: {
        fontSize: 25,
        fontFamily: "Serif",
        color: "#0C51A0",
        fontWeight: 550,
    },
    loginCardAppNameMid: {
        fontSize: 25,
        fontFamily: "Serif",
        color: "#00d084",
        fontWeight: 550,
    },
    loginCardAppNameEnd: {
        fontSize: 25,
        fontFamily: "Serif",
        color: "#FCB813",
        fontWeight: 550,
    },
    logoImage: {
        marginLeft:'80px',
    },
    loginCardInput: {
        width: '330px',
        height: '30px',
        border: '1px solid #cbd5e1',
        borderRadius: '10px',
        boxShadow: 'none',
        padding: '6px 12px',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        display: 'block',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        fontFamily: 'inherit',
        margin: 0,
        font: 'inherit',
    },
    loginCardLabel: {
        fontSize: '12px',
        color: '#7f8fa4',
        display: 'inline-block',
        width: '100%',
        marginBottom: '5px',
        marginTop: '20px',
        fontWeight: 600,
    },



    //Dashboard
    dashboardAppButtonBlue: {
        height: '70px',
        width: '210px',
        border: '1px solid #c8d3de',
        borderBottom: '3px solid #0C51A0',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        '&:hover':{
            backgroundColor: '#EDF3FF',
            boxShadow: '0 5px 8px 0 #e6e6e6, 0 3px 10px 0 #e6e6e6',
        }
    },
    dashboardAppButtonGreen: {
        height: '70px',
        width: '210px',
        border: '1px solid #c8d3de',
        borderBottom: '3px solid #13B48D',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        '&:hover':{
            backgroundColor: '#EDF3FF',
            boxShadow: '0 5px 8px 0 #e6e6e6, 0 3px 10px 0 #e6e6e6',
        }
    },
    dashboardAppButtonOrange: {
        height: '70px',
        width: '210px',
        border: '1px solid #c8d3de',
        borderBottom: '3px solid #FCB813',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        '&:hover':{
            backgroundColor: '#EDF3FF',
            boxShadow: '0 5px 8px 0 #e6e6e6, 0 3px 10px 0 #e6e6e6',
        }
    },
    dashboardAppButtonNameDiv: {
        fontSize: '12px',
        marginTop: '10px',
        marginLeft: '10px'
    },
    dashboardAppButtonCountDiv: {
        display: 'inline-block',
        width: '43%',
        marginTop: '5px',
        marginLeft: '10px',
        fontWeight: 550,
        fontSize: '25px',
    },
    dashboardAppButtonCountTxtDiv: {
        display: 'inline-block',
        textAlign: 'right',
        width: '48%',
        fontSize: '12px',
    },
    trackDashboardTableRoot: {
        border: '1px solid #c8d3de',
        '&:hover': {
            boxShadow: '0 5px 8px 0 #e6e6e6, 0 3px 10px 0 #e6e6e6',
        }
    },
    dashboardTableRoot: {
        border: '1px solid #c8d3de',
        '&:hover': {
            boxShadow: '0 5px 8px 0 #e6e6e6, 0 3px 10px 0 #e6e6e6',
        }
    },
    dashboardMODAlarmTableRoot: {
        minHeight: 390,
        border: '1px solid #c8d3de',
        '&:hover': {
            boxShadow: '0 5px 8px 0 #e6e6e6, 0 3px 10px 0 #e6e6e6',
        }
    },
    trackDashboardTable: {
        padding: '10px'
    },
    trackDashboardRows: {
        cursor: 'pointer',
        '&:hover': {
            border: '1px solid #24a7f8'
        }
    },
    trackDashboardIncidentChartOuter: {
        width: '280px',
        float: 'right',
        padding: '15px'
    },
    dashboardIncidentChartOuter: {
        width: '450px',
        margin: 'auto'
    },
    dashboardChartOuter: {
        margin: 'auto'
    },
    trackDashboardIncidentChartHeader: {
        fontSize: 14,
        marginTop: 0,
        marginBottom: 0,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 600,
        letterSpacing: 'normal',
        textAlign: 'left',
        lineHeight: 'normal',
    },
    dashboardIncidentChartHeader: {
        fontSize: 14,
        padding: 15,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 600,
        letterSpacing: 'normal',
        textAlign: 'center',
        lineHeight: 'normal',
    },
    trackDashboardIncidentChartBody: {
        fontSize: '14px',
        fontWeight: 400,
        marginTop: 25,
        marginBottom: 15,
        fontFmily: 'Open Sans,sans-serif',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#3b4452'
    },

    dashboardIncidentChartBody: {
        fontSize: '14px',
        fontWeight: 400,
        marginTop: 25,
        marginBottom: 15,
        fontFmily: 'Open Sans,sans-serif',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#3b4452',
    },

    dashboardChartBody: {
        fontSize: '14px',
        fontWeight: 400,
        fontFmily: 'Open Sans,sans-serif',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#3b4452'
    },

    dashboardMitigationChartBody: {
        fontSize: '14px',
        fontWeight: 400,
        fontFmily: 'Open Sans,sans-serif',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#3b4452',
        margin: 'auto'
    },

    trackDashboardOuter: {
        width: '1050px',
        margin: 'auto',
        padding: '15px'
    },
    trackDashboardHeader:{
        width: '1060px',
        margin: 'auto',
        backgroundColor: '#ffffff',
        fontSize: '16px',
        marginTop: 0,
        marginBottom: 0,
        padding: 10,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 400,
        letterSpacing: 'normal',
        textAlign: 'center',
        lineHeight: 'normal',
        boxShadow: '0 5px 8px 0 #e6e6e6, 0 3px 10px 0 #e6e6e6',
        border: '1px solid #c8d3de',
    },
    trackDashboardPanelOuter: {
        margin: 'auto',
        padding: '15px',
        width: '1050px',
    },
    tDDeployResourcePanelOuter: {
        margin: 'auto',
        padding: '15px',
        width: '700px',
        height: 460
    },
    tablePanelOuter: {
        margin: 'auto',
        padding: '15px',
    },
    trackDashboardPanelHeader : {
        fontSize: 14,
        marginTop: 0,
        marginBottom: 0,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 600,
        letterSpacing: 'normal',
        textAlign: 'left',
        lineHeight: 'normal',
    },
    trackDashboardPanelBody:{
        fontSize: '14px',
        fontWeight: 400,
        marginTop: 25,
        marginBottom: 15,
        fontFmily:'Open Sans,sans-serif',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#3b4452'
    },
    trackDashboardButtonNameDiv: {
        fontSize: '12px',
        marginTop: '10px',
        marginLeft: '10px'
    },
    trackDashboardButtonCountDiv: {
        display: 'inline-block',
        marginTop: '5px',
        marginLeft: '10px',
        fontWeight: 550,
        fontSize: '20px',
    },
    tDTrackPanelHeader: {
        backgroundColor: '#EDF3FF',
        height: '76px',
        borderRadius: '30px',
    },
    tDTrackPanelNameTxt: {
        textAlign: 'center',
        fontWeight: 550,
        margin: '3px',
    },
    tDTrackPanelBriefTxt: {
        textAlign: 'center',
        fontSize: '12px',
        margin: '3px',
    },
    tDTrackPanelTileOuter: {
        border: '1px solid #c8d3de',
        height: '55px',
        width: '200px',
        borderRadius: '10px',
        margin: 'auto'
    },
    tDTrackPanelTileName: {
        textAlign: 'center',
        fontWeight: 550,
        margin: '5px',
    },
    tDTrackPanelTileDescription: {
        textAlign: 'center',
        fontSize: '12px',
        margin: '5px',
    }, 
    incidentDashboardHeader:{
        width: '1015px',
        margin: 'auto',
        backgroundColor: '#ffffff',
        fontSize: '14px',
        marginTop: 0,
        marginBottom: 0,
        padding: 10,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 400,
        letterSpacing: 'normal',
        textAlign: 'center',
        lineHeight: 'normal',
        boxShadow: '0 5px 8px 0 #e6e6e6, 0 3px 10px 0 #e6e6e6',
        border: '1px solid #c8d3de',
    },
    incidentDashboardEventHeader:{
        margin: 'auto',
        backgroundColor: '#feecc5',
        fontSize: '14px',
        marginTop: 0,
        marginBottom: 0,
        padding: 10,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 400,
        letterSpacing: 'normal',
        textAlign: 'center',
        lineHeight: 'normal',
    },
    incidentDashboardDetailsTabOuter: {
        border: '1px solid #c8d3de',
        backgroundColor: '#EDF3FF',
        borderRadius: '25px'
    },
    incidentDashboardDetailsTabLeft: {
        textAlign: 'center',
        verticalAlign: 'middle',
        borderRight: '1px solid #0C51A0',
        fontSize: '12px',
        fontWeight: 600,
    },
    incidentDashboardDetailsTabRight: {
        fontSize: '12px',
        fontWeight: 400,
        margin: '10px'
    },
    incidentDashboardCompoPanelOuter: {
        margin: '30px',
        padding: '15px',
    },
    incidentDashboardEventPanelHeader: {
        fontSize: 14,
        marginTop: 0,
        marginBottom: 0,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 600,
        letterSpacing: 'normal',
        textAlign: 'left',
        lineHeight: 'normal',
        color: "#FCB813"
    },
    incidentDashboardAnalysisPanelHeader: {
        fontSize: 14,
        marginTop: 0,
        marginBottom: 0,
        fontStyle: 'normal',
        fontStretch: 'normal',
        fontWeight: 600,
        letterSpacing: 'normal',
        textAlign: 'left',
        lineHeight: 'normal',
        color: "#13B48D"
    },
    iDTrackPanelTileName: {
        textAlign: 'center',
        fontWeight: 550,
        marginTop: '5px',
        marginBottom: '5px',
        fontSize: '13px'
    },
    iDReferenceLink: {
        "&:hover": {
            fontWeight: 600,
        },
    },
    idImageOuter: {
        padding: 15,
        border: "1px solid #cbd5e1",
        textAlign: 'center',
        borderRadius: '4px',
        position: 'relative'
    },
    idIncidentImageOuter: {
        padding: 15,
        margin: 15,
        border: "1px solid #cbd5e1",
        textAlign: 'center',
        borderRadius: '4px',
        position: 'relative'
    },
    iDPanelBody:{
        fontSize: '14px',
        fontWeight: 400,
        marginBottom: 15,
        padding: '20px',
        fontFmily:'Open Sans,sans-serif',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#3b4452'
    },
    iDIncidentImageHeader: {
        height: '50px',
        fontSize: '20px',
        fontWeight: 600,
        backgroundColor: '#3b76b6',
        backgroundImage: 'linear-gradient(to right, #3b76b6 , #39c4a6)',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
    },
    iDEventAnalysisHeader: {
        height: '50px',
        fontSize: '20px',
        fontWeight: 600,
        backgroundColor: '#3b76b6',
        backgroundImage: 'linear-gradient(to right, #3b76b6 , #39c4a6)',
        color: '#ffffff',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        textAlign: 'center'
    },
    iDEventAnalysisHeaderTxt: {
        margin: 0,
        padding: 0,
        fontSize: '20px',
        fontWeight: 600,
        color: '#ffffff',
    },
    iDEventAnalysisSubHeaderTxt: {
        margin: 0,
        padding: 0,
        fontSize: '12px',
        fontWeight: 600,
        color: '#ffffff',
    },

    iDEventAnalysisFooter: {
        maxWidth: '930px', 
        marginBottom: -4,
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px'
    },

    iDEventAnalysisEmptyTxt: {
        textAlign: 'center',
        margin: 0,
        position: 'absolute',
        top: '48%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'red',
    },
    iDEventAnalysisEmptyRoot: {
        height: 400,
        position: 'relative'
    },
    dashboardIncidentChartTotal : {
        textAlign: 'center'
    },


    //client

    briefField: {
        width: 720
    },
    formDropField: {
        width: 220
    },




    //Project
    formFieldLarge: {
        width: 330
    },
    formDateField: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40px',
        marginBottom: '40px',
    },
    dateField: {
        width: 400
    },
    projectBriefField: {
        width: 750
    },
    projectError: {
        color: '#ff0000',
        textAlign: 'center'
    },

    // //incident-event
    incidentManagFormPageBody: {
        fontSize: '14px',
        fontWeight: 400,

        fontFmily: 'Open Sans,sans-serif',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#3b4452',

    },
    incidentManagFormPageBodyTextarea: {
        width: '90%',
        border: '1px solid #cbd5e1',
        borderRadius: '4px',
        boxShadow: 'none',
        padding: '6px 12px 6px 12px',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        display: 'block',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        fontFamily: 'inherit',
        margin: 0,
        font: 'inherit',
        resize: 'none'
    },
    paddingLeft: {
        paddingLeft: 10,

    },
    gridItem: {
        margin: theme.spacing(3)
    },
    textField: {
        margin: theme.spacing(1),
        width: "275px",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),

    },
    textField1: {
        margin: theme.spacing(1),
        width: "885px",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },

    formControl: {
        margin: theme.spacing(1),
        width: "275px",
        textAlign: "left",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    uploadDoc: {
        margin: theme.spacing(3),
        width: "275px",
        textAlign: "left",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    fileInputLabel: {
        color: "#000000",
        opacity: "0.7",
        fontSize: "16px"
    },
    fileInputOut: {
        border: "1px solid",
        borderRadius: "4px"
    },
    fileInput: {
        margin: "8px",
        padding: "4px"
    },
    gridBody: {
        display: "flex",
        justifyContent: "centre",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        paddingBottom: '10%',
        width: "275px",
    },
    buttonField: {
        textAlign: "center"
    },
    radioButton: {
        textAlign: "left",
        justifyContent: "centre",
        marginLeft: '20px',
        marginTop: theme.spacing(2),
    },
    modalPopup: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 600
    },
    recommModalPopup: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 1100
    },
    modRaiseModalPopup: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 800
    },
    modStopModalPopup: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 900
    },
    approveStatusText: {
        display: "flex",
        justifyContent: "center",
        color: "green",
        fontSize: 30,
    },
    rejectStatusText: {
        display: "flex",
        justifyContent: "center",
        color: "red",
        fontSize: 30,
    },
    closedStatusText: {
        display: "flex",
        justifyContent: "center",
        color: "blue",
        fontSize: 30,
    },
    reopenedStatusText: {
        display: "flex",
        justifyContent: "center",
        color: "yellow",
        fontSize: 30,
    },
    addRecomBtn: {
        position: 'absolute',
        top: -20,
        right: 4,
        float : 'right',
    },
    incidentRecomBtn :{
        display : 'flex',
       justifyContent : 'center'
    },
    incidentMitiBtn :{
       display : 'flex',
       justifyContent : 'center'
    },

    //Incident analysis style
    analysisPaddingLeft : {
        paddingLeft: 100,
    } ,
    analysisFirstGridPaddingLeft : {
        paddingLeft: 35,
    },
     //Recommendations
     resetValues : {
        width : "20px" ,
        height : "20px",
    },
    clearValues : {
        width : "20px" ,
        height : "20px",
    },
     textArea : {
        resize : 'none'
    },
    publishButton : {
        display : 'flex',
        justifyContent : 'center',
    },
     appNameDrop: {
        width: "350px",
        textAlign: "left"
    },
    deleteModalBody : {
        height : 50
    },
    deleteModalPopup: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: 500,
        textAlign: 'center'
    },
    importIconBg: {
        backgroundColor: '#3f51b5',
        position: 'fixed',
    	width: '45px',
	    height: '45px',
	    bottom: '50px',
	    right: '90px',
	    boxShadow: '2px 2px 3px #999',
	    zIndex: '99999999',
        "&:hover": {
			backgroundColor: "#c5cae9",
		},
    },
    exportIconBg: {
        backgroundColor: '#3f51b5',
        position: 'fixed',
    	width: '45px',
	    height: '45px',
	    bottom: '50px',
	    right: '40px',
	    boxShadow: '2px 2px 3px #999',
	    zIndex: '99999999',
        "&:hover": {
			backgroundColor: "#c5cae9",
		}
    },
    excelIcon: {
        color: '#ffffff',
        fontSize: 32,
        "&:hover": {
			color: "#3f51b5",
		},
    },

    //Recommendation

    
    root: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
        backgroundColor: '#23293f'
    },
    noteSection: {
        backgroundColor: '#e7f3fe',
        borderLeft: '6px solid #2196F3',
        margin: theme.spacing(3),
        marginTop: theme.spacing(0),
        width: 900
    },
    noteSectionLeft: {
        margin: 'auto',
        textAlign: 'center'
    },
    noteSectionRight: {
        padding: theme.spacing(1)
    },
    infoOutlinedIcon: {
        color: '#2196F3'
    },
    inputField:{
        width:"100%",
        textAlign:"left"
    },

    // App Onboarding

    appOnboardPageBodyTextarea: {
        width: '75%',
        border: '1px solid #cbd5e1',
        borderRadius: '4px',
        boxShadow: 'none',
        padding: '6px 12px 6px 12px',
        backgroundColor: '#fff',
        backgroundImage: 'none',
        display: 'block',
        fontSize: '14px',
        lineHeight: '1.42857143',
        color: '#555',
        fontFamily: 'inherit',
        margin: 0,
        font: 'inherit',
        resize: 'none'
    },

    //delete

    deleteAlert: {
        width: 1000,
        margin: 'auto'
    },
    deleteAlertSubmit: {
        backgroundColor: '#FF5C5C',
        color: "#fff",
        "&:hover": {
			color: "#FF5C5C",
		},
    },
    warningIcon: {
        color: "#ffcc00",
        marginBottom: '-4px',
    },
    cancelSubmitButton: {
        fontSize: "12px",
        marginRight: "70px",
        backgroundColor: '#1976d2',
        color: '#ffffff',
        "&:hover": {
			color: "#1976d2",
		},
    },
    navBar: {
        display: 'flex',
        justifyContent: 'flex-start',/* Align items to the left */
        alignItems: 'center', /* Vertically center items */
        padding: '10px', /* Adjust padding as necessary */
        backgroundColor: '#f8f9fa' /* Example background color */
      },
      input: {
        width: '150px', // Adjust width as necessary
        padding: '10px 15px', // Adjust padding for better spacing
        borderRadius: '20px', // Rounded corners
        border: '1px solid #ccc', // Light border
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Light shadow
        outline: 'none', // No outline on focus
        transition: 'border-color 0.3s, box-shadow 0.3s', // Smooth transition
      },
      inputFocus: {
        borderColor: '#821045', // Change border color on focus
        boxShadow: '0 0 5px rgba(130, 20, 69, 0.5)', // Add shadow on focus
      },
      inputBlur: {
        borderColor: '#ccc', // Revert border color
        boxShadow: 'none', // Remove shadow
      },
      button: {
        padding: '10px 20px', // Adjust padding for better spacing
        borderRadius: '20px', // Rounded corners
        border: 'none', // Remove default border
        backgroundColor: '#821045', // Example background color
        color: 'white', // Text color
        cursor: 'pointer', // Pointer cursor on hover
        position: 'relative', // Required for ripple effect positioning
        overflow: 'hidden', // Hide overflow for ripple effect
        transition: 'background-color 0.3s', // Smooth background color transition
      },
      buttonHover: {
        backgroundColor: '#6c0e30', // Darker shade on hover
      },
      page: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputField: {
        width: '150px',
        padding: '10px 15px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        outline: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      },
      inputFieldFocus: {
        borderColor: '#821045',
        boxShadow: '0 0 5px rgba(130, 20, 69, 0.5)',
      },
      inputFieldBlur: {
        borderColor: '#ccc',
        boxShadow: 'none',
      },
      button: {
        padding: '10px 20px',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#821045',
        color: 'white',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s',
      },
      buttonHover: {
        backgroundColor: '#6c0e30',
      },
      labelStyle: {
        width: '180px',
        height: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 15px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        backgroundColor: '#f5f5f5',
        color: '#821045',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginLeft: '-70px',
        marginBottom: '20px',
      },
      labelHover: {
        backgroundColor: '#e0e0e0',
      },
      fileNameStyle: {
        padding: '0 10px',
        color: 'white',
        backgroundColor: '#821045',
        borderRadius: '5px',
        marginRight: '10px',
      },
      downloadInput: {
        width: '450px',
        justifyContent: 'center',
        marginTop: '5px',
        padding: '10px 15px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        outline: 'none',
        position: 'relative',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        marginRight: '15px',
        backgroundColor: '#f5f5f5',
        color: '#821045',
      },
      containerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      progressBar: {
        width: '100%',
        height: '20px',
        borderRadius: '5px',
        backgroundColor: '#e0e0e0',
      },
      progressText: {
        textAlign: 'right',
        fontSize: '12px',
        marginTop: '5px',
      },
      iconButtonStyle: {
        fontSize: '30px',
      },
      container: {
      display: 'flex',
      width: '10%',    // Reduced width from 100%
      height: '80vh',  // Reduced height to 80% of the viewport height
      backgroundColor: '#fff',
      margin: '0 auto',  // Centers the container
      borderRadius: '8px', // Adding rounded corners for a modern look
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Box shadow for better appearance
      overflow: 'hidden',
  },
    leftSection: {
        width: '50%',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
    },
    rightSection: {
        width: '50%',
        position: 'relative',
        backgroundColor: '#96023d',
    },
    rightImage: {
        Width: '100%',
        height: '100%',
    },
    tabs: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderBottom: '2px solid #ccc',
    },
    activeTab: {
        padding: '10px',
        borderBottom: '2px solid #000',
        cursor: 'pointer',
        color: '#000',
    },
    inactiveTab: {
        padding: '10px',
        cursor: 'pointer',
        color: '#888',
    },
    form: {
        paddingTop: '20px',
    },
    headingText: {
        fontSize: '22px',
        marginBottom: '20px',
        color: '#000',
    },
    radioButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px',
    },
    radioOption: {
        display: 'flex',
        alignItems: 'center',
    },
    inputField: {
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '15px',
    },
    generateOtpBtn: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#c29fa1', // Disabled button color
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        color: '#fff',
    },
    lockedUser: {
        textAlign: 'center',
        marginTop: '15px',
    },
    lockedUserLink: {
        color: '#96023d',
        cursor: 'pointer',
        textDecoration: 'none',
    },
    registerSection: {
        textAlign: 'center',
        marginTop: '20px',
    },
    registerLink: {
        color: '#96023d',
        cursor: 'pointer',
        textDecoration: 'none',
    },

}));

export default useStyles;
