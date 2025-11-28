// Этот файл — серверный компонент
// Он получает params как Promise, поэтому нужно использовать await
import CarPageClient from "./CarPageClient";

export default async function Page({ params }: { params: { id: string } }) {
  // Разворачиваем Promise
  const { id } = await params;

  // Передаём id в клиентский компонент
  return <CarPageClient id={id} />;
}
