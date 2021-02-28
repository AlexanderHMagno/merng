import React, { PureComponent, useContext} from 'react';

import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const AuthRouter = ({component:Component, ...rest}) => {
    const {user} = useContext(AuthContext);
    
    return (<Route 
        {...rest}
        render = {(props) => user? <Redirect to="/"/> : <Component {...props}/>}
        />
        )
}

export default AuthRouter;