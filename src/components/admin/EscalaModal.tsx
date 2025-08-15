import { useState } from "react";

interface EscalaModalProps {
  dataSelecionada: string;
  horarioSelecionado: string;
  localSelecionado: string;
  onClose: () => void;
  onSalvar: (escala: { data: string; horario: string; local: string; padre: string }) => void;
}

const padres = ["Padre Eudásio", "Padre Ivan", "Padre Rafael"];

export default function EscalaModal({
  dataSelecionada,
  horarioSelecionado,
  localSelecionado,
  onClose,
  onSalvar,
}: EscalaModalProps) {
  const [padre, setPadre] = useState("");

  const handleSalvar = () => {
    if (!padre) return alert("Selecione um padre!");
    onSalvar({
      data: dataSelecionada,
      horario: horarioSelecionado,
      local: localSelecionado,
      padre,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Atribuir Padre - {dataSelecionada} ({horarioSelecionado} - {localSelecionado})
        </h2>
        <select
          value={padre}
          onChange={(e) => setPadre(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Selecione o padre</option>
          {padres.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancelar
          </button>
          <button onClick={handleSalvar} className="bg-blue-600 text-white px-4 py-2 rounded">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
