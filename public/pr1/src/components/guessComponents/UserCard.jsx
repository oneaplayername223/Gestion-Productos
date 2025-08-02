import {useState, useEffect} from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
function UserCard({ id }) {

const [data, setData] = useState([])

useEffect (() => {
    fetch (`http://localhost:5000/preview/${id}`, 
        {method: 'GET', credentials: 'include'}).then(res => res.json()).then(data => setData(data))
}, [id])



  return (
    <>
    <section className='ProfileCard'>

        {data.map ((i) => (
            <div key={i.id} className='productoContainer'>
                      <label className='labels'><b>Usuario:</b></label>
                <p>{i.correo}</p>
                <p>{i.usuario}</p>
                <Link to={`/perfil/${i.id}`}><button className='botonPerfil'>Ver Perfil</button></Link>              
            </div>
        ))}
    </section>
    </>
  )
}

export default UserCard