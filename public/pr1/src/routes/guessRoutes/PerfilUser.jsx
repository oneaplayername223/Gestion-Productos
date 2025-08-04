import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../../components/guessComponents/Nav'
function PerfilUser() {

const [data, setData] = useState([])

const {id} = useParams()

useEffect(() =>{
  fetch(`http://localhost:5000/perfil/${id}`, {
    method: 'GET',
   headers: {'Content-Type': 'application/json'},
  }).then(res => res.json()).then(data => setData(data))
  console.log(data)
}, [])

  return (
    <div className="perfilUser">
<Nav />
{data.map((i) => 
<div>
  <section className='personal'>
<label>Nombre:</label>
<p>{i.nombre}</p>
<label>email:</label>
<p>{i.correo}</p>
</section>
<section className='usuario'>
<label>Usuario:</label>
<p>{i.usuario}</p>

<p>{i.correo}</p>

</section>

</div>

)}

    </div>
  )
}

export default PerfilUser