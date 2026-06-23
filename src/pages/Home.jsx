import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productApi";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const data = await getProducts();
        setFeaturedProducts(data.products.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  return (
    <>
      <Hero />

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Featured products</p>
          <h2>Popular picks for students</h2>
        </div>

        {loading ? (
          <Loading message="Loading featured products..." />
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="section benefits-section">
        <div className="benefit-card">
          <h3>Fast Delivery</h3>
          <p>Get useful products quickly for class, study, and daily routines.</p>
        </div>
        <div className="benefit-card">
          <h3>Student Friendly Price</h3>
          <p>Modern essentials selected with simple budgets in mind.</p>
        </div>
        <div className="benefit-card">
          <h3>Quality Products</h3>
          <p>Browse well-presented products with real API data and details.</p>
        </div>
      </section>
    </>
  );
}

export default Home;
