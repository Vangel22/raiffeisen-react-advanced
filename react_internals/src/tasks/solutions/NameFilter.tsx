import { useState, useTransition } from "react";

// Generate 5,000 names
const generateNames = () => {
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
    "Kate",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Paul",
    "Quinn",
    "Rachel",
    "Sam",
    "Tina",
    "Uma",
    "Victor",
    "Wendy",
    "Xavier",
    "Yara",
    "Zoe",
    "Adam",
    "Beth",
    "Chris",
    "Dana",
    "Eric",
    "Fiona",
    "George",
    "Hannah",
    "Ian",
    "Julia",
    "Kevin",
    "Lisa",
    "Mike",
    "Nina",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
    "Young",
    "Allen",
    "King",
    "Wright",
    "Scott",
    "Torres",
    "Nguyen",
    "Hill",
    "Flores",
    "Green",
  ];

  return Array.from({ length: 5000 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName} ${i + 1}`;
  });
};

const names = generateNames();

export default function NameFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();
  const [filteredNames, setFilteredNames] = useState(names);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    // Use startTransition to defer the heavy filtering operation
    startTransition(() => {
      if (value.trim() === "") {
        return;
      } else {
        const filtered = names.filter((name) =>
          name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredNames(filtered);
      }
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Name Filter (5,000 names)</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search names..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        {isPending && (
          <div
            style={{
              color: "#666",
              fontSize: "14px",
              marginTop: "5px",
              fontStyle: "italic",
            }}
          >
            Updating...
          </div>
        )}
      </div>

      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          border: "1px solid #eee",
          borderRadius: "4px",
          padding: "10px",
        }}
      >
        <p style={{ margin: "0 0 10px 0", color: "#666" }}>
          Showing {filteredNames.length} of {names.length} names
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filteredNames.map((name, index) => (
            <li
              key={index}
              style={{
                padding: "5px 0",
                borderBottom: "1px solid #f0f0f0",
                fontSize: "14px",
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
