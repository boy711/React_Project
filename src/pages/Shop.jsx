import { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productApi";

function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.products);
        setError("");
      } catch (apiError) {
        setError(apiError.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [products, searchTerm]);

  return (
    <section className="section page-section">
      <div className="page-header">
        <p className="eyebrow">Shop all</p>
        <h1>Find products for your student lifestyle</h1>
      </div>

      <div className="shop-controls">
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {loading && <Loading message="Fetching products..." />}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <p className="results-count">{filteredProducts.length} products found</p>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Shop;
