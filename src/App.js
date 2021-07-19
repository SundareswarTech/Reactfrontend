import './App.css';

import { Route, Link ,Switch, useHistory } from 'react-router-dom';
import React, {useContext} from 'react';

import {AuthContext} from './Context/AuthContext';
 
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import AddChartSection from './pages/AddChartSection/AddChartSection';
import SignUp from './pages/SignUp/SignUp';
import SignInPage from './pages/SignIn/SignInPage';

import icon from '../src/assets/dashboard.png';
import AuthService from './Services/AuthService';


import DashboardMenu from './pages/DashboardMenu/DashboardMenu';

import AdminPage from './pages/AdminPage/AdminPage';

import Footer from './components/Footer/Footer';

import EditPage from '../src/pages/EditPage/EditPage';

import Documentation from './pages/Documentation/Documentation';


import PrivateRouter from './HOC/PrivateRouter';
import UnprivateRouter from './HOC/UnprivateRouter';

function App(props) {
  let history = useHistory();

  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
 
  
  const unauthenticatedNavBar = (() =>{
    return (
      <div>
      <Link to="/login"  className="dashboard-link">Login</Link>
      <Link to="/register"  className="dashboard-link">Register</Link>
      <Link to="/documentation"  className="dashboard-link">Documentation</Link>
      </div>
    )
  });

  const logouthandler = (() => {
    AuthService.logout().then(data=>{
      if(data.success){
        setUser(data.user);
        setIsAuthenticated(false);
        history.push("/login")
      }
    })
  })

  const authenticatedNavBar = (() =>{
    return (
      <div>
      <Link to="/dashboard-list"  className="dashboard-link">Dashboard</Link>
      <Link to="/documentation"  className="dashboard-link">Documentation</Link>
      <button className="logout" onClick={logouthandler}>Logout</button>
      </div>
    )
  });

  return (
    <div className="App">
      <div className="Navigation">
        
        
        
        <div className="dashboard-logo"><Link to="/"  className="dashboard-link header"><img src={icon} className="icon"></img>DASHBOARDHUB</Link></div>
        
        {isAuthenticated?authenticatedNavBar():unauthenticatedNavBar()}
        
      </div>

        {isAuthenticated && <div className="welcome">Hi {user.username}, welcome to Dashboardhub</div>}

    <div>
      <Switch>
      <PrivateRouter path="/dashboard/:id" component={Dashboard} />
      <PrivateRouter path="/new/:name" component={AddChartSection} />  
      <PrivateRouter path="/admin/:name" component={AdminPage} />     
      <UnprivateRouter path="/register" component={SignUp} />
      <UnprivateRouter path="/login" component={SignInPage} />      
      <PrivateRouter path="/dashboard-list" component={DashboardMenu} />
      <PrivateRouter path="/edit/:id" component={EditPage} />
      <PrivateRouter path="/documentation" component={Documentation} />
      <UnprivateRouter path="/" component={Home} />
      </Switch>

    <Footer />
    </div>
    </div>
  );
}

export default App;
