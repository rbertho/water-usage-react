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
import 'dayjs/locale/pt-br';

import '../App.css';

function Daily() {
  const [idDevice, setIdDevice] = useState(Cookies.get('id_device'))

  const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).$M + 1);
  const [selectedYear, setSelectedYear] = useState(dayjs(new Date()).$y);
  const [datePickerValue, setDatePickerValue] = useState(dayjs(new Date()))

  const [hasData, setHasData] = useState(true);
  const [chartData, setChartData] = useState({
    
        series: [44, 55, 13, 43, 22],
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      
  })

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

    let prodURL = 'https://smart-water-api.vercel.app/totalByMonth';
    fetch(`http://localhost:3333/totalByMonth`, options)
      .then(result => result.json())
      .then(json => json.filter(item => new Date(item.month).getMonth() + 1 === parseInt(selectedMonth)))
      .then(json => json.filter(item => new Date(item.month).getFullYear() === parseInt(selectedYear)))
      .then(json => {

        console.log(selectedMonth, ' - ', selectedYear)
        console.log(json)
          let categories = json.map(filteredData =>  filteredData.rent_unit);
          let data = json.map(filteredData => filteredData.consumption_amount);

          console.log(categories)
          console.log(data)
          console.log('filtrou os dados')
          setHasData(data.length>0)
          
      })
      .catch(error => console.error(error));
  }, [selectedMonth, selectedYear]);

  toggleChartVisibility('chart-div', hasData)
  toggleChartVisibility('table-div', hasData)

  console.log(chartData)
  //const totalConsumed = chartData.series[0].data.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  var totalConsumed = 0
  const handleDatePickerChange = (date) => {
    console.log('Chamou o handler: ', date.$y, date.$M+1)
    setSelectedYear(date.$y)
    setSelectedMonth(date.$M+1)
    setDatePickerValue(dayjs(new Date(date.$y, date.$M, 1)))
  };

  function showNextMonth() {
    if(selectedMonth < 12) setSelectedMonth(selectedMonth + 1)
    else { 
      setSelectedMonth(1)
      setSelectedYear(selectedYear + 1)
    }
    setDatePickerValue(datePickerValue.add(+1, 'month'))
  }

  function showPriorMonth() {
    if(selectedMonth > 1) setSelectedMonth(selectedMonth - 1)
    else { 
      setSelectedMonth(12)
      setSelectedYear(selectedYear - 1)
    }
    setDatePickerValue(datePickerValue.add(-1, 'month'))
  }
 
  return (
    <div className="app">
      <div id="select-div" className='d-inline-flex'>
            <button className='btn' onClick={showPriorMonth}><h2>&#8592;</h2></button>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DemoContainer components={['DatePicker']}>
                <DatePicker 
                  label={'Selecione o mês e o ano: '} 
                  views={['month', 'year']} 
                  onAccept={handleDatePickerChange}
                  defaultValue={dayjs(new Date())}
                  value={datePickerValue}
                />
              </DemoContainer>
            </LocalizationProvider>
            <button className='btn' onClick={showNextMonth}><h2>&#8594;</h2></button>
      </div>
      <div id='chart-div' className='chartDiv'>
          <Chart
            options={chartData.options}
            series={chartData.series}
            title={chartData.title}
            type="donut"
            width="90%"
            height="400"
          />
      </div>
      
    </div>
  );
}

export default Daily;