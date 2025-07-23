import { Router } from "express";
import { indexController, addController, deleteController, editController, profileController, sessionUpdateController, sellController, stockAddController, getSellController, verImagenController } from "../controllers/userControllers.js";
import { userVerify } from "../middlewares/userVerify.js";
import upload from '../middlewares/upload.js';

const userRoutes = Router()

userRoutes.get('/index',userVerify, indexController)
userRoutes.post('/agregar', upload.single('imagen'), userVerify, addController);
userRoutes.delete('/eliminar/:id', userVerify, deleteController)
userRoutes.put('/editar/:id', userVerify, editController)
userRoutes.get('/perfil', userVerify, profileController)
userRoutes.post('/venta', userVerify, sellController)
userRoutes.get('/venta/ventas', userVerify, getSellController)
userRoutes.post('/agregar/stock', userVerify, stockAddController)
userRoutes.get('/imagen/:id', userVerify, verImagenController)
userRoutes.get('/refresh', userVerify, sessionUpdateController)

userRoutes.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.clearCookie('refresh', { path: '/' }); // si estás usando refresh también
  return res.status(200).json({ message: 'Sesión cerrada exitosamente' });
});



export default userRoutes