import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import CriarEscala from "./componentes/CriarEscala";
import ProtectedRoute from "./componentes/ProtectedRoute";
import TelaInicial from "./componentes/TelaInicial";
import EscalaFixa from "./componentes/EscalaFixa";
import Festejos from "./componentes/Festejos";
import NoticiaDetalhe from "./componentes/NoticiaDetalhe";
import Layout from "./componentes/Layout"; // Importando o Layout

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rota padrão usando o Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
          <Route path="/escala-fixa" element={<EscalaFixa />} />
          <Route path="/festejos" element={<Festejos />} />
          <Route
            path="/criar-escala"
            element={
              <ProtectedRoute>
                <CriarEscala />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Rota de login, sem o Layout (não precisa do Footer) */}
        <Route path="/login" element={<Login />} />

        {/* Página não encontrada */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;