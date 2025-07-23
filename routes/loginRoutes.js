import { Router } from "express";
import { registerController, loginController } from "../controllers/loginControllers.js";
const loginRoutes = Router()

loginRoutes.post('/register', registerController)
loginRoutes.post('/login', loginController)



export default loginRoutes