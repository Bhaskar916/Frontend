import { makeStyles } from '@material-ui/core/styles';

var useStyles = makeStyles((theme) => ({

    
    pageBg: {
        height: "100%",
        background: "#e6ecef"
    },
    gridItem: {
        display: "flex",
        justifyContent: "center"
    },
    gridButton: {
        margin: theme.spacing(3),
        textAlign: "center"
    },
    alertWidth: {
        width: "350px",
    },
    gridWidth: {
        display: "flex",
        justifyContent: "center"
    },
    textField: {
        width: "400px",
        margin: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(3),
        width: "200px",
    },
    emailConfig: {
        margin: theme.spacing(3),
        width: "200px",
        textAlign: "left"
    },
    statisticsEmailFrequency: {
        margin: theme.spacing(3),
        width: "400px",
        textAlign: "left"
    },
    pdfSizeLimit: {
        margin: theme.spacing(3),
        width: "200px",
        textAlign: "left",


    },
    buttonField : {
        display : 'flex',
        justifyContent : 'center'

    },
    root: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
        backgroundColor : '#23293f'
      },

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
}));
export default useStyles;