import './SignIn.css'

import AuthService from '../../Services/AuthService';
import {AuthContext} from '../../Context/AuthContext';
import { useContext, useState } from 'react';

import Message from '../../components/Message/Message';

function SignInPage(props){

        const[user, setUser] = useState({username:"", password:""});
        const [message, setMessage] = useState({type:"", message:""});
        const authContext = useContext(AuthContext);

        
    const [validName, setValidName] = useState(true);
    const [validPass, setValidPass] = useState(true);

    const [validDBForm, setValidDBForm] = useState(false);

    const onChange = e =>{
        e.preventDefault();
        setUser({...user,[e.target.name]:e.target.value})
        setMessage({type:"",message:""});

        if(e.target.name==="username"){
            e.target.value.length!==0?setValidName(true):setValidName(false) 
        }

        if(e.target.name==="password"){
            e.target.value.length!==0?setValidPass(true):setValidName(false) 
        }

        setValidDBForm(false)
    }

    const onSubmit = async e =>{
        e.preventDefault();
        validName===true && validPass===true?setValidDBForm(false):setValidDBForm(true)
        try{
        await AuthService.login(user).then(data=>{
            const {isAuthenticated,user,message} = data;
            if (isAuthenticated){                
            authContext.setIsAuthenticated(true);
            authContext.setUser(user);
            props.history.push("/dashboard-list")
            }
            else{
                setMessage({type:"failed",message:"Invalid Credentails"});
            }
        })}catch(error){        
            setMessage({type:"failed",message:"Invalid Login Attempt"});
        }
    }

    return(
        <div className="sign-in-container">
            <form onSubmit={onSubmit} >
            <div className="sign-in">
                <div className="login">Login Portal</div>
                <div className="input-sec" >Username  <input placeholder="enter username" name="username" type="text" onChange={onChange}/></div>
                <div className="input-sec" >Password <input placeholder="enter password" name="password" type="password" onChange={onChange} /></div>
                <div className="input-sec"><button className="login-btn" type="submit">Login</button></div>
                {validDBForm && <div className="failure">Fields cannot be empty</div>}
                <div>{<Message message={message}/>}</div>
            </div>
            </form>
        </div>
    )
    }
    
    export default SignInPage;