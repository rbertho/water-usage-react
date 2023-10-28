import { useState } from 'react'
import { useEffect } from 'react'
import FormRenter from './components/FormRenter'
import LoadRentDetails from './components/LoadRentDetails'
import FormConsumo from './components/FormConsumo'

import './App.css'

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const [idDevice, setIdDevice] = useState(urlParams.get('id_device'))
 
  useEffect(() => {
    LoadRentDetails(idDevice);
  }, []);

  return (
    <>
      <div>
        <h1 className="title">Smart Water</h1>
        <FormRenter />
      </div>
      <div>
        <FormConsumo idDevice={idDevice} setIdDevice={setIdDevice} />
      </div>
    </>
  )
}

export default App
