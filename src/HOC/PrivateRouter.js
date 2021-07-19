import {Route, Redirect} from 'react-router-dom';

import {useContext} from 'react';

import {AuthContext} from '../Context/AuthContext';

function PrivateRouter({component : Component, ...rest}){

const authContext = useContext(AuthContext);

    return(
        <Route {...rest} render={props =>{
            if(!authContext.isAuthenticated){
                return <Redirect to={{
                    pathname:"/login"
                }}/>
            }
            
            return <Component {...props} />
        }
    }/>
    )
}

export default PrivateRouter;