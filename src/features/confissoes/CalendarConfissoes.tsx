import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
  funcao?: string;
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
          funcao: data.funcao || "",
        });
      }

      setCoroinhas(coroinhasData);
    };

    fetchCoroinhas();
  }, []);

  const escalas = [
    { "id": "escalaoutubro-ivan-2026-10-01-08hs-confissoes-1", "data": "2026-10-01", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-adefinir-2026-10-02-17hs-rosario-1", "data": "2026-10-02", "horario": "17hs", "local": "Confissões no Rosário", "padre": "A definir" },
    { "id": "escalaoutubro-rafael-2026-10-06-17hs-rosario-1", "data": "2026-10-06", "horario": "17hs", "local": " Rosário(Confissões)", "padre": "Padre Rafael" },
    { "id": "escalaoutubro-rafael-2026-10-07-0830-atendimento-1", "data": "2026-10-07", "horario": "08:30", "local": "Secretaria", "padre": "Padre Rafael" },
    { "id": "escalaoutubro-ivan-2026-10-08-08hs-confissoes-1", "data": "2026-10-08", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-ivan-2026-10-09-17hs-confissoes-1", "data": "2026-10-09", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-ivanerafael-2026-10-10-08hs-cp-1", "data": "2026-10-10", "horario": "08hs", "local": "CP (Confissões)", "padre": "Padre Ivan e Padre Rafael" },
    { "id": "escalaoutubro-ivan-2026-10-13-17hs-confissoes-1", "data": "2026-10-13", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-rafael-2026-10-14-0830-Secretaria-1", "data": "2026-10-14", "horario": "08:30", "local": "Secretaria", "padre": "Padre Rafael" },
    { "id": "escalaoutubro-ivan-2026-10-15-08hs-confissoes-1", "data": "2026-10-15", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-rafael-2026-10-16-17hs-confissoes-1", "data": "2026-10-16", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" },
    { "id": "escalaoutubro-ivanerafael-2026-10-17-08hs-cp-1", "data": "2026-10-17", "horario": "08hs", "local": "CP (Confissões)", "padre": "Padre Ivan e Padre Rafael" },
    { "id": "escalaoutubro-ivan-2026-10-20-17hs-confissoes-1", "data": "2026-10-20", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-rafael-2026-10-21-0830-Secretaria-1", "data": "2026-10-21", "horario": "08:30", "local": "Secretaria", "padre": "Padre Rafael" },
    { "id": "escalaoutubro-ivan-2026-10-22-08hs-confissoes-1", "data": "2026-10-22", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-rafael-2026-10-23-17hs-confissoes-1", "data": "2026-10-23", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" },
    { "id": "escalaoutubro-ivanerafael-2026-10-24-08hs-cp-1", "data": "2026-10-24", "horario": "08hs", "local": "CP (Confissões)", "padre": "Padre Ivan e Padre Rafael" },
    { "id": "escalaoutubro-ivan-2026-10-27-17hs-confissoes-1", "data": "2026-10-27", "horario": "17hs", "local": "Confissões", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-rafael-2026-10-28-0830-Secretaria-1", "data": "2026-10-28", "horario": "08:30", "local": "Secretaria", "padre": "Padre Rafael" },
    { "id": "escalaoutubro-ivan-2026-10-29-08hs-confissoes-1", "data": "2026-10-29", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-ivan-2026-10-31-08hs-matriz-1", "data": "2026-10-31", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" },
    { "id": "escalaoutubro-rafael-2026-10-31-09hs-pqsjoao-1", "data": "2026-10-31", "horario": "09hs", "local": "Parque São João (Confissões)", "padre": "Padre Rafael" },
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
          coroinhasEscalados={(coroinhasData[escala.id] || []).map(c => ({
            nome: c.nome,
            funcao: c.funcao || "Definida no dia"
          }))}
        />
      ))}
    </div>
  );
};

export default CalendarConfissoes;