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
import * as historialService from '../Servicios/HistorialService.ts'

const columns = [
  { field: 'fechaCreacion', headerName: 'FECHA', type: 'date', width: 200 },
  { field: 'operacionH', headerName: 'OPERACIONES', width: 428 },
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

//FUNCION PRINCIPAL
function Calculadora() {
  
  //CREANDO LAS CONSTANTES
  const classes = useStyles();
  const [lista, setLista] = useState([])
  const [numberA, setNumberA ] = useState('')
  const [numberB, setNumberB ] = useState('')
  const [resultado, setResultado ] = useState(0)
  const [operacion, setOperacion] = useState('suma'); //Este es nuestro "age"
  const [historial, setHistorial] = useState('');
  const [sePresionoIgual, setSePresionoIgual] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]); //ARRAY DE LOS HISTORIALES SELECCIONADOS

  //Funciones

  const crearHistorial = async () => {
    //historial = "2+3=5"
    const historialData = {
      'operacionH': historial
    }
    console.log("GUARDAMOS HISTORIAL")
    console.log("HISTORIAL GUARDADO: ", historial)
    const res = await historialService.guardarHistorial(historialData)
    console.log("🚀 ~ file: Calculadora.jsx ~ line 59 ~ crearHistorial ~ res", res.data)
    traerHistorial()
    
  }

  useEffect(() => {
    //GUARDAR EL HISTORIAL EN LA BD
    if (historial !== "")
    {
      crearHistorial()
    }

  }, [historial]);

  const traerHistorial = async () => {
    const res = await historialService.obtenerHistoriales()
    //console.log("🚀 ~ file: Calculadora.jsx ~ line 83 ~ traerHistorial ~ historialesObtenidos", res.data.historialesObtenidos)
    const nuevoArray = res.data.historialesObtenidos.map(
          (cajita) => {
            var nuevaFecha = new Date(cajita.createdAt);
            nuevaFecha.toLocaleDateString('en-GB'); // dd/mm/yyyy
            return { 
                     id : cajita._id, 
                     operacionH: cajita.operacionH, 
                     fechaCreacion: nuevaFecha, 
                     fechaModificacion: cajita.updatedAt
                   }
          }
    )
    console.log("🚀 ~ file: Calculadora.jsx ~ line 96 ~ traerHistorial ~ nuevoArray", nuevoArray)
    setLista(nuevoArray)
  }

  useEffect(() => {
    traerHistorial()
  }, []);

  //CREAMOS EL HISTORIAL
  if (sePresionoIgual){
    setSePresionoIgual(false) //CON ESTO AVITAMOS MUCHOS RENDERIZADOS
    if (operacion === 'suma'){
      //Una forma de GUARDAR CONSTANTES como TEXTO es colocando: `${constante}`
      setHistorial(`${numberA} + ${numberB} = ${resultado}`)
    }

    if (operacion === 'resta'){
      setHistorial(`${numberA} - ${numberB} = ${resultado}`)
    }

    if (operacion === 'multiplicacion'){
      setHistorial(`${numberA} * ${numberB} = ${resultado}`)
    }

    if (operacion === 'division'){
      setHistorial(`${numberA} / ${numberB} = ${resultado}`)
    }

  }
    

  //NUMERO A
  const cambiarValorNumberA = event => {
    setNumberA(event.target.value);
  };
  
  //NUMERO B
  const cambiarValorNumberB = event => {
    setNumberB(event.target.value);
  }

  //CALCULAR RESULTADO
  const calcularResultado = () => {
    if (operacion === 'suma'){
      setResultado (parseInt(numberA) + parseInt(numberB))
    }

    if (operacion === 'resta'){
      setResultado (parseInt(numberA) - parseInt(numberB))
    }

    if (operacion === 'multiplicacion'){
      setResultado (parseInt(numberA) * parseInt(numberB))
    }

    if (operacion === 'division'){
      setResultado (parseInt(numberA) / parseInt(numberB))
    }
    setSePresionoIgual(true)//Se presionó el botón igual
  }

  const borrarHistoriales = async () => {
    //LE ENVIAMOS AL BACKEND EL ARRAY DE LOS HISTORIALES SELECCIONADOS (selectionModel)
    const res = await historialService.borrarHistorial(selectionModel)
    console.log("🚀 ~ file: Calculadora.jsx ~ line 160 ~ borrarHistoriales ~ res", res.data)
    traerHistorial()
  }

  //OPERACION ELEGIDA
  const cambiarOperacion = (event) => {
    setOperacion(event.target.value);
  };

  return (
    <div className={classes.app}>
        <div className={classes.titulo}>
          CALCULADORA
        </div>
          <Grid className={classes.grid} container spacing={2}>
             <Grid item xs={4.5} md={4}>
                {/* NUMERO A */}
                <TextField 
                  color="secondary"
                  id="outlined-number"
                  label="Numero A"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}  
                  variant="outlined"
                  value = {numberA}
                  onChange = {cambiarValorNumberA}
                  
                />
               </Grid>
              <Grid item xs={3} md={2}>
                {/* OPERACIONES */}
                  <Box >
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Operaciones</InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={operacion}
                          label="Operaciones"
                          onChange={cambiarOperacion}
                          >
                          <MenuItem value={"suma"}>+</MenuItem>
                          <MenuItem value={"resta"}>-</MenuItem>
                          <MenuItem value={"multiplicacion"}>x</MenuItem>
                          <MenuItem value={"division"}>/</MenuItem>
                          </Select>
                      </FormControl>
                  </Box>
              </Grid>
              <Grid item xs={4.5} md={4}>
                        {/* NUMERO B */}
                    <TextField 
                      color="secondary"
                      id="outlined-number"
                      label="Numero B"
                      type="number" 
                      InputLabelProps={{
                        shrink: true,
                      }}  
                      variant="outlined"
                      value = {numberB}
                      onChange = {cambiarValorNumberB}
                    />  
              </Grid>
              <Grid item xs={6} md={2}>
                {/* BOTÓN IGUAL */}
                <Button 
                  disabled={(numberA === '' || numberB === '') ? true: false}
                  variant="contained" 
                  color="default" 
                  onClick = {calcularResultado}
                  >
                  =
                </Button>
              </Grid>
              <Grid item xs={6} md={12}>
                {/* RESULTADO */}
                <Box sx={{ border: 1, borderRadius: 1, borderColor: 'text.disabled', marginBottom: 1}}>
                  <Container className={classes.container} maxWidth="xs">
                    {resultado}
                  </Container>
                </Box>
              </Grid>
          </Grid>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={lista}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(historialSeleccionado) => {
                //CADA VEZ QUE SE SELECCIONA UN HISTORIAL SE SETEA EN LA VARIABLE SelectionModel
                setSelectionModel(historialSeleccionado);
              }}
              selectionModel={selectionModel}
            />
            <Button className={classes.button} variant="contained" color="default" onClick= {borrarHistoriales}>
              borrar
            </Button>          
          </div>
    </div>
  );
}

export default Calculadora;
