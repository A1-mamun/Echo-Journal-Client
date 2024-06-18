import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loader from "../components/shared/Loader";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const location = useLocation();

  if (loading || isLoading) return <Loader></Loader>;
  if (user && role === "admin") return children;
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
