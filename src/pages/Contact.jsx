import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage("Thank you. Your message has been received.");
      setFormData(initialForm);
    } else {
      setSuccessMessage("");
    }
  }

  return (
    <section className="section page-section form-layout">
      <div className="page-header">
        <p className="eyebrow">Contact</p>
        <h1>Send us a message</h1>
        <p>Questions about products, orders, or student recommendations are welcome.</p>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
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
          Message
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <span>{errors.message}</span>}
        </label>
        <button className="primary-button" type="submit">
          Submit Message
        </button>
      </form>
    </section>
  );
}

export default Contact;
