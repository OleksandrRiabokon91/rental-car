"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import css from "./CarPage.module.css";

import { useCarStore } from "@/store/useCarStore";
import { getCarById as fetchCarFromApi } from "@/lib/api";

export default function CarPageClient({ id }: { id: string }) {
  const { getCarById, setSelectedCar, selectedCar } = useCarStore();

  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState(selectedCar);

  useEffect(() => {
    async function loadCar() {
      // Сначала пробуем получить машину из zustand
      const localCar = getCarById(id);

      if (localCar) {
        setCar(localCar);
        setSelectedCar(localCar);
        setLoading(false);
        return;
      }

      // Если нет в zustand — делаем запрос на сервер
      try {
        const fetchedCar = await fetchCarFromApi(id);
        setCar(fetchedCar);
        setSelectedCar(fetchedCar);
      } catch (err) {
        console.error("Failed to fetch car:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCar();
  }, [id, getCarById, setSelectedCar]);

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <div className="container">
      <div className={css.contentBox}>
        <div>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={400}
          />
        </div>

        <div>
          <h2>
            {car.brand} {car.model}
          </h2>
          <p>Year: {car.year}</p>
          <p>Type: {car.type}</p>
          <p>Mileage: {car.mileage}</p>
          <p>Fuel consumption: {car.fuelConsumption}</p>
          <p>
            <strong>Description:</strong> {car.description}
          </p>
          <p>
            <strong>Address:</strong> {car.address}
          </p>
          <p>
            <strong>Rental price:</strong> {car.rentalPrice}
          </p>
        </div>
      </div>
    </div>
  );
}
