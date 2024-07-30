import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import React from 'react';

const DisplayDate = ({ date }: { date: DateRange<Dayjs> | null }) => {
  return (
    date && (
      <div className="hidden md:flex gap-2 text-[15px] bg-sky-blue rounded-lg p-2">
        <p>Выбранный период:</p>
        <p className="text-slate-500">
          {date[0].format('YYYY-MM-DD')} - {date[1].format('YYYY-MM-DD')}
        </p>
      </div>
    )
  );
};

export default DisplayDate;
