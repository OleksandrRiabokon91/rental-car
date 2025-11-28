// app/catalog/page.tsx
"use client";

import { useCarStore } from "../../store/useCarStore";
import { useState, useEffect } from "react";
import { getCars } from "@/lib/api";
import { Car, CarsResp } from "@/lib/types";
import CarCard from "@/components/CarCard/CarCard";
// import Loader from "@/components/Loader/Loader";

import css from "./CarsList.module.css";

export default function CarsList() {
  const setCars = useCarStore((state) => state.setCars);
  const cars = useCarStore((state) => state.cars);

  useEffect(() => {
    getCars().then((data) => setCars(data.cars));
  }, [setCars]);

  // !код до зустанда
  // useEffect с пустым массивом зависимостей => выполняется один раз при монтировании
  // useEffect(() => {
  //   async function fetchCars() {
  //     try {
  //       const data: CarsResp = await getCars(); // указываем тип
  //       setCars(data.cars);
  //     } catch (error) {
  //       console.error("Ошибка при загрузке машин:", error);
  //     }
  //   }

  //   fetchCars();
  // }, []);

  return (
    <div className="container">
      <ul className={css.contentBox}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard {...car} />
          </li>
        ))}
      </ul>
    </div>
  );
}
