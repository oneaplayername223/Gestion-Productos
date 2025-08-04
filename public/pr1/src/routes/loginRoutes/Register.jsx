import {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
function Register() {
    const { register, handleSubmit, } = useForm();
const navigate = useNavigate()

    
    const onSubmit = (data) =>{
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(alert('Usuario Creado Exitosamente')).then(navigate('/login'))
    }
  return (
    <section className='register'>
        <h1>Registrarse</h1><br />
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nombre</label><br />
            <input type="text" placeholder='Nombre' {...register("nombre", { required: true })} /><br />
            <label>Email</label><br />
            <input type="email" placeholder='Correo' {...register("correo", { required: true })} /><br />
            <label>Usuario</label><br />
            <input type="text" placeholder='usuario' {...register("usuario", { required: true })} /><br />
            <label>Contraseña</label><br />
            <input type="password" placeholder='clave' {...register("clave", { required: true })} /><br />
            <button type="submit">Registrarse</button><br />
        </form>
        <Link to="/login">Iniciar sesion</Link><br />
                <Link to="/">Pagina principal</Link>
        
        

    </section>
  )
}

export default Register