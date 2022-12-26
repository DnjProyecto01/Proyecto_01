import '../App.css';
import {createTheme, makeStyles} from '@material-ui/core/styles'
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
import { ClassNames } from '@emotion/react';
import { green } from '@material-ui/core/colors';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


//Se pone su color, posicion, (right y left sirve para mover el texto de lado)
const useStyles = makeStyles((theme) => ({
  //se puede agregar titulos con variedad de colores pero debe
  //ponerse en diferentes <div>, se ajusta con el rigth y left
  titulo: {
    color: 'green',
    position: 'fixed',
    right: 0,
    left: 115,
    marginRight: 'auto',
    marginLeft: 'auto',
    minHeight: '200px',
    width: '100%',
    height: '95vh',
    maxWidth: '520px',
  },

  titulo2: {
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

  titulo3: {
    color: 'red',
    position: 'fixed',
    right: 90,
    left: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
    minHeight: '200px',
    width: '100%',
    height: '95vh',
    maxWidth: '520px',
  },

  button: {
    color: 'green',
    // position: '',
    right: 0,
    left: 0,
    // width: '100%',
    // height: '5vh',
    // maxWidth: '90px',
    // marginLeft: 'rem',
    // marginBottom: '12rem',
    // 'background-color': 'green'
    
  
  },
  caja: {
    width: '40%',
    // height: '5vh',
    // maxWidth: '90px',
     marginLeft: '200px',
    // marginBottom: '12rem',
    display:'flex'
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
    width: '100%',
    height: '100%'
  },
  box:{
    marginBottom: '4px',
    color: '#ffffff',
  }
}))

function FyV() {

  const classes = useStyles();
  const valorFrutasYVerdurasChange = (event, newValue) => {
    setFrutasyVerduras(newValue);
  };
  const topFrutasYVerduras = [
    { label: 'brocoli'},
    { label: 'banana'},
    { label: 'berenjena'},
    { label: 'naranja'}
  ]

  const [frutasYVerduras, setFrutasyVerduras] = useState(topFrutasYVerduras[0].label)
  console.log("🚀 ~ file: FyV.jsx ~ line 116 ~ FyV ~ frutasYVerduras", frutasYVerduras)

  return (
    <div className={classes.app}>
      <div className={classes.titulo}>
        Verduras
      </div>
      <div className={classes.titulo2}>
        y
      </div>
      <div className={classes.titulo3}>
        Frutas
      </div>
      <div className={classes.caja}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
              <Grid item xs={8} md={8}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={topFrutasYVerduras}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Frutas y Verduras" />}
                  onChange={valorFrutasYVerdurasChange}
                  value={frutasYVerduras}
                  />
                
              </Grid>
              <Grid item xs={4} md={4}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  disabled={(frutasYVerduras.label == '') ? true : false}
                
                  /*onClick={sePresionoGuardar} */>
                    GUARDAR
                </Button>
              </Grid>
            </Grid>
          </Box>
      </div>
    </div>
  )
}
    
export default FyV;
