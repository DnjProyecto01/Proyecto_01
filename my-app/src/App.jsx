import './App.css';
import {useState} from 'react';

//COMPONENTES
import Calculadora from './Calculadora/Calculadora';
import ContadorClicks from './ContadorClicks/ContadorClicks';
import Alumnos from './Alumnos/Alumnos';
import FyV from './Frutas-Y-Verduras/FyV';

import { makeStyles } from '@mui/styles';

//TAB
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

//ESTILOS
const useStyles = makeStyles((theme) => ({
  tabs: {
      'background': '#076F55',
  },
}));

function App() {
    const classes = useStyles();

    // TABS
    const [valueTab, setValueTab] = useState(0);
    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };
  
    return (
      <div className="App">
        <header className="App-header">
          <Box sx={{ width: '100%' }}>
            <AppBar position="static">
                <style>
                    {   
                        `
                            .MuiTabs-indicator {
                                background-color: #519A88;
                            }
                            .css-119x4c3-MuiButtonBase-root-MuiTab-root.Mui-selected {
                                opacity: 1;
                                background-color: #83B7AA;
                                color: #076F55;
                                font-weight: bold;
                            }
                            .css-119x4c3-MuiButtonBase-root-MuiTab-root {
                                font-size: 1rem !important
                            }
                        `
                    }
                </style>
                <Tabs
                    className={classes.tabs}
                    value={valueTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                <Tab label="CALCULADORA"{...a11yProps(0)} wrapped/>
                <Tab label="FRUTAS Y VERDURAS"{...a11yProps(1)} wrapped/>
                <Tab label="ALUMNOS" {...a11yProps(2)} wrapped/>
                <Tab label="CONTADOR DE CLICKS" {...a11yProps(3)} wrapped/>
                </Tabs>
            </AppBar>
            <TabPanel value={valueTab} index={0}>
              <div className="App-header">
                <Calculadora/>
              </div>
            </TabPanel>
            <TabPanel value={valueTab} index={1}>
              <div className="App-header">
                <FyV/>
              </div>
            </TabPanel>
            <TabPanel value={valueTab} index={2}>
              <div className="App-header">
                <Alumnos/>
              </div>
            </TabPanel>
            <TabPanel value={valueTab} index={3}>
              <div className="App-header">
                <ContadorClicks/> 
              </div>
            </TabPanel>
          </Box>
           
        </header>
  
      </div>
    );
  }
  
export default App;