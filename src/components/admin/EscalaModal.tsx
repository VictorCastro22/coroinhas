import { useState } from "react";

interface EscalaModalProps {
  dataSelecionada: string;
  onClose: () => void;
  onSalvar: (escala: { data: string; horario: string; local: string; padre: string }) => void;
}

const locais = [
  "Abrigo", "Centro Pastoral", "Coité", "Cônego Pinto", "Divino", "Guabiraba", "Horto", "Mãe Rainha", "Matriz", "Mororó",
  "Novo Parque Iracema", "Parque das Rosas", "Parque Santa Fé", "Parque São João", "Pirapora", "Rosário", "Santa Luzia",
  "Santos Dumont", "São Benedito", "Outra Banda", "São José", "São Pedro", "Serra Pelada", "Tangueira", "Urucará", "Vilares da Serra"
];

const horarios = ["00h", "07h", "09h", "12h", "15h", "15h30", "17h", "19h"];
const padres = ["Padre Eudásio", "Padre Ivan", "Padre Rafael"];

export default function EscalaModal({ dataSelecionada, onClose, onSalvar }: EscalaModalProps) {
  const [horario, setHorario] = useState("");
  const [local, setLocal] = useState("");
  const [padre, setPadre] = useState("");

  const handleSalvar = () => {
    if (!horario || !local || !padre) return alert("Preencha todos os campos!");
    onSalvar({ data: dataSelecionada, horario, local, padre });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Adicionar Escala - {dataSelecionada}</h2>
        <select value={horario} onChange={(e) => setHorario(e.target.value)} className="w-full mb-2 p-2 border rounded">
          <option value="">Selecione o horário</option>
          {horarios.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
        <select value={local} onChange={(e) => setLocal(e.target.value)} className="w-full mb-2 p-2 border rounded">
          <option value="">Selecione o local</option>
          {locais.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={padre} onChange={(e) => setPadre(e.target.value)} className="w-full mb-4 p-2 border rounded">
          <option value="">Selecione o padre</option>
          {padres.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
          <button onClick={handleSalvar} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
        </div>
      </div>
    </div>
  );
}