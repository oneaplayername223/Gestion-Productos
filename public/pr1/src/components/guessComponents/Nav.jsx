import React from 'react'
import { Link } from 'react-router-dom'
function Nav() {
  return (
    <div>
<section className='nav'>
        <Link to='/'>Inicio</Link>
        <Link to='/login'>Acceder</Link>
    </section>

    </div>
  )
}

export default Nav