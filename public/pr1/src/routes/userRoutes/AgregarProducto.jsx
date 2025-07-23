import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Nav from '../../components/userComponents/Nav';
import {useVerifySession} from '../../components/userComponents/Verify';
function AgregarProducto() {
    useVerifySession()

    
    const { register, handleSubmit, reset } = useForm();

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    
const [preview, setPreview] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setPreview(URL.createObjectURL(file));
  }
};


const onSubmit = async (formDataFromHook) => {
  const formData = new FormData();

  formData.append('nombre', formDataFromHook.nombre);
  formData.append('descripcion', formDataFromHook.descripcion);
  formData.append('cantidad', formDataFromHook.cantidad);
  formData.append('precio', formDataFromHook.precio);
  formData.append('imagen', formDataFromHook.imagen[0]); 

  try {
    const res = await fetch('http://localhost:5000/agregar', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const data = await res.json();
    setRefresh(true);
    setTimeout(() => setRefresh(false), 3000);
    //reset();
  } catch (err) {
    console.error('Error al agregar producto', err);
  }
};

    
  return (
    <div className='agregarProducto'>

<Nav />

<section className='formulario'>
    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
    
        <label>Nombre</label><br />
        <input type="text" placeholder='nombre' {...register("nombre", { required: true })} /><br />
        <label>descripcion</label><br />
        <input type="text" placeholder='descripcion' {...register("descripcion", { required: true })} /><br />
        <label>cantidad</label><br />
        <input type="number" placeholder='cantidad' {...register("cantidad", { required: true })} /><br />
        <label>precio</label><br />
        <input type="number" placeholder='precio' {...register("precio", { required: true })} /><br />
         <label>Imagen</label><br />
    <input
  type="file"
  {...register("imagen", { required: true })}
  onChange={handleImageChange}
/>
{preview && <img src={preview} alt="preview" width={200} />}<br />

        <button type="submit">Agregar</button><br />
    </form>
    
</section>
{refresh && <h1>Producto Agregado</h1> 
}

    </div>
  )
}

export default AgregarProducto