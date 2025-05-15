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
    { id: "83-2025-05-15-19h-PqRosas", data: "2025-05-15", horario: "19h", local: "Parque das Rosas", padre: "Padre Rafael" },
    { id: "83-2025-05-15-19h-Tangueira", data: "2025-05-15", horario: "19h", local: "Tangueira", padre: "Padre Ivan" },

    { id: "83-2025-05-16-19h-Pirapora", data: "2025-05-16", horario: "19h", local: "Pirapora", padre: "Padre Eudásio" },
    { id: "83-2025-05-16-19h-Rosario", data: "2025-05-16", horario: "19h", local: "Rosário", padre: "Padre Rafael" },
    { id: "83-2025-05-16-19h-AreaVerde", data: "2025-05-16", horario: "19h", local: "Área Verde (Areninha)", padre: "Padre Ivan" },

    { id: "83-2025-05-17-17h-Matriz", data: "2025-05-17", horario: "17h", local: "Matriz - Casamento comunitário", padre: "Padre Eudásio" },
    { id: "83-2025-05-17-17h-SantaLuzia", data: "2025-05-17", horario: "17h", local: "Santa Luzia", padre: "Padre Rafael" },
    { id: "83-2025-05-17-17h-SantoAntonio", data: "2025-05-17", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "83-2025-05-17-19h-Coite", data: "2025-05-17", horario: "19h", local: "Coité", padre: "Padre Rafael" },
    { id: "83-2025-05-17-19h-Matriz", data: "2025-05-17", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "83-2025-05-18-07h-Matriz", data: "2025-05-18", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "83-2025-05-18-07h-Divino", data: "2025-05-18", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "83-2025-05-18-09h-Matriz", data: "2025-05-18", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-05-18-09h-SaoJose", data: "2025-05-18", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "83-2025-05-18-17h-CentroPastoral", data: "2025-05-18", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "83-2025-05-18-17h-Divino", data: "2025-05-18", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "83-2025-05-18-17h-PqSaoJoao", data: "2025-05-18", horario: "17h", local: "Parque São João", padre: "Padre Rafael" },
    { id: "83-2025-05-18-19h-Matriz", data: "2025-05-18", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-05-18-19h-NovoPqIracema", data: "2025-05-18", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    { id: "83-2025-05-18-19h-GuabirabaSantaRita", data: "2025-05-18", horario: "19h", local: "Guabiraba (Novenário de Santa Rita de Cássia)", padre: "Padre Rafael" },

    { id: "83-2025-05-20-19h-PlanaltoCajueiros", data: "2025-05-20", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Eudásio" },
    { id: "83-2025-05-20-19h-Urucara", data: "2025-05-20", horario: "19h", local: "Urucará", padre: "Padre Ivan" },
    { id: "83-2025-05-20-19h-Vilares", data: "2025-05-20", horario: "19h", local: "Vilares", padre: "Padre Rafael" },


    { id: "83-2025-05-21-19h-MissaFamilias", data: "2025-05-21", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" },
    { id: "83-2025-05-21-19h-Guabiraba", data: "2025-05-21", horario: "19h", local: "Guabiraba - Novenário de Santa Rita", padre: "Padre Ivan" },

    { id: "83-2025-05-22-18h30-Guabiraba", data: "2025-05-22", horario: "18h30", local: "Guabiraba", padre: "Padre Eudásio" },
    { id: "83-2025-05-22-19h-AreaSeca", data: "2025-05-22", horario: "19h", local: "Área Seca (CDD)", padre: "Padre Ivan" },
    { id: "83-2025-05-22-19h-MaeRainha", data: "2025-05-22", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },

    { id: "83-2025-05-23-18h-PqSaoJoao", data: "2025-05-23", horario: "18h", local: "Parque São João - Casamento de Ivanilson e Fabiane", padre: "Padre Eudásio" },
    { id: "83-2025-05-23-19h-Rosario", data: "2025-05-23", horario: "19h", local: "Rosário", padre: "Padre Ivan" },
    { id: "83-2025-05-23-19h-ConegoPinto", data: "2025-05-23", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },

    { id: "83-2025-05-24-17h-Abrigo", data: "2025-05-24", horario: "17h", local: "Abrigo", padre: "Padre Eudásio" },
    { id: "83-2025-05-24-17h-SantaDulce", data: "2025-05-24", horario: "17h", local: "Santa Dulce", padre: "Padre Ivan" },
    { id: "83-2025-05-24-17h-Shalom", data: "2025-05-24", horario: "17h", local: "Shalom", padre: "Padre Rafael" },
    { id: "83-2025-05-24-19h-OutraBanda", data: "2025-05-24", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },
    { id: "83-2025-05-24-19h-Matriz", data: "2025-05-24", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "83-2025-05-25-07h-Matriz", data: "2025-05-25", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-05-25-07h-Divino", data: "2025-05-25", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "83-2025-05-25-09h-Matriz", data: "2025-05-25", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-05-25-15h30-SantosDumont", data: "2025-05-25", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "83-2025-05-25-17h-Divino", data: "2025-05-25", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "83-2025-05-25-17h-CentroPastoral", data: "2025-05-25", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "83-2025-05-25-19h-Matriz", data: "2025-05-25", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "83-2025-05-27-19h-SerraPelada", data: "2025-05-27", horario: "19h", local: "Serra Pelada", padre: "Padre Eudásio" },
    { id: "83-2025-05-27-19h-SaoPedro", data: "2025-05-27", horario: "19h", local: "São Pedro", padre: "Padre Ivan" },

    { id: "83-2025-05-28-19h-MissaFamilias", data: "2025-05-28", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" },
    { id: "83-2025-05-28-19h-SantosDumont", data: "2025-05-28", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "83-2025-05-29-19h-Divino", data: "2025-05-29", horario: "19h", local: "Divino - Bandeira da Festa do Divino Espírito Santo", padre: "Padre Ivan" },

    { id: "83-2025-05-30-19h-Matriz-Sanfoneiros", data: "2025-05-30", horario: "19h", local: "Matriz - Missa dos Sanfoneiros", padre: "Padre Eudásio" },

    { id: "83-2025-05-31-18h-CentroPastoral", data: "2025-05-31", horario: "18h", local: "Centro de Pastoral - Procissão com as imagens peregrinas nas novenas", padre: "Padre Eudásio" },
    { id: "83-2025-05-31-18h-Procissao", data: "2025-05-31", horario: "18h", local: "Centro de Pastoral (Procissão com as imagens peregrinas nas novenas)", padre: "Padre Rafael" },
    { id: "83-2025-05-31-19h-Matriz-Coroacao", data: "2025-05-31", horario: "19h", local: "Matriz - Coroação", padre: "Padre Eudásio" },
    { id: "83-2025-05-31-19h-MatrizCoroacao", data: "2025-05-31", horario: "19h", local: "Matriz - Coroação", padre: "Padre Rafael" },
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