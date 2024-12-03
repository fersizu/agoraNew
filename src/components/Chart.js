import React from "react";
import { Line } from "react-chartjs-2"; // Import the Line chart component

const Chart = ({ data }) => {
  return (
    <div>
      <h2>Gráfico de Productos por Mes</h2>
      <Line data={data} />
    </div>
  );
};

export default Chart;
