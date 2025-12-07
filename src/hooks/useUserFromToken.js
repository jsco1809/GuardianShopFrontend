import { useState } from "react";
import { Global } from "../helpers/Global";
import { jwtDecode } from "jwt-decode";

export const useUserFromToken = () => {
  const [error, setError] = useState(null);

  const getUserNameFromToken = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token no disponible");

      const decoded = jwtDecode(token);
      const userId = parseInt(decoded.sub);

      const payload = btoa(JSON.stringify({ id: userId }));
      const response = await fetch(Global.url + "users/list/id", {
        method: "POST",
        headers: { "Content-Type": "text/plain", Authorization: `Bearer ${token}` },
        body: payload,
      });

      if (!response.ok) throw new Error(`Error en el servidor: ${response.status}`);

      const dataBase64 = await response.text();
      const userData = JSON.parse(atob(dataBase64));
      return userData?.data?.userName || "Unknown User";
    } catch (err) {
      console.error("Error obteniendo usuario:", err);
      setError(err.message);
      return "Unknown User";
    }
  };

  return { getUserNameFromToken, error };
};

export default useUserFromToken;