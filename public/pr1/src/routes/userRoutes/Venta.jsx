"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Nav from "../../components/userComponents/Nav"
import "./Venta.css"

function Venta() {
  // useStates
  const [data, setData] = useState([])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [item, setItem] = useState([])
  const [refresh, setRefresh] = useState(false)

  // useEffects
  useEffect(() => {
    fetch("http://localhost:5000/index", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setData(data))
  }, []) // Empty dependency array for initial product fetch

  useEffect(() => {
    fetch("http://localhost:5000/venta/ventas", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setItem(data))
  }, [refresh]) // Refetch sales when refresh state changes

  // funciones
  const onSubmit = (formData) => {
    fetch("http://localhost:5000/venta", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setRefresh(true) // Trigger refresh after successful sale
        reset() // Reset form fields
      })
      .catch((error) => {
        console.error("Error al realizar la venta:", error)
        alert("Ocurrió un error al procesar la venta.")
      })
  }

  return (
    <div className="sales-container">
      <Nav />
      <section className="sales-form-section">
        <h1 className="section-title">Registrar Venta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="sales-form">
          <label className="form-label">Nombre del Cliente</label>
          <input type="text" placeholder="nombre" className="form-input" {...register("nombre", { required: true })} />

          <label className="form-label">Cantidad a Vender</label>
          <input
            type="number"
            placeholder="cantidad"
            className="form-input"
            {...register("cantidad", { required: true, min: 1 })}
          />
          {errors.cantidad && <span className="error-message">La cantidad debe ser al menos 1.</span>}

          <label className="form-label">Producto</label>
          <select className="form-select" {...register("id_producto", { required: true })}>
            <option value="">Seleccione un producto</option>
            {data.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nombre} - Precio: ${product.precio} - Cantidad: {product.cantidad}
              </option>
            ))}
          </select>
          {errors.id_producto && <span className="error-message">El campo producto es requerido.</span>}

          <button type="submit" className="submit-button">
            Vender
          </button>
        </form>
      </section>

      <section className="sales-list-section">
        <h2 className="section-title">Ventas Realizadas</h2>
        <p className="section-description">Productos vendidos recientemente</p>
        <div className="sales-grid">
          {item.length > 0 ? (
            item.map((sale) => (
              <div key={sale.id} className="sale-item-card">
                <h4 className="sale-item-title">Nombre: {sale.nombre}</h4>
                <p className="sale-item-detail">Cantidad: {sale.cantidad}</p>
                <p className="sale-item-detail">Precio: ${sale.precio}</p>
              </div>
            ))
          ) : (
            <p className="no-sales-message">No hay ventas registradas aún.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Venta
