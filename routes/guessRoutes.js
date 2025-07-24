import { Router } from "express";
import { getController, getProductController } from "../controllers/guessControllers.js";


const guessRoutes = Router()


guessRoutes.get('/', getController)
guessRoutes.get('/producto/:id', getProductController)


export default guessRoutes