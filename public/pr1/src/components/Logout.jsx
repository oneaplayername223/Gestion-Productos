import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


function Logout() {
const navigate = useNavigate()
const logoutSession = () => {
 fetch ('http://localhost:5000/logout',
     
    {method: 'POST',credentials: 'include'}).then(res => res.json()).then(data => console.log(data)).then (() => navigate('/login'))
}
logoutSession()
  return (
  <></>
  )
}

export default Logout