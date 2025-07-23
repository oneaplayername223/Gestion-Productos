import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function IndexUser() {

const [data, setData] = useState([])

useEffect (() => {
    fetch ('http://localhost:5000/', 
        {method: 'GET', credentials: 'include'}).then(res => res.json()).then(data => setData(data))
        console.log(data)
    
}, [])


  return (
    <div className='index'>
        <h1>Pagina Principal</h1>
<Link to='/login'>Acceder</Link><br />
<section className='Productos'> 
    <h2>Productos</h2>
{data.map((item) =>(
    <div key={item.id} className='producto'>
                   <h3>Imagen:</h3>
       <img
  src={`http://localhost:5000/imagen/${encodeURIComponent(item.imagen)}`}
  alt={`Imagen de ${item.nombre}`}
  width={200}
  onError={(e) => e.target.style.display = 'none'} // oculta si falla
/>
        <h2>{item.nombre}</h2>
        <p>{item.descripcion}</p>
        <p>{item.cantidad}</p>
        <p>{item.precio}</p>


    </div>


))}

</section>





    </div>
  )
}

export default IndexUser