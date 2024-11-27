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
    ? coroinhas.filter((coroinha) => coroinha.id === selectedCoroinha)
    : coroinhas;

  const getFotoPadre = (padre: string) => {
    switch (padre) {
      case "Diácono Alexandre":
        return "/diac-alexandre.png";
      case "Padre Eudásio":
        return "/paroco.jpg";
      case "Padre Ivan":
        return "/vigario.png";
      default:
        return "/imagens/semfoto.jpg";
    }
  };

  return (
    <div className="flex flex-col border p-4 rounded-md shadow-md mb-4">
      
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
          <p className="text-base text-gray-700">
            {dataFormatada} - {horario}
          </p>
          {!isPublicView && (
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