

import {useEffect, useState} from 'react';

import axios from 'axios';

import './AdminPage.css'

import tick from '../../assets/tick.png';

import cross from '../../assets/close.png';

import { useParams } from "react-router-dom";

function AdminPage(){

    const [requests, setRequests] = useState([])
    const params = useParams();

    useEffect(()=>{
        axios.get("/request/getall").then(
            res=>{
                setRequests(res.data)
            }
        )
    },[])


    
    
    const [dash, setDash] = useState([]);
    useEffect(()=>{
        axios.get("/dashboard/getall").then(response=>{
            setDash(response.data)
        })
    },[])

    const Approve = (request) =>{

        const currentDashboard = dash.filter(das=>(
            das.name===request.dashboard
        ))
        
        if(request.role ==="user"){
            var currentUsers = currentDashboard[0].users;
            
            currentUsers.push(request.user)
            const user ={
                name:request.dashboard,
                users:currentUsers
            }
            fetch("/dashboard/updateusers",{
                method: "put",
    
                body: JSON.stringify(user),
                //credentials : "include",
                headers:{
                    "Content-Type":"application/json",
                    "accepts":"application/json"
                }
            }).then(res=>{
                if(res.status!==401)
                    fetch("/dashboard/updateusers",{
                method: "put",
    
                body: JSON.stringify(user),
                //credentials : "include",
                headers:{
                    "Content-Type":"application/json",
                    "accepts":"application/json"
                }
            }).then(res=>{
                if(res.status!==401)
                {
                    request.isApproved=true;
                    request.isDecided=true;
                    axios.put('/request/put/'+(request._id), request)
                        .then(function (response) {
                            axios.get("/request/getall").then(
                                res=>{
                                    setRequests(res.data)
                                }
                            )
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    }
                else
                    return res.json("Failed!")
            })
                else
                    return res.json("Failed!")
            })
        }
        if(request.role ==="admin"){
            var currentAdmins = currentDashboard[0].admins;
            currentAdmins.push(request.user)
            const user ={
                name:request.dashboard,
                admins:currentAdmins
            }
            fetch("/dashboard/updateadmins",{
                method: "put",
    
                body: JSON.stringify(user),
                //credentials : "include",
                headers:{
                    "Content-Type":"application/json",
                    "accepts":"application/json"
                }
            }).then(res=>{
                if(res.status!==401){
                request.isApproved=true;
                request.isDecided=true;
                axios.put('/request/put/'+(request._id), request)
                    .then(function (response) {
                        axios.get("/request/getall").then(
                            res=>{
                                setRequests(res.data)
                            }
                        )
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                else
                    return res.json("Failed!")
            })
        }
    }

    const Reject = (req) =>{
            req.isDecided=true;
            axios.put('/request/put/'+(req._id), req)
                .then(function (response) {
                    axios.get("/request/getall").then(
                        res=>{
                            setRequests(res.data)
                        }
                    )
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    return (
        <div>
            <div className="request-div-main">
                <div className="request-div-header">Request Portal</div>
            {requests.map((request)=>{
                return(
                    <div className="tab-contain">
                    {(!request.isDecided&&request.dashboard===params.name) && <div className="request-tab">
                        <div>Dashboard Name <b>{request.dashboard}</b></div>
                        <div>User Name  <b>{request.user}</b></div>
                        <div>Access Level  <b>{request.role}</b></div>
                        <div className="tab">
                            <div><button><img src={tick} className="decision-btn" onClick={Approve.bind(this,request)}  alt="unavailable"></img></button></div>
                            <div><button><img src={cross} className="decision-btn"  onClick={Reject.bind(this,request)} alt="unavailable"></img></button></div>
                        </div>
                    </div>}
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default AdminPage;