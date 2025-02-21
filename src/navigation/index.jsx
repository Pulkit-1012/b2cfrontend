import React from 'react'
import Private from '../layouts/private'
import Public from '../layouts/public'
import { useAuth } from '../auth'
import {Toaster} from "react-hot-toast"



const Navigation = () => {
    const { token } = useAuth();
    
    const isAuthenticated = Boolean(token);
  

  return (
    <>
    <Toaster/>
    {isAuthenticated == 1 ? <Private/> : <Public/>}
    </>
  )
}

export default Navigation