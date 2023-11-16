import BuscaConsumo from './BuscaConsumo'

const FormConsumo = ({idDevice, setIdDevice}) => {
    return (
        <div>
          <div id="form-consumo">
            <div>
              <select id="selectMonth" className="month" onChange={(e) => BuscaConsumo(idDevice, e.target.value)}>
                <option value="">Escolha o mês</option>
                <option value="10">Outubro</option>
                <option value="9">Setembro</option>
                <option value="8">Agosto</option>
              </select>
              
              <div className="table">
                  <div className="tableHeader">
                      <div className='columnBox'>Dia do mês</div>
                      <div className='columnBox'>Consumo</div>
                    </div>
                  </div>

                  <div id="chart_div" className='chart'>

                  </div>
            </div>
          </div>
        </div>
    )
}  

export default FormConsumo