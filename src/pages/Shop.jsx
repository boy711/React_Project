import { useEffect, useMemo, useState } from "react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productApi";

function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
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

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortOrder === "low-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortOrder]);

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
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All categories" : category}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="default">Sort by price</option>
          <option value="low-high">Low to high</option>
          <option value="high-low">High to low</option>
        </select>
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
