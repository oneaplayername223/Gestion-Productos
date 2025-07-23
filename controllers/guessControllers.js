import { getService } from "../services/guessServices.js"
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