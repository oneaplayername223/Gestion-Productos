import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Nav from '../../components/guessComponents/Nav';
import UserCard from '../../components/guessComponents/UserCard';
import './Productos.css'
function Productos() {
const { id } = useParams();  
const [data, setData] = useState([])
const navigate = useNavigate()

if (!id){
navigate('/')
}

useEffect(() =>{
    fetch(`http://localhost:5000/producto/${id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json()).then(data => setData(data))
    console.log(data)
}, [])




  return (

<>
<Nav />
    <div className='productosMain'>


{data.map((item) =>(
    <>
    <div key={item.id} className='productoMainBox'>
         <img className='imagenProductoMain' src={`http://localhost:5000/imagen/${encodeURIComponent(item.imagen)}`} alt="" />
       <h2>{item.nombre}</h2>
        <p className='precio'>${item.precio}</p>
       <Link to={`/comprar/${id}`} className='botonComprar'>Comprar</Link>
       <button className='botonAgregar'>Agregar al carrito</button>
        <div className='descripcionMain'>
          <UserCard id={item.id} />
        <label><b>Descripcion:</b></label>
            <p >{item.descripcion}</p>
            </div>

    </div>
    
    </>
    
))}

</div>
</>
  )
}

export default Productos