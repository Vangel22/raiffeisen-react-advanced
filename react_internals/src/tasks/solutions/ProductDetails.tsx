import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  inStock: boolean;
}

// Simulate heavy computation for product details
const processProductDetails = (product: Product) => {
  const start = performance.now();
  while (performance.now() - start < 200) {
    // Simulate heavy processing
  }

  return {
    ...product,
    processedAt: new Date().toISOString(),
    recommendations: Math.floor(Math.random() * 5) + 1,
    similarProducts: Math.floor(Math.random() * 10) + 1,
  };
};

export default function ProductDetails({ productId }: { productId: number }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock product data
      const mockProduct: Product = {
        id: productId,
        name: `Product ${productId}`,
        price: Math.floor(Math.random() * 1000) + 50,
        category: ["Electronics", "Clothing", "Books", "Home", "Sports"][
          Math.floor(Math.random() * 5)
        ],
        description: `This is a detailed description for Product ${productId}. It includes all the features and specifications that customers need to know.`,
        image: `https://picsum.photos/400/300?random=${productId}`,
        rating: Math.floor(Math.random() * 5) + 1,
        inStock: Math.random() > 0.2,
      };

      const processedProduct = processProductDetails(mockProduct);
      setProduct(processedProduct);
      setLoading(false);
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
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
        <div style={{ color: "#ccc" }}>Processing heavy product data...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "#dc3545",
          backgroundColor: "#1f1f1f",
        }}
      >
        Product not found
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #444",
        borderRadius: "8px",
        backgroundColor: "#2a2a2a",
        boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        color: "white",
      }}
    >
      <h2 style={{ color: "white" }}>{product.name}</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: "0 0 200px" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ flex: "1" }}>
          <div style={{ marginBottom: "10px", color: "white" }}>
            <strong>Price:</strong>{" "}
            <span style={{ color: "#66b3ff" }}>${product.price}</span>
          </div>

          <div style={{ marginBottom: "10px", color: "white" }}>
            <strong>Category:</strong> {product.category}
          </div>

          <div style={{ marginBottom: "10px", color: "white" }}>
            <strong>Rating:</strong> {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
          </div>

          <div style={{ marginBottom: "10px", color: "white" }}>
            <strong>Availability:</strong>
            <span
              style={{
                color: product.inStock ? "#28a745" : "#dc3545",
                marginLeft: "5px",
              }}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div style={{ marginBottom: "20px", color: "white" }}>
            <strong>Description:</strong>
            <p style={{ margin: "5px 0", lineHeight: "1.5", color: "white" }}>
              {product.description}
            </p>
          </div>

          <div
            style={{
              padding: "15px",
              backgroundColor: "#1a1a1a",
              borderRadius: "4px",
              fontSize: "14px",
              color: "white",
            }}
          >
            <div>
              <strong>Processed at:</strong> {product.processedAt}
            </div>
            <div>
              <strong>Recommendations:</strong> {product.recommendations} items
            </div>
            <div>
              <strong>Similar products:</strong> {product.similarProducts} found
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
