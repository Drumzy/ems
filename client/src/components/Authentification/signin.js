import React from 'react';
import {Button, TextField} from '@material-ui/core';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
const SignIn=() => {
    return(
        <div>
            <div className="icon">
                <div className="icon_class">
                    <PersonAddIcon fontSize="large"/>
                </div>
                <div className="text">Sign In</div>
            </div>

            <div className="row-m-2">
                <TextField id="email" className="p-2" type="text" variant="outlined" label="Enter Email" fullWidth margin="dense"  />
                <TextField id="Password" className="p-2" type="password" variant="outlined" label="Enter Password" fullWidth margin="dense" />
                <FormControlLabel
                    control={
                    <Checkbox
                       icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                       checkedIcon={<CheckBoxIcon fontSize="small" />}
                    />
                    }
                    label="Remember me"
                />
            <Button variant="contained" color="primary" fullWidth >Connect</Button>
            </div>

        </div>
        
    )
}

export default SignIn;