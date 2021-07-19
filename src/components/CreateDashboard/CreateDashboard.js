import './CreateDashboard.css'

import { AuthContext } from '../../Context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import ListBoard from '../ListDashboard/ListBoard';

import create from '../../assets/create.png';

import information from '../../assets/pin.png';

import Message from '../../components/Message/Message';


import axios from 'axios';


function CreateDashboard() {
    const authContext = useContext(AuthContext);

    const [dashboard, setDashboard] = useState({ name: "", description: "", users: [], admins: [] });

    const [message, setMessage] = useState({type:"", message:""});

    const [abc, setAbc] = useState([]);

    const [validName, setValidName] = useState(true);

    const [validDBForm, setValidDBForm] = useState(false);


    useEffect(() => {
        axios.get("/dashboard/getall").then(response => {
            setAbc(response.data)
            setOut(response.data)
            setValidDBForm(false)
            setValidName(true)
        })
    }, [])

    const onChange = e => {
        e.preventDefault();
        setMessage({type:"", message:""})

        if(e.target.name==="name"){
            e.target.value.length===0?setValidName(true):setValidName(false) 
            e.target.value.length===0?setValidName(true):setValidDBForm(false)
        }

        setDashboard({ ...dashboard, [e.target.name]: e.target.value })
    }
    let users = []
    const createDashboard = async (e) => {
        e.preventDefault();
        console.log(validName)
        validName===true?setValidDBForm(true):setValidDBForm(false)
        
        users.push(authContext.user.username)
        dashboard.admins = users

        try{
        const response = await axios.post("/dashboard/add", {
           name : dashboard.name,
           description : dashboard.description,
           admins : dashboard.admins
        }).then(response => {
            setMessage({type:"success",message:"New Dashboard Created!"})
            const d = abc.push()
            setAbc(response.data);
            setOut(response.data);
        })
    }catch(err){
            setMessage({type:"failed", message : "Could not create a new dashboard."});            
            return { isAuthenticated: false, user: { username: "", role: "" } }
        }
    }

    const[input, setInput]=useState([]);
    const[out, setOut]=useState();

    const updateInput = async (input) => {
        const filtered = out.filter(ab => {
         return ab.name.toLowerCase().includes(input.target.value.toLowerCase())
        })
        setInput(input.target.value);
        setAbc(filtered);
     }
   

    return (
        <div>
            <div className="db-create">
                <div className="db-create-info">
                    <img src={information} alt="image unavailable" className="info-logo"></img>
                    <div>
                        <img src={create} alt = "image unavailable"></img>
                    </div>
                    <div className="db-create-info-data">
                        Please Create your own dashboard to create and share your data. By creating a dashboard you get 
                        access to create several type of charts and table.
                    </div>
                </div>
                <div className="db-create-container">
                    <div className="db-create-container-header">
                        Create a dashboard for your project
                    </div>
                    <form className="db-create-container-form" onSubmit={createDashboard}>
                        <div>
                            <div>
                                <label htmlFor="name" className="db-label">*Dashboard Name</label>
                            </div>
                            <div>
                                <input name="name" onChange={onChange} />
                                {validDBForm && <div className="failure">Please provide a dashboard name</div>}
                            </div>
                        </div>
                        <div>
                            <div><label htmlFor="description">Description</label></div>
                            <div><input name="description" onChange={onChange} /></div>
                        </div>
                        <div>
                            <button type="submit" className="db-btn">Create Dashboard</button>
                        </div>
                        *required
                        <Message message={message} />
                    </form>
                    
                </div>
                
            </div>
            <div className="list-header">
                Dashboard List
            </div>    
            
            <div className="input-over"><b>Filter By Name</b> <input type="text" name="input" onChange={updateInput}/></div>
            
            <ListBoard datas={abc}/>
        </div>
    )
}

export default CreateDashboard;