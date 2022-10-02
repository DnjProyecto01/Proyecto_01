import { RequestHandler } from "express";
import Historial from "./Historial";

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