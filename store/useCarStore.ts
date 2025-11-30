// store/useCarStore.ts
"use client";
import { create } from "zustand";
import { Car } from "@/lib/types";

interface CarState {
  cars: Car[];
  selectedCar?: Car;
  setCars: (cars: Car[] | ((prev: Car[]) => Car[])) => void; // <- здесь разрешаем функцию
  setSelectedCar: (car: Car) => void;
  getCarById: (id: string) => Car | undefined;
}

export const useCarStore = create<CarState>((set, get) => ({
  cars: [],
  selectedCar: undefined,
  setCars: (cars) =>
    typeof cars === "function"
      ? set({ cars: cars(get().cars) })
      : set({ cars }),
  setSelectedCar: (car) => set({ selectedCar: car }),
  getCarById: (id) => get().cars.find((car) => car.id === id),
}));

// !

// interface CarState {
//   cars: Car[]; // список всех машин
//   selectedCar?: Car; // выбранная машина
//   setCars: (cars: Car[]) => void;
//   setSelectedCar: (car: Car) => void;
//   getCarById: (id: string) => Car | undefined; // поиск в локальном состоянии
// }

// export const useCarStore = create<CarState>((set, get) => ({
//   cars: [],
//   selectedCar: undefined,
//   setCars: (cars) => set({ cars }),
//   setSelectedCar: (car) => set({ selectedCar: car }),
//   getCarById: (id) => get().cars.find((car) => car.id === id),
// }));
