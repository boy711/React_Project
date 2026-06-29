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

      <section className="section editorial-section">
        <div className="editorial-image" aria-hidden="true"></div>
        <div className="section-heading">
          <p className="eyebrow">Designed for daily use</p>
          <h2>Less clutter, better choices, and a store that feels easy to scan.</h2>
          <p>
            The layout keeps product images clear, prices visible, and actions
            direct so the shop feels closer to a polished storefront than a
            class project template.
          </p>
          <div className="editorial-list">
            <span>Filtered shopping for quick product discovery</span>
            <span>Cart controls that stay readable on mobile</span>
            <span>Calm colors with warmer accents for personality</span>
          </div>
        </div>
      </section>

      <section className="section benefits-section">
        <div className="benefit-card">
          <h3>Fast browsing</h3>
          <p>Search, filter, and compare products without visual noise.</p>
        </div>
        <div className="benefit-card">
          <h3>Budget aware</h3>
          <p>Sort by price and find practical items that fit student spending.</p>
        </div>
        <div className="benefit-card">
          <h3>Real product data</h3>
          <p>Every listing, detail page, and image comes from the API flow.</p>
        </div>
      </section>
    </>
  );
}

export default Home;
