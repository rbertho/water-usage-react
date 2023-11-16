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

import '../App.css';

function Monthly() {
  const [idDevice, setIdDevice] = useState(Cookies.get('id_device'))
  const [selectedYear, setSelectedYear] = useState(dayjs(new Date()).$y);
  const [datePickerValue, setDatePickerValue] = useState(dayjs(new Date()))
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
    const selectedYear = date.$y;
    console.log(selectedYear);
    setSelectedYear(selectedYear);
    setDatePickerValue(dayjs(new Date(date.$y, date.$M, 1)))
  };

  const showPriorYear = () => {
    setSelectedYear(parseInt(selectedYear) - 1);
    setDatePickerValue(datePickerValue.add(-1, 'year'))
  };

  const showNextYear = () => {
    setSelectedYear(parseInt(selectedYear) + 1);
    setDatePickerValue(datePickerValue.add(+1, 'year'))
  };



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
    const options = {
      mode: 'cors',
      cache: 'default'
    }

    fetch(`https://smart-water-api.vercel.app/consumptionsByMonth?id_device=${idDevice}`, options)
      .then(result => result.json())
      .then(json => json.filter(item => new Date(item.date_trunc).getFullYear() === parseInt(selectedYear)))
      .then(json => {
          let categories = json.map(filteredData =>  (new Date(filteredData.date_trunc).getMonth())+2);
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
  }, [selectedYear]);

  toggleChartVisibility('chart-div', hasData)
  toggleChartVisibility('table-div', hasData)

  const totalConsumed = chartData.series[0].data.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);

  return (
    <div className="app">
      <div id="select-div" className='d-inline-flex'>
            <button className='btn' onClick={showPriorYear}><h2>&#8592;</h2></button>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  label={'Selecione o ano: '} 
                  views={['year']} 
                  onAccept={handleDatePickerChange}
                  defaultValue={dayjs(new Date())}
                  value={datePickerValue}
                />
              </DemoContainer>
            </LocalizationProvider>
            <button className='btn' onClick={showNextYear}><h2>&#8594;</h2></button>
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
                  <TableCell>Mês</TableCell>
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
                    <TableCell>Total consumido no ano</TableCell>
                    <TableCell align="right">{totalConsumed.toFixed(2)}</TableCell>
                  </TableRow>
                </TableFooter>
            </Table>
          </TableContainer>
      </div>
    </div>
  );
}

export default Monthly;