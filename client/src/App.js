import React from 'react';
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import {AuthContext,AuthProvider} from "./context/authContext";
import { useContext} from 'react';
import Home from './pages/home';
import SignIn from './components/Authentification/signin';
import SignUp from './components/Authentification/signup';
import { Box } from '@chakra-ui/layout';
import SideBar from './components/Menus/sideBar';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Menus/header';
function App() {
  const authContext = useContext(AuthContext);
  return (
    authContext.loading ? null :
    <ChakraProvider>
    <BrowserRouter>
        {authContext.auth.token ?
        <Box display="flex" >
        <SideBar />
        <Box width="100%">
          <Header />
        <Routes>
          <Route  path="/home/*" element={!authContext.auth.token ? <Navigate to="/signin" /> : <Home /> } />
        </Routes>
        </Box>
        </Box>
        :
         <Routes>
          <Route path="/signin" element={ <SignIn /> } />
          </Routes>
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
