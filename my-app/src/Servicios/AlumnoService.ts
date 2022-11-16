import axios from 'axios';
//BIBLIOTECA que nos permite ejecutar metodos HTTP (post (CREAR), put, get, delete) en el Frontend

export const guardarAlumno = async (alumnoData: {}) => {
    return await axios.post('http://localhost:3001/alumno/' , alumnoData)
}

export const obtenerAlumnos = async () => {
    return await axios.get('http://localhost:3001/alumno/alumnos')
}

// export const borrarAlumnos = async (alumnosSeleccionados: String[]) => {
//     return await axios.delete('http://localhost:3001/alumno/alumnosBorrados/' + alumnosSeleccionados)
// }