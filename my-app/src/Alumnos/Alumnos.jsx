import '../App.css';
import {makeStyles, styled} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import { useEffect, useState} from 'react';
import Button from '@material-ui/core/Button'
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import './alumnos.css'

//Traer TODOS LOS METODOS Y ATRIBUTOS como "historialService" desde "tal lugar"
import * as alumnoService from '../Servicios/AlumnoService.ts'

const columns = [
  { field: 'fechaCreacion', headerName: 'FECHA', type: 'date', width: 200 },
  { field: 'nombreAlumno', headerName: 'ALUMNO', type: 'string', width: 428 },
];

//ESTILOS
const useStyles = makeStyles((theme) => ({
    titulo: {
      color: "white",
      position: 'fixed',
      right: 0,
      left: 0,
      marginRight: 'auto',
      marginLeft: 'auto',
      minHeight: '200px',
      width: '100%',
      height: '95vh',
      maxWidth: '520px',
    },
    app: {
      backgroundColor: '#17171B',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      margin: '1rem'
    },
    container: {
      color: "black",
    },
    grid: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem'
    },
    button: {
      margin: '1rem'
    }
  }));

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: '#00ECFF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00ECFF',
      border: '3px solid', 
    },
  },
});

//FUNCION PRINCIPAL
function Alumnos() {
 

  //CREANDO LAS CONSTANTES
  const classes = useStyles();
  const [nombreAlumno, setNombreAlumno ] = useState('')
  const [lista, setLista] = useState([])
  const [selectionModel, setSelectionModel] = useState([]); //ARRAY DE LOS ALUMNOS SELECCIONADOS


  //FUNCIONES

  const cambiarValorNombreAlumno = (event) => {
    setNombreAlumno(event.target.value);
  };

  const cargarAlumno = async () => {
    //nombre Alumno = "Daniel Diaz"

    //CREAS EL OBJETO QUE VAS A ENVIAR AL BACKEND
    const alumnoData = {
        'nombreAlumno': nombreAlumno
    }

    //ENVIARLO AL BACKEND
    const res = await alumnoService.guardarAlumno(alumnoData)
    
    traerAlumno() // Cuando cargamos un alumno en  la BD, traemos los alumnos mas el nuevo alumno agregado de la BD   
  }

  const traerAlumno = async () => {
    const res = await alumnoService.obtenerAlumnos()
    const nuevoArray = res.data.alumnosObtenidos.map(
      (alumno) => {
        var nuevaFecha = new Date(alumno.createdAt);
        nuevaFecha.toLocaleDateString('en-GB'); // dd/mm/yyyy
        return { 
                 id : alumno._id, 
                 nombreAlumno: alumno.nombreAlumno, 
                 fechaCreacion: nuevaFecha, 
                 fechaModificacion: alumno.updatedAt
               }
      }
    )
    setLista(nuevoArray) 

  }

  // Cuando cargamos el componente "Alumnos" traemos los alumnos
  useEffect( () => {
    //TODOS LAS FUNCIONES QUE QUIERES QUE SE EJECUTEN AL RENDERIZAR ALGUN COMPONENTE
    traerAlumno()

  }, []) //No ponemos nada, para que el useEffect ejecute las funciones solo cuando cargue el componente
  
  const borrarAlumnos = async () => {
    //LE ENVIAMOS AL BACKEND EL ARRAY DE LOS Alumnos SELECCIONADOS (selectionModel)
    const res = await alumnoService.borrarAlumnos(selectionModel)
    traerAlumno()
  }


  return (
    <div className={classes.app}>
        <div className={classes.titulo}>
          ALUMNOS
        </div>
          <Grid className={classes.grid} container spacing={2}>
            <Grid item xs={10} md={10}>
              {/* nombreAlumno */}
              <CssTextField
                color="primary"
                id="outlined-number"
                label="Nombre Alumno"
                type="text"
                InputLabelProps={{
                    shrink: true,
                }}  
                variant="outlined"
                value = {nombreAlumno} // LO QUE MUESTRA EN EL CAMPO DE TEXTO
                onChange = {cambiarValorNombreAlumno} // SE ACTIVA CADA VEZ QUE SE CAMBIA EL TEXTO
              />
            </Grid>
              <Grid item xs={2} md={2}>
                {/* BOTÓN IGUAL */}
                <Button 
                  disabled={(nombreAlumno === "") ? true: false}
                  variant="contained" 
                  color="default" 
                  onClick = {cargarAlumno} // SE ACTIVA CADA VEZ QUE SE HACE CLICK
                >
                  GUARDAR
                </Button>
              </Grid>
          </Grid>
          <div style={{ height: 400, width: '50vh' }}>
            <DataGrid
              rows={lista}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(alumnoSeleccionado) => {
                //CADA VEZ QUE SE SELECCIONA UN HISTORIAL SE SETEA EN LA VARIABLE SelectionModel
                setSelectionModel(alumnoSeleccionado);
              }}
              selectionModel={selectionModel}
            />
            <Button className={classes.button} variant="contained" color="default" onClick= {borrarAlumnos}>
              borrar
            </Button>          
          </div>
    </div>
  );
}

export default Alumnos;