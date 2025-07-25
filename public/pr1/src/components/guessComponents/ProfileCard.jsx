import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Productos from '../../routes/guessRoutes/Productos';

function ProfileCard() {

const { id } = useParams();
const [user, setUser] = useState([])

useEffect(() => {
  fetch(`http://localhost:5000/preview/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => {
      console.log("Data recibida:", data); // 👀
      setUser(data);
    });
}, []);


  return (
    <div className='profileCard'>

{user.map((i) => {
    
})}
       
   <h1>G</h1>
  
    </div>
  
  )
}
export default ProfileCard