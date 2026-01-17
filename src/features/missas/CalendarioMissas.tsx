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
    { "id": "65-2026-01-16-19hs-matriz", "data": "2026-01-16", "horario": "19hs", "local": "Matriz", "padre": "Padre João Pedro" },
    { "id": "66-2026-01-17-19hs-matriz", "data": "2026-01-17", "horario": "19hs", "local": "Matriz", "padre": "Frei Gilmar" },


    { "id": "63-rafael-2026-01-18-07hs-divino", "data": "2026-01-18", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "64-ivan-2026-01-18-07hs-matriz", "data": "2026-01-18", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "65-eudasio-2026-01-18-09hs-matriz", "data": "2026-01-18", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "66-ivan-2026-01-18-17hs-divino", "data": "2026-01-18", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },

    
    { "id": "70-2026-01-18-19hs-matriz", "data": "2026-01-18", "horario": "19hs", "local": "Matriz", "padre": "Padre João Paulo" },
    { "id": "71-2026-01-19-19hs-matriz", "data": "2026-01-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Roberto" },

    // --- 20/01/2026 ---
    { "id": "67-rafael-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Rafael" },
    { "id": "68-ivan-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Ivan" },
    { "id": "69-eudasio-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Eudásio" },
    { "id": "70-rafael-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Rafael" },
    { "id": "71-ivan-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Ivan" },
    { "id": "72-eudasio-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Eudásio" }
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