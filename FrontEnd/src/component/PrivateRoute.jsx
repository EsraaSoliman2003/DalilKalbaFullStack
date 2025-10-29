// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // تحقق من تسجيل الدخول
  const expiresAt = localStorage.getItem("expiresAt");

  if (!token || !expiresAt) {
    return <Navigate to="/login" replace />; // إعادة التوجيه إذا مش مسجل
  }
  const now = new Date();
  const expiryDate = new Date(expiresAt);
  if (now >= expiryDate) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    return <Navigate to="/login" />;
  }
  return children; // السماح بالوصول
};

export default PrivateRoute;
