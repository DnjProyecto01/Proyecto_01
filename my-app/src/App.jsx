import './App.css';
import Calculadora from './Calculadora/Calculadora';
import ContadorClicks from './ContadorClicks/ContadorClicks';
import Alumnos from './Alumnos/Alumnos';

function App() {
  
    return (
      <div className="App">
        <header className="App-header">
            <Calculadora/>
            {/* <ContadorClicks/> */}
            {/* <Alumnos/> */}
        </header>
  
      </div>
    );
  }
  
export default App;