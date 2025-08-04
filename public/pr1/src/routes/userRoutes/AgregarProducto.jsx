"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Nav from "../../components/userComponents/Nav" // Assuming Nav has its own styling
import { useVerifySession } from "../../components/userComponents/Verify" // Assuming Verify has its own logic
import "./agregar-producto.css" // New CSS file for AgregarProducto component

function AgregarProducto() {
  useVerifySession()
  const { register, handleSubmit, reset } = useForm()
  const [refresh, setRefresh] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  const onSubmit = async (formDataFromHook) => {
    const formData = new FormData()
    formData.append("nombre", formDataFromHook.nombre)
    formData.append("descripcion", formDataFromHook.descripcion)
    formData.append("cantidad", formDataFromHook.cantidad)
    formData.append("precio", formDataFromHook.precio)
    formData.append("imagen", formDataFromHook.imagen[0])

    try {
      const res = await fetch("http://localhost:5000/agregar", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
      const data = await res.json()
      console.log("Producto agregado:", data)
      setRefresh(true)
      setTimeout(() => setRefresh(false), 3000) // Hide message after 3 seconds
      reset() // Reset form fields
      setPreview(null) // Clear image preview
    } catch (err) {
      console.error("Error al agregar producto", err)
      alert("Ocurrió un error al agregar el producto.")
    }
  }

  return (
    <div className="add-product-container">
      <Nav />
      <section className="product-form-section">
        <h1 className="section-title">Agregar Nuevo Producto</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="add-product-form">
          <label className="form-label">Nombre</label>
          <input type="text" placeholder="nombre" className="form-input" {...register("nombre", { required: true })} />

          <label className="form-label">Descripción</label>
          <input
            type="text"
            placeholder="descripcion"
            className="form-input"
            {...register("descripcion", { required: true })}
          />

          <label className="form-label">Cantidad</label>
          <input
            type="number"
            placeholder="cantidad"
            className="form-input"
            {...register("cantidad", { required: true, min: 0 })}
          />

          <label className="form-label">Precio</label>
          <input
            type="number"
            placeholder="precio"
            className="form-input"
            {...register("precio", { required: true, min: 0 })}
          />

          <label className="form-label">Imagen</label>
          <input
            type="file"
            className="form-input-file"
            {...register("imagen", { required: true })}
            onChange={handleImageChange}
          />
          {preview && (
            <img src={preview || "/placeholder.svg"} alt="Previsualización de imagen" className="image-preview" />
          )}

          <button type="submit" className="submit-button">
            Agregar Producto
          </button>
        </form>
      </section>

      {refresh && <h1 className="success-message">¡Producto Agregado Exitosamente!</h1>}
    </div>
  )
}

export default AgregarProducto
