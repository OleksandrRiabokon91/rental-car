import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CarsFiltersState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
  limit: string;
  page: string;

  setBrand: (v: string) => void;
  setRentalPrice: (v: string) => void;
  setMinMileage: (v: string) => void;
  setMaxMileage: (v: string) => void;
  setLimit: (v: string) => void;
  setPage: (v: string) => void;

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
      limit: "12",
      page: "1",

      setBrand: (v) => set({ brand: v, page: "1" }),
      setRentalPrice: (v) => set({ rentalPrice: v, page: "1" }),
      setMinMileage: (v) => set({ minMileage: v, page: "1" }),
      setMaxMileage: (v) => set({ maxMileage: v, page: "1" }),
      setLimit: (v) => set({ limit: v }),
      setPage: (v) => set({ page: v }),

      resetFilters: () =>
        set({
          brand: "",
          rentalPrice: "",
          minMileage: "",
          maxMileage: "",
          page: "1",
        }),

      getParams: () => {
        const state = get();
        return {
          brand: state.brand,
          rentalPrice: state.rentalPrice,
          minMileage: state.minMileage,
          maxMileage: state.maxMileage,
          limit: state.limit,
          page: state.page,
        };
      },
    }),
    { name: "cars-filters-storage" }
  )
);
