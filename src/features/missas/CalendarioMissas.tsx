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
// --- 21/01 ---
    { "id": "1-ivan-2026-01-21-19hs-matriz", "data": "2026-01-21", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Ivan" },

    // --- 22/01 ---
    { "id": "2-ivan-2026-01-22-19hs-maerainha", "data": "2026-01-22", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" },

    // --- 23/01 ---
    { "id": "3-ivan-2026-01-23-19hs-candeias", "data": "2026-01-23", "horario": "19hs", "local": "Nossa Senhora das Candeias (Festa)", "padre": "Padre Ivan" },

    // --- 24/01 ---
    { "id": "4-ivan-2026-01-24-19hs-matriz", "data": "2026-01-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 25/01 (Domingo) ---
    { "id": "5-antoniolima-2026-01-25-07hs-matriz", "data": "2026-01-25", "horario": "07hs", "local": "Matriz", "padre": "Padre Antonio" },
    { "id": "6-ivan-2026-01-25-07hs-divino", "data": "2026-01-25", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "7-ivan-2026-01-25-09hs-matriz", "data": "2026-01-25", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "8-aurenio-2026-01-25-10hs-matriz", "data": "2026-01-25", "horario": "10hs", "local": "Matriz (Investidura MESC-MEPA)", "padre": "Padre Aurênio" },
    { "id": "9-antoniolima-2026-01-25-17hs-pastoral", "data": "2026-01-25", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Antonio" },
    { "id": "10-ivan-2026-01-25-17hs-divino", "data": "2026-01-25", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "11-rafael-2026-01-25-17hs-pqsaojoao", "data": "2026-01-25", "horario": "17hs", "local": "Nossa Senhora de Fátima", "padre": "Padre Rafael" },
    { "id": "12-antoniolima-2026-01-25-19hs-matriz", "data": "2026-01-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Antonio" },
    { "id": "13-rafael-2026-01-25-19hs-aparecida", "data": "2026-01-25", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },

    // --- 27/01 ---
    { "id": "14-ivan-2026-01-27-19hs-saopedro", "data": "2026-01-27", "horario": "19hs", "local": "São Pedro", "padre": "Padre Ivan" },

    // --- 28/01 ---
    { "id": "15-ivan-2026-01-28-19hs-matriz", "data": "2026-01-28", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Ivan" },

    // --- 31/01 ---
    { "id": "16-rafael-2026-01-31-17hs-saobenedito", "data": "2026-01-31", "horario": "17hs", "local": "São Benedito", "padre": "Padre Rafael" },
    { "id": "17-rafael-2026-01-31-19hs-saojoaobatista", "data": "2026-01-31", "horario": "19hs", "local": "São João Batista", "padre": "Padre Rafael" },
    { "id": "18-ivan-2026-01-31-19hs-matriz", "data": "2026-01-31", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 01/02 (Domingo) ---
    { "id": "19-ivan-2026-02-01-07hs-matriz", "data": "2026-02-01", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "20-rafael-2026-02-01-07hs-divino", "data": "2026-02-01", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "21-ivan-2026-02-01-09hs-matriz", "data": "2026-02-01", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "22-rafael-2026-02-01-09hs-saojose", "data": "2026-02-01", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" },
    { "id": "23-ivan-2026-02-01-17hs-pastoral", "data": "2026-02-01", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Ivan" },
    { "id": "24-rafael-2026-02-01-17hs-divino", "data": "2026-02-01", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "25-alexandre-2026-02-01-17hs-pqsaojoao", "data": "2026-02-01", "horario": "17hs", "local": "Nossa Senhora de Fátima", "padre": "Diácono Alexandre" },
    { "id": "26-rafael-2026-02-01-19hs-matriz", "data": "2026-02-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "27-ivan-2026-02-01-19hs-aparecida", "data": "2026-02-01", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Ivan" },

    // --- 02/02 ---
    { "id": "28-rafael-2026-02-02-19hs-candeias", "data": "2026-02-02", "horario": "19hs", "local": "Nossa Senhora Candeias (Festa)", "padre": "Padre Rafael" },

    // --- 04/02 ---
    { "id": "29-ivan-2026-02-04-19hs-matriz", "data": "2026-02-04", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Ivan" },

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