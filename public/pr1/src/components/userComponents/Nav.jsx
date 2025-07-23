import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
function Nav() {
  return (
    <section className='nav'>
              <Link to='/index'>Inicio</Link>

        <Link to='/perfil'>Perfil</Link>
        <Link to='/venta'>Venta</Link>
        <Link to='/agregar'>Agregar Productos</Link>
         <Link to='/login'>Cerrar Sesion</Link>
    </section>
  )
}

export default Nav