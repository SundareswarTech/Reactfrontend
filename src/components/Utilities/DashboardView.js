import '../Utilities/Utilities.css';

import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import dashIcon from '../../assets/graph2.png'


function DashboardView(props) {

  const RequestAccess = ((e) => {
    e.preventDefault();

    axios.post('/request/add', {
      user: authContext.user.username,
      dashboard: props.name,
      role: "user",
      isapproved: false
    })
      .then(function (response) {
        console.log(response);
        alert("Sent Request to Admin for Approval")
      })
      .catch(function (error) {
        alert("Error")
      });
  })

  const authContext = useContext(AuthContext);
  const isAdmin = props.admins.includes(authContext.user.username);
  const isUser = props.users.includes(authContext.user.username);

  const dashboardLink = "/dashboard/" + props.name
  const divView = <Link to={{
    pathname: dashboardLink,
    state: {
      isAdmin: isAdmin,
      dashboardname : props.name,
      description : props.description
    },
  }} ><button className="toAdmin">Enter Dashboard</button></Link>
  const reqAccess = <button className="toAdmin" onClick={RequestAccess}>Request Access</button>

  return (
    <div className="dashboard-view-section">
      
      <div className="dashboard-view">

      <div>
      <img src={dashIcon} className="dashIcon" alt="image-unavailable"></img>
      </div>

        <div>
          <div>
            <div className="db-name-value"> {props.name}</div>
          </div>
          {/* <div>
            <div>{props.description}</div>
          </div> */}
          <div>
          {isAdmin === true || isUser === true ? divView : reqAccess}
        </div>
        </div>
        

      </div>
    </div>
  )
}

export default DashboardView;