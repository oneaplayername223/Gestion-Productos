"use client"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import "./login.css" // This import will now correctly point to the new CSS file

function Login() {
  const Navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const respuesta = await res.json()
      if (respuesta.autenticado) {
        Navigate("/index")
      } else {
        alert("Usuario o contraseña incorrectos")
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      alert("Ocurrió un error al conectarse al servidor")
      console.log(error)
    }
  }
  const { register, handleSubmit } = useForm()
  return (
    <section className="login-container">
      <h1 className="login-title">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <label className="form-label">Usuario</label>
        <input type="text" placeholder="Email" className="form-input" {...register("usuario", { required: true })} />
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          {...register("clave", { required: true })}
        />
        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
      <div className="login-links">
        <Link to="/register" className="register-link-button">
          Registrarse
        </Link>
        <Link to="/" className="home-link-button">
          Página principal
        </Link>
      </div>
    </section>
  )
}

export default Login
