import { RequestHandler } from "express";
import Alumno from "./Alumno";
var mongoose = require('mongoose');

export const guardarAlumno: RequestHandler = async (req, res) => {

    //nombreAlumno = "Daniel Díaz"
    const {nombreAlumno} = req.body
    console.log("🚀 ~ file: alumno.controller.ts ~ line 22 ~ constguardarAlumno:RequestHandler= ~ nombreAlumno", nombreAlumno)

    //CREAR EL NUEVO ALUMNO
    const newAlumno = {
        nombreAlumno
    }

    console.log("🚀 ~ file: alumno.controller.ts ~ line 25 ~ constguardarAlumno:RequestHandler= ~ newAlumno", newAlumno)

    //CONVERTIR EL OBJETO EN UN DOCUMENTO NUEVO
    const alumno = new Alumno(newAlumno);

    //GUARDAMOS EL NUEVO HISTORIAL EN LA BD "save()"
    await alumno.save()

    return res.json({
        alumno
    });
}