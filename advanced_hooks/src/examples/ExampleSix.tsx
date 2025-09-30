import { useState, useRef, forwardRef, useImperativeHandle } from "react";

interface ExampleFiveProps {
  className?: string;
}

export interface ExampleSixHandle {
  focusInput: () => void;
}

const bigList = Array.from({ length: 20000 }, (_, i) => `Item ${i + 1}`);

const ExampleSix = forwardRef<ExampleSixHandle, ExampleFiveProps>(
  ({ className }, ref) => {
    const [count, setCount] = useState(0);
    const [showList, setShowList] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const prevCountRef = useRef<number | null>(null);

    const toggleList = () => setShowList(!showList);

    const handleFocus = () => {
      inputRef.current?.focus();
    };

    const handleIncrement = () => {
      prevCountRef.current = count;
      setCount(count + 1);
    };

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        console.log("focusInput");
        handleFocus();
      },
    }));

    const scrollToTopLocal = () => {
      console.log("scrollToTopLocal");
      inputRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <div
        className={className}
        style={{ maxHeight: "400px", overflow: "auto", padding: "20px" }}
      >
        <h2>useRef Demo with forwardRef</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Click button to focus"
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button onClick={handleFocus}>Focus Input</button>
        </div>
        <button onClick={scrollToTopLocal}>Scroll to Top</button>

        <div style={{ marginBottom: "20px" }}>
          <p>Current Count: {count}</p>
          <p>Previous Count: {prevCountRef.current ?? "None"}</p>
          <button onClick={handleIncrement}>Increment Count</button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={toggleList}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {showList ? "Hide List" : "Show List"}
          </button>
        </div>

        {showList && (
          <div>
            <h3>Big List ({bigList.length} items):</h3>
            <div
              style={{
                maxHeight: "200px",
                overflow: "auto",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              {bigList.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "2px 5px",
                    backgroundColor: index % 2 === 0 ? "#2f2f2f" : "#1f1f1f",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default ExampleSix;
