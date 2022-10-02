import {Schema, model, Document} from 'mongoose'

//CREAMOS EL ESQUEMA
const historialSchema = new Schema({
    //ATRIBUTOS
    operacionH:{
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

interface IHistorial extends Document {
    operacionH: string;
}

export default model<IHistorial>('Historiales', historialSchema);