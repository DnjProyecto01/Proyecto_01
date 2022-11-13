import {Schema, model, Document} from 'mongoose'

//CREAMOS EL ESQUEMA
const alumnoSchema = new Schema({
    //ATRIBUTOS
    nombreAlumno:{
        type: String,
        required: false
    }
    },
    //OPCIONALES o CONFIGURACION
    {
        versionKey: false,
        timestamps: true, //CREAR AUTOMATICAMENTE: 1) CUANDO FUE CREADO 2) CUANDO FUE MODIFICADO
        autoIndex: true, //CREANDO DE FORMA AUTOMATICA LOS IDENTIDIFICADORES
    }
)

interface IAlumno extends Document {
    nombreAlumno: string;
}

export default model<IAlumno>('Alumnos', alumnoSchema);