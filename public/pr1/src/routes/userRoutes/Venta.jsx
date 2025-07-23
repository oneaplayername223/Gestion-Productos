import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Nav from '../../components/userComponents/Nav';
function Venta() {

//useStates

    const [data, setData] = useState([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [item , setItem] = useState([])
    const [refresh, setRefresh] = useState(false)

//useEffects

useEffect (() =>{
    fetch('http://localhost:5000/index', 
        {method: 'GET', 
            credentials: 'include'
        
        }).then(res => res.json())
        .then(data => setData(data))

}, [])


useEffect (() => {
    fetch('http://localhost:5000/venta/ventas', {
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json())
    .then(data => setItem(data))
}, [refresh])

//funciones

const onSubmit = (data) =>{
    fetch('http://localhost:5000/venta', {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => res.json()).then(data => console.log(data) || setTimeout(() => setRefresh(true), 900))
    .then(data => setRefresh(false))
    reset()
}

  return (
    <div className='venta'>

<Nav />





<form onSubmit={handleSubmit(onSubmit)}>
    <label>Nombre</label><br />
    <input type="text" placeholder='nombre'{...register("nombre", { required: true })} /><br />
    <label>Cantidad</label><br />
    <input type="text" placeholder='cantidad' {...register("cantidad", { required: true })} /><br />
    <label>Producto</label><br />
    <select {...register("id_producto", { required: true })}>
        <option value=''>Seleccione un producto</option>
        {data.map((item) =>(
            <option key={item.id} value={item.id}>{item.nombre} - Precio: ${item.precio} - Cantidad: {item.cantidad} </option>
        ))}

    </select><br />
    
    
    {errors.id_producto && <span>El campo es requerido</span>}
    <br />
    <input type='submit' value={'vender'} />
</form>

<section className='ventas' id='ventas'>
    <h2>Ventas</h2>
    <p>Productos vendidos</p>

   {item.map((item) =>(
            <div key={item.id} className='producto'>
                __________________________
                <h4>Nombre</h4>
                <p>{item.nombre}</p>
                <h4 >Cantidad</h4>
                <p>{item.cantidad}</p>
                <h4>Precio</h4>
                <p>${item.precio}</p>
                __________________________
            </div>
        ))}

</section>

    </div>
  )
}

export default Venta