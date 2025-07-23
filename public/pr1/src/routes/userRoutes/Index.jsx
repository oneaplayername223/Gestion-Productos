import {useEffect, useState} from 'react'
import Nav from '../../components/userComponents/Nav'
import { useForm } from 'react-hook-form'
import {useVerifySession} from '../../components/userComponents/Verify';
import './Index.css'

function Index() {
useVerifySession()
  
//useStates
const [data, setData] = useState([])
const [refresh, setRefresh] = useState(false)
const [edit, setEdit] = useState(false)
const [busqueda, setBusqueda] = useState('')

const { register, handleSubmit, setValue } = useForm();



//useEffects

useEffect (() =>{
    fetch('http://localhost:5000/index', 
        {method: 'GET', credentials: 'include'}).then(res => res.json()).then(data => setData(data))
}, [refresh])
    


//funciones
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




const resultadoBusqueda = data.filter((item) => item.nombre.toLowerCase().includes(busqueda.toLowerCase()))
const resultadoStock = data.filter((item) => item.cantidad < 5 || item.cantidad === 0)
  return (

    <div className='index'>
<Nav />




<section className='productos'>


    
    <h1>Productos</h1>
<label>Buscar:</label>
<section className='busqueda'>
    <input type="text" placeholder='buscar' onChange={(e) => setBusqueda(e.target.value)} />
    
</section>


    {resultadoBusqueda.map((i) => (
        <div key={i.id} className='producto'>
           <h3>Imagen:</h3>
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
            <h3>Precio:</h3>
            <p>{i.precio}</p>

     
            <button onClick={() => handleEdit(i)}>editar</button>
            <button onClick={() => handleDelete(i.id)}>Eliminar</button>
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

</section>
<section className='ProductosStock'>
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
          <button onClick={() => handleEdit(i)}>editar</button>
            <button onClick={() => handleDelete(i.id)}>Eliminar</button>
   
    </div>


   



))
}


</section>

    </div>



  )
}

export default Index