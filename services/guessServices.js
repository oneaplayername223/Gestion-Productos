import { reject } from "bcrypt/promises.js";
import database from "./database.js";

export const getService = async () => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT id, nombre, descripcion, precio, imagen FROM productos ";
        database.query(query, (req, res) =>{
            if (res.length > 0) {
                resolve(res);
                } else { resolve([]); }

        })
            
        } catch (error) {
            res.status (500).json({ message: "Error al obtener los productos" });
            
        }

                
        
    })
}

export const getProductService = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT * FROM productos WHERE id = ?";
            database.query(query, [id], (req, res) => {
                if (res.length > 0) {
                    resolve(res);
                } else { resolve([]); }
            })
            
        } catch (error) {
            res.status (500).json({ message: "Error al obtener el producto" });
            
        }
    })
}

export const getPreviewService = async (id) =>{
    return new Promise((resolve, reject) =>{
        const query = 'SELECT id_cuenta FROM productos WHERE id = ?';
        database.query(query, [id], (req, res) => {
            if (res.length > 0) {

                try {
                    const query2 = 'SELECT usuario, correo, nombre FROM usuarios WHERE id = ?';
                    database.query(query2, [res[0].id_cuenta], (req, res) => {
                        if (res.length > 0) {
                            resolve(res);
                        } else { resolve([]); }
                    })
                    
                } catch (error) {
                    res.status (500).json({ message: "Error al obtener el usuario" });
                    
                }
            } else { resolve([]); }
        })

    
    })
}

export const getProfileService = (id) =>{
try {
    return new Promise((resolve, reject) =>{
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        database.query(query, [id], (req, res) =>{
            if (res.length == 0){ return resolve(['hola'])}
            else{ return resolve(res)}

        })
    })
    
} catch (error) {
    return console.log(error)
    
}

}