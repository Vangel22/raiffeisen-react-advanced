import { useState, useEffect, useMemo } from "react";

// Simulate heavy statistics data processing
const generateStatsData = (statCount: number) => {
  const stats = [];
  const metrics = [
    "Page Views",
    "Unique Visitors",
    "Bounce Rate",
    "Conversion Rate",
    "Revenue",
    "Orders",
    "Customer Satisfaction",
    "Response Time",
    "Uptime",
    "Error Rate",
    "CPU Usage",
    "Memory Usage",
    "Database Queries",
    "API Calls",
    "Cache Hit Rate",
    "Load Time",
  ];

  for (let i = 0; i < statCount; i++) {
    const metric = metrics[i % metrics.length];
    const baseValue = Math.random() * 1000;
    const trend = Math.random() > 0.5 ? 1 : -1;
    const variance = Math.random() * 0.3;

    stats.push({
      id: i,
      metric,
      currentValue: baseValue,
      previousValue: baseValue * (1 + trend * variance),
      trend: trend > 0 ? "up" : "down",
      changePercent: trend * variance * 100,
      unit:
        metric.includes("Rate") || metric.includes("Usage")
          ? "%"
          : metric.includes("Time")
          ? "ms"
          : metric.includes("Revenue")
          ? "$"
          : "",
      category: ["Performance", "Business", "Technical", "User Experience"][
        i % 4
      ],
      priority: ["Low", "Medium", "High", "Critical"][i % 4],
      lastUpdated: new Date(Date.now() - Math.random() * 3600000),
      dataPoints: Math.floor(Math.random() * 10000) + 1000,
      confidence: Math.random() * 0.4 + 0.6, // 60-100%
      threshold: {
        warning: baseValue * 0.8,
        critical: baseValue * 0.6,
      },
    });
  }
  return stats;
};

// Heavy computation function for statistics analysis
const analyzeStats = (stats: any[]) => {
  console.log("Analyzing statistics...");
  const start = performance.now();

  // Complex statistical analysis
  const analysis = {
    totalMetrics: stats.length,
    totalDataPoints: stats.reduce((sum, stat) => sum + stat.dataPoints, 0),
    averageConfidence:
      stats.reduce((sum, stat) => sum + stat.confidence, 0) / stats.length,

    // Performance metrics
    performance: stats.filter((s) => s.category === "Performance"),
    business: stats.filter((s) => s.category === "Business"),
    technical: stats.filter((s) => s.category === "Technical"),
    userExperience: stats.filter((s) => s.category === "User Experience"),

    // Trend analysis
    trendingUp: stats.filter((s) => s.trend === "up"),
    trendingDown: stats.filter((s) => s.trend === "down"),

    // Priority analysis
    critical: stats.filter((s) => s.priority === "Critical"),
    high: stats.filter((s) => s.priority === "High"),
    medium: stats.filter((s) => s.priority === "Medium"),
    low: stats.filter((s) => s.priority === "Low"),

    // Threshold analysis
    warning: stats.filter(
      (s) =>
        s.currentValue <= s.threshold.warning &&
        s.currentValue > s.threshold.critical
    ),
    critical: stats.filter((s) => s.currentValue <= s.threshold.critical),

    // Top performers
    topPerformers: stats
      .filter((s) => s.trend === "up")
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 10),

    // Bottom performers
    bottomPerformers: stats
      .filter((s) => s.trend === "down")
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 10),

    // Category summaries
    categorySummary: stats.reduce((acc, stat) => {
      if (!acc[stat.category]) {
        acc[stat.category] = {
          count: 0,
          totalValue: 0,
          averageChange: 0,
          trendingUp: 0,
          trendingDown: 0,
        };
      }
      acc[stat.category].count++;
      acc[stat.category].totalValue += stat.currentValue;
      acc[stat.category].averageChange += stat.changePercent;
      if (stat.trend === "up") acc[stat.category].trendingUp++;
      if (stat.trend === "down") acc[stat.category].trendingDown++;
      return acc;
    }, {} as Record<string, any>),
  };

  // Calculate averages
  Object.keys(analysis.categorySummary).forEach((category) => {
    const summary = analysis.categorySummary[category];
    summary.averageValue = summary.totalValue / summary.count;
    summary.averageChange = summary.averageChange / summary.count;
  });

  const end = performance.now();
  console.log(`Statistics analysis took ${end - start} milliseconds`);

  return analysis;
};

