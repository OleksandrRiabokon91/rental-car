// app/catalog/CarFilters.tsx
"use client";

import { useState, useEffect } from "react";
import { getBrands } from "@/lib/api";
import { useCarsFilters } from "@/store/useCarsFilters";

interface CarFiltersProps {
  onSearch: () => void;
}

export default function CarFilters({ onSearch }: CarFiltersProps) {
  const {
    brand,
    rentalPrice,
    minMileage,
    maxMileage,
    setBrand,
    setRentalPrice,
    setMinMileage,
    setMaxMileage,
    setPage,
  } = useCarsFilters();

  const [brands, setBrands] = useState<string[]>([]);

  const [localBrand, setLocalBrand] = useState(brand);
  const [localRentalPrice, setLocalRentalPrice] = useState(rentalPrice);
  const [localMinMileage, setLocalMinMileage] = useState(minMileage);
  const [localMaxMileage, setLocalMaxMileage] = useState(maxMileage);

  const priceOptions = Array.from({ length: 10 }, (_, i) => 30 + i * 10);

  useEffect(() => {
    getBrands().then(setBrands);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Обновляем глобальные фильтры Zustand
    setBrand(localBrand);
    setRentalPrice(localRentalPrice);
    setMinMileage(localMinMileage);
    setMaxMileage(localMaxMileage);
    setPage("1"); // сброс страницы при новом поиске

    // Вызываем загрузку на странице
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="filters">
      {" "}
      <label>
        Brand:
        <select
          value={localBrand}
          onChange={(e) => setLocalBrand(e.target.value)}
        >
          {" "}
          <option value="">Any</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}{" "}
            </option>
          ))}{" "}
        </select>{" "}
      </label>
      <label>
        Price:
        <select
          value={localRentalPrice}
          onChange={(e) => setLocalRentalPrice(e.target.value)}
        >
          <option value="">Any</option>
          {priceOptions.map((p) => (
            <option key={p} value={String(p)}>
              ${p}
            </option>
          ))}
        </select>
      </label>
      <label>
        Mileage (km):
        <input
          type="number"
          placeholder="From"
          value={localMinMileage}
          onChange={(e) => setLocalMinMileage(e.target.value)}
        />
        <input
          type="number"
          placeholder="To"
          value={localMaxMileage}
          onChange={(e) => setLocalMaxMileage(e.target.value)}
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
