// app/catalog/page.tsx
"use client";

import { useState, useEffect } from "react";
import { GetCars } from "@/lib/api";
import { Car, CarsResp } from "@/lib/types";
import CarCard from "@/components/CarCard/CarCard";

export default function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);

  // useEffect с пустым массивом зависимостей => выполняется один раз при монтировании
  useEffect(() => {
    async function fetchCars() {
      try {
        const data: CarsResp = await GetCars(); // указываем тип
        setCars(data.cars);
      } catch (error) {
        console.error("Ошибка при загрузке машин:", error);
      }
    }

    fetchCars();
  }, []);

  return (
    <ul>
      {cars.map((car) => (
        <li key={car.id}>
          <CarCard {...car} />
        </li>
      ))}
    </ul>
  );
}
