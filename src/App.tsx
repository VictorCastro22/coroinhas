import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CriarEscala from "./features/criaEscalaMissas/CriarEscala";
import ProtectedRoute from "./components/ProtectedRoute";
import TelaInicial from "./pages/TelaInicial";
import EscalaFixa from "./features/escala/EscalaFixa";
import NoticiaDetalhe from "./features/noticias/NoticiaDetalhe";
import Layout from "./components/Layout";
import CalendarPadres from "./features/missas/CalendarioMissas";
import CalendarConfissoes from "./features/confissoes/CalendarConfissoes";
import Mestres from "./pages/Mestres";
import CriaCalendario from "./pages/CriaCalendario";
import CoroinhasPage from "./pages/CoroinhasPage";

import CriarEscalaFestejosDivino from "./features/criarEscalaFestejos/Divino/CriarEscalaDivino";
import CriarEscalaFestejosSantoAntonio from "./features/criarEscalaFestejos/SantoAntonio/CriarEscalaSAntonio";
import CalendarioPadresSJBatista from "./features/criarEscalaFestejos/SaoJoaoBatista/CalendarioSJBatista";
import CalendarioPadresSagradoCoracao from "./features/criarEscalaFestejos/SagradoCoração/CalendarioSCoracao";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        
        <Route element={<Layout />}>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
          <Route path="/escala-fixa" element={<EscalaFixa />} />
          <Route path="/calendario-missas" element={<CalendarPadres />} />
          <Route path="/calendario-confissoes" element={<CalendarConfissoes />} />
          <Route path="/mestres" element={<Mestres />} />
          <Route path="/admin" element={<CriaCalendario />} />
          <Route path="/coroinhas" element={<CoroinhasPage />} />

          <Route path="/criar-divino" element={<CriarEscalaFestejosDivino />} />
          <Route path="/criar-santo_antonio" element={<CriarEscalaFestejosSantoAntonio />} />
          <Route path="/criar-sj_batista" element={<CalendarioPadresSJBatista />} />
          <Route path="/criar-sagrado_coracao" element={<CalendarioPadresSagradoCoracao />} />

          <Route
            path="/criar-escala"
            element={
              <ProtectedRoute>
                <CriarEscala />
              </ProtectedRoute>
            }
          />
        </Route>

        
        <Route path="/login" element={<Login />} />

        
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;