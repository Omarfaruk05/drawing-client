import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const user = localStorage.getItem('token')
    if(!user){
        return <Navigate to={"/login"} state={{from:location}} replace></Navigate>
    }
    return children;
    
};

export default ProtectedRoute;