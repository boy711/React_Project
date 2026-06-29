import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  paymentMethod: "Cash on delivery",
};

function Checkout() {
  const { isLoggedIn, user } = useAuth();
  const { cartItems, clearCart, subtotal, total } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ...initialForm,
    fullName: user?.name || "",
    email: user?.email || "",
  });
  const [errors, setErrors] = useState({});

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: "/checkout" }} />;
  }

  if (cartItems.length === 0) {
    return (
      <section className="section page-section empty-state">
        <h1>Your cart is empty</h1>
        <p>Add products to your cart before checkout.</p>
        <Link className="primary-button" to="/shop">
          Go to Shop
        </Link>
      </section>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address.";
    }

    if (formData.phone.trim().length < 6) {
      newErrors.phone = "Phone number is required.";
    }

    if (formData.address.trim().length < 8) {
      newErrors.address = "Address must be at least 8 characters.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    clearCart();
    navigate("/thank-you", {
      state: {
        customerName: formData.fullName,
        orderTotal: total,
      },
    });
  }

  return (
    <section className="section page-section checkout-layout">
      <div>
        <div className="page-header">
          <p className="eyebrow">Checkout</p>
          <h1>Complete your order</h1>
          <p>Fill in your delivery details, then place your order.</p>
        </div>

        <form className="form-card checkout-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span>{errors.fullName}</span>}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span>{errors.phone}</span>}
          </label>

          <label>
            Delivery Address
            <textarea
              name="address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            {errors.address && <span>{errors.address}</span>}
          </label>

          <label>
            City
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <span>{errors.city}</span>}
          </label>

          <label>
            Payment Method
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option>Cash on delivery</option>
              <option>Credit card</option>
              <option>Bank transfer</option>
            </select>
          </label>

          <button className="primary-button" type="submit">
            Place Order
          </button>
        </form>
      </div>

      <aside className="cart-summary checkout-summary">
        <h2>Order Summary</h2>
        <div className="checkout-items">
          {cartItems.map((item) => (
            <article className="checkout-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <div>
                <strong>{item.title}</strong>
                <span>
                  {item.quantity} x ${item.price}
                </span>
              </div>
            </article>
          ))}
        </div>
        <div>
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </aside>
    </section>
  );
}

export default Checkout;
