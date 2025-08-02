import { reject } from "bcrypt/promises.js"
import { getService, getProductService, getPreviewService, getProfileService } from "../services/guessServices.js"
import jwt from "jsonwebtoken"
import database from "../services/database.js"
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

export const getPreviewController = async (req, res) =>{
    try {
        const id = req.params.id
        const data = await getPreviewService(id)
        if (data.length === 0 || !data) {
            return console.log('no existe')
        }
        
        res.json(data)
        
    } catch (error) {
        res.status(500).json({ message: "Error al consultar Usuario", error: error })
        
    }
}

export const getProfileController = async(req, res) => {
        const id = req.params.id
try {
const data = await getProfileService(id)
if (data.length >= 1){
    return res.json(data)
}
else{
                res.status(500).json({ message: "Error al consultar Usuario", error: error })

}
    
} catch (error) {
            res.status(500).json({ message: "Error al consultar Usuario", error: error })

    
}

}