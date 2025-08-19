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
    { id: "85-2025-08-19-19h-Urucara", data: "2025-08-19", horario: "19h", local: "Urucará", padre: "Padre Eudásio" },
    { id: "85-2025-08-19-19h-PlanaltoCajueiros", data: "2025-08-19", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Ivan" },

    { id: "85-2025-08-20-19h-Guabiraba", data: "2025-08-20", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },
    { id: "85-2025-08-20-19h-MissaFamilias", data: "2025-08-20", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "85-2025-08-21-19h-AreaSeca", data: "2025-08-21", horario: "19h", local: "Área Seca", padre: "Padre Ivan" },
    { id: "85-2025-08-21-19h-Tangueira", data: "2025-08-21", horario: "19h", local: "Tangueira", padre: "Padre Rafael" },

    { id: "85-2025-08-22-19h-Rosario", data: "2025-08-22", horario: "19h", local: "Rosário", padre: "Padre Ivan" },
    { id: "85-2025-08-22-19h-ConegoPinto", data: "2025-08-22", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },

    { id: "85-2025-08-23-17h-Abrigo", data: "2025-08-23", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "85-2025-08-23-17h-SantaDulce", data: "2025-08-23", horario: "17h", local: "Santa Dulce", padre: "Padre Rafael" },
    { id: "85-2025-08-23-19h-MatrizBodasOuro", data: "2025-08-23", horario: "19h", local: "Matriz (Bodas de Ouro)", padre: "Padre Eudásio" },
    { id: "85-2025-08-23-19h-OutraBanda", data: "2025-08-23", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },

    { id: "85-2025-08-24-07h-Matriz", data: "2025-08-24", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "85-2025-08-24-07h-Divino", data: "2025-08-24", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "85-2025-08-24-09h-Matriz", data: "2025-08-24", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-24-15h30-SantosDumont", data: "2025-08-24", horario: "15h30", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "85-2025-08-24-17h-CentroPastoral", data: "2025-08-24", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "85-2025-08-24-17h-Divino", data: "2025-08-24", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "85-2025-08-24-17h-PqSaoJoao", data: "2025-08-24", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "85-2025-08-24-19h-MatrizPascom", data: "2025-08-24", horario: "19h", local: "Matriz (Investidura da Pascom)", padre: "Padre Eudásio" },
    { id: "85-2025-08-24-19h-NovoPqIracema", data: "2025-08-24", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },

    { id: "85-2025-08-26-19h-SerraPelada", data: "2025-08-26", horario: "19h", local: "Serra Pelada", padre: "Padre Eudásio" },
    { id: "85-2025-08-26-19h-SaoPedro", data: "2025-08-26", horario: "19h", local: "São Pedro", padre: "Padre Rafael" },

    { id: "85-2025-08-27-19h-MissaFamilias", data: "2025-08-27", horario: "19h", local: "Missa pelas famílias", padre: "Padre Rafael" },
    { id: "85-2025-08-27-19h-SantosDumont", data: "2025-08-27", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "85-2025-08-28-19h-CampoAsaDelta", data: "2025-08-28", horario: "19h", local: "Campo do Asa Delta", padre: "Padre Rafael" },
    { id: "85-2025-08-28-19h-MaeRainha", data: "2025-08-28", horario: "19h", local: "Mãe Rainha", padre: "Padre Ivan" },

    { id: "85-2025-08-29-18h-AberturaPenha", data: "2025-08-29", horario: "18h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Eudásio" },

    { id: "85-2025-08-30-19h-SantaMissaPeGuedes", data: "2025-08-30", horario: "19h", local: "Santa Missa", padre: "Padre Guedes" },

    { id: "85-2025-08-31-07h-Divino", data: "2025-08-31", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "85-2025-08-31-09h-Matriz", data: "2025-08-31", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-08-31-19h-MissaPeDiego", data: "2025-08-31", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Diego" },

    { id: "85-2025-09-01-19h-MissaPeEdmilton", data: "2025-09-01", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Edmilton" },

    { id: "85-2025-09-02-19h-MissaPeJoaoPaulo", data: "2025-09-02", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre João Paulo" },

    { id: "85-2025-09-03-19h-MissaPeItaloPeRafael", data: "2025-09-03", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Ítalo Dias" },

    { id: "85-2025-09-04-19h-MissaPeAurenio", data: "2025-09-04", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Aurênio" },

    { id: "85-2025-09-05-19h-MissaPeEdmilsonPeRafael", data: "2025-09-05", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Edmilson" },

    { id: "85-2025-09-06-19h-MissaPeFrancisco", data: "2025-09-06", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Francisco" },

    { id: "85-2025-09-07-07h-Divino", data: "2025-09-07", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "85-2025-09-07-09h-Matriz", data: "2025-09-07", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-09-07-19h-MissaDomGregorio", data: "2025-09-07", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Dom Gregório" },

    { id: "85-2025-09-08-06h-CaminhadaHorto", data: "2025-09-08", horario: "06h", local: "Caminhada e Santa Missa", padre: "Padre Eudásio" },
    { id: "85-2025-09-08-09h-MatrizSolene", data: "2025-09-08", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "85-2025-09-08-18h-ProcissaoEncerramento", data: "2025-09-08", horario: "18h", local: "Encerramento dos Festejos", padre: "Padre Eudásio" },
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