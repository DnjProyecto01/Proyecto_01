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

//Traer TODOS LOS METODOS Y ATRIBUTOS como "historialService" desde "tal lugar"
import * as historialService from '../Servicios/HistorialService.ts'

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
  container: {
    color: "black",
     
  },  

  
  
}));

function Calculadora() {
  console.log("render")

  const classes = useStyles();

  //CREANDO LAS CONSTANTES
  const [numberA, setNumberA ] = useState('')
  const [numberB, setNumberB ] = useState('')
  const [resultado, setResultado ] = useState(0)
  const [operacion, setOperacion] = useState(''); //Este es nuestro "age"
  const [historial, setHistorial] = useState('');
  const [sePresionoIgual, setSePresionoIgual] = useState(false);

  const crearHistorial = async () => {
    //historial = "2+3=5"
    const historialData = {
      'operacionH': historial
    }
    const res = await historialService.guardarHistorial(historialData)
    console.log("🚀 ~ file: Calculadora.jsx ~ line 59 ~ crearHistorial ~ res", res.data)
    
  }
  
  useEffect(() => {

  }, []);

  


  if (sePresionoIgual){
    

    setSePresionoIgual(false) //CON ESTO AVITAMOS MUCHOS RENDERIZADOS
    if (operacion == 'suma'){
      //Una forma de GUARDAR CONSTANTES como TEXTO es colocando: `${constante}`
      setHistorial(`${numberA} + ${numberB} = ${resultado}`)
    }

    if (operacion == 'resta'){
      setHistorial(`${numberA} - ${numberB} = ${resultado}`)
    }

    if (operacion == 'multiplicacion'){
      setHistorial(`${numberA} * ${numberB} = ${resultado}`)
    }

    if (operacion == 'division'){
      setHistorial(`${numberA} / ${numberB} = ${resultado}`)
    }

    console.log("crear Historial")
    //historial = "2+3=5"
    crearHistorial()

  }

  //NUMERO A
  const handleNumberAChange = event => {
    setNumberA(event.target.value);
    console.log("El numero A es: " + numberA)
  };
  
  //NUMERO B
  const handleNumberBChange = event => {
    setNumberB(event.target.value);
    console.log("El numero B es: " + numberB) 
  }



  //CALCULAR RESULTADO
  const calcularResultado = () => {
    if (operacion == 'suma'){
      setResultado (parseInt(numberA) + parseInt(numberB))
    }

    if (operacion == 'resta'){
      setResultado (parseInt(numberA) - parseInt(numberB))
    }

    if (operacion == 'multiplicacion'){
      setResultado (parseInt(numberA) * parseInt(numberB))
    }

    if (operacion == 'division'){
      setResultado (parseInt(numberA) / parseInt(numberB))
    }
    setSePresionoIgual(true)//Se presionó el botón igual

  }

  //OPERACION ELEGIDA
  const handleChange = (event) => {
    setOperacion(event.target.value);
  };


  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.titulo}>
          CALCULADORA
        </div>
          <Grid container spacing={2}>
              <Grid item xs={5} md={4}>
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
                  onChange = {handleNumberAChange}
                  
                />
              </Grid>
              <Grid item xs={2} md={2}>
                {/* OPERACIONES */}
                  <Box >
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Operaciones</InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={operacion}
                          label="Operaciones"
                          onChange={handleChange}
                          >
                          <MenuItem value={"suma"}>+</MenuItem>
                          <MenuItem value={"resta"}>-</MenuItem>
                          <MenuItem value={"multiplicacion"}>x</MenuItem>
                          <MenuItem value={"division"}>/</MenuItem>
                          </Select>
                      </FormControl>
                  </Box>
              </Grid>
              <Grid item xs={5} md={4}>
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
                      onChange = {handleNumberBChange}
                    />  
              </Grid>
              <Grid item xs={6} md={2}>
                        {/* BOTÓN IGUAL */}
                <Button variant="contained" color="default" onClick = {calcularResultado}>
                  =
                </Button>
              </Grid>
              <Grid item xs={6} md={12}>
                        {/* RESULTADO */}
                <Container className={classes.container} maxWidth="xs">
                  {resultado}
                </Container>
              </Grid>
          </Grid>

      </header>

    </div>
  );
}

export default Calculadora;
