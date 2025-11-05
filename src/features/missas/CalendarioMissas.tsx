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
    { "id": "13-2025-11-05-19hs-Guabiraba", "data": "2025-11-05", "horario": "19hs", "local": "Guabiraba", "padre": "Padre Ivan" },
    { "id": "13-2025-11-05-19hs-Matriz", "data": "2025-11-05", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "13-2025-11-06-19hs-Mororo", "data": "2025-11-06", "horario": "19hs", "local": "Mororó", "padre": "Padre Ivan" },
    { "id": "14-2025-11-06-19hs-PqdasRosas", "data": "2025-11-06", "horario": "19hs", "local": "Parque das Rosas", "padre": "Padre Rafael" },
    { "id": "14-2025-11-07-19hs-CentrodePastoral", "data": "2025-11-07", "horario": "19hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "14-2025-11-08-19hs-Matriz", "data": "2025-11-08", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "14-2025-11-08-19hs-Matriz", "data": "2025-11-08", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "14-2025-11-09-07hs-Matriz", "data": "2025-11-09", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "14-2025-11-09-07hs-Divino", "data": "2025-11-09", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "14-2025-11-09-09hs-Matriz", "data": "2025-11-09", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "14-2025-11-09-09hs-NSradeFatima", "data": "2025-11-09", "horario": "09hs", "local": "N. Sra. de Fátima", "padre": "Padre Rafael" },
    { "id": "14-2025-11-09-1030hs-CoracaodeJesus", "data": "2025-11-09", "horario": "10:30hs", "local": "Coração de Jesus", "padre": "Padre Rafael" },
    { "id": "14-2025-11-09-17hs-Divino", "data": "2025-11-09", "horario": "17hs", "local": "Divino", "padre": "Padre Eudásio" },
    { "id": "15-2025-11-09-17hs-PqSaoJoao", "data": "2025-11-09", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "15-2025-11-09-17hs-CentrodePastoral", "data": "2025-11-09", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "15-2025-11-09-19hs-NPqIracema", "data": "2025-11-09", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
    { "id": "15-2025-11-09-19hs-Matriz", "data": "2025-11-09", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "15-2025-11-11-19hs-SaoPedro", "data": "2025-11-11", "horario": "19hs", "local": "São Pedro", "padre": "Padre Eudásio" },
    { "id": "15-2025-11-11-19hs-SantaDulce", "data": "2025-11-11", "horario": "19hs", "local": "Santa Dulce", "padre": "Padre Ivan" },
    { "id": "15-2025-11-12-19hs-PatoSelvagem", "data": "2025-11-12", "horario": "19hs", "local": "Pato Selvagem", "padre": "Padre Eudásio" },
    { "id": "15-2025-11-12-19hs-SantosDumont", "data": "2025-11-12", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },
    { "id": "15-2025-11-13-12hs-Matriz", "data": "2025-11-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "15-2025-11-13-17hs-Vilares", "data": "2025-11-13", "horario": "17hs", "local": "Vilares", "padre": "Padre Ivan" },
    { "id": "16-2025-11-13-19hs-MaeRainha", "data": "2025-11-13", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Eudásio" },
    { "id": "16-2025-11-13-19hs-PqSaoJoao", "data": "2025-11-13", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "16-2025-11-14-19hs-Matriz", "data": "2025-11-14", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "16-2025-11-14-19hs-LadeiraGrande", "data": "2025-11-14", "horario": "19hs", "local": "Ladeira Grande", "padre": "Padre Ivan" },
    { "id": "16-2025-11-15-17hs-SantoAntonio", "data": "2025-11-15", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Eudásio" },
    { "id": "16-2025-11-15-17hs-SantaLuzia", "data": "2025-11-15", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" },
    { "id": "16-2025-11-15-19hs-Matriz", "data": "2025-11-15", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "16-2025-11-15-19hs-Coite", "data": "2025-11-15", "horario": "19hs", "local": "Coité", "padre": "Padre Ivan" },
    { "id": "16-2025-11-16-07hs-Divino", "data": "2025-11-16", "horario": "07hs", "local": "Divino", "padre": "Padre Eudásio" },
    { "id": "16-2025-11-16-07hs-Matriz", "data": "2025-11-16", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "17-2025-11-16-09hs-Matriz", "data": "2025-11-16", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "17-2025-11-16-09hs-SaoJose", "data": "2025-11-16", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
    { "id": "17-2025-11-16-10hs-Matriz", "data": "2025-11-16", "horario": "10hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "17-2025-11-16-17hs-CentrodePastoral", "data": "2025-11-16", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "17-2025-11-16-17hs-Divino", "data": "2025-11-16", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "17-2025-11-16-19hs-Matriz", "data": "2025-11-16", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "17-2025-11-16-19hs-NPqIracema", "data": "2025-11-16", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
    { "id": "17-2025-11-17-19hs-ConegoPinto", "data": "2025-11-17", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Ivan" },
    { "id": "17-2025-11-18-19hs-PlanaltoDosCajueiros", "data": "2025-11-18", "horario": "19hs", "local": "Planalto dos Cajueiros", "padre": "Padre Eudásio" },
    { "id": "17-2025-11-18-19hs-Urucara", "data": "2025-11-18", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" },
    { "id": "18-2025-11-19-19hs-Matriz", "data": "2025-11-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "18-2025-11-19-19hs-Guabiraba", "data": "2025-11-19", "horario": "19hs", "local": "Guabiraba", "padre": "Padre Ivan" },
    { "id": "18-2025-11-20-08hs-Massape", "data": "2025-11-20", "horario": "08hs", "local": "Massapê", "padre": "Padre Eudásio" },
    { "id": "18-2025-11-20-19hs-TancredoNeves", "data": "2025-11-20", "horario": "19hs", "local": "Tancredo Neves", "padre": "Padre Eudásio" },
    { "id": "18-2025-11-20-19hs-Cajazeiras", "data": "2025-11-20", "horario": "19hs", "local": "Cajazeiras", "padre": "Padre Ivan" },
    { "id": "18-2025-11-21-19hs-Tabuba", "data": "2025-11-21", "horario": "19hs", "local": "Tabuba", "padre": "Padre Eudásio" },
    { "id": "18-2025-11-21-19hs-AreaVerde", "data": "2025-11-21", "horario": "19hs", "local": "Área Verde", "padre": "Padre Ivan" },
    { "id": "18-2025-11-21-19hs-ConegoPinto", "data": "2025-11-21", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Rafael" },
    { "id": "18-2025-11-22-17hs-SantaDulce", "data": "2025-11-22", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Ivan" },
    { "id": "18-2025-11-22-17hs-Abrigo", "data": "2025-11-22", "horario": "17hs", "local": "Abrigo", "padre": "Padre Rafael" },
    { "id": "19-2025-11-22-19hs-OutraBanda", "data": "2025-11-22", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Ivan" },
    { "id": "19-2025-11-22-19hs-Matriz", "data": "2025-11-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "19-2025-11-23-07hs-Divino", "data": "2025-11-23", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "19-2025-11-23-07hs-Matriz", "data": "2025-11-23", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "19-2025-11-23-09hs-Matriz", "data": "2025-11-23", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "19-2025-11-23-1530hs-SantosDumont", "data": "2025-11-23", "horario": "15:30hs", "local": "Santos Dumont", "padre": "Padre Eudásio" },
    { "id": "19-2025-11-23-17hs-Divino", "data": "2025-11-23", "horario": "17hs", "local": "Divino", "padre": "Padre Eudásio" },
    { "id": "19-2025-11-23-17hs-PqSaoJoao", "data": "2025-11-23", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "19-2025-11-23-17hs-CentrodePastoral", "data": "2025-11-23", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "20-2025-11-23-18hs-Rosario", "data": "2025-11-23", "horario": "18hs", "local": "Rosário", "padre": "Padre Rafael" },
    { "id": "20-2025-11-23-19hs-Matriz", "data": "2025-11-23", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "20-2025-11-23-19hs-NPqIracema", "data": "2025-11-23", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
    { "id": "20-2025-11-25-19hs-SerraPelada", "data": "2025-11-25", "horario": "19hs", "local": "Serra Pelada", "padre": "Padre Ivan" },
    { "id": "20-2025-11-26-19hs-SantosDumont", "data": "2025-11-26", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },
    { "id": "20-2025-11-26-19hs-Matriz", "data": "2025-11-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "20-2025-11-27-19hs-MaeRainha", "data": "2025-11-27", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" },
    { "id": "2D-2025-11-27-ACONFIRMAR-ConegoPinto", "data": "2025-11-27", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Eudásio" },
    { "id": "20-2025-11-28-19hs-ConegoPinto", "data": "2025-11-28", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Ivan" },
    { "id": "20-2025-11-28-19hs-Rosario", "data": "2025-11-28", "horario": "19hs", "local": "Rosário", "padre": "Padre Rafael" },
    { "id": "21-2025-11-29-19hs-Matriz", "data": "2025-11-29", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "21-2025-11-29-19hs-SaoBenedito", "data": "2025-11-29", "horario": "19hs", "local": "São Benedito", "padre": "Padre Rafael" },
    { "id": "21-2025-11-30-07hs-Divino", "data": "2025-11-30", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "21-2025-11-30-07hs-Matriz", "data": "2025-11-30", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "21-2025-11-30-09hs-Matriz", "data": "2025-11-30", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "21-2025-11-30-17hs-CentrodePastoral", "data": "2025-11-30", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "21-2025-11-30-17hs-PqSaoJoao", "data": "2025-11-30", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "21-2025-11-30-17hs-Divino", "data": "2025-11-30", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "21-2025-11-30-19hs-Matriz", "data": "2025-11-30", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "21-2025-11-30-19hs-NPqIracema", "data": "2025-11-30", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" }
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