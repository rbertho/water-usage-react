import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';
import {useState} from 'react';

import FormRenter from './components/FormRenter';
import Daily from './pages/Daily';
import About from './pages/About';
import Monthly from './pages/Monthly';

import TotalConsumption from './pages/TotalConsumption';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography  component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function isLogged(){
    return Cookies.get('id_device') != null;
  }

  if (!isLogged()) {
    logout();
  }

  function logout(){
    console.log('Logout')
    Cookies.remove('access_token')
    Cookies.remove('id_device')
    window.location.reload()
  }

  return (
    <div className="app">
        <div id='renter-details'>
          <FormRenter />
        </div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example"  textColor="secondary"
            indicatorColor="secondary">
              <Tab label="Diário" {...a11yProps(0)} />
              <Tab label="Mensal" {...a11yProps(1)} />
            if(false){
              <Tab label="Geral" {...a11yProps(2)} />
            }
            
              <Tab label="About" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
              <div id='Daily'>
                <Daily />
              </div>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
             <div id='Monthly'>
                <Monthly />
              </div>
          </CustomTabPanel>

              <CustomTabPanel value={tabValue} index={2}>
                  <div id='TotalConsumption'>
                    <TotalConsumption />
                  </div>
              </CustomTabPanel>
          
          <CustomTabPanel value={tabValue} index={3}>
              <div id='About'>
                <About />
              </div>
          </CustomTabPanel>
        </Box>
    </div>
  );
}

export default App;