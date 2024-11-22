import React from "react";
import { useNavigate } from "react-router-dom";

const TelaInicial: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/sao-tarcisio.jpg')" }}
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => navigate("/escala-fixa")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
        >
          Escala Fixa
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
        >
          Criar Escala
        </button>
      </div>
    </div>
  );
};

export default TelaInicial;