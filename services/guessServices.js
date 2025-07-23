import database from "./database.js";

export const getService = async () => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT nombre, descripcion, cantidad, imagen FROM productos ";
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