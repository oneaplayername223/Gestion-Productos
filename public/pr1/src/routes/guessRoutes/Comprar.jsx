import React, { useEffect, useState } from 'react'
import {useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
function Comprar() {

const {id} = useParams()
const {handleSubmit, register, reset} = useForm()
const [data, setData] =useState([])
const onSubmit = (data) => {
    console.log(data)
    alert('Producto Procesado Exitosamente')
    reset()
}

useEffect(() =>{
    fetch(`http://localhost:5000/producto/${id}`, {
        method: 'GET',
        headers: {'content-Type': 'application/json'},

    }).then(res => res.json()).then(data => setData(data))

})


  return (
    <div className='formCompra'>
 
<section className='productoInfo'>

<h3>Informacion de Producto</h3>
{data.map((i) =>
<div>
         <img className='imagenProductoMain' src={`http://localhost:5000/imagen/${encodeURIComponent(i.imagen)}`} alt="" /><br />
<label><b>Nombre: </b></label>
{i.nombre}<br />
<label><b>Descripcion: </b></label>
{i.descripcion}<br />
<label><b>Precio: </b></label>
{i.precio}$

</div>)}


</section>


<section className='formPagoSection'>
<form className='formPago' onSubmit={handleSubmit(onSubmit)}>

       <section className='metodoPagoSection'>
       <h2> Seleccionar Metodo de pago</h2>
        <select className='seleccionMetodo' {...register('tipo', {required: true})}>
            <option className='visa' value={1}>Visa</option>
            <option className='paypal'>PayPal</option>
            <option className='apple'>Apple Pay</option>
            <option className='google'>Google Pay</option>
        </select>

        </section>


<label>Nombre de la tarjeta: </label>
<input type='text' placeholder='Ingresa el nombre' {...register('nombre', {required: true})} />
<label>Numero: </label>
<input type='number' placeholder='Ingresa el numero de tarjeta' {...register('numero', {required: true})}/>
<label>CVV: </label>
<input type='number' placeholder='Ingresa el cvv' {...register('cvv', {required: true})}/>
<br />
<input type='submit' className='procesarCompraBoton' value='Procesar Compra' />
</form>
</section>
<Link to={`/productos/${id}`}>Volver</Link>
        
    </div>
  )
}

export default Comprar