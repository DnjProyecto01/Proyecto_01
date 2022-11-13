import { Router } from "express";
import * as alumnoCtrl from "./alumno.controller" 

//BIBLIOTECA que nos permite ejecutar metodos HTTP (post (CREAR), put, get, delete) en el Backend
const router = Router();

router.post('/alumno', alumnoCtrl.guardarAlumno)

// router.get('/alumno/alumnos', alumnoCtrl.obtenerAlumnos )

// router.delete('/alumno/alumnosBorrados/:alumnosSeleccionados', alumnoCtrl.borrarAlumnos)

export default router