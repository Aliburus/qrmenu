import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}

export default ProtectedRoute;
