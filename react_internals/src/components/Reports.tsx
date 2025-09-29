import { useState, useEffect, useMemo } from "react";

// Simulate heavy report data processing
const generateReportData = (reportCount: number) => {
  const reports = [];
  for (let i = 0; i < reportCount; i++) {
    reports.push({
      id: i,
      title: `Report ${i + 1}`,
      category: ["Sales", "Marketing", "Finance", "Operations"][i % 4],
      status: ["Draft", "Review", "Approved", "Published"][i % 4],
      priority: ["Low", "Medium", "High", "Critical"][i % 4],
      createdAt: new Date(Date.now() - Math.random() * 1000000000),
      lastModified: new Date(Date.now() - Math.random() * 1000000),
      dataPoints: Math.floor(Math.random() * 1000) + 100,
      complexity: Math.random() * 10,
      author: `Author ${(i % 10) + 1}`,
      tags: [`tag${i % 5}`, `category${i % 3}`, `priority${i % 4}`],
    });
  }
  return reports;
};

// Heavy computation function for report analysis
const analyzeReports = (reports: any[]) => {
  console.log("Analyzing reports...");
  const start = performance.now();

  // Complex data processing
  const analysis = {
    totalReports: reports.length,
    byCategory: reports.reduce((acc, report) => {
      acc[report.category] = (acc[report.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byStatus: reports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byPriority: reports.reduce((acc, report) => {
      acc[report.priority] = (acc[report.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    averageComplexity:
      reports.reduce((sum, r) => sum + r.complexity, 0) / reports.length,
    totalDataPoints: reports.reduce((sum, r) => sum + r.dataPoints, 0),
    recentReports: reports
      .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
      .slice(0, 10),
    complexReports: reports
      .filter((r) => r.complexity > 7)
      .sort((a, b) => b.complexity - a.complexity),
    tagFrequency: reports
      .flatMap((r) => r.tags)
      .reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
  };

  const end = performance.now();
  console.log(`Report analysis took ${end - start} milliseconds`);

  return analysis;
};

export default function Reports() {
  const [reportCount, setReportCount] = useState(500);
  const [reports, setReports] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Heavy computation with useMemo
  const analysis = useMemo(() => {
    if (reports.length === 0) return null;
    return analyzeReports(reports);
  }, [reports]);

  // Filter reports by category
  const filteredReports = useMemo(() => {
    if (!analysis) return [];
    return selectedCategory === "All"
      ? analysis.recentReports
      : reports.filter((r) => r.category === selectedCategory);
  }, [analysis, selectedCategory, reports]);

  useEffect(() => {
    setIsProcessing(true);
    const timer = setTimeout(() => {
      const newReports = generateReportData(reportCount);
      setReports(newReports);
      setIsProcessing(false);
    }, 150); // Simulate async data loading

    return () => clearTimeout(timer);
  }, [reportCount]);

  const handleReportCountChange = (newCount: number) => {
    setReportCount(newCount);
  };

  const categories = analysis ? Object.keys(analysis.byCategory) : [];

  return (
    <div
      style={{ padding: "20px", border: "2px solid #2196F3", margin: "10px" }}
    >
      <h2>📋 Heavy Reports Component</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Report Count:
          <select
            value={reportCount}
            onChange={(e) => handleReportCountChange(Number(e.target.value))}
            style={{ marginLeft: "10px", padding: "5px" }}
          >
            <option value={500}>500 (Light)</option>
            <option value={2000}>2,000 (Medium)</option>
            <option value={5000}>5,000 (Heavy)</option>
            <option value={10000}>10,000 (Very Heavy)</option>
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Filter by Category:
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
      </div>

      {isProcessing ? (
        <div style={{ color: "#FF9800", fontSize: "18px" }}>
          🔄 Processing {reportCount.toLocaleString()} reports...
        </div>
      ) : analysis ? (
        <div>
          {/* Analysis Summary */}
          <div style={{ marginBottom: "20px" }}>
            <h3>Analysis Summary</h3>
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
                  border: "1px solid #2196F3",
                }}
              >
                <h4>Total Reports</h4>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "5px 0",
                  }}
                >
                  {analysis.totalReports.toLocaleString()}
                </p>
              </div>

              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#2f2f2f",
                  borderRadius: "8px",
                  border: "1px solid #4CAF50",
                }}
              >
                <h4>Total Data Points</h4>
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
                <h4>Avg Complexity</h4>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "5px 0",
                  }}
                >
                  {analysis.averageComplexity.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Category Distribution */}
            <div style={{ marginBottom: "20px" }}>
              <h4>Distribution by Category</h4>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                {Object.entries(analysis.byCategory).map(
                  ([category, count]) => (
                    <div
                      key={category}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#2f2f2f",
                        borderRadius: "20px",
                        border: "1px solid #2196F3",
                        fontSize: "14px",
                      }}
                    >
                      {category}: {count}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Status Distribution */}
            <div style={{ marginBottom: "20px" }}>
              <h4>Distribution by Status</h4>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                {Object.entries(analysis.byStatus).map(([status, count]) => (
                  <div
                    key={status}
                    style={{
                      padding: "8px 16px",
                      backgroundColor:
                        status === "Published"
                          ? "#2f2f2f"
                          : status === "Approved"
                          ? "#2f2f2f"
                          : status === "Review"
                          ? "#2f2f2f"
                          : "#2f2f2f",
                      borderRadius: "20px",
                      border: `1px solid ${
                        status === "Published"
                          ? "#4CAF50"
                          : status === "Approved"
                          ? "#FF9800"
                          : status === "Review"
                          ? "#E91E63"
                          : "#9C27B0"
                      }`,
                      fontSize: "14px",
                    }}
                  >
                    {status}: {count}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Complex Reports */}
          <div style={{ marginBottom: "20px" }}>
            <h4>Most Complex Reports (Complexity &gt 7)</h4>
            <div
              style={{
                maxHeight: "200px",
                overflow: "auto",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              {analysis.complexReports.slice(0, 20).map((report) => (
                <div
                  key={report.id}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{report.title}</strong>
                    <span style={{ marginLeft: "10px", color: "#666" }}>
                      {report.category}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        padding: "2px 8px",
                        backgroundColor: "#2f2f2f",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "#c62828",
                      }}
                    >
                      Complexity: {report.complexity.toFixed(1)}
                    </span>
                    <span style={{ fontSize: "12px", color: "#666" }}>
                      {report.dataPoints} data points
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports List */}
          <div>
            <h4>
              Recent Reports (
              {selectedCategory === "All" ? "All" : selectedCategory})
            </h4>
            <div
              style={{
                maxHeight: "300px",
                overflow: "auto",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto auto",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{report.title}</strong>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        marginTop: "2px",
                      }}
                    >
                      by {report.author} • {report.dataPoints} data points
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#2f2f2f",
                      borderRadius: "12px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {report.category}
                  </div>
                  <div
                    style={{
                      padding: "4px 8px",
                      backgroundColor:
                        report.status === "Published"
                          ? "#2f2f2f"
                          : report.status === "Approved"
                          ? "#2f2f2f"
                          : report.status === "Review"
                          ? "#2f2f2f"
                          : "#2f2f2f",
                      borderRadius: "12px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {report.status}
                  </div>
                  <div
                    style={{
                      padding: "4px 8px",
                      backgroundColor:
                        report.priority === "Critical"
                          ? "#2f2f2f"
                          : report.priority === "High"
                          ? "#2f2f2f"
                          : report.priority === "Medium"
                          ? "#2f2f2f"
                          : "#2f2f2f",
                      borderRadius: "12px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {report.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>No reports available</div>
      )}
    </div>
  );
}
