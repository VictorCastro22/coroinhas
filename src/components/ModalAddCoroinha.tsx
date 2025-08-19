import { useState } from "react";
import { Coroinha } from "../types/coroinhas";

interface ModalAddCoroinhaProps {
  coroinhasDaMissa: Coroinha[];
  isOpen: boolean;
  coroinhas: Coroinha[];
  onSubmit: (data: { id: string; funcao: string }) => void;
  onClose: () => void;
  selectedCoroinha: string;
  setSelectedCoroinha: (value: string) => void;
  selectedFuncao: string;
  setSelectedFuncao: React.Dispatch<React.SetStateAction<string>>;
  selectionCounts: { [key: string]: number }; //contagem
}

const ModalAddCoroinha: React.FC<ModalAddCoroinhaProps> = ({
  isOpen,
  coroinhas,
  onSubmit,
  onClose,
  selectedCoroinha,
  setSelectedCoroinha,
  coroinhasDaMissa,
  selectedFuncao,
  setSelectedFuncao,
  selectionCounts,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  const coroinhaSelecionado = coroinhas.find((c) => c.id === selectedCoroinha);

  const handleConfirmar = () => {
    if (selectedCoroinha && selectedFuncao) {
      onSubmit({ id: selectedCoroinha, funcao: selectedFuncao });
      setSelectedFuncao("");
      setSelectedCoroinha("");
    }
  };

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
              {coroinhas.length === 0 ? (
                <li className="text-center text-red-500 py-2">
                  Nenhum coroinha disponível.
                </li>
              ) : (
                coroinhas.map((coroinha) => {
                  const jaAdicionado = coroinhasDaMissa.some(c => c.nome === coroinha.nome);
                  const count = selectionCounts[coroinha.nome] || 0; // contagem


                  return (
                    <li key={coroinha.id}>
                      <button
                        type="button"
                        disabled={jaAdicionado}
                        className={`w-full text-left py-2 px-4 flex justify-between items-center ${
                        selectedCoroinha === coroinha.id ? "bg-gray-300" : ""
                            } ${jaAdicionado ? "text-gray-400 cursor-not-allowed" : ""}`}
                            onClick={() => {
                              if (!jaAdicionado) {
                                setSelectedCoroinha(coroinha.id);
                                setIsExpanded(false);
                              }
                            }}
                          >
                            <span>{coroinha.nome}</span>
                          {count > 0 && <span className="text-gray-500 text-sm">({count})</span>}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          )}
        </div>

        {coroinhaSelecionado && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Função</label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={selectedFuncao}
              onChange={(e) => setSelectedFuncao(e.target.value)}
            >
              <option value="">Selecione a função</option>
              <option value="Função definida no dia">Função definida no dia</option>
              <option value="Missal">Missal</option>
              <option value="Tocha 1">Tocha 1</option>
              <option value="Tocha 2">Tocha 2</option>
              <option value="Ofertório (Sineta)">Ofertório (Sineta)</option>
              <option value="Turíbulo">Turíbulo</option>
              <option value="Naveta">Naveta</option>
 
            </select>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={!selectedCoroinha || !selectedFuncao}
            className={`px-4 py-2 rounded-md mr-2 text-white ${
              !selectedCoroinha || !selectedFuncao
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
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