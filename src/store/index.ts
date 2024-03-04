import { create } from "zustand";

interface SidebarStore {
  visible: boolean;
  toggle: () => void;
  close: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  visible: false,
  toggle: () => set((state) => ({ visible: !state.visible })),
  close: () => set({ visible: false }),
}));