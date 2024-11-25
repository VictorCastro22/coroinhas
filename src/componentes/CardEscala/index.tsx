import { format } from "date-fns";

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
  selectedCoroinha?: string;
  onAddCoroinha: () => void;
  onDeleteCoroinha: (id: string) => void;
  isPublicView?: boolean;
}

const CardEscala: React.FC<CardEscalaProps> = ({
  padre,
  data,
  horario,
  local,
  coroinhas,
  selectedCoroinha,
  onAddCoroinha,
  onDeleteCoroinha,
  isPublicView = false,
}) => {
  const dataFormatada = format(new Date(`${data}T00:00:00`), "dd-MM-yyyy");

  const coroinhasFiltrados = selectedCoroinha
    ? coroinhas.filter(coroinha => coroinha.id === selectedCoroinha)
    : coroinhas;

  return (
    <div className="flex flex-col border p-4 rounded-md shadow-md mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={padre === "Padre Eudásio" ? "/paroco.jpg" : "/vigario.png"}
            alt={padre}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 ml-4 text-center">
          <p className="font-medium">{local}</p>
          <p className="text-sm text-gray-600">
            {dataFormatada} - {horario}
          </p>
        </div>
        {!isPublicView && (
          <button
            type="button"
            onClick={onAddCoroinha}
            className="text-green-500 text-lg font-bold hover:text-green-700"
          >
            +
          </button>
        )}
      </div>

      <ul className="mt-4">
        {coroinhasFiltrados.map((coroinha) => (
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
              <span>{coroinha.nome}</span>
            </div>
            {!isPublicView && (
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
        ))}
      </ul>
    </div>
  );
};

export default CardEscala;