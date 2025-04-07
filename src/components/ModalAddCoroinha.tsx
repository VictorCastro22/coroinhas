import { useState } from "react";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

interface ModalAddCoroinhaProps {
  isOpen: boolean; // Controle de abertura do modal
  coroinhas: Coroinha[]; // Lista de coroinhas (já filtrados)
  onSubmit: () => void; // Função ao confirmar
  onClose: () => void; // Função para fechar o modal
  selectedCoroinha: string; // Coroinha selecionado
  setSelectedCoroinha: (value: string) => void; // Atualizar o coroinha selecionado
  selectionCounts: { [key: string]: number }; // Contador de seleções por coroinha
}

const ModalAddCoroinha: React.FC<ModalAddCoroinhaProps> = ({
  isOpen,
  coroinhas,
  onSubmit,
  onClose,
  selectedCoroinha,
  setSelectedCoroinha,
  selectionCounts,
}) => {
  const [isExpanded, setIsExpanded] = useState(false); // Estado de expansão do menu de seleção

  if (!isOpen) return null; // Retorna nulo se o modal estiver fechado

  // Encontra o coroinha atualmente selecionado
  const coroinhaSelecionado = coroinhas.find((c) => c.id === selectedCoroinha);

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Adicionar Coroinha</h2>
        <div className="relative">
          {/* Botão para abrir o menu de seleção */}
          <button
            type="button"
            className="w-full text-left bg-gray-200 py-2 px-4 rounded-md"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {coroinhaSelecionado ? coroinhaSelecionado.nome : "Selecionar Coroinha"}
          </button>

          {/* Lista de coroinhas */}
          {isExpanded && (
            <ul className="absolute z-10 w-full bg-white shadow-lg max-h-48 overflow-y-auto mt-1 rounded-md">
              {coroinhas.length === 0 ? (
                <li className="text-center text-red-500 py-2">
                  Nenhum coroinha disponível.
                </li>
              ) : (
                coroinhas.map((coroinha) => (
                  <li key={coroinha.id}>
                    <button
                      type="button"
                      className={`w-full text-left py-2 px-4 ${
                        selectedCoroinha === coroinha.id ? "bg-gray-300" : ""
                      }`}
                      onClick={() => {
                        setSelectedCoroinha(coroinha.id); // Atualiza o coroinha selecionado
                        setIsExpanded(false); // Fecha o menu
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedCoroinha(coroinha.id);
                          setIsExpanded(false);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                    >
                      {coroinha.nome} ({selectionCounts[coroinha.nome] || 0})
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onSubmit} // Chama a função para confirmar o coroinha selecionado
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onClose} // Fecha o modal
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