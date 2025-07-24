import { Router } from "express";
import { getController, getProductController, getPreviewController } from "../controllers/guessControllers.js";


const guessRoutes = Router()


guessRoutes.get('/', getController)
guessRoutes.get('/producto/:id/:usuario', getProductController)
guessRoutes.get('/preview/:id', getPreviewController)


export default guessRoutes