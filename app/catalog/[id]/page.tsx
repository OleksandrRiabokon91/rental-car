// Этот файл — серверный компонент
// Он получает params как Promise, поэтому нужно использовать await
import CarPageClient from "./CarPageClient";
import { getCarById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  // Разворачиваем Promise
  const { id } = await params;
  // console.log("note id:", id);
  // Передаём id в клиентский компонент
  const carData = await getCarById(id);
  return <CarPageClient initialCar={carData} />;
}
