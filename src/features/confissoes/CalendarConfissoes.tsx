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
// --- 04/08 (Terça-feira) ---
  { "id": "escalaagosto-ivan-2026-08-04-17hs-confissoes-1", "data": "2026-08-04", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 05/08 (Quarta-feira) ---
  { "id": "escalaagosto-pr-2026-08-05-08h30-atendimento-1", "data": "2026-08-05", "horario": "08h30", "local": "Atendimento", "padre": "Padre Rafael" },

  // --- 06/08 (Quinta-feira) ---
  { "id": "escalaagosto-ivan-2026-08-06-08hs-confissoes-1", "data": "2026-08-06", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 07/08 (Sexta-feira) ---
  { "id": "escalaagosto-confissoes-2026-08-07-17hs-confissoes-1", "data": "2026-08-07", "horario": "17hs", "local": "Confissões", "padre": "Não especificado" },

  // --- 11/08 (Terça-feira) ---
  { "id": "escalaagosto-ivan-2026-08-11-17hs-confissoes-1", "data": "2026-08-11", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 12/08 (Quarta-feira) ---
  { "id": "escalaagosto-pr-2026-08-12-08h30-atendimento-1", "data": "2026-08-12", "horario": "08h30", "local": "Atendimento", "padre": "Padre Rafael" },

  // --- 13/08 (Quinta-feira) ---
  { "id": "escalaagosto-ivan-2026-08-13-08hs-confissoes-1", "data": "2026-08-13", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 14/08 (Sexta-feira) ---
  { "id": "escalaagosto-pr-2026-08-14-17hs-confissoes-1", "data": "2026-08-14", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" },

  // --- 18/08 (Terça-feira) ---
  { "id": "escalaagosto-ivan-2026-08-18-17hs-confissoes-1", "data": "2026-08-18", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 19/08 (Quarta-feira) ---
  { "id": "escalaagosto-pr-2026-08-19-08h30-atendimento-1", "data": "2026-08-19", "horario": "08h30", "local": "Atendimento", "padre": "Padre Rafael" },

  // --- 20/08 (Quinta-feira) ---
  { "id": "escalaagosto-ivan-2026-08-20-08hs-confissoes-1", "data": "2026-08-20", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 21/08 (Sexta-feira) ---
  { "id": "escalaagosto-pr-2026-08-21-17hs-confissoes-1", "data": "2026-08-21", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" },

  // --- 25/08 (Terça-feira) ---
  { "id": "escalaagosto-ivan-2026-08-25-17hs-confissoes-1", "data": "2026-08-25", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 26/08 (Quarta-feira) ---
  { "id": "escalaagosto-pr-2026-08-26-08h30-atendimento-1", "data": "2026-08-26", "horario": "08h30", "local": "Atendimento", "padre": "Padre Rafael" },

  // --- 27/08 (Quinta-feira) ---
  { "id": "escalaagosto-ivan-2026-08-27-08hs-confissoes-1", "data": "2026-08-27", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },

  // --- 28/08 (Sexta-feira) ---
  { "id": "escalaagosto-pr-2026-08-28-17hs-confissoes-1", "data": "2026-08-28", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" }

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
        Calendário de Matriz
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