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
  { "id": "escalasetembro-rafael-2026-09-15-17hs-confissoes-1", "data": "2026-09-15", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" },
  { "id": "escalasetembro-rafael-2026-09-16-0830hs-secretaria-1", "data": "2026-09-16", "horario": "08:30hs", "local": "Secretaria", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-17-08hs-confissoes-1", "data": "2026-09-17", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },
  { "id": "escalasetembro-ivan-2026-09-18-17hs-confissoes-1", "data": "2026-09-18", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },
  { "id": "escalasetembro-ivan-2026-09-22-17hs-confissoes-1", "data": "2026-09-22", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-23-0830hs-secretaria-1", "data": "2026-09-23", "horario": "08:30hs", "local": "Secretaria", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-24-08hs-confissoes-1", "data": "2026-09-24", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-25-17hs-confissoes-1", "data": "2026-09-25", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-29-17hs-confissoes-1", "data": "2026-09-29", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-30-0830hs-secretaria-1", "data": "2026-09-30", "horario": "08:30hs", "local": "Secretaria", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-01-08hs-confissoes-1", "data": "2026-10-01", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-adefinir-2026-10-02-17hs-rosario-1", "data": "2026-10-02", "horario": "17hs", "local": "Rosário", "padre": "A definir" },

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