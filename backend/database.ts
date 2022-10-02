import mongoose from 'mongoose'
 
(async () => {
    try {
        //Conexion a BASE DE DATOS - await: esperar
        const db = await mongoose.connect("mongodb+srv://timmy:Proyecto01.@cluster0.rokkxt5.mongodb.net/test", { autoIndex: false });
        
        console.log('La bd se conectada a:', db.connection.name)
    } catch (error) {
        console.error(error)
    }
})()
