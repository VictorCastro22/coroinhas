import { format, isToday, parseISO, getMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Coroinha } from "../types/coroinhas";

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

      default: return "/imagens/semfoto.jpg";
    }
  };

  const cerimoniarios = [
    "José Vitor", "Fernando", "Adrian", "Victor Manuel", "Kauan", "Gustavo", "Francisco José",
  ];

  return (
    <div
      className={`flex flex-col border p-4 rounded-md shadow-md mb-4 ${
        isTodayCard ? "bg-green-300" : "bg-white"
      }`}
    >
      <div className="flex items-center mb-4">
        <div className="flex flex-col items-center mr-4">
          {/* FOTO DO PADRE - AJUSTADA */}
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
                // Mudado de -right-2 para -left-2 e rotate positivo para negativo
                className="absolute -top-4 -left-2 w-10 h-10 -rotate-[15deg] z-10"
              />
            )}
          </div>
          <p className="mt-2 font-medium text-gray-800 text-center">{padre}</p>
        </div>

        <div className="flex-1 text-center">
          <p className="font-bold text-lg">{local}</p>
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
                {/* FOTO DO COROINHA - MANTIDA (PERFEITA) */}
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