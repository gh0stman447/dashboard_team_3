import { create } from 'zustand';

interface UiStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isOptionsBarOpen: boolean;
  toggleOptionsBar: () => void;
}

const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  isOptionsBarOpen: false,
  toggleOptionsBar: () => set((state) => ({ isOptionsBarOpen: !state.isOptionsBarOpen }))
}));

export default useUiStore;
