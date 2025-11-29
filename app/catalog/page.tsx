// app/catalog/page.tsx
"use client";

import { useCarStore } from "../../store/useCarStore";
import { useState, useEffect } from "react";
import { getCars } from "@/lib/api";
import { getUniquePrices } from "@/lib/utils";
import CarCard from "@/components/CarCard/CarCard";
import CarFilters from "./CarFilters";

import css from "./CarsList.module.css";

export default function CarsList() {
  const setCars = useCarStore((state) => state.setCars);
  const cars = useCarStore((state) => state.cars);

  const [priceOptions, setPriceOptions] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      // загрузка списка машин
      const carsData = await getCars();
      setCars(carsData.cars);

      // загрузка уникальных цен
      const prices = await getUniquePrices();
      console.log("Prices fetched in CarsList:", prices);
      setPriceOptions(prices);
    }

    fetchData();
  }, [setCars]);

  return (
    <div className="container">
      <CarFilters
        onSearch={(filters) => console.log("Filters:", filters)}
        priceOptions={priceOptions}
      />

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
