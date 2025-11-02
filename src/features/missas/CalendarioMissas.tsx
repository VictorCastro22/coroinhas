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
    { "id": "999-2025-11-01-17h-SantoAntonio", "data": "2025-11-01", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" },
    { "id": "999-2025-11-01-17h-SantaLuzia", "data": "2025-11-01", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Rafael" },
    { "id": "999-2025-11-01-19h-Coite", "data": "2025-11-01", "horario": "19hs", "local": "Coité", "padre": "Padre Ivan" },
    { "id": "999-2025-11-01-19h-Matriz", "data": "2025-11-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

    { "id": "999-2025-11-02-07h-Cemiterio", "data": "2025-11-02", "horario": "07hs", "local": "Cemitério", "padre": "Padre Eudásio" },
    { "id": "999-2025-11-02-07h-Matriz", "data": "2025-11-02", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "999-2025-11-02-07h-Divino", "data": "2025-11-02", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "999-2025-11-02-09h-Matriz", "data": "2025-11-02", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-11-02-09h-SaoJose", "data": "2025-11-02", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
    { "id": "999-2025-11-02-17h-Cemiterio", "data": "2025-11-02", "horario": "17hs", "local": "Cemitério", "padre": "Padre Eudásio" },
    { "id": "999-2025-11-02-17h-Divino", "data": "2025-11-02", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "999-2025-11-02-19h-Matriz", "data": "2025-11-02", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-11-02-19h-PqSaoJoao", "data": "2025-11-02", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "999-2025-11-02-19h-NPqIracema", "data": "2025-11-02", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" }
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