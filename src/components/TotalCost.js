// TotalCost.js
import React from "react";

const TotalCost = ({ totalCost }) => {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        backgroundColor: "#e8f5e9",
        border: "2px solid #4CAF50",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <h4>Costo Total de los Productos:</h4>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>${totalCost.toFixed(2)}</p>
    </div>
  );
};

export default TotalCost;
