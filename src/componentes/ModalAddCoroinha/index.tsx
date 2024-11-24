import { useState } from "react";

interface ModalAddCoroinhaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (nome: string) => void;
}

const ModalAddCoroinha: React.FC<ModalAddCoroinhaProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [nome, setNome] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (nome.trim()) {
      onSubmit(nome);
      setNome("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Adicionar Coroinha</h2>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do coroinha"
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCoroinha;
