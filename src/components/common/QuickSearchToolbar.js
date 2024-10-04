import React from 'react';
import PropTypes from 'prop-types';
import commonStyles from './common-css/CommonStyle';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';



export default function QuickSearchToolbar(props) {
    const commonClasses = commonStyles();

    return (
        <div className={commonClasses.tabeleSearchBar}>
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    disableUnderline: true,  
                    startAdornment: (  
                        <>
                            <SearchIcon fontSize="small" />
                        </>
                    ),
                    endAdornment: (  
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
}

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
