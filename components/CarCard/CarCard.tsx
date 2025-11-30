import Image from "next/image";
import Link from "next/link";
import css from "./Car.Card.module.css";
import { formatNumberWithSpaces } from "@/lib/utils";
import { useFavoritesStore } from "@/store/useFavoritesStore";

// Типизация пропсов для компонента CarCard
export type CarCardProps = {
  id: string;
  year: number;
  brand: string;
  model: string;
  img: string;
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  mileage: number;
  type: string;
};

// Компонент CarCard
export default function CarCard(props: CarCardProps) {
  const {
    id,
    year,
    brand,
    model,
    img,
    rentalPrice,
    rentalCompany,
    address,
    mileage,
    type,
  } = props;

  const km = formatNumberWithSpaces(mileage);

  // Извлекаем город и страну
  const addressParts = address.split(",").map((s) => s.trim());
  const city =
    addressParts.length >= 2 ? addressParts[addressParts.length - 2] : "";
  const country =
    addressParts.length >= 1 ? addressParts[addressParts.length - 1] : "";

  // Подключаем Zustand store для избранного
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFav = favorites.includes(id); // проверяем, в избранном ли эта машина

  return (
    <div className={css.carCard}>
      <Image src={img} alt={`${brand} ${model}`} width={276} height={268} />{" "}
      <h3>
        {brand} {model}, {year} ${rentalPrice}{" "}
      </h3>{" "}
      <p>
        {city} | {country} | {rentalCompany} <br /> {type} | {km} km{" "}
      </p>
      <Link href={`/catalog/${id}`}>Read More</Link>
      {/* Кнопка избранного */}
      <button
        className={isFav ? css.favActive : css.fav} // можно в CSS сделать разный стиль
        onClick={() => toggleFavorite(id)}
      >
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
