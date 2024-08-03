import { DateRange } from '@mui/x-date-pickers-pro/models';
import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface DB1FiltersStore {
  typesOfSkill: string[];
  date: DateRange<Dayjs> | null;
  empIdField: string;
  currentUserIndex: number;
  setFilters: (filters: Partial<DB1FiltersStore>) => void;

  users: { label: string; value: number }[];
  setUsers: (users: { label: string; value: number }[]) => void;
  setCurrentUserIndex: (index: number) => void;
  nextUser: () => void;
  prevUser: () => void;
}

const useDB1FiltersStore = create<DB1FiltersStore>()(
  devtools((set, get) => ({
    typesOfSkill: [],
    date: null,
    empIdField: '',
    users: [],
    currentUserIndex: 0,
    setFilters: (filters) => set(filters),
    setUsers: (users) => set({ users }),
    setCurrentUserIndex: (index) => {
      const user = get().users[index];
      set({
        currentUserIndex: index,
        empIdField: user ? user.label : ''
      });
    },
    nextUser: () =>
      set((state) => {
        const newIndex = (state.currentUserIndex + 1) % state.users.length;
        const newEmpIdField = state.users[newIndex]?.label || '';
        return { currentUserIndex: newIndex, empIdField: newEmpIdField };
      }),
    prevUser: () =>
      set((state) => {
        const newIndex = (state.currentUserIndex - 1 + state.users.length) % state.users.length;
        const newEmpIdField = state.users[newIndex]?.label || '';
        return { currentUserIndex: newIndex, empIdField: newEmpIdField };
      })
  }))
);

export default useDB1FiltersStore;
