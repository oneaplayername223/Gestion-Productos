"use client"

import { useEffect, useState } from "react"
import "./Card.css" // This import will now correctly point to the new CSS file
import { useForm } from "react-hook-form"

function Card({ productos }) {
  const [data, setData] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [refresh, setRefresh] = useState(false)
  const [edit, setEdit] = useState(false)
  const { register, handleSubmit, setValue } = useForm()

  const handleDelete = (id) => {
    console.log(id)
    const confirmar = window.confirm("¿Seguro que quieres eliminar?")
    if (!confirmar) {
      return
    }
    fetch(`http://localhost:5000/eliminar/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRefresh((prev) => !prev)
      })
  }

  const handleEdit = (i) => {
    setEdit(true)
    setValue("id", i.id)
    setValue("nombre", i.nombre)
    setValue("descripcion", i.descripcion)
    setValue("cantidad", i.cantidad)
    setValue("precio", i.precio)
  }

  const handleEditSubmit = (data) => {
    const confirmacion = window.confirm("¿Seguro que quieres editar?")
    if (!confirmacion) {
      return
    }
    fetch(`http://localhost:5000/editar/${data.id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefresh((prev) => !prev)
        setEdit(false)
      })
  }

  useEffect(() => {
    fetch("http://localhost:5000/index", { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [refresh])

  useEffect(() => {
    fetch("http://localhost:5000/index", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log(data)
      })
  }, [])

  const resultado = data.filter((i) => i.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  const resultadoStock = data.filter((item) => item.cantidad < 5 || item.cantidad === 0)

  return (
    <section className="card-container">
      <section className="search-section">
        <input
          type="text"
          placeholder="Busca lo que quieras"
          className="search-bar"
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </section>
      <h2 className="section-title">{productos}</h2>
      <div className="product-grid">
        {resultado.map((i) => (
          <div key={i.id} className="product-card">
            <img
              className="product-image"
              src={`http://localhost:5000/imagen/${encodeURIComponent(i.imagen)}`}
              alt={`Imagen de ${i.nombre}`}
              width={200}
            />
            <br />
            <p className="product-name">{i.nombre}</p>
            <label className="product-description">
              <b>Descripción: </b>
              {i.descripcion}
            </label>
            <br />
            <label className="product-quantity">
              <b>Cantidad: </b>
              {i.cantidad}
            </label>
            <p className="product-price">${i.precio}</p>
            <div className="product-actions">
              <button className="edit-button" onClick={() => handleEdit(i)}>
                Editar
              </button>
              <button className="delete-button" onClick={() => handleDelete(i.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {edit && (
        <>
          <div className="edit-modal-overlay">
            <form onSubmit={handleSubmit(handleEditSubmit)} className="edit-form">
              <h3>Editar Producto</h3>
              <label>Nombre</label>
              <br />
              <input type="text" placeholder="nombre" {...register("nombre", { required: true })} />
              <br />
              <label>Descripción</label>
              <br />
              <input type="text" placeholder="descripcion" {...register("descripcion", { required: true })} />
              <br />
              <label>Cantidad</label>
              <br />
              <input type="number" placeholder="cantidad" {...register("cantidad", { required: true })} />
              <br />
              <label>Precio</label>
              <br />
              <input type="number" placeholder="precio" {...register("precio", { required: true })} />
              <br />
              <button type="submit" className="submit-button">
                Guardar Cambios
              </button>
              <br />
              <button type="button" className="cancel-button" onClick={() => setEdit(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </>
      )}

      <h2 className="section-title">Productos con poco stock</h2>
      <div className="product-grid">
        {data &&
          resultadoStock.map((i) => (
            <div key={i.id} className="product-card">
              <img
                src={`http://localhost:5000/imagen/${encodeURIComponent(i.imagen)}`}
                alt={`Imagen de ${i.nombre}`}
                width={200}
                onError={(e) => (e.target.style.display = "none")} // oculta si falla
                className="product-image"
              />
              <h3 className="product-name">Nombre: {i.nombre}</h3>
              <p className="product-description">Descripción: {i.descripcion}</p>
              <p className="product-quantity">Cantidad: {i.cantidad}</p>
              <div className="product-actions">
                <button className="edit-button" onClick={() => handleEdit(i)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDelete(i.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Card
