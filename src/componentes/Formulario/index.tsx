import { useState } from "react";
import db from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import coroinhas from "../../dados/coroinhas";
import horarios from "../../dados/horarios";
import locais from "../../dados/locais";

const Formulario: React.FC = () => {
  const [coroinha, setCoroinha] = useState("");
  const [local, setLocal] = useState("");
  const [horario, setHorario] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coroinha || !local || !horario || !data) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      await addDoc(collection(db, "escalas"), {
        coroinha,
        local,
        horario,
        data,
      });
      // Apenas limpa os campos após a submissão
      setCoroinha("");
      setLocal("");
      setHorario("");
      setData("");
    } catch (error) {
      console.error("Erro ao adicionar a escala: ", error);
      alert("Erro ao salvar a escala, tente novamente.");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Selecionar Coroinha */}
        <div>
          <label htmlFor="coroinha" className="block text-gray-700 mb-2">
            Coroinha
          </label>
          <select
            id="coroinha"
            value={coroinha}
            onChange={(e) => setCoroinha(e.target.value)}
            className="border px-4 py-2 w-full"
          >
            <option value="">Selecione um coroinha</option>
            {coroinhas.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Selecionar Local */}
        <div>
          <label htmlFor="local" className="block text-gray-700 mb-2">
            Local
          </label>
          <select
            id="local"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className="border px-4 py-2 w-full"
          >
            <option value="">Selecione um local</option>
            {locais.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Selecionar Horário */}
        <div>
          <label htmlFor="horario" className="block text-gray-700 mb-2">
            Horário
          </label>
          <select
            id="horario"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="border px-4 py-2 w-full"
          >
            <option value="">Selecione um horário</option>
            {horarios.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        {/* Selecionar Data */}
        <div>
          <label htmlFor="data" className="block text-gray-700 mb-2">
            Data
          </label>
          <input
            id="data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="border px-4 py-2 w-full"
          />
        </div>

        {/* Botão Adicionar */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Adicionar Escala
        </button>
      </form>
    </div>
  );
};

export default Formulario;