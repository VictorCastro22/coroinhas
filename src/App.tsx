import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import CriarEscala from "./componentes/CriarEscala";
import ProtectedRoute from "./componentes/ProtectedRoute";
import TelaInicial from "./componentes/TelaInicial";
import EscalaFixa from "./componentes/EscalaFixa";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/escala-fixa" element={<EscalaFixa />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/criar-escala"
          element={
            <ProtectedRoute>
              <CriarEscala />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;