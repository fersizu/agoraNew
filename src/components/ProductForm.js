import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker styles
import { Link } from "react-router-dom"; // Importamos Link de react-router-dom
import "./ProductForm.css"; // Asegúrate de tener el archivo CSS en la misma carpeta

const ProductForm = ({ addProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState(null);
  const [addedDate, setAddedDate] = useState(new Date()); // Default to the current date
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !expiryDate || price <= 0 || quantity <= 0) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }

    const newProduct = {
      name,
      price,
      quantity,
      expiryDate,
      addedDate,
    };

    addProduct(newProduct);
    setName("");
    setPrice(0);
    setQuantity(1);
    setExpiryDate(null);
    setAddedDate(new Date());

    // Mostrar el mensaje de éxito
    setSuccessMessage("¡Producto agregado con éxito!");

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <div className="form-field">
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <div className="form-field">
        <label>Precio:</label>
        <div className="price-input-container">
          <span className="currency-symbol">$</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            className="input-field price-input"
            step="0.01" // Permite decimales
            min="0"
          />
        </div>
      </div>
      <div className="form-field">
        <label>Cantidad:</label>
        <div className="quantity-input-container">
          <button type="button" className="quantity-button" onClick={() => setQuantity(quantity - 1)}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
            className="input-field quantity-input"
            min="1"
          />
          <button type="button" className="quantity-button" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>
      <div className="form-field">
        <label>Fecha de vencimiento:</label>
        <DatePicker
          selected={expiryDate}
          onChange={(date) => setExpiryDate(date)}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          required
          className="input-field"
        />
      </div>
      <button type="submit" className="submit-button">Agregar Producto</button>
      <Link to="/" className="back-button">Regresar a la Página Principal</Link> {/* Botón para regresar */}

      {successMessage && (
        <div className="success-message">{successMessage}</div> // Mostrar el mensaje de éxito
      )}
    </form>
  );
};

export default ProductForm;
