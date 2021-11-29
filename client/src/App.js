import './App.css';
import {BrowserRouter,Navigate,Route,Routes} from "react-router-dom"
import {AuthContext,AuthProvider} from "./context/authContext";
import React from 'react';
import { useContext} from 'react';
import Test from './components/admin/services';
import Home from './pages/home';
import SignIn from './components/Authentification/signin';
import { Container } from '@material-ui/core';
function App() {
  const authContext = useContext(AuthContext);
  return (
    authContext.loading ? null :
    <Container maxWidth="md">
      <div className="app">
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={ authContext.auth.token ? <Home /> : <Navigate to="/signin" /> } />
          <Route path="/services" element={ <Test /> } />
          <Route path="/signin" element={ <SignIn /> } />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
    </Container>
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
