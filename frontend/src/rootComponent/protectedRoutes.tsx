import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles }: { children: JSX.Element , roles : string[] }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  try {
    const decoded : any = jwtDecode(token)
    const role = decoded.role
    if (!roles.includes(role)) {
      return <Navigate to="/unauthorized" replace />
    }
    return children;
  } catch (err){
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
