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

const escalas = [
// --- SEMANA 1 ---
    { "id": "56-ivan-2026-03-03-17hs-matriz", "data": "2026-03-03", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 1]
    { "id": "57-rafael-2026-03-04-17hs-matriz", "data": "2026-03-04", "horario": "17hs-20h", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 1]
    { "id": "58-ivan-2026-03-05-08hs-matriz", "data": "2026-03-05", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 1]

    // --- SEMANA 2 ---
    { "id": "59-ivan-2026-03-10-17hs-matriz", "data": "2026-03-10", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 1]
    { "id": "60-rafael-2026-03-11-17hs-matriz", "data": "2026-03-11", "horario": "17hs-20h", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 1]
    { "id": "61-ivan-2026-03-12-08hs-matriz", "data": "2026-03-12", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 1]

    // --- SEMANA 3 ---
    { "id": "62-ivan-2026-03-17-17hs-matriz", "data": "2026-03-17", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, // 
    { "id": "63-rafael-2026-03-18-17hs-matriz", "data": "2026-03-18", "horario": "17hs-20h", "local": "Matriz", "padre": "Padre Rafael" }, // 
    { "id": "64-ivan-2026-03-19-08hs-matriz", "data": "2026-03-19", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan" }, // 

    // --- SEMANA 4 (Mutirão e Feriado) ---
    { "id": "65-ivan-2026-03-20-08hs-matriz", "data": "2026-03-20", "horario": "08hs-11:30", "local": "Matriz", "padre": "Padre Ivan" }, // 
    { "id": "66-ivan-2026-03-20-14hs-cp", "data": "2026-03-20", "horario": "14hs-21h", "local": "Centro de Pastoral", "padre": "Padre Ivan" }, // 
    { "id": "67-ivan-2026-03-24-17hs-matriz", "data": "2026-03-24", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, // 
    { "id": "68-adair-2026-03-25-17hs-matriz", "data": "2026-03-25", "horario": "17hs", "local": "Matriz", "padre": "Padre Adair" }, // 
    { "id": "69-ivan-2026-03-26-08hs-matriz", "data": "2026-03-26", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan" } //
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