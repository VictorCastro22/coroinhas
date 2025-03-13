import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./comp/Login";
import CriarEscala from "./comp/CriarEscala";
import ProtectedRoute from "./comp/ProtectedRoute";
import TelaInicial from "./comp/TelaInicial";
import EscalaFixa from "./comp/EscalaFixa";
import Festejos from "./comp/Festejos";
import NoticiaDetalhe from "./features/noticias/NoticiaDetalhe";
import Layout from "./comp/Layout";
import AgendaParoquial from "./comp/AgendaParoquial";
import CalendarPadres from "./comp/CalendarPadres";
import CalendarConfissoes from "./features/confissoes/CalendarConfissoes";
import CalendarioPadresFestejos from "./comp/CalendarioPadresFestejos";
import Mestres from "./comp/Mestres";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        
        <Route element={<Layout />}>
          <Route path="/" element={<TelaInicial />} />
          <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
          <Route path="/escala-fixa" element={<EscalaFixa />} />
          <Route path="/festejos" element={<Festejos />} />
          <Route path="/calendario" element={<AgendaParoquial />} /> 
          <Route path="/calendario-missas" element={<CalendarPadres />} />
          <Route path="/festejos-sao-jose" element={<AgendaParoquial />} />
          <Route path="/calendario-confissoes" element={<CalendarConfissoes />} />
          <Route path="/mestres" element={<Mestres />} />
          <Route path="/criar-festejos" element={<CalendarioPadresFestejos />} />
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
