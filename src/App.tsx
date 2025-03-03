import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import CriarEscala from "./componentes/CriarEscala";
import ProtectedRoute from "./componentes/ProtectedRoute";
import TelaInicial from "./componentes/TelaInicial";
import EscalaFixa from "./componentes/EscalaFixa";
import Festejos from "./componentes/Festejos";
import NoticiaDetalhe from "./componentes/NoticiaDetalhe";
import Layout from "./componentes/Layout";
import AgendaParoquial from "./componentes/AgendaParoquial";
import CalendarPadres from "./componentes/CalendarPadres";
import CalendarConfissoes from "./componentes/CalendarConfissoes";
import CalendarioPadresFestejos from "./componentes/CalendarioPadresFestejos";
import Mestres from "./componentes/Mestres";

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
          <Route path="/calendario-confissoes" element={<CalendarConfissoes />} />
          <Route path="/mestres" element={<Mestres />} />
          <Route path="/criar-festejos" element={<CalendarioPadresFestejos />} />
          <Route path="/agenda-paroquial" element={<AgendaParoquial />} />
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
