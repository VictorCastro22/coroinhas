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
    { id: "83-2025-03-06-19h-ParqueRosas", data: "2025-03-06", horario: "19h", local: "Parque das Rosas", padre: "Padre Rafael" },
    { id: "83-2025-03-06-19h-Mororo", data: "2025-03-06", horario: "19h", local: "Mororó", padre: "Padre Ivan" },


    { id: "83-2025-03-07-18h30-AdoracaoSS", data: "2025-03-07", horario: "18:30h", local: "Adoração (Centro Pastoral)", padre: "Padre Eudásio" },
    { id: "79-2025-03-07-18h30-AdoracaoSS", data: "2025-03-07", horario: "18:30h", local: "Adoração (Centro Pastoral)", padre: "Padre Rafael" },

    { id: "83-2025-03-08-19h-Matriz", data: "2025-03-08", horario: "19h", local: "Matriz (Missa votiva a N. Sra. da Penha)", padre: "Padre Eudásio" },

    { id: "83-2025-03-09-07h-Matriz", data: "2025-03-09", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-03-09-07h-Divino", data: "2025-03-09", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "83-2025-03-09-07h-Abrigo", data: "2025-03-09", horario: "07h", local: "Abrigo", padre: "Padre Rafael" },
    { id: "83-2025-03-09-09h-Matriz", data: "2025-03-09", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-03-09-17h-PqSaoJoao", data: "2025-03-09", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "83-2025-03-09-17h-CentroPastoral", data: "2025-03-09", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "83-2025-03-09-17h-Divino", data: "2025-03-09", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "83-2025-03-09-19h-Matriz", data: "2025-03-09", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "83-2025-03-09-19h-NPqIracema", data: "2025-03-09", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },


    { id: "83-2025-03-11-19h-SaoPedro", data: "2025-03-11", horario: "19h", local: "São Pedro", padre: "Padre Ivan" },
    { id: "83-2025-03-11-19h-SantaDulce", data: "2025-03-11", horario: "19h", local: "Santa Dulce", padre: "Padre Rafael" },

    { id: "83-2025-03-12-19h-SantosDumont", data: "2025-03-12", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "83-2025-03-12-19h-MissaFamilias", data: "2025-03-12", horario: "19h", local: "Missa pelas famílias", padre: "Padre Rafael" },

    { id: "83-2025-03-13-12h-Matriz", data: "2025-03-13", horario: "12h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-03-13-17h-Vilares", data: "2025-03-13", horario: "17h", local: "Vilares", padre: "Padre Ivan" },
    { id: "83-2025-03-13-19h-Pirapora", data: "2025-03-13", horario: "19h", local: "Pirapora", padre: "Padre Eudásio" },
    { id: "83-2025-03-13-19h-PqSaoJoao", data: "2025-03-13", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "83-2025-03-13-19h-MaeRainha", data: "2025-03-13", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },

    { id: "83-2025-03-14-19h-Matriz", data: "2025-03-14", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },

    { id: "83-2025-03-15-17h-SantoAntonio", data: "2025-03-15", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "83-2025-03-15-17h-SantaLuzia", data: "2025-03-15", horario: "17h", local: "Santa Luzia", padre: "Padre Rafael" },
    { id: "83-2025-03-15-19h-Coite", data: "2025-03-15", horario: "19h", local: "Coité", padre: "Padre Ivan" },
    { id: "83-2025-03-15-19h-Matriz", data: "2025-03-15", horario: "19h", local: "Matriz", padre: "Padre Rafael" },


    { id: "83-2025-03-16-07h-Matriz", data: "2025-03-16", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "83-2025-03-16-07h-Divino", data: "2025-03-16", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "83-2025-03-16-09h-Matriz", data: "2025-03-16", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-03-16-09h-SaoJose", data: "2025-03-16", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "83-2025-03-16-17h-Divino", data: "2025-03-16", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "83-2025-03-16-17h-PqSaoJoao", data: "2025-03-16", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "83-2025-03-16-17h-CentroPastoral", data: "2025-03-16", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "83-2025-03-16-19h-Matriz", data: "2025-03-16", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-03-16-19h-NPqIracema", data: "2025-03-16", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },

    { id: "83-2025-03-17-19h-Susto", data: "2025-03-17", horario: "19h", local: "Susto", padre: "Padre Ivan" },

    { id: "83-2025-03-18-19h-PlanaltoCajueiros", data: "2025-03-18", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Eudásio" },
    { id: "83-2025-03-18-19h-Vilares", data: "2025-03-18", horario: "19h", local: "Vilares", padre: "Padre Ivan" },
    { id: "83-2025-03-18-19h-Urucara", data: "2025-03-18", horario: "19h", local: "Urucará", padre: "Padre Rafael" },

    { id: "83-2025-03-19-19h-Guabiraba", data: "2025-03-19", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },
    { id: "83-2025-03-19-19h-MissaFamilias", data: "2025-03-19", horario: "19h", local: "Missa pelas famílias", padre: "Padre Rafael" },

    { id: "83-2025-03-20-19h-PqRosas", data: "2025-03-20", horario: "19h", local: "Parque das Rosas", padre: "Padre Ivan" },
    { id: "83-2025-03-20-19h-Tanguera", data: "2025-03-20", horario: "19h", local: "Tangueira", padre: "Padre Rafael" },

    
    { id: "83-2025-03-21-19h-Rosario", data: "2025-03-21", horario: "19h", local: "Rosário", padre: "Padre Ivan" },
    { id: "83-2025-03-21-19h-AreaVerdeAreninha", data: "2025-03-21", horario: "19h", local: "Área Verde (Areninha)", padre: "Padre Rafael" },

 
    { id: "83-2025-03-22-17h-SantaDulce", data: "2025-03-22", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "83-2025-03-22-17h-Abrigo", data: "2025-03-22", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "83-2025-03-22-19h-OutraBanda", data: "2025-03-22", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },
    { id: "83-2025-03-22-19h-Matriz", data: "2025-03-22", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "83-2025-03-23-07h-Divino", data: "2025-03-23", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "83-2025-03-23-07h-Matriz", data: "2025-03-23", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "83-2025-03-23-09h-Matriz", data: "2025-03-23", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "83-2025-03-23-15h30-SantosDumont", data: "2025-03-23", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "83-2025-03-23-17h-PqSaoJoao", data: "2025-03-23", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "83-2025-03-23-17h-CentroPastoral", data: "2025-03-23", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "83-2025-03-23-17h-Divino", data: "2025-03-23", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "83-2025-03-23-19h-NPqIracema", data: "2025-03-23", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    { id: "83-2025-03-23-19h-Matriz", data: "2025-03-23", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "83-2025-03-25-19h-SerraPelada", data: "2025-03-25", horario: "19h", local: "Serra Pelada", padre: "Padre Ivan" },
    { id: "83-2025-03-25-19h-SaoPedro", data: "2025-03-25", horario: "19h", local: "São Pedro", padre: "Padre Rafael" },

    { id: "83-2025-03-26-19h-SantosDumont", data: "2025-03-26", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "83-2025-03-26-19h-MissaFamilias", data: "2025-03-26", horario: "19h", local: "Missa pelas famílias", padre: "Padre Rafael" },


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