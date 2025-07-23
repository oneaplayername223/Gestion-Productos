import React, { useState, useEffect } from 'react'
import Nav from '../../components/userComponents/Nav'
function Perfil() {

const [data, setData] = useState([])
useEffect (() => {
    fetch ('http://localhost:5000/perfil', 
        {method: 'GET', credentials: 'include'}).then(res => res.json()).then(data => setData(data))
    
})

  return (
    
    <div className='perfil'>
<Nav />


        <h1>Perfil</h1>
{data.map((item) =>(
    <div key={item.id} className='producto'>
       <h2>{item.nombre}</h2>
        <p>{item.correo}</p>
        <p>{item.usuario}</p>
    </div>
))}

    </div>
  )
}

export default Perfil