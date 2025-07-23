import { indexService, addService, deleteService, editService, 
profileService, sellService, sellServiceResult, getSellService, stockAddService, verImagenService
} 
 from "../services/userServices.js"
import jwt from "jsonwebtoken"
import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


export const indexController = async (req, res) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, 'clave-secreta')
         const id_cuenta = decoded.id;
        const data = await indexService(id_cuenta)
        res.json(data)

        
    } catch (error) {
        res.status(500).json({ message: "Error buscando usuarios" })
        console.log(error)
        
    }
}

export const addController = async (req, res) => {
    try {


        
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'imagen')
            },
            filename: function (req, file, cb) {
                cb(null, file.nombre)
            }
        })

        const {nombre, descripcion, cantidad, precio} = req.body
        const imagen = req.file?.filename; // ✅ Asegura que solo pase el nombre del archivo
        const token = req.cookies.token
        if (!nombre || !descripcion || !cantidad || !precio || !imagen) {
            return res.status(400).json({ message: "Faltan campos" })
        }

        const decoded = jwt.verify(token, 'clave-secreta')
        const id_cuenta = decoded.id;
        const data = await addService(id_cuenta, nombre, descripcion, cantidad, precio, imagen)
                res.status(200).json({ message: "Producto Agregado Exitosamente" })

    } catch (error) {
        res.status(500).json({ message: "Error al agregar producto" })
        console.log(error)
    }
}


export const deleteController = async(req, res) =>{
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, 'clave-secreta')
        const id_cuenta = decoded.id;

        const id = req.params.id
        console.log(id)
        const data = await deleteService(id, id_cuenta)
        if (data.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" })
        }
return res.status(200).json({ eliminado: true });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error: error })
        console.log(error)
        
    }
}

export const editController = async (req, res) => {
    try {
        const token = req.cookies.token
        const id = req.params.id
        const {nombre, descripcion, cantidad, precio} = req.body
        const decoded = jwt.verify(token, 'clave-secreta')
        const id_cuenta = decoded.id;
        const data = await editService(id, nombre, descripcion, cantidad, precio, id_cuenta)
        
        
if (data){
    res.status(200).json({ message: "Producto Editado Exitosamente" })
}         else {
    return res.status(404).json({ message: "Producto no encontrado" })
    }

        
    } catch (error) {
        return res.status(401).json({ message: "Acceso denegado" })
        
    }
}


export const profileController = async(req, res) =>{
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, 'clave-secreta')
        const id = decoded.id;
        const data = await profileService(id)
        res.json(data)
        
    } catch (error) {
        res.status(500).json({ message: "Error al consultar perfil de usuario", error: error })
        
    }
}

export const sellController = async (req, res) => {
try {
    const token = req.cookies.token
    const {nombre, id_producto, cantidad} = req.body
    const cantidadReal = cantidad
    const decoded = jwt.verify(token, 'clave-secreta')
        const id_cuenta = Number(decoded.id);

    const resultado = await sellServiceResult(id_producto, id_cuenta)
const price = Number(resultado[0].precio);
const total = price * cantidadReal


    const data = await sellService(nombre, id_producto, cantidad, resultado, id_cuenta, total, cantidadReal)

    
    return res.status(200).json({ message: "Producto Vendido Exitosamente" })
    
} catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error al vender producto", error: error })
    
}

}


export const getSellController = async (req, res) =>{
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, 'clave-secreta')
        const id_cuenta = decoded.id;
        const data = await getSellService(id_cuenta)
        res.json(data)
        
    } catch (error) {
        res.status(500).json({ message: "Error al consultar ventas", error: error })
        
    }
}

export const stockAddController = async (req, res) => {
    try {
        const {cantidad, id_producto} = req.body
        const token = req.cookies.token
        const decoded = jwt.verify(token, 'clave-secreta')
        const id_cuenta = decoded.id;
        const data = await stockAddService(id_cuenta, cantidad, id_producto)
        return res.json(data)
        
    } catch (error) {
        res.status(500).json({ message: "Error al agregar stock", error: error })
        console.log(error)
        
    }
}


export const verImagenController = async (req, res) => {
    try {
        const id = req.params.id
        const data = await verImagenService(id)
        res.json(data)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al consultar imagen", error: error })
        
    }
}

export const sessionUpdateController = async (req, res) => {

    try {
        const id_cuenta = decoded.id;
        const token = req.cookies.token
        const refresh = req.cookies.refresh
        
       // const decoded = jwt.verify(token, 'clave-secreta')
        const newSesion = jwt.verify(refresh, 'clave-secreta')
        if (!newSesion) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        
        let myToken
        try {
            myToken = jwt.sign({ id: id_cuenta }, 'clave-secreta')
            
        } catch (error) {
            
        }
             const newAccessToken = jwt.sign({ id: newSesion.id }, 'clave-secreta', { expiresIn: '1h' });
             const newRefreshToken = jwt.sign({ id: newSesion.id }, 'clave-secreta', { expiresIn: '1d' });

             const cookie = res.cookie('token', myToken, { httpOnly: true, maxAge: 3600000 })
             const cookieRefresh = res.cookie('refresh', newRefreshToken, { httpOnly: true, maxAge: 86400000 })
             res.status(200).json({ autenticado: true, message: 'logueado correctamente' });
       
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al actualizar sesion", error: error })
        
    }
}