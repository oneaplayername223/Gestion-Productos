import React from 'react'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
function Login() {

    const Navigate = useNavigate();
    
const onSubmit = async (data) => {
  try {
    const res = await fetch('http://localhost:5000/login', {
        credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const respuesta = await res.json();

    if (respuesta.autenticado) {
      Navigate('/index');
    } else {
      alert('Usuario o contraseña incorrectos');
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Ocurrió un error al conectarse al servidor');
    console.log(error);
  }
};



    const { register, handleSubmit, } = useForm();
  return (
  
        <section className='login'>
        <h1>Iniciar sesion</h1><br />
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Usuario</label><br />
            <input type="text" placeholder='Email' {...register("usuario", { required: true })} /><br />
            <label>Contraseña</label><br />
            <input type="password" placeholder='Password' {...register("clave", { required: true })} /><br />
            <button type="submit">Iniciar sesion</button><br />
        </form>
        <Link to="/register">Registrarse</Link><br />
        <Link to="/">Pagina principal</Link>

        </section>
   
  )
}

export default Login