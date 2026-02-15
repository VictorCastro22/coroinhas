import React from "react";
import { Cross } from "lucide-react";

const BannerQuaresma: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      {/* Container principal: ajusta de coluna (mobile) para linha (desktop) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#3b1d4a] via-[#4B2C5E] to-[#2a1336] rounded-3xl p-6 md:p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-400/20 group">
        
        {/* Detalhe visual de luz ao fundo */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

        {/* Lado Esquerdo: Ícone e Título */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
          {/* Ícone: tamanho reduzido no mobile para ganhar espaço */}
          <div className="bg-white/10 p-3 md:p-4 rounded-2xl backdrop-blur-sm border border-white/10 shadow-inner">
            <Cross size={32} className="text-purple-200 md:w-10 md:h-10 animate-pulse" style={{ animationDuration: '4s' }} />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-xl md:text-3xl font-playfair font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-300">
              TEMPO DA QUARESMA
            </h3>
            <p className="text-xs md:text-base text-purple-200/80 font-light italic tracking-tight">
              "Convertei-vos e crede no Evangelho"
            </p>
            {/* Divisor mobile centralizado / desktop alinhado à esquerda */}
            <div className="flex items-center justify-center md:justify-start gap-2 pt-1 md:pt-2">
               <span className="h-px w-6 md:w-8 bg-purple-400/50"></span>
               <p className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-semibold text-purple-300">
                 Oração • Jejum • Caridade
               </p>
            </div>
          </div>
        </div>
        
        {/* Lado Direito: Data de Início */}
        <div className="relative z-10 w-full md:w-auto">
          <div className="bg-black/20 px-4 py-3 md:px-6 md:py-4 rounded-2xl border border-white/5 backdrop-blur-md text-center md:text-right">
            <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-purple-400 mb-1">
              Início
            </p>
            <p className="text-lg md:text-xl font-playfair font-bold text-white leading-tight">
              Quarta-feira <br className="hidden md:block" /> de Cinzas
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BannerQuaresma;