import { RequestHandler } from "express";
import Historial from "./Historial";
var mongoose = require('mongoose');

export const guardarHistorial: RequestHandler = async (req, res) => {

    /*
        RECIBIR Y CREAR EL OBJETO NUEVO
            1) RECIBIR
                a) req (request - solicitud) y res (response - respuesta)
                    req.body = {operacionH}
                    Guardamos el valor del atributo del Historial en la constante operacionH
            2) CREAR EL OBJETO NUEVO
                a) const newHistorial = Objeto con valor de operacionH como atributo
                b) Convertir el nuevo objeto en DOCUMENTO MONGO
                
        GUARDARLO EN LA BD
    */

    //operacionH = "2+3=5"
    const {operacionH} = req.body

    //CREAR EL NUEVO HISTORIAL
    const newHistorial = {
        operacionH
    }

    //CONVERTIR EL OBJETO EN UN DOCUMENTO NUEVO
    const historial = new Historial(newHistorial);

    //GUARDAMOS EL NUEVO HISTORIAL EN LA BD "save()"
    await historial.save()

    return res.json({
        historial
    });
}

export const obtenerHistoriales: RequestHandler = async (req, res) => {

    const historialesObtenidos = await Historial.find();

    return res.json({
        
        historialesObtenidos
        
    });
}

export const borrarHistoriales: RequestHandler = async (req, res) => {

    // Creamos una constante que almacena los historiales seleccionados
    const selectionModel = req.params.historialesSeleccionados
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
    const historialborrado = await Historial.remove({_id : { $in: selectionModelObjectId}});
        //$in toma cada uno de los ObjectIds y va a ir al mongo a buscar ese ObjectId en la columna o atributo "_id", y una vez
        // que lo encuentra se lo pasa al "remove()" para que elimine esa fila o documento, y así va hacer con todos los Objects Id que restan

    return res.json({
        selectionModelArray
    });
}