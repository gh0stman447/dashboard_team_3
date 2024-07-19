import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DB1FiltersStore {
  typeOfSkill: string;
  date: DateRange<Dayjs> | null;
  empField: string;

  setFilters: (filters: Partial<DB1FiltersStore>) => void;
}

const useDB1FiltersStore = create<DB1FiltersStore>()(
  devtools((set) => ({
    typeOfSkill: '',
    date: null,
    empField: '',
    setFilters: (filters) => set(filters)
  }))
);

export default useDB1FiltersStore;
