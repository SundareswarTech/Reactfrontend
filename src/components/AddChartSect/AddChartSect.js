import { useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import './AddChartSect.css';
import axios from 'axios';
import 'react-dropdown/style.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

function AddChartSect(props) {

    const params = useParams();
    const history = useHistory();

    const link = "/dashboard/"+props.dashboardname;
    const AddChart = (e) => {
        e.preventDefault();
        axios.post('/do/add', dashboard)
            .then(function (response) {
                history.push({
                    pathname:link,
                    state:{
                        isAdmin:true,
                        dashboardname:props.dashboardname,
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const handleSelectType = (e) => {
        setDashboard({...dashboard,type:e})
    }

    
    const [isData, setIsData]=useState(false)
    const [isApi, setIsApi]=useState(false)
    const [isGraphQL, setIsGraphQL]=useState(false)

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
    
    const[dashboard, setDashboard] = useState({dashboard:props.dashboardname, type:"", title:"", description:"", source:"",data:"", api:"", query:"",height:"", colour:""});

    const onChange = e =>{
        e.preventDefault();
        setDashboard({...dashboard,[e.target.name]:e.target.value})
    }


    return (
        <div className="addSectionDiv">
            <div className="header-add-form">PLEASE CHECK OUR DOCUMENTATION SECTION TO UNDERSTAND HOW TO FILL THIS FORM WITH CORRECT DATA</div>
            <form onSubmit={AddChart}>
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
                                <Dropdown.Item eventKey="Radar">Radar</Dropdown.Item>
                            </DropdownButton>
                            <br />
                            Selected Value : {dashboard.type}
                        </div>
                        <div>
                            <div className="head">Title</div> <div><input  name="title" onChange={onChange}  /></div>
                        </div>
                        <div>
                            <div className="head">Description</div> <div><input  name="description" onChange={onChange} /></div>
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
                            <div className="head">API </div><div> <input  name="api" onChange={onChange} /></div>
                        </div>}
                        {isData && <div>
                            <div className="head">Data </div><div> <input  name="data" onChange={onChange} /></div>
                        </div>}
                        {isGraphQL && <div>
                            <div className="head">GraphQL Query </div><div> <input  name="query" onChange={onChange} /></div>
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
                           <div className="head">Height </div> <div><input  name="height" onChange={onChange} /></div>
                        </div>
                        <div>
                            <div className="head">Color </div> <div><input name="colour" onChange={onChange} /></div>
                        </div>
                    </div>
                    *These options are optional. Check documentation for more information. <br /> **Width will be adjusted on basis of the provided height.
                </div>


                <div>
                    <button className="create-submit" type="submit">CREATE</button>
                </div>
            </form>
        </div>
    )
}

export default AddChartSect;