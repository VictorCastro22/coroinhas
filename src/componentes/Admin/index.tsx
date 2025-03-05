// src/pages/Admin.tsx
import { useState } from "react";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const correctPassword = "607080"; // Defina uma senha segura

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Área Administrativa</h2>
          <input
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Entrar
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Bem-vindo ao Painel Admin</h2>
          {/* Aqui você adiciona os campos para editar conteúdo */}
        </div>
      )}
    </div>
  );
};

export default Admin;
