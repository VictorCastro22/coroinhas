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

    // --- 04/02 ---
    { "id": "29-ivan-2026-02-04-19hs-matriz", "data": "2026-02-04", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Ivan" },

    { "id": "99-rafael-2026-02-06-18hs-matriz", "data": "2026-02-06", "horario": "18h30", "local": "Centro de Pastoral (Adoração e Missa)", "padre": "Padre Rafael" },

    // --- 07/02 ---
    { "id": "30-rafael-2026-02-07-19hs-matriz", "data": "2026-02-07", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "31-ivan-2026-02-07-19hs-sagrado", "data": "2026-02-07", "horario": "19hs", "local": "Sagrado Coração de Jesus", "padre": "Padre Ivan" },

    // --- 08/02 (Domingo) ---
    { "id": "32-ivan-2026-02-08-07hs-matriz", "data": "2026-02-08", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "33-rafael-2026-02-08-07hs-divino", "data": "2026-02-08", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "34-domjose-2026-02-08-09hs-matriz", "data": "2026-02-08", "horario": "09hs", "local": "Matriz (Posse Pe. Adair)", "padre": "Dom José Antonio" },
    { "id": "35-rafael-2026-02-08-17hs-pastoral", "data": "2026-02-08", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "36-adair-2026-02-08-17hs-divino", "data": "2026-02-08", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" },
    { "id": "37-ivan-2026-02-08-17hs-pqsaojoao", "data": "2026-02-08", "horario": "17hs", "local": "Nossa Senhora de Fátima", "padre": "Padre Ivan" },
    { "id": "38-adair-2026-02-08-19hs-matriz", "data": "2026-02-08", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "39-rafael-2026-02-08-19hs-aparecida", "data": "2026-02-08", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },

    // --- 11/02 ---
    { "id": "40-adair-2026-02-11-19hs-matriz", "data": "2026-02-11", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Adair" }
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