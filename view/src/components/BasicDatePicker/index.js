import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt';
import { useMediaQuery } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';

const currentYear = dayjs();

export default function BasicDatePicker({ aoAlterado, label, views, open, valor}) {

  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"pt"}>
      <DemoContainer components={['DatePicker']}>
        {isMobile ? (
          <MobileDatePicker
              sx={{ height: "100%", backgroundColor: "white" }}
              value={valor}
              label={label}
              onChange={aoAlterado}
              views={views} 
              maxDate={currentYear}
              openTo={open}
          />
        ) : (
          <DatePicker
            sx={{width: "100%", height: "100%", backgroundColor: "white" }}
            value={valor}
            label={label}
            onChange={aoAlterado}
            views={views} 
            maxDate={currentYear}
            openTo={open}
            />
          )}
      </DemoContainer>
    </LocalizationProvider>
  );
}