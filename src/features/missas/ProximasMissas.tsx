import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";

// Importação dos dados centralizados
import { escalas } from "../../dados/escalaPadres"; 

const ProximasMissas: React.FC = () => {
  const navigate = useNavigate();
  
  // Lógica de data automática apenas para HOJE
  const hojeData = new Date();
  const hojeFormatado = format(hojeData, "yyyy-MM-dd");
  const labelHoje = format(hojeData, "dd/MM");

  // Filtragem focada apenas no dia atual
  const missasHoje = escalas.filter(e => e.data === hojeFormatado);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
      {/* CARD ÚNICO: MISSAS DE HOJE */}
      <div className="bg-white border-t-4 border-[#D4AF37] shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Missas de Hoje
          </span>
          <span className="text-gray-400 text-xs font-semibold">{labelHoje}</span>
        </div>
        
        <div className="space-y-5">
          {missasHoje.length > 0 ? missasHoje.map(m => (
            <div key={m.id} className="border-l-2 border-amber-50 pl-4 py-1">
              <div className="flex items-start gap-3 text-[#535043]">
                <Calendar size={18} className="text-[#D4AF37] mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-lg leading-tight">{m.horario} - {m.local}</p>
                  <p className="text-sm text-gray-500 italic mt-1">{m.padre}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="py-6 text-center">
              <p className="text-gray-400 text-sm italic">Nenhuma celebração programada para hoje.</p>
            </div>
          )}
        </div>
      </div>

      {/* BOTÃO DE ACESSO À ESCALA COMPLETA */}
      <button 
        onClick={() => navigate("/calendario-missas")}
        className="flex items-center justify-center gap-3 bg-[#535043] text-white py-4 rounded-xl font-bold shadow-md hover:bg-[#3d3a31] hover:shadow-lg transition-all group"
      >
        Ver Escala Completa 
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default ProximasMissas;