import {useEffect, useState} from 'react'
import Nav from '../../components/userComponents/Nav'
import { useForm } from 'react-hook-form'
import {useVerifySession} from '../../components/userComponents/Verify';
import Card from '../../components/userComponents/Card';
import './Index.css'

function Index() {
useVerifySession()
  
//useStates
const [data, setData] = useState([])
const [refresh, setRefresh] = useState(false)
const [edit, setEdit] = useState(false)
const [busqueda, setBusqueda] = useState('')

const { register, handleSubmit, setValue } = useForm();



//useEffects

useEffect (() =>{
    fetch('http://localhost:5000/index', 
        {method: 'GET', credentials: 'include'}).then(res => res.json()).then(data => setData(data))
}, [refresh])
    


//funciones
const handleDelete = (id) => {
    console.log(id)

    let confirmar = window.confirm('seguro que quieres eliminar?')
    if(!confirmar){
        return
    }
    fetch(`http://localhost:5000/eliminar/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    }).then(res => res.json())
    .then(data => {
      setRefresh(prev => !prev); 
    })

    

}

const handleEdit = (i) => {
    setEdit(true)
   

    setValue('id', i.id)
    setValue('nombre', i.nombre)
    setValue('descripcion', i.descripcion)
    setValue('cantidad', i.cantidad)
    setValue('precio', i.precio)

}

const handleEditSubmit = (data) => {

 const confirmacion = window.confirm('seguro que quieres editar?')
    if(!confirmacion){
        return
    }

    fetch(`http://localhost:5000/editar/${data.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(data => {
        setRefresh(prev => !prev); 
        setEdit(false)
    })
}




const resultadoStock = data.filter((item) => item.cantidad < 5 || item.cantidad === 0)
  return (

    <div className='index'>
<Nav />




<section className='productos'>
 <Card productos={'Productos Disponibles'} />
</section>


    </div>



  )
}

export default Index