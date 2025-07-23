import mysql, { createConnection } from 'mysql';
import colors from "colors"

const database = createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react'
    });

database.connect((err) =>{
    if(err){
        console.log(err)
    } else{
        console.log('base de datos conectada exitosamente'. bgGreen)
    }
})    

export default database;