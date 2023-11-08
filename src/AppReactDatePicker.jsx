import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const handleMonthChange = (date) => {
  const selectedMonth = date.$M +1;
  const selectedYear = date.$y;
  console.log(selectedMonth, ' - ', selectedYear);
};

export default function DatePickerViews() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
          label={'Selecione o mês e o ano: '} 
          views={['month', 'year']} 
          onYearChange={handleMonthChange} 
          defaultValue={dayjs(new Date())}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}