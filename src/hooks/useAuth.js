import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { Global } from "../helpers/Global";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAuth = async (mode) => {
    try {
      if (mode === "login") {

        const response = await axios.post(Global.url + "auth/login", {
          email: formData.email,
          password: formData.password,
        });

        const token = response.data.jwt;

        const decoded = jwtDecode(token);
        const role = decoded.roles?.[0] || "USER";

        dispatch(login({ role, token }));

        navigate("/products", { state: { showSuccess: true } });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Incorrect password. Please try again.";
      setMessage(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return [formData, message, handleInputChange, handleAuth, handleLogout];
};

export default useAuth;
