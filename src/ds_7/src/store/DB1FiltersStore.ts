import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DB1FiltersStore {
  typeOfSkill: string;
  date: DateRange<Dayjs> | null;
  empIdField: string;

  setFilters: (filters: Partial<DB1FiltersStore>) => void;
}

const useDB1FiltersStore = create<DB1FiltersStore>()(
  devtools((set) => ({
    typeOfSkill: '',
    date: null,
    empIdField: '',
    setFilters: (filters) => set(filters)
  }))
);

export default useDB1FiltersStore;
