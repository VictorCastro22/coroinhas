import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginCoordenacao: React.FC = () => {
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    
    if (senha === "penha2026") { 
      localStorage.setItem("auth_coordenacao", "true");
      navigate("/painel-coordenacao");
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      {/* Estilo combinando com a Paróquia */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm border-t-4 border-[#D4AF37]">
        <h1 className="text-2xl font-playfair font-bold text-[#535043] text-center mb-6 uppercase tracking-wider">
          Coordenação Coroinhas
        </h1>
        
        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="senha">
            Senha de Acesso
          </label>
          <input
            id="senha"
            type="password"
            placeholder="Digite a senha"
            className="appearance-none border border-gray-200 rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        
        <button
          type="button"
          className="bg-[#535043] hover:bg-[#3d3a31] text-white font-bold py-3 px-4 rounded-xl w-full shadow-md transition-all active:scale-95"
          onClick={handleLogin}
        >
          Acessar Sistema
        </button>
      </div>
    </div>
  );
};

export default LoginCoordenacao;