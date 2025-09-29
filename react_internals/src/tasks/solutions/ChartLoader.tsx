import { Suspense, lazy, useState } from "react";

// Lazy load the heavy ChartComponent
const ChartComponent = lazy(() => import("./ChartComponent"));

export default function ChartLoader() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Lazy Loading with Suspense</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setShowChart(!showChart)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: showChart ? "#dc3545" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {showChart ? "Hide Chart" : "Show Chart"}
        </button>

        <p style={{ marginTop: "10px", color: "#666" }}>
          Click the button to lazy load the heavy chart component.
        </p>
      </div>

      {showChart && (
        <Suspense
          fallback={
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                📊 Loading chart...
              </div>
              <div style={{ color: "#666" }}>
                This component is being loaded lazily with React.lazy()
              </div>
            </div>
          }
        >
          <ChartComponent />
        </Suspense>
      )}

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#1a1a1a",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <h4>What's happening:</h4>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>ChartComponent is loaded only when "Show Chart" is clicked</li>
          <li>React.lazy() creates a code-split bundle</li>
          <li>Suspense shows fallback while the component loads</li>
          <li>Heavy computation is deferred until needed</li>
        </ul>
      </div>
    </div>
  );
}
