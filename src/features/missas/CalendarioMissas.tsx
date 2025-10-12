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
    { "id": "999-2025-10-11-19h-NPqIracema", "data": "2025-10-11", "horario": "19hs", "local": "Novo Parque Iracema (Festa)", "padre": "Padre Glailson" },
    { "id": "999-2025-10-11-19h-Matriz", "data": "2025-10-11", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-11-19h-OutraBanda", "data": "2025-10-11", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Ivan" },
    { "id": "999-2025-10-11-19h-MaeRainhaemFesta", "data": "2025-10-11", "horario": "19hs", "local": "Mãe Rainha (Festa)", "padre": "Padre Rafael" },

    { "id": "999-2025-10-12-07h-Matriz", "data": "2025-10-12", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-12-07h-Abrigo", "data": "2025-10-12", "horario": "07hs", "local": "Abrigo", "padre": "Padre Ivan" },
    { "id": "999-2025-10-12-07h-Divino", "data": "2025-10-12", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "999-2025-10-12-09h-Matriz", "data": "2025-10-12", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-12-17h-CentrodePastoral", "data": "2025-10-12", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-12-17h-Divino", "data": "2025-10-12", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "999-2025-10-12-17h-PqSaoJoao", "data": "2025-10-12", "horario": "17hs", "local": "Parque São João", "padre": "Padre Rafael" },
    { "id": "999-2025-10-12-19h-NPqIracemaFesta", "data": "2025-10-12", "horario": "19hs", "local": "Novo Parque Iracema (Festa de N. Sra. Aparecida)", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-12-19h-Matriz", "data": "2025-10-12", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "999-2025-10-12-19h-SantosDumontemFesta", "data": "2025-10-12", "horario": "19hs", "local": "Santos Dumont (Festa)", "padre": "Padre Rafael" },

    { "id": "999-2025-10-13-12h-Matriz", "data": "2025-10-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-13-17h-Vilares", "data": "2025-10-13", "horario": "17hs", "local": "Vilares", "padre": "Padre Ivan" },
    { "id": "999-2025-10-13-19h-PqSaoJoao", "data": "2025-10-13", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },

    { "id": "999-2025-10-14-19h-SantaDulce", "data": "2025-10-14", "horario": "19hs", "local": "Santa Dulce", "padre": "Padre Ivan" },
    { "id": "999-2025-10-14-19h-SaoPedro", "data": "2025-10-14", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" },

    { "id": "999-2025-10-15-19h-SantosDumont", "data": "2025-10-15", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-15-19h-Guabirada", "data": "2025-10-15", "horario": "19hs", "local": "Guabirada", "padre": "Padre Ivan" },
    { "id": "999-2025-10-15-19h-Missapelasfamilias", "data": "2025-10-15", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },
    { "id": "999-2025-10-15-19h-SantosDumontFesta", "data": "2025-10-15", "horario": "19hs", "local": "Santos Dumont (Festa de Santa Edwiges)", "padre": "Padre Aurênio" },


    { "id": "999-2025-10-16-19h-SantosDumontFesta", "data": "2025-10-16", "horario": "19hs", "local": "Santos Dumont (Festa de Santa Edwiges)", "padre": "Padre Eudásio" },

    { "id": "999-2025-10-16-19h-PqdasRosas", "data": "2025-10-16", "horario": "19hs", "local": "Parque das Rosas", "padre": "Padre Ivan" },
    { "id": "999-2025-10-16-19h-Tangueira", "data": "2025-10-16", "horario": "19hs", "local": "Tangueira", "padre": "Padre Rafael" },

    { "id": "999-2025-10-17-19h-Columijuba", "data": "2025-10-17", "horario": "19hs", "local": "Columijuba", "padre": "Padre Ivan" },

    { "id": "999-2025-10-18-17h-SantaLuzia", "data": "2025-10-18", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" },
    { "id": "999-2025-10-18-17h-SantoAntonio", "data": "2025-10-18", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Rafael" },
    { "id": "999-2025-10-18-19h-MaeRainhaFesta", "data": "2025-10-18", "horario": "19hs", "local": "Mãe Rainha (Festa de N. Sra. Mãe Rainha)", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-18-19h-Matriz", "data": "2025-10-18", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "999-2025-10-18-19h-Coite", "data": "2025-10-18", "horario": "19hs", "local": "Coité", "padre": "Padre Rafael" },

    { "id": "999-2025-10-19-07h-Divino", "data": "2025-10-19", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "999-2025-10-19-07h-Matriz", "data": "2025-10-19", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "999-2025-10-19-09h-Matriz", "data": "2025-10-19", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-19-09h-SaoJose", "data": "2025-10-19", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" },
    { "id": "999-2025-10-19-17h-PqSaoJoao", "data": "2025-10-19", "horario": "17hs", "local": "Parque São João", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-19-17h-CentrodePastoral", "data": "2025-10-19", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Ivan" },
    { "id": "999-2025-10-19-17h-Divino", "data": "2025-10-19", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "999-2025-10-19-19h-Matriz", "data": "2025-10-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-19-19h-NPqIracema", "data": "2025-10-19", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },

    { "id": "999-2025-10-21-19h-Urucara", "data": "2025-10-21", "horario": "19hs", "local": "Urucará", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-21-19h-PlanaltodosCajueiros", "data": "2025-10-21", "horario": "19hs", "local": "Planalto dos Cajueiros", "padre": "Padre Ivan" },

    { "id": "999-2025-10-22-19h-Missapelasfamilias", "data": "2025-10-22", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-22-19h-SantosDumont", "data": "2025-10-22", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },

    { "id": "999-2025-10-23-19h-MaeRainha", "data": "2025-10-23", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-23-19h-CampoDelta", "data": "2025-10-23", "horario": "19hs", "local": "Campo Delta", "padre": "Padre Ivan" },

    { "id": "999-2025-10-24-18h-MatrimonionaMatriz", "data": "2025-10-24", "horario": "18h", "local": "Matrimônio na Matriz", "padre": "Padre Rafael" },
    { "id": "999-2025-10-24-19h-ConegoPinto", "data": "2025-10-24", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Ivan" },

    { "id": "999-2025-10-25-17h-Abrigo", "data": "2025-10-25", "horario": "17hs", "local": "Abrigo", "padre": "Padre Ivan" },
    { "id": "999-2025-10-25-17h-SantaDulce", "data": "2025-10-25", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Rafael" },
    { "id": "999-2025-10-25-19h-Matriz", "data": "2025-10-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "999-2025-10-25-19h-OutraBanda", "data": "2025-10-25", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Rafael" },

    { "id": "999-2025-10-26-07h-Matriz", "data": "2025-10-26", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "999-2025-10-26-07has12h-EspiritualidadeMEPs", "data": "2025-10-26", "horario": "07 às 12hs", "local": "Espiritualidade dos MEPs da Região Episcopal Sagrada Família", "padre": "Padre Rafael" },
    { "id": "999-2025-10-26-09h-Matriz", "data": "2025-10-26", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "999-2025-10-26-17h-CentrodePastoral", "data": "2025-10-26", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Ivan" },
    { "id": "999-2025-10-26-17h-Divino", "data": "2025-10-26", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "999-2025-10-26-19h-NPqIracema", "data": "2025-10-26", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
    { "id": "999-2025-10-26-19h-Matriz", "data": "2025-10-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

    { "id": "999-2025-10-28-19h-SerraPelada", "data": "2025-10-28", "horario": "19hs", "local": "Serra Pelada", "padre": "Padre Ivan" },
    { "id": "999-2025-10-28-19h-SaoPedro", "data": "2025-10-28", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" },

    { "id": "999-2025-10-29-19h-Missapelasfamilias", "data": "2025-10-29", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },

    { "id": "999-2025-10-30-19h-PrimeiraMissaPeJoaoPedroE", "data": "2025-10-30", "horario": "19hs", "local": "Matriz (Primeira Missa do Neo Sacerdote Pe. João Pedro)", "padre": "Padre Eudásio" },
    { "id": "999-2025-10-30-19h-PrimeiraMissaPeJoaoPedroI", "data": "2025-10-30", "horario": "19hs", "local": "Matriz (Primeira Missa do Neo Sacerdote Pe. João Pedro)", "padre": "Padre Ivan" },
    { "id": "999-2025-10-30-19h-PrimeiraMissaPeJoaoPedroR", "data": "2025-10-30", "horario": "19hs", "local": "Matriz (Primeira Missa do Neo Sacerdote Pe. João Pedro)", "padre": "Padre Rafael" },

    { "id": "999-2025-11-01-17h-SantoAntonio", "data": "2025-11-01", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" },
    { "id": "999-2025-11-01-17h-SantaLuzia", "data": "2025-11-01", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Rafael" },
    { "id": "999-2025-11-01-19h-Coite", "data": "2025-11-01", "horario": "19hs", "local": "Coité", "padre": "Padre Ivan" },
    { "id": "999-2025-11-01-19h-Matriz", "data": "2025-11-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

    { "id": "999-2025-11-02-07h-Cemiterio", "data": "2025-11-02", "horario": "07hs", "local": "Cemitério", "padre": "Padre Eudásio" },
    { "id": "999-2025-11-02-07h-Matriz", "data": "2025-11-02", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "999-2025-11-02-07h-Divino", "data": "2025-11-02", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "999-2025-11-02-09h-Matriz", "data": "2025-11-02", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-11-02-09h-SaoJose", "data": "2025-11-02", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
    { "id": "999-2025-11-02-17h-Cemiterio", "data": "2025-11-02", "horario": "17hs", "local": "Cemitério", "padre": "Padre Eudásio" },
    { "id": "999-2025-11-02-17h-Divino", "data": "2025-11-02", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "999-2025-11-02-17h-CentrodePastoral", "data": "2025-11-02", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "999-2025-11-02-19h-Matriz", "data": "2025-11-02", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "999-2025-11-02-19h-PqSaoJoao", "data": "2025-11-02", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "999-2025-11-02-19h-NPqIracema", "data": "2025-11-02", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" }
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