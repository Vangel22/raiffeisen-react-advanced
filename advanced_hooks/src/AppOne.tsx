import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useMobile } from "./hooks/useMobile";
import { useFetch } from "./hooks/useFetch";

const AppOne = () => {
  const isMobile = useMobile();
  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce(search, 1000);

  const { data, loading, error, refetch } = useFetch(
    `https://dummyjson.com/users`
    // {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }
  );

  return (
    <div>
      <h1>AppOne {isMobile ? "Mobile" : "Desktop"}</h1>
      <h1>{debouncedValue}</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {data ? JSON.stringify(data) : "No data"}
        {loading ? "Loading..." : "Not loading"}
        {error ? error.message : "No error"}
        <button onClick={refetch}>Refetch</button>
      </div>
    </div>
  );
};

export default AppOne;
