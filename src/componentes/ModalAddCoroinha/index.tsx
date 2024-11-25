import { useState } from "react";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

interface ModalAddCoroinhaProps {
  isOpen: boolean;
  coroinhas: Coroinha[];
  onSubmit: () => void;
  onClose: () => void;
  selectedCoroinha: string;
  setSelectedCoroinha: (value: string) => void;
}

const ModalAddCoroinha: React.FC<ModalAddCoroinhaProps> = ({
  isOpen,
  coroinhas,
  onSubmit,
  onClose,
  selectedCoroinha,
  setSelectedCoroinha,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  const coroinhaSelecionado = coroinhas.find(c => c.id === selectedCoroinha);

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Adicionar Coroinha</h2>
        <div className="relative">
          <button
            type="button"
            className="w-full text-left bg-gray-200 py-2 px-4 rounded-md"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {coroinhaSelecionado ? coroinhaSelecionado.nome : "Selecionar Coroinha"}
          </button>
          {isExpanded && (
            <ul className="absolute z-10 w-full bg-white shadow-lg max-h-48 overflow-y-auto mt-1 rounded-md">
              {coroinhas.map((coroinha) => (
                <li key={coroinha.id}>
                  <button
                    type="button"
                    className={`w-full text-left py-2 px-4 ${
                      selectedCoroinha === coroinha.id ? "bg-gray-300" : ""
                    }`}
                    onClick={() => {
                      setSelectedCoroinha(coroinha.id);
                      setIsExpanded(false);
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedCoroinha(coroinha.id);
                        setIsExpanded(false);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault(); // Previne a rolagem da página ao pressionar Espaço
                      }
                    }}
                  >
                    {coroinha.nome}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCoroinha;
