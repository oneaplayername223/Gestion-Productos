import { Router } from "express";
import { getController } from "../controllers/guessControllers.js";


const guessRoutes = Router()


guessRoutes.get('/', getController)


export default guessRoutes