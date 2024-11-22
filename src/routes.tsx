import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TelaInicial from './componentes/TelaInicial';
import EscalaFixa from './componentes/EscalaFixa';
import Login from "./componentes/Login";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/escala-fixa" element={<EscalaFixa />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;