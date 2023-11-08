import { Box } from '@mui/material';
import '../App.css';

const FormRenter = () => {
  return (
    <form id="form-renter">
      <Box display="flex" flexDirection="column"
        gap={2}
      >
        <div id="renter">Morador: {" "}
            <input
                id="rentervalue"
                type="text"
                defaultValue=""
                className="input-plain-value"
                size={20}
              />
        </div>
        <div id="unit">Unidade:{" "}
          <input
              id="unitvalue"
              type="text"
              defaultValue=""
              className="input-plain-value"
            /></div>
      </Box>
    </form>
  );
}

export default FormRenter;;