import { useState, useEffect, useMemo } from "react";

// Simulate heavy chart data processing
const generateChartData = (size: number) => {
  const data = [];
  for (let i = 0; i < size; i++) {
    data.push({
      id: i,
      value: Math.random() * 100,
      category: `Category ${i % 10}`,
      timestamp: new Date(Date.now() - Math.random() * 1000000000),
    });
  }
  return data;
};

// Heavy computation function
const processChartData = (data: any[]) => {
  console.log("Processing chart data...");
  const start = performance.now();

  // Simulate heavy computation
  const processed = data.map((item) => ({
    ...item,
    normalizedValue: item.value / 100,
    trend: item.value > 50 ? "up" : "down",
    score: Math.pow(item.value, 1.5) + Math.sin(item.id) * 10,
  }));

  // Additional heavy operations
  const sorted = processed.sort((a, b) => b.score - a.score);
  const grouped = sorted.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const end = performance.now();
  console.log(`Chart data processing took ${end - start} milliseconds`);

  return { processed, grouped };
};

export default function Charts() {
  const [dataSize, setDataSize] = useState(1000);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Heavy computation with useMemo
  const processedData = useMemo(() => {
    if (chartData.length === 0) return null;
    return processChartData(chartData);
  }, [chartData]);

  useEffect(() => {
    setIsProcessing(true);
    const timer = setTimeout(() => {
      const newData = generateChartData(dataSize);
      setChartData(newData);
      setIsProcessing(false);
    }, 100); // Simulate async data loading

    return () => clearTimeout(timer);
  }, [dataSize]);

  const handleDataSizeChange = (newSize: number) => {
    setDataSize(newSize);
  };

  return (
    <div
      style={{ padding: "20px", border: "2px solid #4CAF50", margin: "10px" }}
    >
      <h2>📊 Heavy Charts Component</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Data Points:
          <select
            value={dataSize}
            onChange={(e) => handleDataSizeChange(Number(e.target.value))}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value={1000}>1,000 (Light)</option>
            <option value={5000}>5,000 (Medium)</option>
            <option value={10000}>10,000 (Heavy)</option>
            <option value={25000}>25,000 (Very Heavy)</option>
          </select>
        </label>
      </div>

      {isProcessing ? (
        <div style={{ color: "#FF9800", fontSize: "18px" }}>
          🔄 Processing {dataSize.toLocaleString()} data points...
        </div>
      ) : processedData ? (
        <div>
          <div style={{ marginBottom: "15px" }}>
            <strong>Processed Data Summary:</strong>
            <ul>
              <li>
                Total Records: {processedData.processed.length.toLocaleString()}
              </li>
              <li>Categories: {Object.keys(processedData.grouped).length}</li>
              <li>
                Average Score:{" "}
                {(
                  processedData.processed.reduce(
                    (sum, item) => sum + item.score,
                    0
                  ) / processedData.processed.length
                ).toFixed(2)}
              </li>
            </ul>
          </div>

          {/* Simulate heavy rendering */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px",
            }}
          >
            {Object.entries(processedData.grouped)
              .slice(0, 6)
              .map(([category, items]) => (
                <div
                  key={category}
                  style={{
                    padding: "10px",
                    backgroundColor: "#2f2f2f",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                >
                  <h4>{category}</h4>
                  <p>Items: {items.length}</p>
                  <p>
                    Avg Value:{" "}
                    {(
                      items.reduce((sum, item) => sum + item.value, 0) /
                      items.length
                    ).toFixed(1)}
                  </p>
                  <div
                    style={{
                      height: "60px",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "4px",
                      marginTop: "5px",
                    }}
                  >
                    {/* Simulate chart bar */}
                    <div
                      style={{
                        height: "100%",
                        width: `${(items[0]?.normalizedValue || 0) * 100}%`,
                        backgroundColor: "#4CAF50",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Additional heavy rendering - detailed list */}
          <details style={{ marginTop: "20px" }}>
            <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
              Show Detailed Data ({processedData.processed.length} items)
            </summary>
            <div
              style={{
                maxHeight: "300px",
                overflow: "auto",
                marginTop: "10px",
              }}
            >
              {processedData.processed.slice(0, 100).map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    padding: "5px",
                    borderBottom: "1px solid #eee",
                    fontSize: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    #{item.id}: {item.value.toFixed(2)}
                  </span>
                  <span>Score: {item.score.toFixed(2)}</span>
                  <span
                    style={{
                      color: item.trend === "up" ? "#4CAF50" : "#F44336",
                    }}
                  >
                    {item.trend}
                  </span>
                </div>
              ))}
              {processedData.processed.length > 100 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "#666",
                  }}
                >
                  ... and {processedData.processed.length - 100} more items
                </div>
              )}
            </div>
          </details>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}
