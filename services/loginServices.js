import database from "./database.js"

export const registerService = (nombre, correo, usuario, hash) => {
    try {
        return new Promise((resolve, reject) =>{
            const query = "INSERT INTO usuarios (nombre, correo, usuario, clave) VALUES (?, ?, ?, ?)";
            database.query(query, [nombre, correo, usuario, hash], (errors, results) =>{
                if(errors){resolve(errors)}
                else{
                    return resolve(results)
                }
            })
        })
        
    } catch (error) {
        return console.log(error)
        
    }
}

export const loginService = (usuario, clave) => {
    try {
        return new Promise((resolve, reject) =>{
            const query = "SELECT * FROM usuarios WHERE usuario = ?";
            database.query(query, [usuario], (errors, results) =>{
                if(errors){resolve(errors)}
                else{resolve(results)}
            })
        })
    } catch (error) {
        console.log(error)
    }
}