import { atom } from "recoil";

export const sidebarVisibleAtom = atom<boolean>({
  key: "sidebarVisible",
  default: false,
});