// app/catalog/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getCars } from "@/lib/api";
import { Car } from "@/lib/types";
import { useCarStore } from "@/store/useCarStore";
import { useCarsFilters } from "@/store/useCarsFilters";
import CarCard from "@/components/CarCard/CarCard";
import CarFilters from "./CarFilters";

import css from "./CarsList.module.css";

export default function CarsList() {
  const setCars = useCarStore((state) => state.setCars);
  const cars = useCarStore((state) => state.cars);

  const filtersStore = useCarsFilters();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchCars = async (targetPage: number, reset = false) => {
    if (loading) return;
    setLoading(true);

    const params = filtersStore.getParams();
    const query = { ...params, page: String(targetPage), limit: "12" };
    const data: { cars: Car[] } = await getCars(query);

    if (reset) {
      setCars(data.cars);
    } else {
      setCars((prevCars) => {
        const newCars = [...prevCars];
        data.cars.forEach((car) => {
          if (!newCars.find((c) => c.id === car.id)) newCars.push(car);
        });
        return newCars;
      });
    }

    setHasMore(data.cars.length === 12);
    setLoading(false);
  };

  const handleSearch = async () => {
    await fetchCars(1, true);
    setPage(1); // теперь после загрузки
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchCars(nextPage);
  };

  // Загрузка первой страницы при первом рендере каталога
  useEffect(() => {
    const loadInitial = async () => {
      await fetchCars(1, true); // передаем 1 напрямую
      setPage(1); // setState после await
    };
    loadInitial();
  }, []);

  return (
    <div className="container">
      {" "}
      <CarFilters onSearch={handleSearch} />
      <ul className={css.contentBox}>
        {cars.map((car) => (
          <li key={car.id}>
            <CarCard {...car} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className={css.loadMore}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
