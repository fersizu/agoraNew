import React, { useEffect } from "react";

const Notifications = ({ notifications, setNotifications }) => {
  useEffect(() => {
    // Eliminar las notificaciones después de 10 segundos
    if (notifications.length > 0) {
      const timeout = setTimeout(() => {
        setNotifications([]); // Limpiar las notificaciones
      }, 10000); // 10000 milisegundos = 10 segundos

      return () => clearTimeout(timeout); // Limpiar el timeout si el componente se desmonta
    }
  }, [notifications, setNotifications]); // Dependencias: se ejecuta cuando las notificaciones cambian

  return (
    <div>
      {notifications.length === 0 ? (
        <p>No hay notificaciones.</p>
      ) : (
        notifications.map((notification, index) => (
          <div
            key={index}
            style={{
              backgroundColor: notification.isExpired ? "#f8d7da" : "#fff3cd",
              color: notification.isExpired ? "#721c24" : "#856404",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              fontWeight: notification.isExpired ? "bold" : "normal",
              border: notification.isExpired ? "2px solid #f5c6cb" : "2px solid #ffeeba",
            }}
          >
            {notification.message}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
