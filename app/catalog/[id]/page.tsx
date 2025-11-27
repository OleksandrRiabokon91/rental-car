// app/catalog/[id]/page.tsx
export default async function CarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log("ID:", id);

  return <h2>One Car got by ID: {id}</h2>;
}
