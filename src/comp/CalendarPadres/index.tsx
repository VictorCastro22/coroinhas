import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../CardEscala";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const CalendarPadres: React.FC = () => {
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
    { id: "83-2025-03-27-19h-CampoDelta", data: "2025-03-27", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },
    { id: "83-2025-03-27-19h-MaeRainha", data: "2025-03-27", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },

    { id: "83-2025-03-28-19h-Tabuba", data: "2025-03-28", horario: "19h", local: "Tabuba (Posse de Pe. Ednaldo)", padre: "Padre Eudásio" },
    { id: "83-2025-03-28-19h-ConegoPinto", data: "2025-03-28", horario: "19h", local: "Cônego Pinto", padre: "Padre Ivan" },
    { id: "83-2025-03-28-19h-Rosario", data: "2025-03-28", horario: "19h", local: "Rosário", padre: "Padre Rafael" },

    { id: "83-2025-03-29-17h-SaoBenedito", data: "2025-03-29", horario: "17h", local: "São Benedito", padre: "Padre Rafael" },
    { id: "83-2025-03-29-19h-Matriz", data: "2025-03-29", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "83-2025-03-30-07h-Matriz", data: "2025-03-30", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-03-30-07h-Divino", data: "2025-03-30", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "83-2025-03-30-09h-Matriz", data: "2025-03-30", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-03-30-17h-PqSaoJoao", data: "2025-03-30", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "83-2025-03-30-17h-CentroPastoral", data: "2025-03-30", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "83-2025-03-30-17h-Divino", data: "2025-03-30", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "83-2025-03-30-19h-NPqIracema", data: "2025-03-30", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    { id: "83-2025-03-30-19h-PqSaoJoao", data: "2025-03-30", horario: "19h", local: "Matriz", padre: "Padre Rafael" }
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

export default CalendarPadres;