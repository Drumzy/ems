import React, {useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = React.createContext();
export function AuthProvider(props) {
    const [auth, setAuth] = useState({

    });
    const [user, setUser] = useState({
        
    });
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState(true)

    useEffect(async () => {
        const token =  localStorage.getItem('token');
        if(token){
            setAuth({token});
            await axios.get('http://localhost:3500/api/user/me',{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token' : localStorage.getItem('token')
                }
            }).then((res) => {
                setUser(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false)
            })
        }else
            setLoading(false)
    }, [])
    return (
        <AuthContext.Provider value={{auth, setAuth, user, setUser, loading, setSearch, search}}>
            {props.children}
        </AuthContext.Provider>
    )
}