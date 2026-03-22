import { create } from "zustand";

const useThemeStore = create((set) => ({
  mode: localStorage.getItem("theme") || "dark",

  toggleTheme: () => {
    const newMode = localStorage.getItem("theme") === "light" ? "dark" : "light";
    localStorage.setItem("theme", newMode);
    document.documentElement.setAttribute("data-theme", newMode);
    set({ mode: newMode });
  },

  setTheme: (mode) => {
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    set({ mode });
  },
}));

export default useThemeStore;
