import Image from "next/image";
import Link from "next/link";
import css from "./Car.Card.module.css";
import { formatNumberWithSpaces } from "@/lib/utils";

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
  // Деструктуризация пропсов
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

  // Форматируем пробег
  const km = formatNumberWithSpaces(mileage);

  // Разделяем адрес на город и страну
  const addressParts = address.split(",").map((s) => s.trim());
  const city =
    addressParts.length >= 2 ? addressParts[addressParts.length - 2] : "";
  const country =
    addressParts.length >= 1 ? addressParts[addressParts.length - 1] : "";

  return (
    <div className={css.carCard}>
      <Image src={img} alt={`${brand} ${model}`} width={276} height={268} />
      <h3>
        {brand} {model}, {year} ${rentalPrice}
      </h3>
      <p>
        {city} | {country} | {rentalCompany} <br /> {type} | {km} km
      </p>
      <Link href={`/catalog/${id}`}>Read More</Link>
    </div>
  );
}
