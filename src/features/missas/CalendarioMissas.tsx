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
    { id: "83-2025-06-16-19h-SJBatista", data: "2025-06-16", horario: "19h", local: "Festejos - São João Batista", padre: "Padre João Paulo" },
    { id: "83-2025-06-16-19h-SCoração", data: "2025-06-16", horario: "19h", local: "Festejos - Sagrado Coração", padre: "Padre Ivan" },

    { id: "83-2025-06-17-19h-SJBatista", data: "2025-06-17", horario: "19h", local: "Festejos - São João Batista", padre: "Padre Roberto" },
    { id: "83-2025-06-17-19h-SCoração", data: "2025-06-17", horario: "19h", local: "Festejos - Sagrado Coração", padre: "Padre Geisso" },
    { id: "83-2025-06-17-19h-PlanaltoCajueiros", data: "2025-06-17", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Eudásio" },
    { id: "83-2025-06-17-19h-Urucara", data: "2025-06-17", horario: "19h", local: "Urucará", padre: "Padre Rafael" },

    { id: "83-2025-06-18-19h-Matriz", data: "2025-06-18", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" },
    { id: "83-2025-06-18-19h-Guabiraba", data: "2025-06-18", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "83-2025-06-19-17h-Divino", data: "2025-06-19", horario: "17h", local: "Divino - Corpus Christi", padre: "Padre Rafael" },
    { id: "83-2025-06-19-19h-Matriz", data: "2025-06-19", horario: "19h", local: "Matriz - Corpus Christi", padre: "Padre Eudásio" },
    { id: "83-2025-06-19-19h-Matriz2", data: "2025-06-19", horario: "19h", local: "Matriz - Corpus Christi", padre: "Padre Ivan" },

    { id: "83-2025-06-20-19h-SJBatista", data: "2025-06-20", horario: "19h", local: "Festejos - São João Batista", padre: "Padre Rafhael" },
    { id: "83-2025-06-20-19h-Matriz", data: "2025-06-20", horario: "19h", local: "Matriz - Missa Jubilar", padre: "Padre Eudásio" },
    { id: "83-2025-06-20-19h-Matriz2", data: "2025-06-20", horario: "19h", local: "Matriz - Missa Jubilar", padre: "Padre Rafael" },
    { id: "83-2025-06-20-19h-Matriz3", data: "2025-06-20", horario: "19h", local: "Matriz - Missa Jubilar", padre: "Padre Ivan" },

    { id: "83-2025-06-21-17h-SantaLuzia", data: "2025-06-21", horario: "17h", local: "Santa Luzia", padre: "Padre Rafael" },
    { id: "83-2025-06-21-17h-SantoAntonio", data: "2025-06-21", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "83-2025-06-21-19h-SCoração", data: "2025-06-21", horario: "19h", local: "Festejos - Sagrado Coração", padre: "Padre Rafael" },
    { id: "83-2025-06-21-19h-Matriz", data: "2025-06-21", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "83-2025-06-22-07h-Matriz", data: "2025-06-22", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "83-2025-06-22-07h-Divino", data: "2025-06-22", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "83-2025-06-22-09h-Matriz", data: "2025-06-22", horario: "09h", local: "Matriz", padre: "Padre Ivan" },
    { id: "83-2025-06-22-15h30-SantosDumont", data: "2025-06-22", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "83-2025-06-22-17h-CentroPastoral", data: "2025-06-22", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "83-2025-06-22-17h-Divino", data: "2025-06-22", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "83-2025-06-22-17h-PqSaoJoao", data: "2025-06-22", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "83-2025-06-22-19h-Matriz", data: "2025-06-22", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "83-2025-06-22-19h-NovoPqIracema", data: "2025-06-22", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "83-2025-06-23-19h-SCoração", data: "2025-06-23", horario: "19h", local: "Festejos - Sagrado Coração", padre: "Padre João Paulo" },

    { id: "83-2025-06-24-19h-SJBatista", data: "2025-06-24", horario: "19h", local: "Festejos - São João Batista", padre: "Padre Eudásio" },
    { id: "83-2025-06-24-19h-SCoração", data: "2025-06-24", horario: "19h", local: "Festejos - Sagrado Coração", padre: "Padre Cosmo" },
    { id: "83-2025-06-24-19h-SerraPelada", data: "2025-06-24", horario: "19h", local: "Serra Pelada", padre: "Padre Rafael" },

    { id: "83-2025-06-25-19h-Matriz", data: "2025-06-25", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" },
    { id: "83-2025-06-25-19h-SantosDumont", data: "2025-06-25", horario: "19h", local: "Santos Dumont", padre: "Padre Eudásio" },

    { id: "83-2025-06-26-19h-MaeRainha", data: "2025-06-26", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },
    { id: "83-2025-06-26-19h-CampoDelta", data: "2025-06-26", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },

    { id: "83-2025-06-27-19h-SCoração", data: "2025-06-27", horario: "19h", local: "Festejos - Sagrado Coração", padre: "Padre Eudásio" },
    { id: "83-2025-06-27-19h-ConegoPinto", data: "2025-06-27", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },
    { id: "83-2025-06-27-19h-Rosario", data: "2025-06-27", horario: "19h", local: "Rosário", padre: "Padre Ivan" },

    { id: "83-2025-06-28-17h-SantaDulce", data: "2025-06-28", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "83-2025-06-28-17h-Abrigo", data: "2025-06-28", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "83-2025-06-28-19h-Matriz", data: "2025-06-28", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-06-28-19h-OutraBanda", data: "2025-06-28", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },

    { id: "83-2025-06-29-07h-Matriz", data: "2025-06-29", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-06-29-07h-Divino", data: "2025-06-29", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "83-2025-06-29-09h-Matriz", data: "2025-06-29", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-06-29-17h-CentroPastoral", data: "2025-06-29", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "83-2025-06-29-17h-Divino", data: "2025-06-29", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "83-2025-06-29-17h-PqSaoJoao", data: "2025-06-29", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "83-2025-06-29-19h-Matriz", data: "2025-06-29", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "83-2025-06-29-19h-NovoPqIracema", data: "2025-06-29", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
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