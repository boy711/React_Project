import { Link, useLocation } from "react-router-dom";

function ThankYou() {
  const location = useLocation();
  const customerName = location.state?.customerName || "Student";
  const orderTotal = location.state?.orderTotal;

  return (
    <section className="section page-section empty-state thank-you-page">
      <p className="eyebrow">Order placed</p>
      <h1>Thank you for ordering, {customerName}.</h1>
      <p>
        Your StudentSpace Store order has been received. We will prepare your
        products for delivery.
      </p>
      {typeof orderTotal === "number" && (
        <strong className="thank-you-total">
          Order total: ${orderTotal.toFixed(2)}
        </strong>
      )}
      <div className="thank-you-actions">
        <Link className="primary-button" to="/shop">
          Continue Shopping
        </Link>
        <Link className="secondary-button" to="/">
          Back Home
        </Link>
      </div>
    </section>
  );
}

export default ThankYou;
