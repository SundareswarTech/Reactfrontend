import './Home.css'

import {  Link  } from 'react-router-dom';
import graph1 from '../../../src/assets/graph1.png'


function Home(){
    return (
        <div>
            <div  className="login-div">
            <div className="home-img">                
            <div>
                <img src={graph1} className="login-image" alt="unavailable"></img>
                </div>
            </div>
            <div className="container-login">
                <form className="login-form">
                <div className="login-header">Welcome to Dashboard Hub!</div>
                <div className="login-subheader">Creative way to display your data.</div>
                    <div className="home-page-buttons">
                        <div><div>Already a Member?  </div><div><Link to="/login"  className="dashboard-link-home">Login</Link></div></div>
                        <div><div>New to DASHBOARDHub? </div><div><Link to="/register"  className="dashboard-link-home">Register</Link></div></div>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Home;