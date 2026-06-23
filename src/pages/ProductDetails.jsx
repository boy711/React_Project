import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productApi";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setSelectedImage(data.thumbnail);
        setError("");
      } catch (apiError) {
        setError(apiError.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <Loading message="Loading product details..." />;
  }

  if (error) {
    return (
      <section className="section page-section">
        <p className="error-message">{error}</p>
        <Link className="secondary-button" to="/shop">
          Back to Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <Link className="back-link" to="/shop">
        Back to Shop
      </Link>
      <div className="product-details">
        <div className="details-gallery">
          <img className="details-main-image" src={selectedImage} alt={product.title} />
          <div className="thumbnail-row">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={selectedImage === image ? "active-thumb" : ""}
              >
                <img src={image} alt={product.title} />
              </button>
            ))}
          </div>
        </div>

        <div className="details-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="brand-text">Brand: {product.brand || "StudentSpace"}</p>
          <p>{product.description}</p>
          <div className="details-price-row">
            <strong>${product.price}</strong>
            <span>{product.rating} stars</span>
          </div>
          <button
            className="primary-button"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
