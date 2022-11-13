import '../App.css';
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import Box from '@mui/material/Box';
import Container from '@material-ui/core/Container'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';

//Traer TODOS LOS METODOS Y ATRIBUTOS como "historialService" desde "tal lugar"
import * as alumnoService from '../Servicios/AlumnoService.ts'
import * as historialService from '../Servicios/HistorialService.ts'

//ESTILOS
const useStyles = makeStyles((theme) => ({
    titulo: {
      color: "black",
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
      backgroundColor: '#ffffff',
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

//FUNCION PRINCIPAL
function Alumnos() {
    //CREANDO LAS CONSTANTES
    const classes = useStyles();
    const [nombreAlumno, setNombreAlumno ] = useState('')
    const [sePresionoIgual , setSePresionoIgual] = useState(false);

    //FUNCIONES

  const cambiarValorNombreAlumno = (event) => {
    setNombreAlumno(event.target.value);
  };

  const cargarAlumno = async () => {
    console.log("Nombre Alumno: ", nombreAlumno)
    //nombre Alumno = "Daniel Diaz"
    //CREAS EL OBJETO QUE VAS A ENVIAR AL BACKEND
    const alumnoData = {
        'nombreAlumno': nombreAlumno
    }
    console.log("🚀 ~ file: Alumnos.jsx ~ line 76 ~ cargarAlumno ~ alumnoData", alumnoData)
    //ENVIARLO AL BACKEND
    const res = await alumnoService.guardarAlumno(alumnoData)
    console.log("🚀 ~ file: Alumnos.jsx ~ line 77 ~ cargarAlumno ~ res", res.data)
    //traerAlumnos()
  }    

  

  return (
    <div className={classes.app}>
        <div className={classes.titulo}>
          ALUMNOS
        </div>
            <Grid className={classes.grid} container spacing={2}>

                <Grid item xs={10} md={10}>
                        {/* nombreAlumno */}
                        <TextField 
                        color="secondary"
                        id="outlined-number"
                        label="Nombre Alumno"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}  
                        variant="outlined"
                        value = {nombreAlumno}
                        onChange = {cambiarValorNombreAlumno}
                        
                        />
                </Grid>
                    
                <Grid item xs={2} md={2}>
                        {/* BOTÓN IGUAL */}
                        <Button 
                        disabled={(nombreAlumno == '') ? true: false}
                        variant="contained" 
                        color="default" 
                        onClick = {cargarAlumno}
                        >
                        GUARDAR
                        </Button>
                </Grid>



            </Grid>
            

    </div>
  );
}

export default Alumnos;