import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';

const DatePicker = () => {
  const [date, setDate] = React.useState(null);
  const handleDateChange = (newValue) => {
    setDate(newValue);
    if (newValue && newValue[0] && newValue[1]) {
      const startDate = newValue[0];
      const endDate = newValue[1];
      console.log(`Start Date: ${startDate.$D}-${startDate.$M + 1}-${startDate.$y}`);
      console.log(`End Date: ${endDate.$D}-${endDate.$M + 1}-${endDate.$y}`);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['SingleInputDateRangeField']} sx={{ borderRadius: '10px', padding: 0 }}>
        <DateRangePicker
          value={date}
          onChange={handleDateChange}
          slots={{ field: SingleInputDateRangeField }}
          name="allowedRange"
          sx={{ backgroundColor: 'white', color: 'black' }}
          onAccept={() => console.log('accepted', date)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePicker;
