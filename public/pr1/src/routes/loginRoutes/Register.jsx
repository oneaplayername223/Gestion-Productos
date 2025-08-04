"use client"

import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import "./register.css" // This import will now correctly point to the new CSS file

function Register() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(() => alert("Usuario Creado Exitosamente"))
      .then(() => navigate("/login"))
  }

  return (
    <section className="register-container">
      <h1 className="register-title">Registrarse</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <label className="form-label">Nombre</label>
        <input type="text" placeholder="Nombre" className="form-input" {...register("nombre", { required: true })} />

        <label className="form-label">Email</label>
        <input type="email" placeholder="Correo" className="form-input" {...register("correo", { required: true })} />

        <label className="form-label">Usuario</label>
        <input type="text" placeholder="usuario" className="form-input" {...register("usuario", { required: true })} />

        <label className="form-label">Contraseña</label>
        <input type="password" placeholder="clave" className="form-input" {...register("clave", { required: true })} />

        <button type="submit" className="register-button">
          Registrarse
        </button>
      </form>
      <div className="register-links">
        <Link to="/login" className="login-link-button">
          Iniciar Sesión
        </Link>
        <Link to="/" className="home-link-button">
          Página principal
        </Link>
      </div>
    </section>
  )
}

export default Register
