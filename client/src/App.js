import './App.css';
import {BrowserRouter,Redirect,Route,Switch} from "react-dom"
import {AuthContext,AuthProvider} from "./context/authContext";

function App() {
  const authContext = useContext(AuthContext);
  return (
    authContext.loading ? null :
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
            <Route exact path='/'>
            {authContext.auth.token ? <Home /> : <Redirect to ='/Signin' />}
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
