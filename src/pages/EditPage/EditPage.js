import { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import '../../components/AddChartSect/AddChartSect';
import axios from 'axios';
import 'react-dropdown/style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

function AddChartSect(props) {

    const params = useParams();
    const history = useHistory();

    const toDashboard = "/dashboard/"+params.id

    
    const UpdateChart = (e) => {
        e.preventDefault();
        axios.put('/do/put/'+(props.location.state.objectId), dashboard)
            .then(function (response) {
                history.push({
                    pathname: toDashboard,
                    state:{
                        isAdmin : true,
                        dashboardname : params.id
                    }
                });
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const[dashboard, setDashboard] = useState({type:"", title:"", description:"", source:"",data:"", api:"", query:"",height:"", colour:""});

    const [isData, setIsData]=useState(false)
    const [isApi, setIsApi]=useState(false)
    const [isGraphQL, setIsGraphQL]=useState(false)

    useEffect(()=>{
        axios.get('/do/find/'+(props.location.state.objectId)) 
            .then(function (response) {
                setDashboard(response.data)
                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            })

            if ( dashboard.source==="Own Data"){
                console.log(1);
                setIsData(true);
                setIsApi(false);
                setIsGraphQL(false);
            }
            if ( dashboard.source==="REST API"){
                setIsData(false);
                setIsApi(true);
                setIsGraphQL(false);
            }
            if ( dashboard.source==="GraphQL"){
                setIsData(false);
                setIsApi(true);
                setIsGraphQL(true);
            }
            if ( dashboard.source==="SOAP API"){
                setIsData(false);
                setIsApi(true);
                setIsGraphQL(false);
            }            
    },[isData, isApi, isGraphQL])


    const handleSelectType = (e) => {
        setDashboard({...dashboard,type:e})
    }

    
    const handleSelectSource = (e) => {
        setDashboard({...dashboard,source:e});



        if ( e==="Own Data"){
            setIsData(true);
            setIsApi(false);
            setIsGraphQL(false);
        }
        if ( e==="REST API"){
            setIsData(false);
            setIsApi(true);
            setIsGraphQL(false);
        }
        if ( e==="GraphQL"){
            setIsData(false);
            setIsApi(true);
            setIsGraphQL(true);
        }
        if ( e==="SOAP API"){
            setIsData(false);
            setIsApi(true);
            setIsGraphQL(false);
        }
    }
    

    const onChange = e =>{
        e.preventDefault();
        setDashboard({...dashboard,[e.target.name]:e.target.value})
    }


    return (
        <div className="addSectionDiv">
            <div className="header-add-form">PLEASE CHECK OUR DOCUMENTATION SECTION TO UNDERSTAND HOW TO FILL THIS FORM WITH CORRECT DATA</div>
            {dashboard && <form onSubmit={UpdateChart}>
             <div>
                    <div className="add-chart-subheader">
                        ELEMENT
                    </div>
                    <div className="add-chart-data">
                        <div>
                            <DropdownButton
                                alignRight
                                title="Type Of Element"
                                id="dropdown-menu-align-right"
                                onSelect={handleSelectType}
                            >
                                <Dropdown.Item eventKey="Table">Table</Dropdown.Item>
                                <Dropdown.Item eventKey="Bar">Bar</Dropdown.Item>
                                <Dropdown.Item eventKey="Line">Line</Dropdown.Item>
                                <Dropdown.Item eventKey="Pie">Pie</Dropdown.Item>
                                <Dropdown.Item eventKey="Doughnut">Doughnut</Dropdown.Item>
                                <Dropdown.Item eventKey="Polar Area">Polar Area</Dropdown.Item>
                            </DropdownButton>
                            <br />
                            Selected Value : {dashboard.type}
                        </div>
                        <div>
                            <div className="head">Title </div><div> <input  name="title" onChange={onChange}  value={dashboard.title}/></div>
                        </div>
                        <div>
                            <div className="head">Description </div><div> <input  name="description" onChange={onChange} value={dashboard.description}/></div>
                        </div>
                    </div>
                    *In this section, Type and Title must be provided.
                </div>
                <div>
                    <div className="add-chart-subheader">
                        DATA
                    </div>
                    <div className="add-chart-data">
                        <div>
                            <DropdownButton
                                alignRight
                                title="Source of DATA"
                                id="dropdown-menu-align-right"
                                onSelect={handleSelectSource}
                            >
                                <Dropdown.Item eventKey="Own Data">Own Data</Dropdown.Item>
                                <Dropdown.Item eventKey="REST API">REST API</Dropdown.Item>
                                <Dropdown.Item eventKey="GraphQL">GraphQL</Dropdown.Item>
                                <Dropdown.Item eventKey="SOAP API">SOAP API</Dropdown.Item>
                            </DropdownButton>
                            <br />
                            Selected Value : {dashboard.source}
                        </div>
                        {isApi && <div>
                            <div className="head">Api </div>{dashboard.source!=="" && <div> <input  name="api" onChange={onChange} value={dashboard.api} /></div>}
                        </div>}
                        {isData && <div>
                            <div className="head">Data </div>{dashboard.source!=="" && <div> <input  name="data" onChange={onChange} value={dashboard.data}/></div>}
                        </div>}
                        {isGraphQL && <div>
                            <div className="head">GraphQL Query </div><div> <input  name="query" onChange={onChange} value={dashboard.query}/></div>
                        </div>}
                    </div>
                    *In this section, if you select to put your own data then provide in the data input. For other options put the required API which contains the data.
                </div>

                <div>
                    <div className="add-chart-subheader">
                        ELEMENT PROPERTIES
                    </div>
                    <div className="add-chart-data">
                        <div>
                            <div className="head">Height </div><div> <input  name="height" onChange={onChange} value={dashboard.height}/></div>
                        </div>
                        <div>
                            <div className="head">Color </div><div> <input name="colour" onChange={onChange} value={dashboard.colour}/></div>
                        </div>
                    </div>
                    *These options are optional. Check documentation for more information. <br /> **Width will be adjusted on basis of the provided height.
                </div>


                <div>
                    <button className="create-submit" type="submit">UPDATE</button>
                </div>
            </form>}
        </div>
    )
}

export default AddChartSect;