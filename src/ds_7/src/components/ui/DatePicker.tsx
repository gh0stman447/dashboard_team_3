import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { InFormProps } from '../../types';
import useDB1FiltersStore from '../../store/DB1FiltersStore';

interface TypeOfSkillFieldProps extends InFormProps {}

const DatePicker: React.FC<TypeOfSkillFieldProps> = ({ patchState }) => {
  const [date, setDate] = useState<DateRange<Dayjs> | null>(null);
  const initialDate = useDB1FiltersStore((state) => state.date);

  useEffect(() => {
    setDate(initialDate);
  }, []);
  const handleChangeDate = (value: DateRange<Dayjs>) => {
    if (value[0] && value[1]) {
      setDate(value);
      patchState({ date: value });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['SingleInputDateRangeField']} sx={{ borderRadius: '10px', padding: 0 }}>
        <DateRangePicker
          value={date}
          onChange={handleChangeDate}
          slots={{ field: SingleInputDateRangeField }}
          name="allowedRange"
          sx={{ backgroundColor: 'white', color: 'black' }}
          onAccept={() => patchState({ date })}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePicker;
