import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const CalendarConfissoes: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [padreFilter, setPadreFilter] = useState("");
  const [localFilter, setLocalFilter] = useState("");

  useEffect(() => {
    const fetchCoroinhas = async () => {
      const querySnapshot = await getDocs(collection(db, "coroinhas"));
      const coroinhasData: { [key: string]: Coroinha[] } = {};

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const cardId = data.cardId;
        if (!coroinhasData[cardId]) coroinhasData[cardId] = [];
        coroinhasData[cardId].push({
          id: doc.id,
          nome: data.nome,
          foto: data.foto,
        });
      }

      setCoroinhas(coroinhasData);
    };

    fetchCoroinhas();
  }, []);

const escalas= [
    // --- SEMANA 2 ---
    { "id": "70-adair-2026-04-08-0830hs-matriz", "data": "2026-04-08", "horario": "08:30hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Atendimento" }, // [cite: 2]
    { "id": "71-ivan-2026-04-09-08hs-matriz", "data": "2026-04-09", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, // [cite: 2]
    { "id": "72-adair-2026-04-09-16hs-matriz", "data": "2026-04-09", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, // [cite: 2]

    // --- SEMANA 3 ---
    { "id": "73-ivan-2026-04-14-17hs-matriz", "data": "2026-04-14", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, // [cite: 2]
    { "id": "74-adair-2026-04-15-0830hs-matriz", "data": "2026-04-15", "horario": "08:30hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Atendimento" }, // [cite: 2]
    { "id": "75-ivan-2026-04-16-08hs-matriz", "data": "2026-04-16", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, // [cite: 2]
    { "id": "76-adair-2026-04-16-16hs-matriz", "data": "2026-04-16", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, // [cite: 2]

    // --- SEMANA 4 ---
    { "id": "77-ivan-2026-04-21-17hs-matriz", "data": "2026-04-21", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, // [cite: 3]
    { "id": "78-rafael-2026-04-22-17hs-matriz", "data": "2026-04-22", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, // [cite: 3]
    { "id": "79-ivan-2026-04-23-08hs-matriz", "data": "2026-04-23", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, // [cite: 3]
    { "id": "80-adair-2026-04-23-16hs-matriz", "data": "2026-04-23", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, // [cite: 3]
    { "id": "81-rafael-2026-04-24-17hs-matriz", "data": "2026-04-24", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, // [cite: 3]

    // --- SEMANA 5 ---
    { "id": "82-ivan-2026-04-28-17hs-matriz", "data": "2026-04-28", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, // [cite: 3]
    { "id": "83-adair-2026-04-29-0830hs-matriz", "data": "2026-04-29", "horario": "08:30hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Atendimento" }, // [cite: 3]
    { "id": "84-rafael-2026-04-29-17hs-matriz", "data": "2026-04-29", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, // [cite: 3]
    { "id": "85-ivan-2026-04-30-08hs-matriz", "data": "2026-04-30", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, // [cite: 3]
    { "id": "86-adair-2026-04-30-16hs-matriz", "data": "2026-04-30", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" } // [cite: 3]
];

  const getUniquePadres = () => Array.from(new Set(escalas.map((escala) => escala.padre)));
  const getUniqueLocais = () => Array.from(new Set(escalas.map((escala) => escala.local)));

  const filteredEscalas = escalas.filter((escala) => {
    return (
      (padreFilter === "" || escala.padre === padreFilter) &&
      (localFilter === "" || escala.local === localFilter)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6 mt-6">
        Calendário de Confissões
      </h1>
      <div className="filters flex justify-around mb-6 p-4 bg-gray-100 rounded-lg shadow-lg">
        <select
          className="p-2 border border-gray-300 rounded-lg w-1/3"
          onChange={(e) => setPadreFilter(e.target.value)}
          value={padreFilter}
        >
          <option value="">Padres</option>
          {getUniquePadres().map((padre) => (
            <option key={padre} value={padre}>{padre}</option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded-lg w-1/3"
          onChange={(e) => setLocalFilter(e.target.value)}
          value={localFilter}
        >
          <option value="">Locais</option>
          {getUniqueLocais().map((local) => (
            <option key={local} value={local}>{local}</option>
          ))}
        </select>
      </div>
      {filteredEscalas.map((escala) => (
        <CardEscala
          key={escala.id}
          padre={escala.padre}
          data={escala.data}
          horario={escala.horario}
          local={escala.local}
          coroinhas={coroinhasData[escala.id] || []}
        />
      ))}
    </div>
  );
};

export default CalendarConfissoes;