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
    { id: "83-2025-04-20-17h-Divino", data: "2025-04-20", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "83-2025-04-20-17h-PqSaoJoao", data: "2025-04-20", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "83-2025-04-20-17h-CentroPastoral", data: "2025-04-20", horario: "17h", local: "Centro Pastoral", padre: "Padre Eudásio" },
    { id: "83-2025-04-20-19h-NovoParqueIracema", data: "2025-04-20", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "83-2025-04-20-19h-Matriz", data: "2025-04-20", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    
    { id: "83-2025-04-22-19h-SerraPelada", data: "2025-04-22", horario: "19h", local: "Serra Pelada", padre: "Padre Rafael" },

    { id: "83-2025-04-23-19h-SantaCecilia", data: "2025-04-23", horario: "19h", local: "Santa Cecília", padre: "Padre Ivan" },
    { id: "83-2025-04-23-19h-Matriz", data: "2025-04-23", horario: "19h", local: "Matriz - Missa pelas familias", padre: "Convidado" },

    { id: "83-2025-04-24-19h-MaeRainha", data: "2025-04-24", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },
    { id: "83-2025-04-24-19h-CampoDelta", data: "2025-04-24", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },

    { id: "83-2025-04-25-19h-ConegoPinto", data: "2025-04-25", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },
    { id: "83-2025-04-25-19h-Rosario", data: "2025-04-25", horario: "19h", local: "Rosário", padre: "Padre Ivan" },

    { id: "83-2025-04-26-17h-Abrigo", data: "2025-04-26", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "83-2025-04-26-17h-SantaDulce", data: "2025-04-26", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "83-2025-04-26-19h-OutraBanda", data: "2025-04-26", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },
    { id: "83-2025-04-26-19h-Matriz", data: "2025-04-26", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },

    { id: "83-2025-04-27-07h-Matriz", data: "2025-04-27", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "83-2025-04-27-07h-Divino", data: "2025-04-27", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "83-2025-04-27-09h-Matriz", data: "2025-04-27", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-04-27-15h30-SantosDumont", data: "2025-04-27", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "83-2025-04-27-17h-Divino", data: "2025-04-27", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "83-2025-04-27-17h-CentroPastoral", data: "2025-04-27", horario: "17h", local: "Centro Pastoral", padre: "Padre Ivan" },
    { id: "83-2025-04-27-17h-PqSaoJoao", data: "2025-04-27", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "83-2025-04-27-19h-Matriz", data: "2025-04-27", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-04-27-19h-NovoParqueIracema", data: "2025-04-27", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    
    { id: "83-2025-04-30-19h-Matriz", data: "2025-04-30", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" }
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