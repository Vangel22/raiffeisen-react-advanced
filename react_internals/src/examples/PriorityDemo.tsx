import React, { useState, useTransition } from "react";

const bigList = Array.from({ length: 12000 }, (_, i) => `Item ${i + 1}`);

export const PriorityDemo = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(bigList);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value); // this is instant -> urgent

    startTransition(() => {
      const results = bigList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(results);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2> React priority demo</h2>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type to filter..."
        style={{ padding: "8px", fontSize: "16px", marginBottom: "10px" }}
      />
      {isPending && (
        <p style={{ color: "orange" }}>Filtering in the background...</p>
      )}

      <ul style={{ maxHeight: "200px", overflow: "auto" }}>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// export default PriorityDemo;
