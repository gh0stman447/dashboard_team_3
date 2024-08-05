import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import useDB2FiltersStore from '../../store/DB2FiltersStore';
import useDB1FiltersStore from '../../store/DB1FiltersStore';

const { RangePicker } = DatePicker;

interface DateComponentProps {
  patchState: (state: { date: DateRange<Dayjs> | null }) => void;
  page: string;
}

const DateComponent: React.FC<DateComponentProps> = ({ patchState, page }) => {
  const [date, setDate] = useState<DateRange<Dayjs> | null>(null);

  const initialDate =
    page === '1' ? useDB1FiltersStore((state) => state.date) : useDB2FiltersStore((state) => state.date);

  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  const handleDateChange = (dates: DateRange<Dayjs> | null) => {
    setDate(dates);
    patchState({ date: dates });
  };

  return (
    <RangePicker
      value={date}
      onChange={handleDateChange}
      placeholder={['Начало периода', 'Конец периода']}
      className="h-[50px]"
      defaultValue={[null, null]}
    />
  );
};

export default DateComponent;
