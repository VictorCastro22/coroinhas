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

    { id: "85-2025-08-01-05h-PreFestaSaoBenedito", data: "2025-08-01", horario: "05h", local: "Pré Festa - Comunidade São Benedito", padre: "Padre Eudásio" },
    { id: "85-2025-08-01-18h30-CentroPastoral1", data: "2025-08-01", horario: "18h30", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "85-2025-08-01-18h30-CentroPastoral2", data: "2025-08-01", horario: "18h30", local: "Centro de Pastoral", padre: "Padre Rafael" },

    { id: "85-2025-08-02-17h-SantaLuzia", data: "2025-08-02", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "85-2025-08-02-17h-SantoAntonio", data: "2025-08-02", horario: "17h", local: "Santo Antônio", padre: "Padre Rafael" },
    { id: "85-2025-08-02-19h-Matriz", data: "2025-08-02", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-02-19h-Coite", data: "2025-08-02", horario: "19h", local: "Coité", padre: "Padre Rafael" },
    { id: "85-2025-08-02-19h-BandeiraSantaDulce", data: "2025-08-02", horario: "19h", local: "Bandeira da Festa de Santa Dulce", padre: "Padre Ivan" },

    { id: "85-2025-08-03-07h-Matriz", data: "2025-08-03", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-03-07h-Divino", data: "2025-08-03", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "85-2025-08-03-09h-Matriz", data: "2025-08-03", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-03-09h-SaoJose", data: "2025-08-03", horario: "09h", local: "São José", padre: "Padre Rafael" },
    { id: "85-2025-08-03-10h-MatrizBatizados", data: "2025-08-03", horario: "10h", local: "Matriz - Batizado", padre: "Padre Rafael" },
    { id: "85-2025-08-03-17h-CentroPastoral", data: "2025-08-03", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "85-2025-08-03-17h-Divino", data: "2025-08-03", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "85-2025-08-03-17h-PqSaoJoao", data: "2025-08-03", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "85-2025-08-03-19h-NovoPqIracema", data: "2025-08-03", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "85-2025-08-03-19h-Matriz", data: "2025-08-03", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "85-2025-08-04-19h-Matriz1", data: "2025-08-04", horario: "19h", local: "Matriz - Dia do Católico Municipal", padre: "Padre Eudásio" },
    { id: "85-2025-08-04-19h-Matriz2", data: "2025-08-04", horario: "19h", local: "Matriz - Dia do Católico Municipal", padre: "Padre Rafael" },

    { id: "85-2025-08-05-05h-PreFestaRuaJaimeAbreu", data: "2025-08-05", horario: "05h", local: "Pré Festa - Rua Jaime Abreu, 105", padre: "Padre Eudásio" },
    { id: "85-2025-08-05-19h-Urucara", data: "2025-08-05", horario: "19h", local: "Urucará", padre: "Padre Eudásio" },
    { id: "85-2025-08-05-19h-Vilares", data: "2025-08-05", horario: "19h", local: "Vilares", padre: "Padre Ivan" },

    { id: "85-2025-08-06-05h-PreFestaAvJoaquimLopes", data: "2025-08-06", horario: "05h", local: "Pré Festa - Av. Joaquim Lopes (Urucará)", padre: "Padre Eudásio" },
    { id: "85-2025-08-06-19h-MatrizMissaFamilias", data: "2025-08-06", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "85-2025-08-06-19h-Guabiraba", data: "2025-08-06", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "85-2025-08-07-05h-PreFestaRuaJoseFlavio", data: "2025-08-07", horario: "05h", local: "Pré Festa - Rua José Flávio Ramos", padre: "Padre Eudásio" },
    { id: "85-2025-08-07-19h-PqDasRosas", data: "2025-08-07", horario: "19h", local: "Parque das Rosas", padre: "Padre Eudásio" },
    { id: "85-2025-08-07-19h-Mororo", data: "2025-08-07", horario: "19h", local: "Mororó", padre: "Padre Ivan" },


    { id: "85-2025-08-08-19h-MatrizSetorI", data: "2025-08-08", horario: "19h", local: "Matriz - Jubilar", padre: "Padre Rafael" },
    { id: "85-2025-08-08-19h-MissaPenhaJubilar", data: "2025-08-08", horario: "19h", local: "Matriz - Missa Votiva e Missa Jubilar", padre: "Padre Eudásio" },
    { id: "85-2025-08-08-19h-Cajazeiras", data: "2025-08-08", horario: "19h", local: "Cajazeiras", padre: "Padre Ivan" },

    { id: "85-2025-08-09-17h-NPI", data: "2025-08-09", horario: "17h", local: "Nossa Senhora Aparecida", padre: "Padre Eudásio" },
    { id: "85-2025-08-09-19h-Matriz", data: "2025-08-09", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-09-19h-SantaDulce", data: "2025-08-09", horario: "19h", local: "Santa Dulce", padre: "Padre Rafael" },
    { id: "85-2025-08-09-19h-OutraBanda", data: "2025-08-09", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },

    { id: "85-2025-08-10-07h-Matriz", data: "2025-08-10", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-10-07h-Divino", data: "2025-08-10", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "85-2025-08-10-07h-Abrigo", data: "2025-08-10", horario: "07h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "85-2025-08-10-09h-Matriz", data: "2025-08-10", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-10-10h-BatismoMatriz", data: "2025-08-10", horario: "10h", local: "Batismo - Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-10-17h-CentroPastoral", data: "2025-08-10", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "85-2025-08-10-17h-Divino", data: "2025-08-10", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "85-2025-08-10-17h-PqSaoJoao", data: "2025-08-10", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "85-2025-08-10-19h-Matriz", data: "2025-08-10", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "85-2025-08-10-19h-NovoPqIracema", data: "2025-08-10", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "85-2025-08-11-19h-Cajueiro", data: "2025-08-11", horario: "19h", local: "Cajueiro", padre: "Padre Eudásio" },

    { id: "85-2025-08-12-05h-PreFestaRuaGontran", data: "2025-08-12", horario: "05h", local: "Pré Festa - Rua Gontran Nascimento, 49", padre: "Padre Eudásio" },
    { id: "85-2025-08-12-19h-SaoPedro", data: "2025-08-12", horario: "19h", local: "São Pedro", padre: "Padre Rafael" },
    { id: "85-2025-08-12-19h-SantaDulce", data: "2025-08-12", horario: "19h", local: "Santa Dulce", padre: "Padre Ivan" },

    { id: "85-2025-08-13-05h-PreFestaRuaRobert", data: "2025-08-13", horario: "05h", local: "Pré Festa - Rua Robert Braquihais, 1181", padre: "Padre Eudásio" },
    { id: "85-2025-08-13-12h-Matriz", data: "2025-08-13", horario: "12h", local: "Matriz", padre: "Padre Ivan" },
    { id: "85-2025-08-13-17h-PqSaoJoao", data: "2025-08-13", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "85-2025-08-13-17h-Vilares", data: "2025-08-13", horario: "17h", local: "Vilares", padre: "Padre Ivan" },
    { id: "85-2025-08-13-19h-SantaDulce", data: "2025-08-13", horario: "19h", local: "Santa Dulce (Encerramento Festa)", padre: "Padre Eudásio" },
    { id: "85-2025-08-13-19h-MatrizMissaFamilias", data: "2025-08-13", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "85-2025-08-13-19h-SantosDumont", data: "2025-08-13", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "85-2025-08-14-05h-PreFestaRuaNapoleao", data: "2025-08-14", horario: "05h", local: "Pré Festa - Rua Napoleão Lima", padre: "Padre Eudásio" },
    { id: "85-2025-08-14-19h-MaeRainha", data: "2025-08-14", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },
    { id: "85-2025-08-14-19h-Pirapora", data: "2025-08-14", horario: "19h", local: "Pirapora", padre: "Padre Ivan" },

    { id: "85-2025-08-15-05h-PreFestaMaranguapeSul", data: "2025-08-15", horario: "05h", local: "Pré Festa - Maranguape Sul", padre: "Padre Eudásio" },
    { id: "85-2025-08-15-19h-Rosario", data: "2025-08-15", horario: "19h", local: "Rosário", padre: "Padre Rafael" },
    { id: "85-2025-08-15-19h-AreaVerde", data: "2025-08-15", horario: "19h", local: "Área Verde (Areninha)", padre: "Padre Ivan" },

    { id: "85-2025-08-16-05h-PreFestaRuaJean", data: "2025-08-16", horario: "05h", local: "Pré Festa - Rua Jean Roberto Braquihais, 388", padre: "Padre Eudásio" },
    { id: "85-2025-08-16-17h-SantaLuzia", data: "2025-08-16", horario: "17h", local: "Santa Luzia", padre: "Padre Rafael" },
    { id: "85-2025-08-16-17h-SantoAntonio", data: "2025-08-16", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "85-2025-08-16-19h-Matriz", data: "2025-08-16", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-16-19h-RosarioInvestidura", data: "2025-08-16", horario: "19h", local: "Rosário - Investidura Coroinhas", padre: "Padre Rafael" },
    { id: "85-2025-08-16-19h-Coite", data: "2025-08-16", horario: "19h", local: "Coité", padre: "Padre Ivan" },

    { id: "85-2025-08-17-07h-Matriz", data: "2025-08-17", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-17-07h-Divino", data: "2025-08-17", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "85-2025-08-17-09h-SaoJose", data: "2025-08-17", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "85-2025-08-17-09h-Matriz", data: "2025-08-17", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-17-17h-Divino", data: "2025-08-17", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "85-2025-08-17-17h-PqSaoJoao", data: "2025-08-17", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "85-2025-08-17-17h-CentroPastoral", data: "2025-08-17", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "85-2025-08-17-19h-NovoPqIracema", data: "2025-08-17", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "85-2025-08-17-19h-Matriz", data: "2025-08-17", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
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