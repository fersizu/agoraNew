import React from "react";

const ProductList = ({ products, deleteProduct }) => {
  return (
    <div>
      <h2>Lista de Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos agregados.</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <div>
                <strong>{product.name}</strong> - ${product.price} - Cantidad:{" "}
                {product.quantity} - Vencimiento: {product.expiryDate.toLocaleDateString()}
              </div>
              <button
                onClick={() => deleteProduct(index)} // Llamamos a deleteProduct pasando el índice
                style={{
                  backgroundColor: "#F44336",
                  color: "white",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
