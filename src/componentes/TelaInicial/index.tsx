import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaHandHoldingHeart, FaSignInAlt } from "react-icons/fa";

const TelaInicial: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/foto-coroinha.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-8">
          Bem-vindo(a)!
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/escala-fixa")}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg transform transition-transform hover:scale-105"
          >
            <FaCalendarAlt className="text-lg" />
            Escala Fixa
          </button>

          <button
            type="button"
            onClick={() => navigate("/festejos")}
            className="flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transform transition-transform hover:scale-105"
          >
            <FaHandHoldingHeart className="text-lg" />
            Nossa Senhora das Candeias
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transform transition-transform hover:scale-105"
          >
            <FaSignInAlt className="text-lg" />
            Criar Escala
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelaInicial;