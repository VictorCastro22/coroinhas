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

    { "id": "106-ivan-2026-05-12-17hs-matriz", "data": "2026-05-12", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "107-rafael-2026-05-13-1630hs-matriz", "data": "2026-05-13", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //
    { "id": "108-ivan-2026-05-14-08hs-matriz", "data": "2026-05-14", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "109-adair-2026-05-14-16hs-matriz", "data": "2026-05-14", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, //
    { "id": "110-rafael-2026-05-15-17hs-matriz", "data": "2026-05-15", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //

    // --- SEMANA 4 ---
    { "id": "111-ivan-2026-05-19-17hs-matriz", "data": "2026-05-19", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "112-adair-2026-05-20-0830hs-sec", "data": "2026-05-20", "horario": "08:30hs", "local": "Secretaria Paroquial", "padre": "Padre Adair", "tipo": "Atendimento" }, //
    { "id": "113-rafael-2026-05-20-1630hs-matriz", "data": "2026-05-20", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //
    { "id": "114-adair-2026-05-21-16hs-matriz", "data": "2026-05-21", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, //
    { "id": "115-rafael-2026-05-22-17hs-matriz", "data": "2026-05-22", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //

    // --- SEMANA 5 ---
    { "id": "116-ivan-2026-05-26-17hs-matriz", "data": "2026-05-26", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "117-adair-2026-05-27-0830hs-sec", "data": "2026-05-27", "horario": "08:30hs", "local": "Secretaria Paroquial", "padre": "Padre Adair", "tipo": "Atendimento" }, //
    { "id": "118-rafael-2026-05-27-1630hs-matriz", "data": "2026-05-27", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //
    { "id": "119-adair-2026-05-28-16hs-matriz", "data": "2026-05-28", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, //
    { "id": "120-rafael-2026-05-29-17hs-matriz", "data": "2026-05-29", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" } //
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