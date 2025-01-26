import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import CriarEscala from "./componentes/CriarEscala";
import ProtectedRoute from "./componentes/ProtectedRoute";
import TelaInicial from "./componentes/TelaInicial";
import EscalaFixa from "./componentes/EscalaFixa";
import Festejos from "./componentes/Festejos";
import NoticiaDetalhe from "./componentes/NoticiaDetalhe";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
        <Route path="/escala-fixa" element={<EscalaFixa />} />
        <Route path="/festejos" element={<Festejos />} />
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