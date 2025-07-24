import { getService, getProductService } from "../services/guessServices.js"
import jwt from "jsonwebtoken"
export const getController = async (req, res) => {
   try {
     const data = await getService()
     res.json(data)
     
    
   } catch (error) {
    res.status(500).json({ message: "Ha habido un error" })
    console.log(error)
    
   }
}

export const getProductController = async(req, res) =>{
    try {
        const id = req.params.id
        const data = await getProductService(id)
        if (data.length === 0 || !data) {
            return res.status(404).json({ message: "Producto no encontrado" })
        }
        res.json(data)
        
    } catch (error) {
        res.status(500).json({ message: "Error al consultar producto", error: error })
        
    }
}