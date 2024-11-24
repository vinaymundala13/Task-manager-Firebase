import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContent";
const ProtectedRoute =({children})=>{
    let {user}=useUserAuth();
    if( !user){
        return <Navigate ro="/"/>

    }
    return children;
}
export default ProtectedRoute;