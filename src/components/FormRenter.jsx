import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import '../App.css';

import LoadRentDetails from '../components/LoadRentDetails';
import Cookies from 'js-cookie';

const FormRenter = () => {
  const [idDevice, setIdDevice] = useState(Cookies.get('id_device'))
  if (idDevice == null) {
    logout();
  }

  function logout(){
    console.log('Logout')
    Cookies.remove('access_token')
    Cookies.remove('id_device')
    window.location.href = '/'
  }

  useEffect(() => {
    LoadRentDetails(idDevice);
  });

  return (
    <div className="renterdetails">
        <Box display="flex" flexDirection="column" gap={1} >
            <div id="renter">
                Morador:{" "}
                <input
                  id="rentervalue"
                  type="text"
                  defaultValue=""
                  className="input-plain-value"
                  size={20}
                />
                <button className="btn btn-dark" onClick={logout}>Logout</button>
            </div>
            <div id="unit">
                Unidade:{" "}
                <input
                  id="unitvalue"
                  type="text"
                  defaultValue=""
                  className="input-plain-value"
                />
            </div>
        </Box>
    </div>
  );
}

export default FormRenter;

/*


      
*/