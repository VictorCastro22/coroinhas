import React from "react";
import { format, parseISO, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Centralização dos links de localização
const linksLocais: Record<string, string> = {
  "Matriz": "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59",
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
// --- SEMANA 1 ---
    { "id": "56-ivan-2026-03-03-17hs-matriz", "data": "2026-03-03", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 1]
    { "id": "57-rafael-2026-03-04-17hs-matriz", "data": "2026-03-04", "horario": "17hs-20h", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 1]
    { "id": "58-ivan-2026-03-05-08hs-matriz", "data": "2026-03-05", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 1]

    // --- SEMANA 2 ---
    { "id": "59-ivan-2026-03-10-17hs-matriz", "data": "2026-03-10", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 1]
    { "id": "60-rafael-2026-03-11-17hs-matriz", "data": "2026-03-11", "horario": "17hs-20h", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 1]
    { "id": "61-ivan-2026-03-12-08hs-matriz", "data": "2026-03-12", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 1]

    // --- SEMANA 3 ---
    { "id": "62-ivan-2026-03-17-17hs-matriz", "data": "2026-03-17", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, // 
    { "id": "63-rafael-2026-03-18-17hs-matriz", "data": "2026-03-18", "horario": "17hs-20h", "local": "Matriz", "padre": "Padre Rafael" }, // 
    { "id": "64-ivan-2026-03-19-08hs-matriz", "data": "2026-03-19", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan" }, // 

    // --- SEMANA 4 (Mutirão e Feriado) ---
    { "id": "65-ivan-2026-03-20-08hs-matriz", "data": "2026-03-20", "horario": "08hs-11:30", "local": "Matriz", "padre": "Padre Ivan" }, // 
    { "id": "66-ivan-2026-03-20-14hs-cp", "data": "2026-03-20", "horario": "14hs-21h", "local": "Centro de Pastoral", "padre": "Padre Ivan" }, // 
    { "id": "67-ivan-2026-03-24-17hs-matriz", "data": "2026-03-24", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, // 
    { "id": "68-adair-2026-03-25-17hs-matriz", "data": "2026-03-25", "horario": "17hs", "local": "Matriz", "padre": "Padre Adair" }, // 
    { "id": "69-ivan-2026-03-26-08hs-matriz", "data": "2026-03-26", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan" } //
];

const ProximaConfissao: React.FC = () => {
  const agora = new Date();
  const proxima = escalas.find(e => isAfter(parseISO(e.data), agora)) || escalas[0];

  const dataExibicao = format(parseISO(proxima.data), "dd 'de' MMMM", { locale: ptBR });
  
  // Busca o link do mapa baseado no local ou usa a Matriz como padrão
  const linkMapa = linksLocais[proxima.local] || "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59";

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white border-t-4 border-[#D4AF37] shadow-xl rounded-xl p-8 text-center">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Próxima Confissão
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