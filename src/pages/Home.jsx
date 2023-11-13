import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FormRenter from '../components/FormRenter';
import LoadRentDetails from '../components/LoadRentDetails';

import '../App.css';

function Home() {
  const [idDevice, setIdDevice] = useState(Cookies.get('id_device'))
  if (idDevice == null) {
    logout();
  }

  function logout(){
    console.log('Logout')
    Cookies.remove('access_token')
    Cookies.remove('id_device')
    window.location.reload()
  }

  const [selectedMonth, setSelectedMonth] = useState('');
  const [hasData, setHasData] = useState(true);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'bar'
      },
      xaxis: {
        categories: []
      }
    },
    series: [
      {
        name: 'series-1',
        data: []
      }
    ],
    title: {
      text: 'Consumo diário em M³',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  })

  const handleDatePickerChange = (date) => {
    const selectedMonth = date.$M +1;
    const selectedYear = date.$y;
    console.log(selectedMonth, ' - ', selectedYear);

    setSelectedMonth(selectedMonth);
  };

  const options = {
    mode: 'cors',
    cache: 'default'
  }

  function toggleChartVisibility(chartDivName, showChart) {
    var x = document.getElementById(chartDivName);
    try {
      if (showChart) {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    } catch (error) { }
  }

  useEffect(() => {
    fetch(`https://smart-water-rodrigos-projects-f9ec54f8.vercel.app/consumptionsByDevice?id_device=${idDevice}`, options)
      .then(result => result.json())
      .then(json => json.filter(item => new Date(item.create_time).getMonth() + 1 === parseInt(selectedMonth)))
      .then(json => {
          let categories = json.map(filteredData =>  new Date(filteredData.create_time).getDate());
          let data = json.map(filteredData => filteredData.consumption_amount);
          setHasData(data.length>0)
          setChartData({
            options: {
              ...chartData.options,
              xaxis: {
                categories: categories
              },
              dataLabels: {
                enabled: false,
                position: 'bottom', // top, center, bottom
              },
              legend: {
                show: true, // habilita a legenda
                
              },
            },
            series: [
              {
                name: 'Consumo',
                data: data
              }
            ],
            title: {
              text: 'Consumo diário em M³',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
        });
      })
      .catch(error => console.error(error));
  }, [selectedMonth]);

  toggleChartVisibility('chart-div', hasData)
  toggleChartVisibility('table-div', hasData)

  const totalConsumed = chartData.series[0].data.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

  return (
    <div className="app">
      <div id='renter-details'>
        <FormRenter />
      </div>
      <div id='nav-menu'>
          <ul className="nav nav-tabs justify-content-center">
              <li className="nav-item">
                <a className="nav-link active" href="#">Diário</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mensal</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Perfil</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
        </ul>
      </div>
      <div id="select-div" className='d-inline-flex p-2 bd-highlight'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  label={'Selecione o mês e o ano: '} 
                  views={['month', 'year']} 
                  onYearChange={handleDatePickerChange} 
                  onAccept={handleDatePickerChange}
                  defaultValue={dayjs(new Date())}
                />
              </DemoContainer>
            </LocalizationProvider>
      </div>
      <div id='chart-div' className='chartDiv'>
          <Chart
            options={chartData.options}
            series={chartData.series}
            title={chartData.title}
            type="bar"
            width="90%"
            height="400"
          />
      </div>
      <div id='table-div'>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dia</TableCell>
                  <TableCell align="right">Consumo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartData.series[0].data.map((value, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {chartData.options.xaxis.categories[index]}
                    </TableCell>
                    <TableCell align="right">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                  <TableRow>
                    <TableCell>Total consumido no mês</TableCell>
                    <TableCell align="right">{totalConsumed.toFixed(2)}</TableCell>
                  </TableRow>
                </TableFooter>
            </Table>
          </TableContainer>
    </div>
    </div>
  );
}

export default Home;