import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DB2FiltersStore {
  position: string[];
  devision: string[];
  typesOfSkill: string[];
  date: DateRange<Dayjs> | null;
  skills: string[];
  setSkills: (skills: string[]) => void;
  setFilters: (filters: Partial<DB2FiltersStore>) => void;
}

const useDB2FiltersStore = create<DB2FiltersStore>()(
  devtools((set) => ({
    position: [],
    devision: [],
    typesOfSkill: [],
    date: null,
    skills: [],
    setSkills: (skills) => set({ skills }),
    setFilters: (filters) => set(filters)
  }))
);

export default useDB2FiltersStore;
