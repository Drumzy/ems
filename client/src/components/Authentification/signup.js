import React from 'react';
import axios from 'axios';
import {Button, TextField} from '@material-ui/core';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
const SignUp=() => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function handleSubmit(e){
        const body ={
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password,
        }
        const headers = {'Content-Type':'application/json'};
        e.preventDefault()
        axios.post('http://localhost:3500/api/user',body,{ headers })
        .then((res)=>{
        navigate('/');
        },
        (error) => {
            console.log(error.response);
        })
    };
    return(
        <div>
            <div className="icon">
                <div className="icon_class">
                    <PersonAddIcon fontSize="large"/>
                </div>
                <div className="text">Sign Up</div>
            </div>

            <div className="row-m-2">
                <TextField id="firstName" className="p-2" type="text" variant="outlined" label="Enter First Name" fullWidth margin="dense" onChange={e=>setfirstName(e.target.value)} />
                <TextField id="lastName" className="p-2" type="text" variant="outlined" label="Enter Last Name" fullWidth margin="dense" onChange={e=>setlastName(e.target.value)} />
                <TextField id="email" className="p-2" type="text" variant="outlined" label="Enter Email" fullWidth margin="dense" onChange={e=>setEmail(e.target.value)} />
                <TextField id="Password" className="p-2" type="password" variant="outlined" label="Enter Password" fullWidth margin="dense" onChange={e=>setPassword(e.target.value)} />
            <Button variant="contained" color="primary" fullWidth onClick={e=> handleSubmit(e)} >Sign Up</Button>
            </div>

        </div>
        
    )
}

export default SignUp;