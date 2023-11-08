import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper } from '@mui/material';
import './App.css';
import FormRenter from './components/FormRenter';
import LoadRentDetails from './components/LoadRentDetails';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const [idDevice, setIdDevice] = useState(urlParams.get('id_device'))

  const [selectedMonth, setSelectedMonth] = useState('');
  const [hasData, setHasData] = useState(true);

  /*
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  */

  const handleDatePickerChange = (date) => {
    const selectedMonth = date.$M +1;
    const selectedYear = date.$y;
    console.log(selectedMonth, ' - ', selectedYear);

    setSelectedMonth(selectedMonth);
  };

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

  const options = {
    mode: 'cors',
    cache: 'default'
  }

  function toggleChartVisibility(chartDivName, showChart) {
    var x = document.getElementById(chartDivName);
    console.log('showChart: ' + showChart)
    try {
      if (showChart) {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    } catch (error) { }
  }

  useEffect(() => {
    LoadRentDetails(idDevice);
  }, []);

  useEffect(() => {
    fetch(`https://smart-water-rodrigos-projects-f9ec54f8.vercel.app/consumptionsByDevice?id_device=${idDevice}`, options)
      .then(result => result.json())
      .then(json => json.filter(item => new Date(item.create_time).getMonth() + 1 === parseInt(selectedMonth)))
      .then(json => {

        let categories = json.map(filteredData =>  new Date(filteredData.create_time).getDate());
        let data = json.map(filteredData => filteredData.consumption_amount);

        // Atualiza se tem dados para exibir
        setHasData(data.length>0)
        console.log('>> ' + data.length)

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
      <div id='render-details'>
        <FormRenter idDevice={idDevice} setIdDevice={setIdDevice} />
      </div>
      <div>
        <hr />
      </div>
      <div id="select-div">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  label={'Selecione o mês e o ano: '} 
                  views={['month', 'year']} 
                  onYearChange={handleDatePickerChange} 
                  onClose={handleDatePickerChange}
                  defaultValue={dayjs(new Date())}
                />
              </DemoContainer>
            </LocalizationProvider>
      </div>
      <div id='chart-div'>
        <Chart
          options={chartData.options}
          series={chartData.series}
          title={chartData.title}
          type="bar"
          width="90%"
          height="500"
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

export default App;

/*
    <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Selecione o mês para ver o gráfico</option>
          <option value="1">Janeiro</option>
          <option value="2">Fevereiro</option>
          <option value="3">Março</option>
          <option value="4">Abril</option>
          <option value="5">Maio</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
*/ 