import React from "react";
import { format, parseISO, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Centralização dos links de localização
const linksLocais: Record<string, string> = {
  "Matriz": "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59",
  "Secretaria Paroquial": "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59", // Link da secretaria
  "Matriz (Confissões)": "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59",
  "Centro de Pastoral": "https://maps.app.goo.gl/odRaEWko8oJospxZA",
  "Divino": "https://maps.app.goo.gl/TCVVegRcGQMUg6ys9",
  "Nossa Senhora Aparecida": "https://maps.app.goo.gl/kyntkv5C4pam1Eit7",
  "Santa Luzia": "https://maps.app.goo.gl/yBbUwFJgdQZKL6LN7",
  "Sagrado Coração de Jesus": "https://maps.app.goo.gl/R7i5ewDzoiKdrdmh7",
  "São João Batista": "https://maps.app.goo.gl/LmRpW9y7Pqmq1QPH9",
  "Mãe Rainha": "https://maps.app.goo.gl/ytpFjJwJHuBSFhuH6",
  "Urucará": "https://maps.app.goo.gl/yph5tbRAgTNSdEaY9",
  "São Pedro": "https://maps.app.goo.gl/QCnjNLk5Rj4XiXqL8",
  "São Benedito": "https://maps.app.goo.gl/5pYSKE6ZWRXh3wGW6",
};

const escalas = [
// --- 04/08 (Terça-feira) ---
  { "id": "escalaagosto-ivan-2026-08-04-17hs-confissoes-1", "data": "2026-08-04", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 05/08 (Quarta-feira) ---
  { "id": "escalaagosto-pr-2026-08-05-08h30-atendimento-1", "data": "2026-08-05", "horario": "08h30", "local": "Atendimento", "padre": "Padre Rafael" },

  // --- 06/08 (Quinta-feira) ---
  { "id": "escalaagosto-ivan-2026-08-06-08hs-confissoes-1", "data": "2026-08-06", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 07/08 (Sexta-feira) ---
  { "id": "escalaagosto-confissoes-2026-08-07-17hs-confissoes-1", "data": "2026-08-07", "horario": "17hs", "local": "Confissões", "padre": "Não especificado" },

  // --- 11/08 (Terça-feira) ---
  { "id": "escalaagosto-ivan-2026-08-11-17hs-confissoes-1", "data": "2026-08-11", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 12/08 (Quarta-feira) ---
  { "id": "escalaagosto-pr-2026-08-12-08h30-atendimento-1", "data": "2026-08-12", "horario": "08h30", "local": "Atendimento", "padre": "Padre Rafael" },

  // --- 13/08 (Quinta-feira) ---
  { "id": "escalaagosto-ivan-2026-08-13-08hs-confissoes-1", "data": "2026-08-13", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 14/08 (Sexta-feira) ---
  { "id": "escalaagosto-pr-2026-08-14-17hs-confissoes-1", "data": "2026-08-14", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" },

  // --- 18/08 (Terça-feira) ---
  { "id": "escalaagosto-ivan-2026-08-18-17hs-confissoes-1", "data": "2026-08-18", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 19/08 (Quarta-feira) ---
  { "id": "escalaagosto-pr-2026-08-19-08h30-atendimento-1", "data": "2026-08-19", "horario": "08h30", "local": "Atendimento", "padre": "Padre Rafael" },

  // --- 20/08 (Quinta-feira) ---
  { "id": "escalaagosto-ivan-2026-08-20-08hs-confissoes-1", "data": "2026-08-20", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 21/08 (Sexta-feira) ---
  { "id": "escalaagosto-pr-2026-08-21-17hs-confissoes-1", "data": "2026-08-21", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" },

  // --- 25/08 (Terça-feira) ---
  { "id": "escalaagosto-ivan-2026-08-25-17hs-confissoes-1", "data": "2026-08-25", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 26/08 (Quarta-feira) ---
  { "id": "escalaagosto-pr-2026-08-26-08h30-atendimento-1", "data": "2026-08-26", "horario": "08h30", "local": "Atendimento", "padre": "Padre Rafael" },

  // --- 27/08 (Quinta-feira) ---
  { "id": "escalaagosto-ivan-2026-08-27-08hs-confissoes-1", "data": "2026-08-27", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 28/08 (Sexta-feira) ---
  { "id": "escalaagosto-pr-2026-08-28-17hs-confissoes-1", "data": "2026-08-28", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" }

];

const ProximaConfissao: React.FC = () => {
  const agora = new Date();
  
  const proxima = escalas.find(e => {
    const tempoLimpo = e.horario.replace("hs", "");
    const partesTempo = tempoLimpo.split(":");
    const hora = partesTempo[0];
    const minuto = partesTempo[1] || "00";
    
    const dataHoraCompleta = new Date(`${e.data}T${hora.padStart(2, '0')}:${minuto}:00`);
    
    return isAfter(dataHoraCompleta, agora);
  }) || escalas[0];

  const dataExibicao = format(parseISO(proxima.data), "dd 'de' MMMM", { locale: ptBR });
  const linkMapa = linksLocais[proxima.local] || "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white border-t-4 border-[#D4AF37] shadow-xl rounded-xl p-8 text-center">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Próxima Confissão / Atendimento
        </span>
        
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mt-4 mb-2">
          {proxima.padre}
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-gray-600 my-6">
          <div className="flex items-center gap-2">
            <Calendar size={22} className="text-[#D4AF37]" />
            <span className="text-lg md:text-xl">{dataExibicao} às {proxima.horario}</span>
          </div>

          <a 
            href={linkMapa} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 hover:text-red-600 transition-colors group"
            title="Ver localização no mapa"
          >
            <MapPin size={22} className="text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-lg md:text-xl border-b border-transparent group-hover:border-red-600">
              {proxima.local}
            </span>
          </a>
        </div>

        <Link 
          to="/calendario-confissoes"
          className="inline-flex items-center gap-2 bg-[#535043] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3d3a31] transition-all shadow-md hover:shadow-lg"
        >
          Ver Escala Completa <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default ProximaConfissao;