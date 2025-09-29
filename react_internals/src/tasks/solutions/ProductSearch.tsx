import { useState, useTransition, Suspense, lazy } from "react";

// Lazy load the ProductDetails component
const ProductDetails = lazy(() => import("./ProductDetails"));

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
}

// Generate 1,000 mock products
const generateProducts = (): Product[] => {
  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home",
    "Sports",
    "Toys",
    "Beauty",
    "Automotive",
  ];

  return Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 50,
    category: categories[Math.floor(Math.random() * categories.length)],
    description: `Description for Product ${i + 1}`,
    inStock: Math.random() > 0.2,
  }));
};

const products = generateProducts();

export default function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [isPending, startTransition] = useTransition();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    // Use startTransition to defer the heavy filtering operation
    startTransition(() => {
      if (value.trim() === "") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(
          (product) =>
            product.name.toLowerCase().includes(value.toLowerCase()) ||
            product.category.toLowerCase().includes(value.toLowerCase()) ||
            product.description.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    });
  };

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  if (selectedProductId) {
    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#1f1f1f",
          minHeight: "100vh",
        }}
      >
        <button
          onClick={handleBackToList}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          ← Back to Products
        </button>

        <Suspense
          fallback={
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                border: "2px dashed #007bff",
                borderRadius: "8px",
                backgroundColor: "#2a2a2a",
                color: "white",
              }}
            >
              <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                🔍 Loading product details...
              </div>
              <div style={{ color: "#ccc" }}>
                This component is being loaded lazily
              </div>
            </div>
          }
        >
          <ProductDetails productId={selectedProductId} />
        </Suspense>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#1f1f1f",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "white" }}>Product Search (1,000 products)</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search products by name, category, or description..."
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #444",
            borderRadius: "4px",
            marginBottom: "10px",
            backgroundColor: "#2a2a2a",
            color: "white",
          }}
        />

        {isPending && (
          <div
            style={{
              color: "#ccc",
              fontSize: "14px",
              fontStyle: "italic",
            }}
          >
            🔄 Updating search results...
          </div>
        )}

        <div
          style={{
            color: "#ccc",
            fontSize: "14px",
            marginTop: "5px",
          }}
        >
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "15px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            style={{
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#2a2a2a",
              boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.3)";
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "white",
                fontSize: "16px",
              }}
            >
              {product.name}
            </h3>

            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#66b3ff",
                marginBottom: "8px",
              }}
            >
              ${product.price}
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#ccc",
                marginBottom: "8px",
              }}
            >
              {product.category}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#ccc",
                marginBottom: "10px",
              }}
            >
              {product.description}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: product.inStock ? "#28a745" : "#dc3545",
                  fontWeight: "bold",
                }}
              >
                {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
              </span>

              <span
                style={{
                  fontSize: "12px",
                  color: "#66b3ff",
                }}
              >
                Click for details →
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#2a2a2a",
          borderRadius: "8px",
          fontSize: "14px",
          color: "white",
        }}
      >
        <h3 style={{ color: "white" }}>Features Demonstrated:</h3>
        <ul style={{ margin: "10px 0", paddingLeft: "20px", color: "white" }}>
          <li>
            <strong>useTransition:</strong> Search filtering is deferred to keep
            typing responsive
          </li>
          <li>
            <strong>React.lazy:</strong> ProductDetails component is loaded only
            when needed
          </li>
          <li>
            <strong>Suspense:</strong> Shows loading fallback while
            ProductDetails loads
          </li>
          <li>
            <strong>Heavy Computation:</strong> 1,000 products with complex
            filtering logic
          </li>
          <li>
            <strong>Code Splitting:</strong> ProductDetails is in a separate
            bundle
          </li>
        </ul>
      </div>
    </div>
  );
}
