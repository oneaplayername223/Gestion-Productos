import { Router } from "express";
import { getController, getProductController, getPreviewController, getProfileController } from "../controllers/guessControllers.js";


const guessRoutes = Router()


guessRoutes.get('/', getController)
guessRoutes.get('/producto/:id', getProductController)
guessRoutes.get('/preview/:id', getPreviewController)
guessRoutes.get('/perfil/:id', getProfileController)

export default guessRoutes