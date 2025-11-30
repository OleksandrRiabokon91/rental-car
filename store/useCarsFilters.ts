import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CarsFiltersState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;

  setBrand: (v: string) => void;
  setRentalPrice: (v: string) => void;
  setMinMileage: (v: string) => void;
  setMaxMileage: (v: string) => void;

  resetFilters: () => void;
  getParams: () => Record<string, string>;
}

export const useCarsFilters = create<CarsFiltersState>()(
  persist(
    (set, get) => ({
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",

      setBrand: (v) => set({ brand: v }),
      setRentalPrice: (v) => set({ rentalPrice: v }),
      setMinMileage: (v) => set({ minMileage: v }),
      setMaxMileage: (v) => set({ maxMileage: v }),

      resetFilters: () =>
        set({
          brand: "",
          rentalPrice: "",
          minMileage: "",
          maxMileage: "",
        }),

      getParams: () => {
        const s = get();
        return {
          brand: s.brand,
          rentalPrice: s.rentalPrice,
          minMileage: s.minMileage,
          maxMileage: s.maxMileage,
        };
      },
    }),
    {
      name: "cars-filters-storage",
      partialize: (state) => ({
        brand: state.brand,
        rentalPrice: state.rentalPrice,
        minMileage: state.minMileage,
        maxMileage: state.maxMileage,
      }),
    }
  )
);
