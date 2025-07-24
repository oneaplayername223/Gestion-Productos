import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../components/guessComponents/Nav'
import Card from '../../components/guessComponents/Card'
import Footer from '../../components/guessComponents/Footer'
function IndexUser() {

const [data, setData] = useState([])

useEffect (() => {
    fetch ('http://localhost:5000/', 
        {method: 'GET', credentials: 'include'}).then(res => res.json()).then(data => setData(data))
        console.log(data)
    
}, [])


  return (
    <div className='index'>
       <Nav />

       
        <h1>Pagina Principal</h1>


<Card productos={'Productos Disponibles'}/>



<Footer />

    </div>
  )
}

export default IndexUser