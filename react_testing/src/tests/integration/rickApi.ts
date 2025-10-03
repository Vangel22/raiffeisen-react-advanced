export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};

export async function fetchLocations(): Promise<Location[]> {
  const res = await fetch("https://rickandmortyapi.com/api/location");

  if (!res.ok) {
    throw new Error("Failed to fetch locations!");
  }

  const data = await res.json();

  return data.results.map((l: Location) => ({
    id: l.id,
    name: l.name,
    type: l.type,
    dimension: l.dimension,
  }));
}
