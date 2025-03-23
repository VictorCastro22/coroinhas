import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaChurch, FaUsers } from "react-icons/fa";

const Mestres: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <div className="flex-1 flex flex-col items-center pt-16">
        <div className="bg-white shadow-md rounded px-8 py-6 w-96 flex flex-col gap-4 mb-8">
          <button
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => navigate("/criar-escala")}
          >
            <FaCalendarAlt /> Criar Escala Fixa
          </button>
          <button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => navigate("/criar-festejos")}
            disabled
          >
            <FaChurch /> Criar Escala Festejos de São José
          </button>
          <button
            className="flex items-center gap-2 bg-purple-500 text-white font-bold py-2 px-4 rounded w-full opacity-50 cursor-not-allowed"
            disabled
          >
            <FaUsers /> Coroinhas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mestres;
