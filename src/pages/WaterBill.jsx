import dayjs from 'dayjs';
import React, { useState } from 'react';
import 'dayjs/locale/pt-br';

function getFirstDayOfMonth() {
    return dayjs(new Date()).startOf('month').format('YYYY-MM-DD');
}

function getLastDayOfMonth() {
    return dayjs(new Date()).endOf('month').format('YYYY-MM-DD');
}

function getCurrentDate() {
    return dayjs(new Date()).format('YYYY-MM-DD');
}


function WaterBillForm() {
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(useState(getCurrentDate()));
    const [totalAmount, setTotalAmount] = useState(0);
    const [dtStart, setDtStart] = useState(getFirstDayOfMonth());
    const [dtFinal, setDtFinal] = useState(getLastDayOfMonth);
    const [referenceMonth, setReferenceMonth] = useState("");
    const [invoiceAddress, setInvoiceAddress] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode lidar com a submissão do formulário
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Descrição</label>
                <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Data de Vencimento</label>
                <input type="date" className="form-control" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Valor Total em R$</label>
                <input type="text" className='form-control' name="currency-field" id="currency-field" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" placeholder="100,00" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Data Inicial</label>
                <input type="date" className="form-control sm-2" value={dtStart} onChange={e => setDtStart(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label ">Data Final</label>
                <input type="date" className="form-control" value={dtFinal} onChange={e => setDtFinal(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Mês de Referência</label>
                <input type="month" className="form-control" value={referenceMonth} onChange={e => setReferenceMonth(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Endereço da Fatura</label>
                <textarea className="form-control" value={invoiceAddress} onChange={e => setInvoiceAddress(e.target.value)} rows="4" cols="50">
                    Endereço commpleto da conta de água
                </textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
    );
}

export default WaterBillForm;