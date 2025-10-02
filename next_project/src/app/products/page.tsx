export default async function Products() {
  const res = await fetch("https://dummyjson.com/products?limit=10", {
    next: { revalidate: 10 },
  });

  const { products } = await res.json();

  return (
    <div>
      <h1>Products</h1>
      {products.map((product: any) => (
        <div
          style={{
            border: "1px solid red",
            margin: "20px",
          }}
        >
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <b>{product.price}</b>
        </div>
      ))}
      <div
        style={{
          backgroundColor: "red",
          fontSize: "30px",
          margin: "50px",
          padding: "50px",
        }}
      >
        {new Date().getTime()}
      </div>
    </div>
  );
}