export default function Stats() {
  const [statCount, setStatCount] = useState(100);
  const [stats, setStats] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("value");

  // Heavy computation with useMemo
  const analysis = useMemo(() => {
    if (stats.length === 0) return null;
    return analyzeStats(stats);
  }, [stats]);

  // Filter and sort stats
  const filteredStats = useMemo(() => {
    if (!analysis) return [];

    let filtered =
      selectedCategory === "All"
        ? stats
        : stats.filter((s) => s.category === selectedCategory);

    // Sort by selected criteria
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "value":
          return b.currentValue - a.currentValue;
        case "change":
          return b.changePercent - a.changePercent;
        case "confidence":
          return b.confidence - a.confidence;
        case "priority":
          const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

    return filtered;
  }, [analysis, selectedCategory, stats, sortBy]);

  useEffect(() => {
    setIsProcessing(true);
    const timer = setTimeout(() => {
      const newStats = generateStatsData(statCount);
      setStats(newStats);
      setIsProcessing(false);
    }, 200); // Simulate async data loading

    return () => clearTimeout(timer);
  }, [statCount]);

  const handleStatCountChange = (newCount: number) => {
    setStatCount(newCount);
  };

  const categories = analysis ? Object.keys(analysis.categorySummary) : [];

  return (
    <div
      style={{ padding: "20px", border: "2px solid #FF5722", margin: "10px" }}
    >
      <h2>📈 Heavy Stats Component</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Stat Count:
          <select
            value={statCount}
            onChange={(e) => handleStatCountChange(Number(e.target.value))}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value={100}>100 (Light)</option>
            <option value={500}>500 (Medium)</option>
            <option value={1000}>1,000 (Heavy)</option>
            <option value={2000}>2,000 (Very Heavy)</option>
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Sort By:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value="value">Value</option>
            <option value="change">Change %</option>
            <option value="confidence">Confidence</option>
            <option value="priority">Priority</option>
          </select>
        </label>
      </div>

      {isProcessing ? (
        <div style={{ color: "#FF9800", fontSize: "18px" }}>
          🔄 Processing {statCount.toLocaleString()} statistics...
        </div>
      ) : analysis ? (
        <div>
          {/* Overview Cards */}
          <div style={{ marginBottom: "20px" }}>
            <h3>Overview</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#2f2f2f",
                  borderRadius: "8px",
                  border: "1px solid #4CAF50",
                }}
              >
                <h4>Total Metrics</h4>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "5px 0",
                  }}
                >
                  {analysis.totalMetrics.toLocaleString()}
                </p>
              </div>

              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#2f2f2f",
                  borderRadius: "8px",
                  border: "1px solid #2196F3",
                }}
              >
                <h4>Data Points</h4>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "5px 0",
                  }}
                >
                  {analysis.totalDataPoints.toLocaleString()}
                </p>
              </div>

              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#2f2f2f",
                  borderRadius: "8px",
                  border: "1px solid #FF9800",
                }}
              >
                <h4>Avg Confidence</h4>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "5px 0",
                  }}
                >
                  {(analysis.averageConfidence * 100).toFixed(1)}%
                </p>
              </div>

              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#2f2f2f",
                  borderRadius: "8px",
                  border: "1px solid #E91E63",
                }}
              >
                <h4>Critical Alerts</h4>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "5px 0",
                  }}
                >
                  {analysis.critical.length}
                </p>
              </div>
            </div>
          </div>

          {/* Category Summary */}
          <div style={{ marginBottom: "20px" }}>
            <h4>Category Summary</h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "15px",
                marginTop: "10px",
              }}
            >
              {Object.entries(analysis.categorySummary).map(
                ([category, summary]) => (
                  <div
                    key={category}
                    style={{
                      padding: "15px",
                      backgroundColor: "#2f2f2f",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <h5>{category}</h5>
                    <p>Metrics: {summary.count}</p>
                    <p>Avg Value: {summary.averageValue.toFixed(2)}</p>
                    <p>Avg Change: {summary.averageChange.toFixed(1)}%</p>
                    <div
                      style={{ display: "flex", gap: "10px", marginTop: "5px" }}
                    >
                      <span style={{ color: "#4CAF50", fontSize: "12px" }}>
                        ↗ {summary.trendingUp}
                      </span>
                      <span style={{ color: "#F44336", fontSize: "12px" }}>
                        ↘ {summary.trendingDown}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Top/Bottom Performers */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div>
                <h4>Top Performers</h4>
                <div
                  style={{
                    maxHeight: "200px",
                    overflow: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "10px",
                  }}
                >
                  {analysis.topPerformers.map((stat) => (
                    <div
                      key={stat.id}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #eee",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <strong>{stat.metric}</strong>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {stat.currentValue.toFixed(2)}
                          {stat.unit}
                        </div>
                      </div>
                      <span
                        style={{
                          color: "#4CAF50",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        +{stat.changePercent.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4>Bottom Performers</h4>
                <div
                  style={{
                    maxHeight: "200px",
                    overflow: "auto",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "10px",
                  }}
                >
                  {analysis.bottomPerformers.map((stat) => (
                    <div
                      key={stat.id}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #eee",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <strong>{stat.metric}</strong>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          {stat.currentValue.toFixed(2)}
                          {stat.unit}
                        </div>
                      </div>
                      <span
                        style={{
                          color: "#F44336",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {stat.changePercent.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Stats List */}
          <div>
            <h4>
              Statistics (
              {selectedCategory === "All" ? "All" : selectedCategory}) - Sorted
              by {sortBy}
            </h4>
            <div
              style={{
                maxHeight: "400px",
                overflow: "auto",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              {filteredStats.map((stat) => (
                <div
                  key={stat.id}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr auto",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{stat.metric}</strong>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        marginTop: "2px",
                      }}
                    >
                      {stat.category} • Confidence:{" "}
                      {(stat.confidence * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                      {stat.currentValue.toFixed(2)}
                      {stat.unit}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      vs {stat.previousValue.toFixed(2)}
                      {stat.unit}
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <span
                      style={{
                        color: stat.trend === "up" ? "#4CAF50" : "#F44336",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {stat.trend === "up" ? "↗" : "↘"}{" "}
                      {Math.abs(stat.changePercent).toFixed(1)}%
                    </span>
                  </div>

                  <div
                    style={{
                      padding: "4px 8px",
                      backgroundColor:
                        stat.priority === "Critical"
                          ? "#2f2f2f"
                          : stat.priority === "High"
                          ? "#2f2f2f"
                          : stat.priority === "Medium"
                          ? "#2f2f2f"
                          : "#2f2f2f",
                      borderRadius: "12px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {stat.priority}
                  </div>

                  <div
                    style={{
                      padding: "4px 8px",
                      backgroundColor:
                        stat.currentValue <= stat.threshold.critical
                          ? "#2f2f2f"
                          : stat.currentValue <= stat.threshold.warning
                          ? "#2f2f2f"
                          : "#2f2f2f",
                      borderRadius: "12px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {stat.currentValue <= stat.threshold.critical
                      ? "Critical"
                      : stat.currentValue <= stat.threshold.warning
                      ? "Warning"
                      : "Normal"}
                  </div>

                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {stat.dataPoints.toLocaleString()} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>No statistics available</div>
      )}
    </div>
  );
}
