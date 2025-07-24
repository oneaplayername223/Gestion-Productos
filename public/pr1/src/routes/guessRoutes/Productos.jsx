import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function Productos() {
const { id } = useParams();    
const [data, setData] = useState([])

useEffect(() =>{
    fetch(`http://localhost:5000/producto/${id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()).then(data => setData(data))
    console.log(data)
})

  return (
    <div className='productos'>
{data.map((item) =>(
    <div key={item.id} className='producto'> 
       <h2>{item.nombre}</h2>
        <p>{item.precio}</p>
    </div>
))}

</div>
  )
}

export default Productos