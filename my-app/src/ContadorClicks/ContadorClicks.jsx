import '../App.css';
import { useState } from 'react';
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'

const usarEstilos = makeStyles((theme) => ({
  boton1: {
    backgroundColor: "green",
    color: "black",
    width: '900px',
    height: '700px',
  },
  boton2: {
    backgroundColor: "red",
    color: "black",
    width: '300px',
    height: '100px',
  },
})) 

function ContadorClicks() {
  console.log("render")
  //Variable = es aquello que puede cambiar su valor
  //Constante = es aquello que matiene su valor siempre igual

  //ESTILOS
  const claseEstilo = usarEstilos()
  

  //JAVASCRIPT -> FUNCIONALIDAD DE LOS COMPONENTES
  //const contador = 0
  const [contador , setContador] = useState(0)
  const [bandera , setBandera] = useState(false)
  console.log("Contador = " + contador)

  //CREAMOS LA FUNCIONALIDAD
  const alHacerClick = () => {
    setContador(contador + 1) //Cambia el valor del "contador"
  }
  const tiki =() => {
    setContador(contador - contador)
    setBandera(false)
    // clearTimeout();
  }

  //Contador es igual a 1   contador = 1
  //Contador es igual a 1?  contador == 1
  // if(contador == 1){
  //   setTimeout(() => {
  //     setBandera(true)
  //   }, 6000);
  //   clearTimeout();
  // }
  return (
   // HTML -> ES LO QUE SE VE EN LA PANTALLA
      
    <div className="App">
      <header className="App-header">
        <div style={{
            display: "flex",
            
            width: "500px",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
        }}>
          {/*
            TRABAJAMOS EL COMPONENTE "BUTTON"
            PERO! NUESTRO BOTON NECESITA "FUNCIONALIDAD"
          */}
          <Button className={claseEstilo.boton1} disabled = {bandera} variant="contained" onClick={alHacerClick}>
            Contador = {contador}
          </Button>
          <p></p>
          <Button className={claseEstilo.boton2} variant="contained" onClick={tiki}>
            Reinicio
          </Button>
        </div>
        
        
      </header>
    </div>
  );
}

export default ContadorClicks;
