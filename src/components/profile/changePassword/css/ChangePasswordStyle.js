import { makeStyles } from '@material-ui/core/styles';

var useStyles = makeStyles((theme) => ({

    
    gridItem:{
        margin: theme.spacing(5)
    },
    gridButton:{
        textAlign:"center",
        marginBottom: theme.spacing(2)
    },
    errorAlert:{
        width:'80%',
        margin: 'auto'
    }

}));

export default useStyles;