import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const CalendarioMissas: React.FC = () => {
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
    // --- 17/01 ---
    { "id": "66-2026-01-17-19hs-matriz", "data": "2026-01-17", "horario": "19hs", "local": "Matriz", "padre": "Frei Gilmar" },

    // --- 18/01 ---
    { "id": "63-rafael-2026-01-18-07hs-divino", "data": "2026-01-18", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "64-ivan-2026-01-18-07hs-matriz", "data": "2026-01-18", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "65-eudasio-2026-01-18-09hs-matriz", "data": "2026-01-18", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "66-ivan-2026-01-18-17hs-divino", "data": "2026-01-18", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "70-2026-01-18-19hs-matriz", "data": "2026-01-18", "horario": "19hs", "local": "Matriz", "padre": "Padre João Paulo" },

    // --- 19/01 ---
    { "id": "71-2026-01-19-19hs-matriz", "data": "2026-01-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Roberto" },

    // --- 20/01 ---
    { "id": "67-rafael-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Rafael" },
    { "id": "68-ivan-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Ivan" },
    { "id": "69-eudasio-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Eudásio" },
    { "id": "70-rafael-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Rafael" },
    { "id": "71-ivan-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Ivan" },
    { "id": "72-eudasio-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Eudásio" },

    // --- 21/01 ---
    { "id": "73-ivan-2026-01-21-19hs-matriz", "data": "2026-01-21", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Ivan" },

    // --- 22/01 ---
    { "id": "74-ivan-2026-01-22-19hs-maerainha", "data": "2026-01-22", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" },

    // --- 23/01 ---
    { "id": "75-ivan-2026-01-23-19hs-urucara", "data": "2026-01-23", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" },

    // --- 24/01 ---
    { "id": "76-ivan-2026-01-24-19hs-matriz", "data": "2026-01-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 25/01 ---
    { "id": "77-ivan-2026-01-25-07hs-matriz", "data": "2026-01-25", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "78-rafael-2026-01-25-07hs-divino", "data": "2026-01-25", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "79-ivan-2026-01-25-09hs-matriz", "data": "2026-01-25", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "80-rafael-2026-01-25-10hs-matriz", "data": "2026-01-25", "horario": "10hs", "local": "Matriz (Investidura)", "padre": "Padre Rafael" },
    { "id": "81-ivan-2026-01-25-17hs-divino", "data": "2026-01-25", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "82-rafael-2026-01-25-17hs-pastoral", "data": "2026-01-25", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "83-ivan-2026-01-25-19hs-pqiracema", "data": "2026-01-25", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
    { "id": "84-rafael-2026-01-25-19hs-matriz", "data": "2026-01-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

    // --- 27/01 ---
    { "id": "85-ivan-2026-01-27-19hs-saopedro", "data": "2026-01-27", "horario": "19hs", "local": "São Pedro", "padre": "Padre Ivan" },

    // --- 28/01 ---
    { "id": "86-ivan-2026-01-28-19hs-matriz", "data": "2026-01-28", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Ivan" },

    // --- 31/01 ---
    { "id": "87-ivan-2026-01-31-19hs-matriz", "data": "2026-01-31", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "88-rafael-2026-01-31-19hs-outrabanda", "data": "2026-01-31", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Rafael" }
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
        Calendário de Missas
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

export default CalendarioMissas;