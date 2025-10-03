import { useEffect, useState } from "react";
import { fetchLocations, type Location } from "../tests/integration/rickApi";

export const LocationList = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocations()
      .then(setLocations)
      .catch(() => setError("Failed to load locations"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {locations.map((l) => (
        <li key={l.id}>
          {l.name} – {l.type} ({l.dimension})
        </li>
      ))}
    </ul>
  );
};
