import React, { useContext, useState } from 'react';
import {AuthContext} from "../../context/authContext";
import {Button, FormHelperText, TextField} from '@material-ui/core';
import FormControlLabel  from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useNavigate } from 'react-router';
import axios from 'axios';
const SignIn=() => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const[ error, setError]= useState('');
    const authContext = useContext(AuthContext);
    function Login(){
        const data = {email, password}
        const headers = {'Content-Type':'application/json'}
        axios.post('http://localhost:3500/api/auth',data,{headers}).then((res)=>{
            setToken(res.data.token)
            console.log(token)
            localStorage.setItem('token',res.data.token);
            window.location.reload(false);
        }).catch(err=>setError('Wrong details!'))
        authContext.setAuth({token,email});
    }
    return(
        <div>
            <div className="icon">
                <div className="icon_class">
                    <PersonAddIcon fontSize="large"/>
                </div>
                <div className="text">Sign In</div>
            </div>

            <div className="row-m-2">
                <TextField id="email" className="p-2" type="text" variant="outlined" label="Enter Email" fullWidth margin="dense" onChange={e=>setEmail(e.target.value)} />
                <TextField id="Password" className="p-2" type="password" variant="outlined" label="Enter Password" fullWidth margin="dense" onChange={e=>setPassword(e.target.value)} />
                <FormHelperText error={true}>{error}</FormHelperText>
                <FormControlLabel
                    control={
                    <Checkbox
                       icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                       checkedIcon={<CheckBoxIcon fontSize="small" />}
                    />
                    }
                    label="Remember me"
                />
            <Button variant="contained" color="primary" fullWidth onClick={e=>Login(e)} >Connect</Button>
            </div>

        </div>
        
    )
}

export default SignIn;