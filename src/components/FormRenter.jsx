const FormRenter = () => {
    return (
      <form id="form-renter">
        <div>
          <input
            id="renter"
            type="text"
            defaultValue="Nome do morador: "
            className="input-plain-text"
          />
          <input
            id="rentervalue"
            type="text"
            defaultValue=""
            className="input-plain-value"
          />
          <input
            id="unit"
            type="text"
            defaultValue="Unidade: "
            className="input-plain-text"
          />
          <input
            id="unitvalue"
            type="text"
            defaultValue=""
            className="input-plain-value"
          />
        </div>
      </form>
  
    );
  }

  export default FormRenter