import React, { useEffect, useState } from 'react';
import { DatePicker, ConfigProvider } from 'antd';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import useDB2FiltersStore from '../../store/DB2FiltersStore';

const { RangePicker } = DatePicker;

interface DateComponentProps {
  patchState: (state: { date: DateRange<Dayjs> | null }) => void;
}

const DateComponent: React.FC<DateComponentProps> = ({ patchState }) => {
  const [date, setDate] = useState<DateRange<Dayjs> | null>(null);
  const initialDate = useDB2FiltersStore((state) => state.date);

  useEffect(() => {
    setDate(initialDate);
    console.log('Initial date set');
  }, [initialDate]);

  const handleDateChange = (dates: DateRange<Dayjs> | null) => {
    setDate(dates);
    patchState({ date: dates });
  };

  return <RangePicker value={date} onChange={handleDateChange} placeholder={['Start date', 'End date']} />;
};

export default DateComponent;
