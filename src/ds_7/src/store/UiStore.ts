import { create } from 'zustand';

// Чисто для тенюшек и работы с боковым меню
interface UiStore {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
}));

export default useUiStore;
