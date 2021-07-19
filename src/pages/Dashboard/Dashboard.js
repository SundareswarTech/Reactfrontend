
import AddChart from "../../components/Utilities/AddChart";

import { Link, useLocation, useParams } from "react-router-dom";

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

import ProcessData from "../../Services/Process Data/ProcessData";

import axios from 'axios';

import './Dashboard.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import trash from '../../../src/assets/trash.png';
import edit from '../../../src/assets/edit.png';


function Dashboard(props) {
    const location = useLocation();
    const params = useParams();
    const [charts, setCharts] = useState([])
    useEffect(() => {
        axios.get('/do/getall/'+params.id)
            .then(function (response) {
                // handle success      
                setCharts(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    const authContext = useContext(AuthContext);
    const RequestAccess = ((e) => {
        e.preventDefault();

        axios.post('/request/add', {
            user: authContext.user.username,
            dashboard: params.id,
            role: "admin",
            isapproved: false
        })
            .then(function (response) {
                alert("Sent Request to Admin for Approval")
            })
            .catch(function (error) {
                alert("Error")
            });
    })



    const addChartLink = "/new/" + params.id
    const adminLink = "/admin/" + params.id

    const adminCentral = <div>You are an Administrator. 
            <Link className="add-chart" to={adminLink}>
                {location.state.isAdmin && <button className="toAdmin">Admin Central</button>}
            </Link>
        </div>
    
    
    
    
    const userCentral = <div>You are an User. Need Admin Access. <Link className="add-chart" to={adminLink}>{!location.state.isAdmin && <button className="toAdmin" onClick={RequestAccess}>Request Admin Access</button>}</Link></div>


    const deleteElement = ((val) => {
        const id = val;

        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                        axios.delete('/do/delete/' + id)
                            .then(function (response) {
                                setCharts(charts.filter(el => el._id !== id))
                            })
                            .catch(function (error) {
                                // handle error
                                console.log(error);
                            })
                            .then(function () {
                                // always executed
                            })
                },
                {
                    label: 'No',
                    onClick: () => alert("You selected not to delete the dashboard.")
                }

            ]
        });
    });

    const editElement = ((val) => {
        const id = val;
        props.history.push({
            pathname: '/edit/'+params.id,
            state: { objectId: id }
        }
        )
    });


    const [data, setData] = useState([])



    return (
        <div className="dashboard-div">


            <div className="dashboard-titles">
            Dashboard Name : <b> {params.id} </b>
            </div>

            <div className="dashboard-titles">
            Dashboard Description : <b> {location.state.description} </b>
            </div>

            <div className="access-div">
                {location.state.isAdmin ? adminCentral : userCentral}
            </div>
            <div className="dashboard">

                {charts.map((chart) => {
                    return (
                        <div>
                            <div style={{ position: "relative" }}>
                                <ProcessData data={chart} />


                                <div style={{ position: "relative", height: 40, margin: 10 }} className="align-edit-icon">
                                    {location.state.isAdmin && <button onClick={editElement.bind(this, chart._id)}><img src={edit} className="edit" alt="unavailable"></img></button>}
                                    {location.state.isAdmin && <button onClick={deleteElement.bind(this, chart._id)}><img src={trash} className="trash" alt="unavailable"></img></button>}
                                </div>


                            </div>
                        </div>
                    )
                })}

                <div className="add-chart">
                    <Link to={{
                        pathname: addChartLink,
                        state: {
                            dashboardname: location.state.dashboardname
                        },
                    }}>{location.state.isAdmin && <AddChart />}</Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;