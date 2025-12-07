import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      dispatch(logout());
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        dispatch(logout());
        return;
      }

      const role = decoded.roles?.[0] || decoded.role || null;

      dispatch(login({ role, token }));  // NO guardar aquí en localStorage

    } catch (error) {
      console.error("Error decoding token:", error);
      dispatch(logout());
    }

  }, [dispatch]);
};

export default useAuthInitializer;
