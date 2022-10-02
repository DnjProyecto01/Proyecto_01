import { Router } from "express";
import * as historialCtrl from "./historial.controller" 

//BIBLIOTECA que nos permite ejecutar metodos HTTP (post (CREAR), put, get, delete) en el Backend
const router = Router();

router.post('/historial', historialCtrl.guardarHistorial)

export default router