import React, { useContext, useState } from 'react';
import {AuthContext} from "../../context/authContext";
import {Button, FormHelperText, TextField} from '@chakra-ui/react';
/*import FormControlLabel  from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';*/
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input
} from '@chakra-ui/react'
import {BsFillPersonCheckFill} from 'react-icons/bs';
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
                    <BsFillPersonCheckFill fontSize="large"/>
                </div>
                <div className="text">Sign In</div>
            </div>

            <div className="row-m-2">
                    <FormControl id='email'>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' onChange={e=>setEmail(e.target.value)} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl id='password'>
                    <FormLabel>Password</FormLabel>
                    <Input type='password' onChange={e=>setPassword(e.target.value)} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                    </FormControl>
               
            <Button variant="contained" color="primary"  onClick={e=>Login(e)} >Connect</Button>
            </div>

        </div>
        
    )
}

export default SignIn;