/*

import { useState } from 'react'
import { useEffect } from 'react'

import React, { Component } from "react"
import Chart from "react-apexcharts";

import FormRenter from './components/FormRenter'
import LoadRentDetails from './components/LoadRentDetails'
import FormConsumo from './components/FormConsumo'

import './App.css'


function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const [idDevice, setIdDevice] = useState(urlParams.get('id_device'))

  const [optionsMixedChart, setOptionsMixedChart] = useState(
    {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false
        }
      },
     
      stroke: {
        width: [1, 0, 0]
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
     
      yaxis: {
        tickAmount: 5,
        min: 0,
        max: 100
      }
    }
  )
  const [seriesMixedChart, setSeriesMixedChart] = useState(
    [
      {
        name: "series-3",
        type: "column",
        data: [62, 12, 45, 55, 76, 41, 23, 43]
      }
    ]
  )
  

  useEffect(() => {
    LoadRentDetails(idDevice);
  }, []);

  
  /*
  function toggleChartVisibility(chartDivName) {
    var x = document.getElementById(chartDivName);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function updateCharts() {
    console.log('chamou update charts!')
    
   
    /*
    const max = 90;
    const min = 10;
    const newMixedSeries = [];
  
    seriesMixedChart.forEach((s) => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });
      newMixedSeries.push({ data: data, type: s.type });
    })
  
    setSeriesMixedChart(newMixedSeries)

  }

  return (
    <>
      <div>
        <h1 className="title">Smart Water</h1>
        <FormRenter />
      </div>
      <div>
        <FormConsumo idDevice={idDevice} setIdDevice={setIdDevice} />
      </div>
      <div id="chart">
      </div>

      <div className="app">
        <div className="rowchart">
          <div className="col mixed-chart" id="mix">
            <Chart
              options={optionsMixedChart}
              series={seriesMixedChart}
              type="line"
              width="500"
            />
          </div>
        </div>
        <div className="row">
          <p className="col">
            <button onClick={updateCharts()}>Update!</button>
          </p>
        </div>
      </div>
    </>
  )
}

export default App;
*/

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const [idDevice, setIdDevice] = useState(urlParams.get('id_device'))

  const [selectedMonth, setSelectedMonth] = useState('');
  const [hasData, setHasData] = useState(true);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
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
    } catch (error) {
      
    }
   
  }


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



  return (
    <div className="app">
      <div id="select-div">
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
      <table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {chartData.series[0].data.map((value, index) => (
            <tr key={index}>
              <td>{chartData.options.xaxis.categories[index]}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;