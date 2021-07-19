import CreateDashboard from "../../components/CreateDashboard/CreateDashboard";


import './DashboardMenu.css';

function DashboardMenu(){
    return(
        <div style={{position:"relative"}}>
        <div className="dashboard-menu">
            <CreateDashboard />
        </div>
        </div>
    )
}

export default DashboardMenu