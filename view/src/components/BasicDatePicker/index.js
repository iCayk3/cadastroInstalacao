import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt';

const currentYear = dayjs();

export default function BasicDatePicker({ aoAlterado, label, views, open, valor}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt"}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          sx={{width: "100%", height: "100%"}}
          value={valor}
          label={label}
          onChange={aoAlterado}
          views={views} 
          maxDate={currentYear}
          openTo={open}
          />
      </DemoContainer>
    </LocalizationProvider>
  );
}