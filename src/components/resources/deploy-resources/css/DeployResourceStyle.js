import { makeStyles } from '@material-ui/core/styles';

var useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formField: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
        width: 270
    },
    formFieldWithHelper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(5),
        width: 270
    },
    formFieldFirst: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(0),
        width: 270
    },
    formDropField: {
        width: 250
    },
    formDateField: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    },
    formTextField: {
        width: 250
    },
    briefField: {
        width: 750
    },
    dataGrid: {
        padding: theme.spacing(0)
    },
    error: {
        color: '#ff0000',
        textAlign: 'center'        
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
    tableOuter: {
        border: "1px solid #1976d2",
        margin: theme.spacing(4),
        borderRadius: 4,
    },
    tableBodyOuter :{
        border: "1px solid #1976d2",
        margin: theme.spacing(2),
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
    }
}));

export default useStyles;