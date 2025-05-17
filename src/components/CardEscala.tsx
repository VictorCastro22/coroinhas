import { format, isToday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

interface CardEscalaProps {
  padre: string;
  data: string;
  horario: string;
  local: string;
  coroinhas: Coroinha[];
  onAddCoroinha?: () => void; // Evento para abrir o modal
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

  
  const getFotoPadre = (padre: string) => {
    switch (padre) {
      case "Padre Eudásio":
        return "/paroco.jpg";
      case "Padre Ivan":
        return "/vigario.png";
      case "Padre Rafael":
        return "/pe-rafael.png";
      case "Padre William":
        return "/padre-william.jpg";
      case "Padre Rafhael":
        return "/padre-rafhael.png";
      case "Padre João Paulo":
        return "/padre-joaop.png";
      case "Padre Aurênio":
        return "/padre-aurenio.png";
      default:
        return "/imagens/semfoto.jpg";
    }
  };

  return (
    <div
      className={`flex flex-col border p-4 rounded-md shadow-md mb-4 ${
        isTodayCard ? "bg-green-300" : "bg-white"
      }`}
    >
      {/* Informações do Padre */}
      <div className="flex items-center mb-4">
        <div className="flex flex-col items-center mr-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            <img
              src={getFotoPadre(padre)}
              alt={padre}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-2 font-medium text-gray-800 text-center">{padre}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="font-bold text-lg">{local}</p>
          <div className="flex flex-col items-center text-gray-700 text-base">
            <span className="font-semibold">{diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}</span>
            <span>{dataFormatada} - {horario}</span>
          </div>


          
          {/* Botão para adicionar coroinha (abre o modal) */}
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

      {/* Lista de coroinhas */}
      <ul className="mt-4">
        {coroinhas.map((coroinha) => {
          const diaSemana = new Date(`${data}T00:00:00`).getDay();
          const isSabado = diaSemana === 6;
          const isDomingo = diaSemana === 0;

          const tunicaVermelha =
            local === "Matriz" &&
            (
              (isSabado && horario === "19h") ||
              (isDomingo && ["07h", "09h", "19h"].includes(horario))
            );

          return (
            <li
              key={coroinha.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div className="flex items-center">
                <img
                  src={coroinha.foto}
                  alt={coroinha.nome}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="flex flex-col">
                  <span>{coroinha.nome}</span>
                  <span className={`text-xs ${tunicaVermelha ? 'text-red-600' : 'text-gray-500'}`}>
                    ({tunicaVermelha ? 'Túnica Vermelha' : 'Túnica Branca'})
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