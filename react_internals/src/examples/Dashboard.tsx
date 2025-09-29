import { Suspense, lazy, useTransition, useState } from "react";

const Charts = lazy(() => import("../components/Charts"));
const Reports = lazy(() => import("../components/Reports"));
const Stats = lazy(() => import("../components/Stats"));

export default function Dashboard() {
  const [isPending, startTransition] = useTransition();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    startTransition(() => {
      setRefreshKey((prev) => prev + 1);
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1f1f1f",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>Dashboard</h1>

      <button onClick={handleRefresh} disabled={isPending}>
        {isPending ? "Refreshing..." : "Refresh data"}
      </button>

      <div style={{ display: "grid", gap: "20px" }}>
        <Suspense
          fallback={<span style={{ fontSize: 30 }}>Loading Charts</span>}
        >
          <Charts key={`charts-${refreshKey}`} />
        </Suspense>
        <Suspense
          fallback={<span style={{ fontSize: 30 }}>Loading Reports</span>}
        >
          <Reports key={`charts-${refreshKey}`} />
        </Suspense>
        <Suspense
          fallback={<span style={{ fontSize: 30 }}>Loading Stats</span>}
        >
          <Stats key={`charts-${refreshKey}`} />
        </Suspense>
      </div>
    </div>
  );
}

// export default Dashbord;
