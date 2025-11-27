// app/catalog/page.tsx
"use client";

import { useState } from "react";
// import Loader from "@/components/Loader/Loader";
import { GetCars } from "@/lib/api";
import { Car, CarsResp } from "@/lib/types";
import Image from "next/image";

export default function CarsList() {
  const [cars, setCars] = useState<Car[]>([]);
  //   const [loading, setLoading] = useState(false);

  //   async function test() {
  //     const res = await GetCars();
  //     console.log("RES:", res.cars);
  //   }
  //   test();
  // переименовали функцию, чтобы не конфликтовать с импортом
  async function fetchCars() {
    const data: CarsResp = await GetCars(); // указываем тип здесь
    setCars(data.cars); // просто присваиваем массив
  }

  return (
    <>
      {/* {loading && <Loader />} */}
      <button onClick={fetchCars}>Загрузить машины</button>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              width={300}
              height={200}
              style={{ borderRadius: "6px", objectFit: "cover" }}
            />
            <p>
              {car.brand} {car.model}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
