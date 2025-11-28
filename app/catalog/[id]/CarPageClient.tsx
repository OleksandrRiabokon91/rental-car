"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import css from "./CarPage.module.css";

import { useCarStore } from "@/store/useCarStore";
import { getCarById as fetchCarFromApi } from "@/lib/api";
import { Car } from "@/lib/types";
import { formatNumberWithSpaces } from "@/lib/utils";

interface Props {
  initialCar: Car;
}

export default function CarPageClient({ initialCar }: Props) {
  const { getCarById, setSelectedCar, selectedCar } = useCarStore();

  const [loading, setLoading] = useState(false); // уже есть данные
  const [car, setCar] = useState<Car | null>(initialCar || selectedCar);

  useEffect(() => {
    if (car) {
      setSelectedCar(car); // инициализируем zustand
      return;
    }

    async function loadCar() {
      setLoading(true);
      try {
        const fetchedCar = await fetchCarFromApi(initialCar.id);
        setCar(fetchedCar);
        setSelectedCar(fetchedCar);
      } finally {
        setLoading(false);
      }
    }

    loadCar();
  }, [car, initialCar, setSelectedCar]);

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found</p>;

  // ! подготовка данных
  const displayId = car.id.slice(0, 4);

  // Форматируем пробег
  const km = formatNumberWithSpaces(car.mileage);

  // Разделяем адрес на город и страну
  const addressParts = car.address.split(",").map((s) => s.trim());
  const city =
    addressParts.length >= 2 ? addressParts[addressParts.length - 2] : "";
  const country =
    addressParts.length >= 1 ? addressParts[addressParts.length - 1] : "";

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
          <form>
            <h4>Book your car now</h4>
            <p>Stay connected! We are always ready to help you.</p>
            <label>
              <input type="text" name="username" placeholder="Name*" required />
            </label>
            <label>
              <input
                type="email"
                name="useremail"
                placeholder="Email*"
                required
              />
            </label>
            <label>
              <input
                type="date"
                name="bookingdate"
                placeholder="Booking date"
              />
            </label>
            <label>
              <input type="text" name="comment" placeholder="Comment" />
            </label>
            <button type="submit">Send</button>
          </form>
        </div>
        <div>
          <div className={css.hedInfo}>
            <h2>
              {car.brand} {car.model},{car.year}
              <strong>id: {displayId} </strong>
            </h2>
            <p>
              {city},{country}
            </p>
            <p>Mileage: {km} km</p>
            <p>
              <strong>$</strong> {car.rentalPrice}
            </p>
            <p>{car.description}</p>
          </div>
          <h3>Rental Conditions:</h3>
          <ul>
            {car.rentalConditions.map((cond, idx) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
          <h3>Car Specifications:</h3>
          <ul>
            <li>Year:{car.year}</li>
            <li>Type:{car.type}</li>
            <li>Fuel Consumption:{car.fuelConsumption}</li>
            <li>Engine Size:{car.engineSize}</li>
          </ul>
          <h3>Accessories and functionalities:</h3>
          <ul>
            {[...car.accessories, ...car.functionalities].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
