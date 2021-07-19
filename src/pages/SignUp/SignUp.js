import './SignUp.css'

import AuthService from '../../Services/AuthService';
import { useState, useEffect, useRef } from 'react';

import Message from '../../components/Message/Message';

function SignInPage(props){

        const[user, setUser] = useState({username:"", password:""});
        const [message, setMessage] = useState({type:"", message:""});
        let timerID = useRef(null);

        const [validName, setValidName] = useState(true);
    const [validPass, setValidPass] = useState(true);

    const [validDBForm, setValidDBForm] = useState(false);

    useEffect(()=>{
        return()=>{
            clearTimeout(timerID);
        }
    },[]);

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

    const resetForm = () =>{
        setUser({username:"",password:""})
    }

    const onSubmit = async e =>{
        e.preventDefault();
        validName===true && validPass===true?setValidDBForm(false):setValidDBForm(true)
        try{
        await AuthService.register(user).then(data=>{
            const {isAuthenticated,user,message} = data;

            if(!message.msgError){
                resetForm();
                setMessage({type:"success",message:"User Registered!"});
                timerID = setTimeout(()=>{
                    props.history.push("/login")
                },2000)
            }
        })
    }catch(error){        
        setMessage({type:"failed",message:"Could not register."});

    }
}

    return(
        <div className="sign-in-container">
            <form onSubmit={onSubmit} >
            <div className="sign-in">
                <div className="login">Registration Portal</div>
                <div className="input-sec" >Username  <input placeholder="enter username" name="username" type="text" onChange={onChange}/></div>
                <div className="input-sec" >Password <input placeholder="enter password" name="password" type="password" onChange={onChange} /></div>
                <div className="input-sec"><button className="login-btn" type="submit">Register</button></div>
                {validDBForm && <div className="failure">Fields cannot be empty</div>}
                <div>{<Message message={message}/>}</div>
            </div>
            </form>
        </div>
    )
    }
    
    export default SignInPage;