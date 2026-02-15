import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

import { escalas } from "../../dados/escalaPadres"; 

const ProximasMissas: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado para controlar qual dia estamos vendo (0 = Hoje, 1 = Amanhã, etc)
  const [offsetDia, setOffsetDia] = useState(0);

  const dataSelecionada = addDays(new Date(), offsetDia);
  const dataFormatada = format(dataSelecionada, "yyyy-MM-dd");
  const labelData = format(dataSelecionada, "dd 'de' MMMM", { locale: ptBR });

  const missasDoDia = escalas.filter(e => e.data === dataFormatada);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
      
      {/* SELETOR DE DATA SIMPLES (Navegação por Setas) */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={() => setOffsetDia(prev => prev - 1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Dia Anterior"
        >
          <ChevronLeft size={24} className="text-[#535043]" />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold text-[#A6894A] tracking-widest">
            {offsetDia === 0 ? "Hoje" : offsetDia === 1 ? "Amanhã" : "Data Selecionada"}
          </span>
          <span className="text-sm font-semibold text-[#535043]">{labelData}</span>
        </div>

        <button 
          onClick={() => setOffsetDia(prev => prev + 1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Próximo Dia"
        >
          <ChevronRight size={24} className="text-[#535043]" />
        </button>
      </div>

      {/* CARD DINÂMICO DE MISSAS */}
      <div className="bg-white border-t-4 border-[#D4AF37] shadow-lg rounded-xl p-6 min-h-[200px] transition-all">
        <div className="space-y-5">
          {missasDoDia.length > 0 ? missasDoDia.map(m => (
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
            <div className="py-10 text-center flex flex-col items-center gap-2">
              <Calendar size={40} className="text-gray-200" />
              <p className="text-gray-400 text-sm italic">Nenhuma celebração para esta data.</p>
            </div>
          )}
        </div>
      </div>

      {/* BOTÃO GRANDE (ACESSIBILIDADE PARA IDOSOS) */}
      <button 
        onClick={() => navigate("/calendario-missas")}
        className="flex items-center justify-center gap-3 bg-[#535043] text-white py-5 rounded-2xl font-bold shadow-md hover:bg-[#3d3a31] active:scale-95 transition-all group"
      >
        Ver Calendário Completo do Mês
        <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default ProximasMissas;