import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import responseTime from 'response-time'
import historialRutas from './rutas/historial.rutas'
import alumnoRutas from './rutas/alumno.rutas'
import config from './config'

//Creamos una clase "EXPRESS" con el nombre "app"
const app = express() 
//Colocar(atributo, valor del atributo)
app.set('puerto', config.PORT);


/*
CLASE app
--------------------
puerto: 3001
---------------------
set() - colocar
get() - obtener
use() - usar
listen() - escuchar
*/



/*
    HELMET: Ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas 
            mediante el establecimiento correcto de cabeceras HTTP.
    MORGAN: Es un logueador de request de HTTP, es decir, cada vez que haya un request a la aplicación
        nos va a mostrar en la consola información relacionada a dicho request
        FORMATO ELEGIDO: 'dev'
            :method :url :status :response-time ms - :res[content-length]
                :method
                    El método HTTP de la request (solicitud).
                :url
                    La URL de la request
                :status (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses)
                    El código de estado del response (respuesta)
                :response-time
                    El tiempo entre la solicitud que llega a morgan y cuando se escriben los encabezados de respuesta, en milisegundos.
                :res[content-length]
                    La cabecera dada de la respuesta
                    HTTP Content-Length se utiliza para indicar el tamaño del cuerpo de la entidad bytes
        EJEMPLO:
            POST /historial/ 200 60.573 ms - 160
    CORS: CONECTA EL FRONT CON EL BACK

*/
//middlewares - software intermedio
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(responseTime());

app.use(historialRutas)
app.use(alumnoRutas)

export default app;