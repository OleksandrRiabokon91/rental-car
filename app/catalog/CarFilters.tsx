// app/catalog/CarFilters.tsx

"use client";

import { useState, useEffect } from "react";
import { getBrands } from "@/lib/api";

interface Filters {
  brand?: string;
  price?: string;
  mileageFrom?: number;
  mileageTo?: number;
}

interface CarFiltersProps {
  onSearch: (filters: Filters) => void;
  priceOptions?: number[];
}

export default function CarFilters({
  onSearch,
  priceOptions,
}: CarFiltersProps) {
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [mileageFrom, setMileageFrom] = useState<number | "">("");
  const [mileageTo, setMileageTo] = useState<number | "">("");

  useEffect(() => {
    async function fetchBrands() {
      const data = await getBrands();
      setBrands(data);
    }
    fetchBrands();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch({
      brand: selectedBrand || undefined,
      price: selectedPrice || undefined, // price как строка
      mileageFrom: mileageFrom === "" ? undefined : mileageFrom,
      mileageTo: mileageTo === "" ? undefined : mileageTo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="filters">
      {/* Brand selector */}{" "}
      <label>
        Brand:
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          {" "}
          <option value="">Any</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}{" "}
            </option>
          ))}{" "}
        </select>{" "}
      </label>
      {/* Price selector */}
      <label>
        Price:
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">Any</option>
          {priceOptions?.map((price) => (
            <option key={price} value={String(price)}>
              ${price}
            </option>
          ))}
        </select>
      </label>
      {/* Mileage range */}
      <label>
        Mileage (km):
        <input
          type="number"
          placeholder="From"
          value={mileageFrom}
          onChange={(e) =>
            setMileageFrom(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
        <input
          type="number"
          placeholder="To"
          value={mileageTo}
          onChange={(e) =>
            setMileageTo(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
