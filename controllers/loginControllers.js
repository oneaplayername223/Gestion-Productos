import { registerService, loginService } from "../services/loginServices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerController = async(req, res) =>{
    try {
        const {nombre, correo, usuario, clave} = req.body;
        const hash = bcrypt.hashSync(clave, 10)
        if (!nombre || !correo || !usuario || !clave){
            return res.status(400).console.log('faltan campos')
        }
        const data = await registerService(nombre, correo, usuario, hash)
        res.json(data)
        
    } catch (error) {
      return res.error(500 , error.message)
        
    }
}






export const loginController = async(req, res) =>{
    try {
    const {usuario, clave} = req.body;
 
    if(!usuario || !clave){
        return res.status(400).json({message: 'faltan campos'})
    }
    if (usuario == undefined || clave == undefined){
       return console.log('campos indefinidos')
    }

    const data = await loginService(usuario, clave)
    if (!data){
    return res.status(400).json({ autenticado: false, message: 'Usuario no Encontrado' });

    }

    const results = data[0]

if (!results){
    return res.status(400).json({ autenticado: false, message: 'Usuario no Encontrado' });

}

    const compare = bcrypt.compareSync(clave, results.clave)
    if (compare){
                const token = jwt.sign({id: results.id}, 'clave-secreta', {expiresIn: '1h'})
                const refresh = jwt.sign({id: results.id}, 'clave-secreta', {expiresIn: '1d'})

                const cookie = res.cookie('token', token, {httpOnly: true, maxAge: 3600000})
                const cookieRefresh = res.cookie('refresh', refresh, {httpOnly: true, maxAge: 86400000})
                res.status(200).json({ autenticado: true, message: 'logueado correctamente' });

    } else {
               return res.status(400).json({ autenticado: false, message: 'Credenciales incorrectas' });
        }
        
    } catch (error) {
return console.log(error)        
    }
    
};
