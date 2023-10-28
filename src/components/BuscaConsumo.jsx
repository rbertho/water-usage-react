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
    let selectedItens = 0
    const lista = document.querySelector("div.lista")
    lista.innerHTML = ""
    let item = document.createElement("div")
    item.classList.add("tableHeader")
    item.innerHTML = `<div className='columnBox'>Dia do mês</div><div className='columnBox'>Consumo</div>`
    lista.appendChild(item)
  
    var totalMonthAmout = 0  
    json.forEach(element => {
      let item = document.createElement("div")
      item.classList.add("item")
  
      let consumptionMonth = new Date(element.create_time).getMonth()+1
  
      if(parseInt(consumptionMonth)===parseInt(selectedMonth)){
        totalMonthAmout += parseFloat(element.consumption_amount)
        selectedItens++
        let consumptionDay = new Date(element.create_time).getDate()+'/'+(consumptionMonth)
        let rowString = `<div className="columnBox">${consumptionDay}</div>`
        rowString += `<div className="columnBox">${element.consumption_amount}</div>`
        item.innerHTML = rowString
        lista.appendChild(item)
      }
    })
  
    if(selectedItens>0) {
      let total = document.createElement("div")
      total.classList.add("total")
      total.innerHTML = `<div className='columnBox'>Total</div><div className='columnBox'>${totalMonthAmout.toFixed(2)}</div>`
      lista.appendChild(total)
    }
    else {
        lista.innerHTML = `<div class="error">Não foram encontrados registros! </div>`
    }
  
    if(selectedItens>0) {
        //------------------------ CHART -------------------------------

        var data = [["dia", "consumo"]]
        json.forEach(element => {
            let consumptionMonth = new Date(element.create_time).getMonth()+1
            if(parseInt(consumptionMonth)===parseInt(selectedMonth)){
                data.push([[new Date(element.create_time).getDate(), parseFloat(element.consumption_amount)]])
            }
        })

        console.log(data)


          const options = {
            title: "My Daily Activities",
          };

         return `<Chart chartType="BarChart" data={data} options={options} width={"500"} height={"400"} />`
          
      }
  
  }

export default BuscaConsumo