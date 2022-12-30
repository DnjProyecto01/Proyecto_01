import { RequestHandler } from "express";
import Alumno from "./Alumno";
var mongoose = require('mongoose');

export const guardarAlumno: RequestHandler = async (req, res) => {

    //nombreAlumno = "Daniel Díaz"
    const {nombreAlumno} = req.body

    //CREAR EL NUEVO ALUMNO
    const newAlumno = {
        nombreAlumno
    }

    //CONVERTIR EL OBJETO EN UN DOCUMENTO NUEVO
    const alumno = new Alumno(newAlumno);

    //GUARDAMOS EL NUEVO HISTORIAL EN LA BD "save()"
    await alumno.save()

    return res.json({
        alumno
    });
}

export const obtenerAlumnos: RequestHandler = async (req, res) => {

    const alumnosObtenidos = await Alumno.find();
    console.log("🚀 ~ file: alumno.controller.ts ~ line 29 ~ constobtenerAlumnos:RequestHandler= ~ alumnosObtenidos", alumnosObtenidos)

    return res.json({
        
        alumnosObtenidos
        
    });
}

export const borrarAlumnos: RequestHandler = async (req, res) => {

    // Creamos una constante que almacena los historiales seleccionados
    const selectionModel = req.params.alumnosSeleccionados
        //CONSOLA: selectionModel: '6347162c17bb35f8089cdd2d,6347162d17bb35f8089cdd2f' ES UN STRING

    //Necesitamos que sea un ARRAY []
    const selectionModelArray = selectionModel.split(',')
        //CONSOLA: selectionModelArray: ['6347162917bb35f8089cdd2b', '6347162f17bb35f8089cdd31'] ES UN ARRAY DE STRINGS

    //Convertimos el Array de Strings en un Array de ObjectId
        //El map toma cada elemento del Array de Strings y lo convierte a ObjectId
    const selectionModelObjectId = selectionModelArray.map(
        (id: String) => {
            return mongoose.Types.ObjectId(id)
        }
    )
        //CONSOLA: selectionModelObjectId: [ObjectId('6347162917bb35f8089cdd2b'), ObjectId('6347162f17bb35f8089cdd31')] ES UN ARRAY DE OBJECT ID
    
    // El operador $in selecciona los documentos donde el valor de un atributo (_id) es igual a cualquier valor en el Array especificado.
    const alumnoborrado = await Alumno.remove({_id : { $in: selectionModelObjectId}});
        //$in toma cada uno de los ObjectIds y va a ir al mongo a buscar ese ObjectId en la columna o atributo "_id", y una vez
        // que lo encuentra se lo pasa al "remove()" para que elimine esa fila o documento, y así va hacer con todos los Objects Id que restan

    return res.json({
        selectionModelArray
    });
}