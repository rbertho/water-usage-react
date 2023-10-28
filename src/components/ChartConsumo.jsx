import { Chart } from "react-google-charts";

var show = false
const ChartConsumo = () => {
    
    var month = document.getElementById("selectMonth")
    console.log("month selected on Chart1: " + month)
    if(month != null){

        console.log("month selected on Chart2: " + month.value)

        var data = [["dia", "consumo"]]
        data.push([1, 0.1])
        data.push([2, 0.32])
        data.push([3, 0.25])
        data.push([4, 0.19])
        data.push([5, 0.56])
        data.push([6, 0.38])
        console.log(data)


        const options = {
            title: "Consumo por dia",
        }
    }

    if(show){
        return (  <Chart chartType="ColumnChart" data={data} options={options} width={"100%"} height={"400"} />)
    }
    else {
        return ""
    }

}

export default ChartConsumo