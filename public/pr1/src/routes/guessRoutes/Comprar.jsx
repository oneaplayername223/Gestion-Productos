"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import "./Comprar.css"

function Comprar() {
  const { id } = useParams()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm()
  const [data, setData] = useState([])
  const [buy, setbuy] = useState(false)

  const onSubmit = (formData) => {
    console.log(formData)
    alert("Producto Procesado Exitosamente")
    setbuy(true)
    reset()
  }

  useEffect(() => {
    fetch(`http://localhost:5000/producto/${id}`, {
      method: "GET",
      headers: { "content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [id]) // Added 'id' to dependency array to refetch when id changes

  return (
    <div className="purchase-container">
      <section className="product-details-section">
        <h3 className="section-title">Información del Producto</h3>
        {data.map((i) => (
          <div key={i.id} className="product-details-card">
            <img
              className="product-image-main"
              src={`http://localhost:5000/imagen/${encodeURIComponent(i.imagen)}`}
              alt={`Imagen de ${i.nombre}`}
            />
            <div className="product-info-text">
              <p>
                <b>Nombre: </b>
                {i.nombre}
              </p>
              <p>
                <b>Descripción: </b>
                {i.descripcion}
              </p>
              <p className="product-price">
                <b>Precio: </b>${i.precio}
              </p>
            </div>
          </div>
        ))}
      </section>

      {!buy && (
        <section className="payment-form-section">
          <form className="payment-form" onSubmit={handleSubmit(onSubmit)}>
            <section className="payment-method-section">
              <h2 className="form-subtitle">Seleccionar Método de Pago</h2>
              <select className="payment-method-select" {...register("tipo", { required: true })}>
                <option value="Visa">Visa</option>
                <option value="PayPal">PayPal</option>
                <option value="MasterCard">MasterCard</option>
              </select>
            </section>

            <label className="form-label">Nombre en la tarjeta:</label>
            <input
              type="text"
              placeholder="Ingresa el nombre"
              className="form-input"
              {...register("nombre", { required: true, minLength: 9, maxLength: 20 })}
            />
            {errors.nombre && <p className="error-message">Campo inválido (9-20 caracteres)</p>}

            <label className="form-label">Número de tarjeta:</label>
            <input
              type="number"
              placeholder="Ingresa el número de tarjeta"
              className="form-input"
              {...register("numero", { required: true })}
            />
            {errors.numero && <p className="error-message">Campo inválido</p>}

            <label className="form-label">CVV:</label>
            <input
              type="number"
              placeholder="Ingresa el CVV"
              className="form-input"
              {...register("cvv", { required: true, minLength: 3, maxLength: 3 })}
            />
            {errors.cvv && <p className="error-message">Campo inválido (3 dígitos)</p>}

            <button type="submit" className="process-purchase-button">
              Procesar Compra
            </button>
          </form>
        </section>
      )}

      {buy && (
        <div className="purchase-success-container">
          <h1 className="purchase-success-message">¡Producto comprado Exitosamente!</h1>
        </div>
      )}

      <Link to={`/productos/${id}`} className="back-link-button">
        Volver
      </Link>
    </div>
  )
}

export default Comprar
