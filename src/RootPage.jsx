import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import FormRenter from './components/FormRenter';
import Daily from './pages/Daily';
import About from './pages/About';

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

export default function RootPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="app">
        <div id='renter-details'>
          <FormRenter />
        </div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  textColor="secondary"
            indicatorColor="secondary">
              <Tab label="Diário" {...a11yProps(0)} />
              <Tab label="Mensal" {...a11yProps(1)} />
              <Tab label="Perfil" {...a11yProps(2)} />
              <Tab label="About" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
              <div id='App'>
                <Daily />
              </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Mensal
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Perfil
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
              <div id='About'>
                <About />
              </div>
          </CustomTabPanel>
        </Box>
    </div>
  );
}


/*

<div>
<nav>
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
  </div>
</nav>
<div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">home</div>
  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">profile</div>
  <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">contact</div>
</div>

</div>

<nav>
  <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="/" role="tab" aria-controls="nav-home" aria-selected="true">Diário</a>
    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="/about" role="tab" aria-controls="nav-profile" aria-selected="false">Mensal</a>
    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Perfil</a>
    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="/about" role="tab" aria-controls="nav-profile" aria-selected="false">About</a>
  </div>
</nav>
<div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
  home
  </div>
  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
  profile
  </div>
  <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
  perfil
  </div>
</div>


        <ul className="nav nav-tabs justify-content-center" id="navmenu">
            <li className="nav-item">
                <a className="nav-link active" href="/">Diário</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Mensal</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Perfil</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="./about">About</a>
            </li>
        </ul>

*/