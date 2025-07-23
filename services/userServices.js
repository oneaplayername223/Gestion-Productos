import database from "./database.js"

export const indexService = (id_cuenta) => {
    try {
        return new Promise((resolve, reject) => {
            const query = `SELECT id, nombre, descripcion, cantidad, precio, imagen FROM productos WHERE id_cuenta = ${id_cuenta}`;
            database.query(query, (err, results) => {
                if (err) { reject(err) }
                else { resolve(results) }
            })
        })

        
        
    } catch (error) {
        console.log(error)
        
    }
}

export const addService = (nombre, descripcion, cantidad, precio, id_cuenta, imagen) => {
   
        return new Promise((resolve, reject) => {
const query = `
  INSERT INTO productos (nombre, descripcion, cantidad, precio, imagen, id_cuenta)
  VALUES (?, ?, ?, ?, ?, ?)
`;
           database.query(query, [descripcion,cantidad, precio, id_cuenta, imagen, nombre], (err, results) => {
                if (err) { reject(err) }
                else { resolve(results) }
            })
        })
        
    
}

export const deleteService = (id_cuenta, id) =>{
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM productos WHERE id = ? AND id_cuenta = ?';
          database.query(query, [id_cuenta,id], (err, results) => {
            if (err) { reject(err) }
           
            else { resolve(results) }
        })
    })

}

export const editService = (id, nombre, descripcion, cantidad, precio, id_cuenta) => {

    return new Promise((resolve, reject) => {
        const verify = `SELECT * FROM productos WHERE id = ? AND id_cuenta = ?`;
        database.query(verify, [id, id_cuenta], (err, results) => {
                    if (err) { reject(err), console.log(err) }
            
            else if (results.length > 0) {
                const query = `UPDATE productos SET nombre = ?, descripcion = ?, cantidad = ?, precio = ? WHERE id = ? AND id_cuenta = ?`;
                database.query(query, [nombre, descripcion, cantidad, precio, id, id_cuenta], (err , results) => {
                    if (err) { reject(err), console.log(err) }
                    else { resolve(results), console.log(results) }
                })
            } else {
                reject({ message: 'No existe el producto' })
            }
        })
    })
    

}

export const profileService = (id) =>{
    try {
        return new Promise((resolve, reject) =>{
            const query = `SELECT nombre, correo, usuario FROM usuarios WHERE id = ?`;
            database.query(query, [id], (err, results) => {
                if (err) { reject(err) }
                else { resolve(results) }
            })
        })
        
    } catch (error) {
        console.log(error)
        
    }
}

export const sellService = (nombre, id_producto, cantidad, resultado, id_cuenta, total, cantidadReal) => {
    try {
        return new Promise((resolve, reject) =>{
         if (nombre == null || id_producto == null || cantidad == null || id_cuenta == null) 
            { reject({ message: 'Faltan campos' }) }


    
            const restar = `UPDATE productos SET cantidad = cantidad - ? WHERE id = ? AND id_cuenta = ?`;
             database.query(restar, [cantidadReal, id_producto, id_cuenta], (err, results) => {  
                if (err) { reject(err) }
                


                else {
                    const query = `INSERT INTO ventas (nombre, cantidad, precio, id_producto, id_cuenta) VALUES (?, ?, ?, ?, ?)`;
                    database.query(query, [nombre, cantidadReal, total, id_producto, id_cuenta], (err, results) => {
                        if (err) { reject(err) }
                        else { resolve(results) }
                    })
                }
                
            })
        })
        
    } catch (error) {
       return console.log(error)
        
    }
    
}


export const sellServiceResult = (id_producto, id_cuenta) => {
    try {
        return new Promise((resolve, reject) => {
            const query = `SELECT precio FROM productos WHERE id = ? AND id_cuenta = ?`;
            database.query(query, [id_producto, id_cuenta], (err, results) => {
                if (err) { reject(err) }
                else { resolve(results) }
            })
        })
        
    } catch (error) {
        return console.log(error)
        
    }
}

export const getSellService = (id_cuenta) => {
    try {
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM ventas WHERE id_cuenta = ?`;
            database.query(query, [id_cuenta], (err, results) => {
                if (err) { reject(err) }
                else { resolve(results) }
            })
        })
        
    } catch (error) {
        return console.log(error)
        
    }
    
}

export const stockAddService = (id_cuenta, cantidad, id_producto) => {
    try {
        return new Promise((resolve, reject) => {
            const query = `UPDATE productos SET cantidad = cantidad + ? WHERE id_cuenta = ? AND id = ?`;
            database.query(query, [cantidad, id_cuenta, id_producto], (err, results) => {
                if (err) { reject(err) }
                else { resolve(results) }
            })
        })
        
    } catch (error) {
        return console.log(error)
        
    }
}


export const verImagenService = (id) => {
    try {
        return new Promise((resolve, reject) => {
            const query = `SELECT imagen FROM productos WHERE id = ?`;
            database.query(query, [id], (err, results) => {
                if (err) { reject(err) }
                else { resolve(results) }
            })
        })
        
    } catch (error) {
        return console.log(error)
        
    }
}