import React from 'react';
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import {AuthContext,AuthProvider} from "./context/authContext";
import { useContext} from 'react';
import Home from './pages/home';
import SignIn from './components/Authentification/signin';
import SignUp from './components/Authentification/signup';
import { Box } from '@chakra-ui/layout';
import SideBar from './components/sideBar/sideBar';
import { ChakraProvider } from '@chakra-ui/react';
function App() {
  const authContext = useContext(AuthContext);
  return (
    authContext.loading ? null :
    <ChakraProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/signin" element={ <SignIn /> } />
          <Route path="/signup" element={ <SignUp />} />
        </Routes>
        {authContext.auth.token ?
        <Box display="flex">
        <SideBar />
        <Routes>
          <Route path="/home" element={ <Home /> } />
          <Route exact path="/" element={<Navigate replace to="/home" />}/>
        </Routes>
        </Box>
        :
        <Navigate to="/signin" />
        }
    </BrowserRouter>
    </ChakraProvider>
  );
}
function FinalApp(){
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
export default FinalApp;
