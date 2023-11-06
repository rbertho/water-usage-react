import ApexCharts from 'apexcharts'

const BuscaConsumo = (idDevice, month) => {
    console.log('BuscaConsumo: IdDevice: ' + idDevice)
    console.log('BuscaConsumo: month: ' + month)
    const options = {
        mode: 'cors',
        cache: 'default'
    }
   
    let json = [0]
    try{
        fetch(`https://smart-water-rodrigos-projects-f9ec54f8.vercel.app/consumptionsByDevice?id_device=${idDevice}`, options)
        .then(result => result.json())
        .then(json => carregaLista(json, month))
    }
    catch{
      console.log('Falhou ao acessar o serviço consumptionByDevice!!')
    }
}

const carregaLista = (json, selectedMonth) => {
    console.log(json)
    let hasDataToDisplay = false
    const lista = document.querySelector("div.table")
    lista.innerHTML = ""
    let item = document.createElement("div")
    item.classList.add("tableHeader")
    item.innerHTML = `<div className='columnBox'>Dia do mês</div><div className='columnBox'>Consumo</div>`
    lista.appendChild(item)
  
    var totalMonthAmout = 0  
    json.forEach(element => {
      let item = document.createElement("div")
      item.classList.add("row")
  
      let consumptionMonth = new Date(element.create_time).getMonth()+1
  
      if(parseInt(consumptionMonth)===parseInt(selectedMonth)){
        totalMonthAmout += parseFloat(element.consumption_amount)
        hasDataToDisplay = true
        let consumptionDay = new Date(element.create_time).getDate()+'/'+(consumptionMonth)
        let rowString = `<div className="columnBox">${consumptionDay}</div>`
        rowString += `<div className="columnBox">${element.consumption_amount}</div>`
        item.innerHTML = rowString
        lista.appendChild(item)
      }
    })
  
    if(hasDataToDisplay) {
      let total = document.createElement("div")
      total.classList.add("tableFooter")
      total.innerHTML = `<div className='columnBox'>Total</div><div className='columnBox'>${totalMonthAmout.toFixed(2)}</div>`
      lista.appendChild(total)
    }
    else {
        lista.innerHTML = `<div class="error">Não foram encontrados registros! </div>`
    }
  
    if(hasDataToDisplay>0) {
        buildChart(json, selectedMonth)
    }
  }

  function buildChart(json, selectedMonth){
    
    var data = [[0,0]]
    json.forEach(element => {
        let consumptionMonth = new Date(element.create_time).getMonth()+1
        if(parseInt(consumptionMonth)===parseInt(selectedMonth)){
            data.push([[new Date(element.create_time).getDate(), parseFloat(element.consumption_amount)]])
        }
    })

    drawChart(data, json)
  }

  

  function drawChart(result, json) {
    var apexData = [];
    var apexColumnLabel = [];
    result.forEach(element => {
      apexData.push(element[0][1])
      apexColumnLabel.push(element[0][0])
    })

    var trash = apexData.shift()
    trash = apexColumnLabel.shift()

    console.log('apexData: ' + apexData)
    console.log('apexColumnLabel: ' + apexColumnLabel)
    console.log('apexData.length: ' + apexData.length)
    console.log('cccc22: ' + apexColumnLabel.length)

    console.log('ccccc3: ' + json)

    var apexOptions = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'Consume',
        data: apexData
      }],
      xaxis: {
        categories: apexColumnLabel
      }
    }
    
    var apexChart = new ApexCharts(document.querySelector("#chart"), apexOptions);
    apexChart.render();
   
  }

export default BuscaConsumo