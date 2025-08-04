import React, { useEffect, useState } from 'react'
import {useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Comprar.css'
function Comprar() {

const {id} = useParams()
const {handleSubmit, register, reset, formState: errors} = useForm()
const [data, setData] =useState([])
const [buy, setbuy] =useState(false)
const onSubmit = (data) => {
    console.log(data)
    alert('Producto Procesado Exitosamente')
    setbuy(true)
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

{!buy &&
<section className='formPagoSection'>
    <form className='formPago' onSubmit={handleSubmit(onSubmit)}>

       <section className='metodoPagoSection'>
       <h2> Seleccionar Metodo de pago</h2>
        <select className='seleccionMetodo' {...register('tipo', {required: true})}>
            <option className='visa' value={1}>Visa</option>
            <option className='paypal'>PayPal</option>
            <option className='mastercard'>MasterCard</option>

     
        </select>

        </section>


    <label> Nombre de la tarjeta: </label>
    <input type='text' placeholder='Ingresa el nombre' {...register('nombre', {required: true, minLength: 9, maxLength: 20})} />
    {errors.nombre && <p>Campo invalido</p>}
    <label> Numero: </label>
    <input type='number' placeholder='Ingresa el numero de tarjeta' {...register('numero', {required: true})}/>
    <label> CVV: </label>
    <input type='number' placeholder='Ingresa el cvv' {...register('cvv', {required: true, minLength: 3, maxLength: 3})}/>
        {errors.cvv && <p>Campo invalido</p>}

    <br />
    <input type='submit' className='procesarCompraBoton' value='Procesar Compra' />
    </form>
</section>
}

{buy &&<>

<h1 className='buyMessage'>Producto comprado Exitosamente</h1>
</>

}

<Link to={`/productos/${id}`}>Volver</Link>
        
    </div>
  )
}

export default Comprar