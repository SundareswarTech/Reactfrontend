import React, {useEffect, useState, createContext} from 'react';
import AuthService from '../Services/AuthService';


export const AuthContext = createContext();

export default({children})=>{
    const[user,setUser]=useState(null);
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    const[isLoaded,setIsloaded]=useState(false);

    const[elementData,setElementData]=useState([]);



    useEffect(()=>{
        AuthService.isAuthenticated().then(data=>{
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsloaded(true);
        })
    },[]);

    return(
        <div>
            {!isLoaded? <h1>Loading</h1>:
            
            <AuthContext.Provider value={{user, setUser, isAuthenticated,setIsAuthenticated,elementData,setElementData}}>
                {children}
            </AuthContext.Provider>
            }
        </div>
    )
}

