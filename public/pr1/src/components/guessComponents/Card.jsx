import React, { useEffect, useState  } from 'react'

function Card() {

const [data, setData] = useState([])

useEffect(() => {
    fetch('http://localhost:5000/', {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json()).then(data => {
        setData(data)
    })
}, [])

  return (
<section className='card'>

{data.map((i) =>(
    <div key={i.id} className='producto'>
           <img
  src={`http://localhost:5000/imagen/${encodeURIComponent(i.imagen)}`}
  alt={`Imagen de ${i.nombre}`}
  width={200}
  onError={(e) => e.target.style.display = 'none'} // oculta si falla
/><br />
<label><b>Nombre</b></label>
       <p>{i.nombre}</p>
       <label><b>Descripcion</b></label>
       <p>{i.descripcion}</p>
       <label><b>Precio</b></label>
       <p>{i.precio}$</p>

      
    </div>
))}

</section>
  )
}

export default Card