import React from "react"; 
import { format, isToday, parseISO, getMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Coroinha } from "../types/coroinhas";

const linksLocais: Record<string, string> = {
  "Matriz": "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59",
  "Matriz (Missa pelas famílias)": "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59",
  "Centro de Pastoral": "https://maps.app.goo.gl/odRaEWko8oJospxZA",
  "Divino": "https://maps.app.goo.gl/TCVVegRcGQMUg6ys9",
  "Nossa Senhora Aparecida": "https://maps.app.goo.gl/kyntkv5C4pam1Eit7",
  "Santa Luzia": "https://maps.app.goo.gl/yBbUwFJgdQZKL6LN7",
  "Sagrado Coração de Jesus": "https://maps.app.goo.gl/R7i5ewDzoiKdrdmh7",
  "São João Batista": "https://maps.app.goo.gl/LmRpW9y7Pqmq1QPH9",
  "Festa de São Sebastião": "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59",
  "Mãe Rainha": "https://maps.app.goo.gl/ytpFjJwJHuBSFhuH6",
  "Urucará": "https://maps.app.goo.gl/yph5tbRAgTNSdEaY9",
  "São Pedro": "https://maps.app.goo.gl/QCnjNLk5Rj4XiXqL8",
  "Matriz (Posse Pe. Adair)": "https://maps.app.goo.gl/wdCowWAsnpkRkzJ59", 
  "Nossa Senhora das Candeias (Festa)": "https://maps.app.goo.gl/yph5tbRAgTNSdEaY9",
  "Nossa Senhora das Candeias": "https://maps.app.goo.gl/yph5tbRAgTNSdEaY9",
  "São Benedito": "https://maps.app.goo.gl/5pYSKE6ZWRXh3wGW6",

};

interface CardEscalaProps {
  padre: string;
  data: string;
  horario: string;
  local: string;
  coroinhas: Coroinha[];
  onAddCoroinha?: () => void;
  onDeleteCoroinha?: (id: string) => void;
  isPublicView?: boolean;
}

const CardEscala: React.FC<CardEscalaProps> = ({
  padre,
  data,
  horario,
  local,
  coroinhas,
  onAddCoroinha,
  onDeleteCoroinha,
  isPublicView = false,
}) => {
  const dataFormatada = format(new Date(`${data}T00:00:00`), "dd-MM-yyyy");
  const diaSemana = format(new Date(`${data}T00:00:00`), "EEEE", { locale: ptBR });
  const isTodayCard = isToday(parseISO(`${data}T00:00:00`));

  // Verifica se estamos em Dezembro
  const isNatal = getMonth(new Date()) === 11;
  const caminhoChapeu = "/chapeu-natal.png";

  const getFotoPadre = (padre: string) => {
    switch (padre) {
      case "Padre Eudásio": return "/paroco.jpg";
      case "Padre Ivan": return "/vigario.png";
      case "Padre Rafael": return "/pe-rafael.png";
      case "Padre William": return "/padre-william.png";
      case "Padre Rafhael": return "/padre-rafhael.png";
      case "Padre João Paulo": return "/padre-joaop.png";
      case "Padre Aurênio": return "/pe-aurenio.png";
      case "Dom Gregório": return "/dom-gregorio.png";
      case "Padre Diego": return "/pe-diego.jpeg";
      case "Padre Adair": return "/padre-adair.jpg";
      case "Padre Flávio": return "/padre-flavio.jpeg";
      case "Padre Washington": return "/pe-washington.jpg";
      case "Padre João Pedro": return "/padre-joao-pedro.jpg";
      case "Frei Gilmar": return "/frei-gilmar.jpeg";
      case "Padre Antonio": return "pe-antonio.png";
      case "Diácono Alexandre": return "diac-alexandre.png";
      case "Dom José Antonio": return "dom-jose.jpg";
      default: return "/imagens/semfoto.jpg";
    }
  };

  const cerimoniarios = [
    "José Vitor", "Fernando", "Adrian", "Victor Manuel", "Kauan", "Gustavo", "Francisco José",
  ];

  const getMapLink = (nomeLocal: string) => {
    if (linksLocais[nomeLocal]) {
      return linksLocais[nomeLocal];
    }
    return `https://www.google.com/maps/search/?api=1&query=Igreja+Católica+${encodeURIComponent(nomeLocal)}`;
  };

  return (
    <div
      className={`flex flex-col border p-4 rounded-md shadow-md mb-4 ${
        isTodayCard ? "bg-green-300" : "bg-white"
      }`}
    >
      <div className="flex items-center mb-4">
        <div className="flex flex-col items-center mr-4">
          {/* FOTO DO PADRE */}
          <div className="w-16 h-16 relative bg-gray-200 rounded-full">
            <img
              src={getFotoPadre(padre)}
              alt={padre}
              className="w-full h-full object-cover rounded-full"
            />
            {isNatal && (
              <img 
                src={caminhoChapeu} 
                alt="Natal" 
                className="absolute -top-4 -left-2 w-10 h-10 -rotate-[15deg] z-10"
              />
            )}
          </div>
          <p className="mt-2 font-medium text-gray-800 text-center">{padre}</p>
        </div>

        <div className="flex-1 text-center">
          
          {/* --- LOCALIZAÇÃO (LINK PURO SEM EFEITOS DE COR) --- */}
          <a 
            href={getMapLink(local)}
            target="_blank"
            rel="noopener noreferrer"
            // Removi "hover:bg-gray-100" e mantive apenas classes de layout e cursor
            className="group flex items-center justify-center gap-2 p-1 rounded cursor-pointer"
            title="Ver localização no mapa"
          >
            {/* Removi "group-hover:text-blue-600" e "transition-colors" */}
            <p className="font-bold text-lg">
              {local}
            </p>
            {/* Ícone SVG - Mantive apenas o scale no hover, removendo cores se houvesse */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform"
            >
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </a>
          
          <div className="flex flex-col items-center text-gray-700 text-base">
            <span className="font-semibold">
              {diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}
            </span>
            <span>
              {dataFormatada} - {horario}
            </span>
          </div>

          {!isPublicView && onAddCoroinha && (
            <button
              type="button"
              onClick={onAddCoroinha}
              className="text-green-500 text-lg font-bold hover:text-green-700 mt-2"
            >
              +
            </button>
          )}
        </div>
      </div>

      <ul className="mt-4">
        {coroinhas.map((coroinha) => {
          const isInvestiduraRosario =
            local === "Rosário - Investidura Coroinhas" && data === "2025-08-16" && horario === "19h";

          const isCerimoniario =
            isInvestiduraRosario && cerimoniarios.includes(coroinha.nome);

          return (
            <li
              key={coroinha.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex items-center">
                <div className="relative mr-2">
                  <img
                    src={coroinha.foto}
                    alt={coroinha.nome}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {isNatal && (
                    <img 
                      src={caminhoChapeu} 
                      alt="Natal" 
                      className="absolute -top-3 -left-2 w-8 h-8 -rotate-[15deg] z-10"
                    />
                  )}
                </div>
                <span className="text-base">
                  {coroinha.nome}{" "}
                  <span className="text-sm text-gray-600">
                    - {coroinha.funcao || (isCerimoniario ? "Cerimoniário" : "Túnica Branca")}
                  </span>
                </span>
              </div>
              {!isPublicView && onDeleteCoroinha && (
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => onDeleteCoroinha(coroinha.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CardEscala;