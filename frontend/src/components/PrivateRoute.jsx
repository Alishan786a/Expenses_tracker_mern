import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from './Loading';

function PrivateRoute() {
    
    let {loading,user} =useSelector((e)=>e.userAuthenticate)
    
 if (loading==false ) {
    return (
        <>
   
        {user? <Outlet/>:<Navigate to={'/login'}/>}
        </>
    )
 }else{
    return <Loading/>
 }
}

export default PrivateRoute