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
// --- SEMANA 2 ---
    { "id": "100-ivan-2026-05-05-17hs-matriz", "data": "2026-05-05", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "101-adair-2026-05-06-0830hs-sec", "data": "2026-05-06", "horario": "08:30hs", "local": "Secretaria Paroquial", "padre": "Padre Adair", "tipo": "Atendimento" }, //
    { "id": "102-rafael-2026-05-06-1630hs-matriz", "data": "2026-05-06", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //
    { "id": "103-ivan-2026-05-07-08hs-matriz", "data": "2026-05-07", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "104-adair-2026-05-07-16hs-matriz", "data": "2026-05-07", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, //
    { "id": "105-rafael-2026-05-08-17hs-matriz", "data": "2026-05-08", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //

    // --- SEMANA 3 ---
    { "id": "106-ivan-2026-05-12-17hs-matriz", "data": "2026-05-12", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "107-rafael-2026-05-13-1630hs-matriz", "data": "2026-05-13", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //
    { "id": "108-ivan-2026-05-14-08hs-matriz", "data": "2026-05-14", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "109-adair-2026-05-14-16hs-matriz", "data": "2026-05-14", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, //
    { "id": "110-rafael-2026-05-15-17hs-matriz", "data": "2026-05-15", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //

    // --- SEMANA 4 ---
    { "id": "111-ivan-2026-05-19-17hs-matriz", "data": "2026-05-19", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "112-adair-2026-05-20-0830hs-sec", "data": "2026-05-20", "horario": "08:30hs", "local": "Secretaria Paroquial", "padre": "Padre Adair", "tipo": "Atendimento" }, //
    { "id": "113-rafael-2026-05-20-1630hs-matriz", "data": "2026-05-20", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //
    { "id": "114-adair-2026-05-21-16hs-matriz", "data": "2026-05-21", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, //
    { "id": "115-rafael-2026-05-22-17hs-matriz", "data": "2026-05-22", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //

    // --- SEMANA 5 ---
    { "id": "116-ivan-2026-05-26-17hs-matriz", "data": "2026-05-26", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan", "tipo": "Confissões" }, //
    { "id": "117-adair-2026-05-27-0830hs-sec", "data": "2026-05-27", "horario": "08:30hs", "local": "Secretaria Paroquial", "padre": "Padre Adair", "tipo": "Atendimento" }, //
    { "id": "118-rafael-2026-05-27-1630hs-matriz", "data": "2026-05-27", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" }, //
    { "id": "119-adair-2026-05-28-16hs-matriz", "data": "2026-05-28", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair", "tipo": "Confissões" }, //
    { "id": "120-rafael-2026-05-29-17hs-matriz", "data": "2026-05-29", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael", "tipo": "Confissões" } //
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