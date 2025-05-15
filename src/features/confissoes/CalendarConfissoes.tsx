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
    { id: "83-2025-05-21-08h-Secretaria", data: "2025-05-21", horario: "08h", local: "Secretaria", padre: "Padre Eudásio" },
    { id: "83-2025-05-21-17h-ConfissoesMatriz", data: "2025-05-21", horario: "17h", local: "Matriz", padre: "Padre Rafael" },  
    { id: "83-2025-05-22-08h-Matriz", data: "2025-05-22", horario: "08h", local: "Matriz", padre: "Padre Ivan" },
    { id: "83-2025-05-28-17h-ConfissoesMatriz", data: "2025-05-28", horario: "17h", local: "Matriz", padre: "Padre Rafael" },


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