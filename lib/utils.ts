// Утилита для форматирования числа с пробелами
export function formatNumberWithSpaces(num: number): string {
  return new Intl.NumberFormat("ru-RU").format(num);
}

// lib/utils.ts
import { getCars } from "./api";
import { Car } from "./types";

export async function getUniquePrices(): Promise<number[]> {
  const data = await getCars(); // все машины
  const pricesSet = new Set<number>();

  data.cars.forEach((car: Car) => {
    const price = Number(car.rentalPrice);

    if (!isNaN(price)) {
      pricesSet.add(price);
    }
  });

  const pricesArray = Array.from(pricesSet).sort((a, b) => a - b);
  console.log("Unique prices from getUniquePrices:", pricesArray);

  return pricesArray;
}

// export async function getUniquePrices(): Promise<number[]> {
//   const data = await getCars(); // все машины
//   const pricesSet = new Set();
//   data.cars.forEach((car: Car) => {
//     if (typeof car.rentalPrice === "number") {
//       pricesSet.add(car.rentalPrice);
//     }
//   });
//    Array.from(pricesSet).sort((a, b) => a - b);
//   console.log("Unique prices from getUniquePrices:", pricesArray);
//   return pricesArray;
// }
