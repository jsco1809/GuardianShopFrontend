import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
