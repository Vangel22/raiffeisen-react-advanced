import { useState, useEffect } from "react";

// Simulate heavy computation and data processing
const generateChartData = () => {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      x: i,
      y: Math.sin(i * 0.1) * 100 + Math.random() * 50,
      category: Math.floor(Math.random() * 5),
    });
  }
  return data;
};

const processData = (
  data: Array<{ x: number; y: number; category: number }>
) => {
  // Simulate heavy data processing
  const start = performance.now();
  while (performance.now() - start < 100) {
    // Blocking computation to simulate heavy processing
  }

  return data.map((item) => ({
    ...item,
    processed: true,
    value: item.y * 1.2 + Math.random() * 10,
  }));
};

export default function ChartComponent() {
  const [data, setData] = useState<
    Array<{
      x: number;
      y: number;
      category: number;
      processed: boolean;
      value: number;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async loading with delay
    const loadData = async () => {
      setLoading(true);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const rawData = generateChartData();
      const processedData = processData(rawData);

      setData(processedData);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "#666",
        }}
      >
        Processing chart data...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3>Heavy Chart Component</h3>
      <p>This component simulates heavy computation and data processing.</p>

      <div
        style={{
          height: "300px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "10px",
          backgroundColor: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          {/* Simple line chart visualization */}
          <polyline
            fill="none"
            stroke="#007bff"
            strokeWidth="2"
            points={data
              .slice(0, 100) // Show first 100 points for performance
              .map((point, index) => `${index * 4},${100 - point.y}`)
              .join(" ")}
          />

          {/* Data points */}
          {data.slice(0, 100).map((point, index) => (
            <circle
              key={index}
              cx={index * 4}
              cy={100 - point.y}
              r="2"
              fill="#007bff"
            />
          ))}
        </svg>
      </div>

      <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
        <p>Data points: {data.length}</p>
        <p>Processing time: ~100ms (simulated)</p>
        <p>Load time: ~1000ms (simulated)</p>
      </div>
    </div>
  );
}
