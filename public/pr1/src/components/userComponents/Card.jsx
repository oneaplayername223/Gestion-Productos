import React, { useEffect, useState  } from 'react'
import './../guessComponents/Card.css'
import { useForm } from 'react-hook-form'
import './Card.css'

function Card({ productos }) {

const [data, setData] = useState([])
const [busqueda, setBusqueda] = useState('')
const [refresh, setRefresh] = useState(false)
const [edit, setEdit] = useState(false)
const { register, handleSubmit, setValue } = useForm();

const handleDelete = (id) => {
    console.log(id)

    let confirmar = window.confirm('seguro que quieres eliminar?')
    if(!confirmar){
        return
    }
    fetch(`http://localhost:5000/eliminar/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(res => res.json())
    .then(data => {
      setRefresh(prev => !prev); 
    })

    

}

const handleEdit = (i) => {
    setEdit(true)
   

    setValue('id', i.id)
    setValue('nombre', i.nombre)
    setValue('descripcion', i.descripcion)
    setValue('cantidad', i.cantidad)
    setValue('precio', i.precio)

}

const handleEditSubmit = (data) => {

 const confirmacion = window.confirm('seguro que quieres editar?')
    if(!confirmacion){
        return
    }

    fetch(`http://localhost:5000/editar/${data.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
        setRefresh(prev => !prev); 
        setEdit(false)
    })
}


useEffect (() =>{
    fetch('http://localhost:5000/index', 
        {method: 'GET', credentials: 'include'}).then(res => res.json()).then(data => setData(data))
}, [refresh])

useEffect(() => {
    fetch('http://localhost:5000/index', {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json()).then(data => {
        setData(data)
        console.log(data)
        
    })
}, [])

const resultado = data.filter((i) => i.nombre.toLowerCase().includes(busqueda.toLowerCase()))
const resultadoStock = data.filter((item) => item.cantidad < 5 || item.cantidad === 0)

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
        <label><b>Descripcion: </b>{ i.descripcion}</label><br />
        <label><b>Cantidad: </b>{ i.cantidad}</label>

       <p>${i.precio}</p>

      <button className='editarBoton' onClick={() => handleEdit(i)}>editar</button>
            <button className='eliminarBoton' onClick={() => handleDelete(i.id)}>Eliminar</button>

      </div>
  ))}

{ edit &&
    <>
    <div className='editar'>
        <form onSubmit={handleSubmit(handleEditSubmit)}>
            <label>Nombre</label><br />
            <input type="text" placeholder='nombre' {...register("nombre", { required: true })} /><br />
            <label>Email</label><br />
            <input type="text" placeholder='descripcion' {...register("descripcion", { required: true })} /><br />
            <label>cantidad</label><br />
            <input type="number" placeholder='cantidad' {...register("cantidad", { required: true })} /><br />
            <label>precio</label><br />
            <input type="number" placeholder='precio' {...register("precio", { required: true })} /><br />

            <button type="submit">Agregar</button><br />
        </form>
        
    </div>

    </>
}
<h2>Productos con poco stock</h2>
{data &&

resultadoStock.map ((i) => (
    
    <div key={i.id} className='producto'> 
 <img
  src={`http://localhost:5000/imagen/${encodeURIComponent(i.imagen)}`}
  alt={`Imagen de ${i.nombre}`}
  width={200}
  onError={(e) => e.target.style.display = 'none'} // oculta si falla
/>


        <h3>Nombre:</h3>
        <p>{i.nombre}</p>
        <h3>Descripcion:</h3>
        <p>{i.descripcion}</p>
        <h3>Cantidad:</h3>
        <p>{i.cantidad}</p>
          <button className='editarBoton' onClick={() => handleEdit(i)}>editar</button>
            <button className='eliminarBoton' onClick={() => handleDelete(i.id)}>Eliminar</button>
   
    </div>


   



))
}



</section>
  )
}

export default Card