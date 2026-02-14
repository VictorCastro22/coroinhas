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
// --- 14/02 ---
    { "id": "1-adair-2026-02-14-17hs-santadulce", "data": "2026-02-14", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Adair" }, // [cite: 1]
    { "id": "2-adair-2026-02-14-19hs-saojoaobatista", "data": "2026-02-14", "horario": "19hs", "local": "São João Batista", "padre": "Padre Adair" }, // [cite: 1]
    { "id": "3-rafael-2026-02-14-19hs-matriz", "data": "2026-02-14", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 1]

    // --- 15/02 (Domingo) ---
    { "id": "4-adair-2026-02-15-07hs-matriz", "data": "2026-02-15", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "5-adair-2026-02-15-09hs-matriz", "data": "2026-02-15", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "6-rafael-2026-02-15-17hs-divino", "data": "2026-02-15", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "7-rafael-2026-02-15-19hs-matriz", "data": "2026-02-15", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "8-adair-2026-02-15-19hs-aparecida", "data": "2026-02-15", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Adair" }, // [cite: 3]

    // --- 16/02 ---
    { "id": "9-erenildo-2026-02-16-18hs-matriz", "data": "2026-02-16", "horario": "18hs", "local": "Renovar", "padre": "Padre Erenildo" }, // [cite: 3]
    { "id": "10-adair-2026-02-17-18hs-matriz", "data": "2026-02-17", "horario": "18hs", "local": "Renovar", "padre": "Padre Adair" }, // [cite: 3]

    // --- 18/02 ---
    { "id": "11-adair-2026-02-18-07hs-matriz", "data": "2026-02-18", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "12-rafael-2026-02-18-07hs-divino", "data": "2026-02-18", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "13-ivan-2026-02-18-07hs-santaedwiges", "data": "2026-02-18", "horario": "07hs", "local": "Santa Edwiges", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "14-rafael-2026-02-18-17hs-matriz", "data": "2026-02-18", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "15-ivan-2026-02-18-17hs-pqsaojoao", "data": "2026-02-18", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "16-adair-2026-02-18-17hs-divino", "data": "2026-02-18", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "17-adair-2026-02-18-19hs-matriz", "data": "2026-02-18", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "18-ivan-2026-02-18-19hs-aparecida", "data": "2026-02-18", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "19-rafael-2026-02-18-19hs-rita", "data": "2026-02-18", "horario": "19hs", "local": "Santa Rita", "padre": "Padre Rafael" }, // [cite: 3]

    // --- DIA 19 (Quinta-feira) ---
    { "id": "20-ivan-2026-02-19-19hs-matriz", "data": "2026-02-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "21-adair-2026-02-19-19hs-nsdores", "data": "2026-02-19", "horario": "19hs", "local": "Nossa Sra. Das Dores", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "22-rafael-2026-02-19-19hs-piedade", "data": "2026-02-19", "horario": "19hs", "local": "Nossa Sra. Da Piedade", "padre": "Padre Rafael" }, // [cite: 3]

    // --- DIA 20 (Sexta-feira) ---
    { "id": "23-rafael-2026-02-20-19hs-matriz", "data": "2026-02-20", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "24-adair-2026-02-20-19hs-rosario", "data": "2026-02-20", "horario": "19hs", "local": "Rosário", "padre": "Padre Adair" }, // [cite: 3]

    // --- DIA 21 (Sábado) ---
    { "id": "25-ivan-2026-02-21-17hs-santoantonio", "data": "2026-02-21", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "26-adair-2026-02-21-17hs-santaluzia", "data": "2026-02-21", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "27-adair-2026-02-21-19hs-sagrado", "data": "2026-02-21", "horario": "19hs", "local": "Sagrado Coração de Jesus", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "28-ivan-2026-02-21-19hs-matriz", "data": "2026-02-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 3]

    // --- DIA 22 (Domingo) ---
    { "id": "29-ivan-2026-02-22-07hs-matriz", "data": "2026-02-22", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "30-rafael-2026-02-22-07hs-divino", "data": "2026-02-22", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "31-adair-2026-02-22-09hs-matriz", "data": "2026-02-22", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "32-adair-2026-02-22-1530hs-santaedwiges", "data": "2026-02-22", "horario": "15:30h", "local": "Santa Edwiges", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "33-rafael-2026-02-22-17hs-pastoral", "data": "2026-02-22", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "34-ivan-2026-02-22-17hs-divino", "data": "2026-02-22", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "35-adair-2026-02-22-17hs-pqsaojoao", "data": "2026-02-22", "horario": "17hs", "local": "Parque São João", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "36-rafael-2026-02-22-19hs-matriz", "data": "2026-02-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "37-ivan-2026-02-22-19hs-aparecida", "data": "2026-02-22", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "38-adair-2026-02-22-19hs-urucara", "data": "2026-02-22", "horario": "19hs", "local": "Urucará", "padre": "Padre Adair" }, // [cite: 3]

    // --- DIA 24 (Terça-feira) ---
    { "id": "39-ivan-2026-02-24-19hs-matriz", "data": "2026-02-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "40-adair-2026-02-24-19hs-santaterezinha", "data": "2026-02-24", "horario": "19hs", "local": "Santa Terezinha", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "41-rafael-2026-02-24-19hs-saopedro", "data": "2026-02-24", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" }, // [cite: 3]

    // --- DIA 25 (Quarta-feira) ---
    { "id": "42-adair-2026-02-25-19hs-matriz", "data": "2026-02-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "43-ivan-2026-02-25-19hs-santaedwiges", "data": "2026-02-25", "horario": "19hs", "local": "Santa Edwiges", "padre": "Padre Ivan" }, // [cite: 3]

    // --- DIA 26 (Quinta-feira) ---
    { "id": "44-rafael-2026-02-26-19hs-matriz", "data": "2026-02-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "45-adair-2026-02-26-19hs-maerainha", "data": "2026-02-26", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Adair" }, // [cite: 3]

    // --- DIA 27 (Sexta-feira) ---
    { "id": "46-ivan-2026-02-27-19hs-matriz", "data": "2026-02-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "47-adair-2026-02-27-19hs-nsgracas", "data": "2026-02-27", "horario": "19hs", "local": "Nossa Sra. das Graças", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "48-rafael-2026-02-27-19hs-rosario", "data": "2026-02-27", "horario": "19hs", "local": "Rosário", "padre": "Padre Rafael" }, // [cite: 3]

    // --- DIA 28 (Sábado) ---
    { "id": "49-rafael-2026-02-28-17hs-santadulce", "data": "2026-02-28", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "50-adair-2026-02-28-19hs-matriz", "data": "2026-02-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "51-ivan-2026-02-28-19hs-saojoaobatista", "data": "2026-02-28", "horario": "19hs", "local": "São João Batista", "padre": "Padre Ivan" } // [cite: 3]
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