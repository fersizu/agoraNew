import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Notifications from "./components/Notifications";
import TotalCost from "./components/TotalCost";
import Chart from "./components/Chart";
import { Bar } from "react-chartjs-2";
import ChartJS from "chart.js/auto";

const App = () => {
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // Agregar un nuevo producto
  const addProduct = (product) => {
    // Evitar duplicados por nombre y fecha de expiración
    if (products.some(p => p.name === product.name && p.expiryDate.getTime() === product.expiryDate.getTime())) {
      return; // No agregamos el producto si ya existe
    }

    setProducts((prev) => {
      const updatedProducts = [...prev, product];
      updateTotalCost(updatedProducts);
      return updatedProducts;
    });
    updateNotifications(product);
  };

  // Eliminar un producto de la lista
  const deleteProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1); // Elimina el producto en el índice dado
    setProducts(newProducts);
    updateTotalCost(newProducts);
  };

  // Actualizar notificaciones según fechas de expiración
  const updateNotifications = (product) => {
    const currentDate = new Date();
    const timeDiff = product.expiryDate - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysRemaining > 0 && daysRemaining <= 3) {
      const newNotification = {
        message: `El producto '${product.name}' está próximo a vencer en ${daysRemaining} día(s).`,
        isExpired: false,
      };
      setNotifications((prev) => [...prev, newNotification]);

      // Eliminar la notificación después de 10 segundos
      setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((n) => n !== newNotification)
        );
      }, 10000);
    } else if (daysRemaining < 0) {
      const newNotification = {
        message: `El producto '${product.name}' ha expirado.`,
        isExpired: true,
      };
      setNotifications((prev) => [...prev, newNotification]);

      // Eliminar la notificación después de 10 segundos
      setTimeout(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((n) => n !== newNotification)
        );
      }, 10000);
    }
  };

  // Actualizar el costo total de los productos
  const updateTotalCost = (updatedProducts) => {
    const total = updatedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
    setTotalCost(total);
  };

  // Filtrar productos que expiran en los siguientes 10 días
  const getExpiringProducts = () => {
    const currentDate = new Date();
    return products.filter((product) => {
      const timeDiff = product.expiryDate - currentDate;
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysRemaining >= 0 && daysRemaining <= 10; // Filtra productos que expiran en 10 días o menos
    });
  };

  // Agrupar los productos por días hasta la expiración (0 a 10 días)
  const getProductsPerDay = () => {
    const productsByDay = Array(11).fill(0); // Inicializa un array de 11 elementos para los días 0 a 10

    getExpiringProducts().forEach((product) => {
      const currentDate = new Date();
      const timeDiff = product.expiryDate - currentDate;
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysRemaining >= 0 && daysRemaining <= 10) {
        productsByDay[daysRemaining] += product.quantity; // Aumenta la cantidad de productos en ese día
      }
    });

    return productsByDay;
  };

  const productsPerDay = getProductsPerDay();

  // Datos del gráfico de barras
  const chartData = {
    labels: Array.from({ length: 11 }, (_, index) => `${index} días`), // Etiquetas para los días (0 a 10)
    datasets: [
      {
        label: "Cantidad de productos a expirar",
        data: productsPerDay, // Cantidad de productos que expiran en cada día
        backgroundColor: "#FF6347", // Color de las barras
        borderColor: "#D34F32", // Color del borde de las barras
        borderWidth: 1,
      },
    ],
  };

  // Opciones del gráfico con formato para el eje Y
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 1, // Fuerza que los ticks del eje Y sean enteros
          callback: function (value) {
            return value % 1 === 0 ? value : ''; // Elimina los decimales
          },
        },
      },
    },
  };

  // Usar useEffect para agregar el producto de ejemplo solo una vez al inicio
  useEffect(() => {
    addProduct({
      name: "Producto Vencido",
      price: 100,
      quantity: 2,
      expiryDate: new Date("2024-11-10"),
      addedDate: new Date(),
    });
  }, []); // El array vacío asegura que esto solo se ejecute una vez

  return (
    <Router>
      <Header />
      <main style={{ padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <Link to="/add-product">
                    <button
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "white",
                        padding: "15px 32px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        marginBottom: "20px",
                      }}
                    >
                      Agregar Producto
                    </button>
                  </Link>
                </div>
                <ProductList
                  products={products}
                  deleteProduct={deleteProduct} // Pasa la función para eliminar
                />
                <Notifications notifications={notifications} />
                <TotalCost totalCost={totalCost} />

                <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </>
            }
          />
          <Route
            path="/add-product"
            element={<ProductForm addProduct={addProduct} />}
          />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 Mi App</p>
      </footer>
    </Router>
  );
};

export default App;
