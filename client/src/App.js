import './App.css';
import {BrowserRouter,Redirect,Route,Switch} from "react-dom"
import {AuthContext,AuthProvider} from "./context/authContext";
import React from 'react';
import { useContext} from 'react';
function App() {
  const authContext = useContext(AuthContext);
  return (
    authContext.loading ? null :
    <BrowserRouter>
      <div>
        <Switch>
            <Route exact path='/'>
            
            </Route>
        </Switch>
      </div>
    </BrowserRouter>
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
