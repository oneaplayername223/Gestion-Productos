import React, { useEffect, useState  } from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
function Card({ productos }) {

const [data, setData] = useState([])
const [busqueda, setBusqueda] = useState('')
useEffect(() => {
    fetch('http://localhost:5000/', {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json()).then(data => {
        setData(data)
        console.log(data)
        
    })
}, [])

const resultado = data.filter((i) => i.nombre.toLowerCase().includes(busqueda.toLowerCase()))

  return (



<section className='card'>

    <section className='busqueda'>
      <input type="text" placeholder='Busca lo que quieras' className='barraBusqueda' onChange={(e) => setBusqueda(e.target.value)} />
  </section>

  <h2>{productos}</h2>
  {resultado.map((i) =>(
      <div key={i.id} className='producto'>
            <img className='imagenProducto'
    src={`http://localhost:5000/imagen/${encodeURIComponent(i.imagen)}`}
    alt={`Imagen de ${i.nombre}`}
    width={200}
  /><br />
        <p>{i.nombre}</p>
  
       <p>${i.precio}</p>

      <Link className='comprarBoton' to={`/productos/${i.id}`}>Ver mas</Link>
      </div>
  ))}

</section>
  )
}

export default Card