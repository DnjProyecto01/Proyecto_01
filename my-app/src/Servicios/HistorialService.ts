import axios from 'axios';
//BIBLIOTECA que nos permite ejecutar metodos HTTP (post (CREAR), put, get, delete) en el Frontend

export const guardarHistorial = async (historialData: {}) => {
    return await axios.post('http://localhost:3001/historial/', historialData)
}

export const obtenerHistoriales = async () => {
    return await axios.get('http://localhost:3001/historial/historiales')
}