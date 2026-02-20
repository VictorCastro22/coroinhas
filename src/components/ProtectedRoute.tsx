import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  tipoAuth?: "mestre" | "coordenacao";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, tipoAuth = "mestre" }) => {
  const chave = tipoAuth === "coordenacao" ? "auth_coordenacao" : "auth";
  const loginPagina = tipoAuth === "coordenacao" ? "/login-coordenacao" : "/login";

  const isAuthenticated = localStorage.getItem(chave) === "true";

  return isAuthenticated ? children : <Navigate to={loginPagina} />;
};

export default ProtectedRoute;