import {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
function Register() {
    const { register, handleSubmit, } = useForm();


    
    const onSubmit = (data) =>{
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    }
  return (
    <section className='register'>
        <h1>Registrarse</h1><br />
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nombre</label><br />
            <input type="text" placeholder='Email' {...register("nombre", { required: true })} /><br />
            <label>Email</label><br />
            <input type="email" placeholder='email' {...register("correo", { required: true })} /><br />
            <label>Usuario</label><br />
            <input type="text" placeholder='usuario' {...register("usuario", { required: true })} /><br />
            <label>Contraseña</label><br />
            <input type="password" placeholder='Password' {...register("clave", { required: true })} /><br />
            <button type="submit">Registrarse</button><br />
        </form>
        <Link to="/login">Iniciar sesion</Link><br />
                <Link to="/">Pagina principal</Link>
        
        

    </section>
  )
}

export default Register