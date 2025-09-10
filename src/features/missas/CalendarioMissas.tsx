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
  { "id": "83-2025-09-10-19h-MissaFamilias", "data": "2025-09-10", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },
  { "id": "83-2025-09-10-19h-SantosDumont", "data": "2025-09-10", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },
  { "id": "83-2025-09-11-19h-Pirapora", "data": "2025-09-11", "horario": "19hs", "local": "Pirapora", "padre": "Padre Rafael" },
  { "id": "83-2025-09-11-19h-MaeRainha", "data": "2025-09-11", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" },
  { "id": "83-2025-09-12-19h-MatrizMissaJubilar", "data": "2025-09-12", "horario": "19hs", "local": "Matriz (Missa Jubilar)", "padre": "Padre Rafael" },
  { "id": "83-2025-09-13-12h-Matriz", "data": "2025-09-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "83-2025-09-13-17h-Vilares", "data": "2025-09-13", "horario": "17hs", "local": "Vilares", "padre": "Padre Ivan" },
  { "id": "83-2025-09-13-19h-PqDasRosasFesta", "data": "2025-09-13", "horario": "19hs", "local": "Parque das Rosas (Festa de Nossa Sra. das Dores)", "padre": "Padre Rafael" },
  { "id": "83-2025-09-13-19h-PqSaoJoao", "data": "2025-09-13", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },
  { "id": "83-2025-09-14-07h-Divino", "data": "2025-09-14", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "83-2025-09-14-07h-Matriz", "data": "2025-09-14", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "83-2025-09-14-09h-Matriz", "data": "2025-09-14", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "83-2025-09-14-17h-CentroPastoralAdmissao", "data": "2025-09-14", "horario": "17hs", "local": "Centro de Pastoral (Admissão dos adultos na Catequese)", "padre": "Padre Rafael" },
  { "id": "83-2025-09-14-17h-Divino", "data": "2025-09-14", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "83-2025-09-14-19h-MatrizReinvestidura", "data": "2025-09-14", "horario": "19hs", "local": "Matriz (Reinvestidura dos Coroinhas veteranos)", "padre": "Padre Rafael" },
  { "id": "83-2025-09-14-19h-NovoPqIracema", "data": "2025-09-14", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
  { "id": "83-2025-09-15-19h-PqDasRosasFesta", "data": "2025-09-15", "horario": "19hs", "local": "Parque das Rosas (Festa da Mãe das Dores)", "padre": "Padre Ivan" },
  { "id": "83-2025-09-16-19h-TangueiraBandeira", "data": "2025-09-16", "horario": "19hs", "local": "Tangueira (Festa de Nossa Sra da Piedade)", "padre": "Padre Ivan" },
  { "id": "83-2025-09-17-19h-MissaFamilias", "data": "2025-09-17", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },
  { "id": "83-2025-09-17-19h-Guabiraba", "data": "2025-09-17", "horario": "19hs", "local": "Guabiraba", "padre": "Padre Ivan" },
  { "id": "83-2025-09-18-19h-TangueiraFesta", "data": "2025-09-18", "horario": "19hs", "local": "Tangueira (Festa de Nossa Sra. da Piedade)", "padre": "Padre Rafael" },
  { "id": "83-2025-09-18-19h-PqSantaFe", "data": "2025-09-18", "horario": "19hs", "local": "Parque Santa Fé", "padre": "Padre Ivan" },
  { "id": "83-2025-09-19-19h-Rosario", "data": "2025-09-19", "horario": "19hs", "local": "Rosário", "padre": "Padre Rafael" },
  { "id": "83-2025-09-19-19h-AreaVerde", "data": "2025-09-19", "horario": "19hs", "local": "Área Verde (Areninha)", "padre": "Padre Ivan" },
  { "id": "83-2025-09-20-17h-SantaLuzia", "data": "2025-09-20", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-20-17h-SantoAntonio", "data": "2025-09-20", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" },
  { "id": "83-2025-09-20-18h-BatismoMatriz", "data": "2025-09-20", "horario": "18hs", "local": "Batismo na Matriz", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-20-19h-Matriz", "data": "2025-09-20", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-20-19h-Coite", "data": "2025-09-20", "horario": "19hs", "local": "Coité", "padre": "Padre Ivan" },
  { "id": "83-2025-09-20-20h-CasamentoMatriz", "data": "2025-09-20", "horario": "20hs", "local": "Casamento na Matriz", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-21-07h-Matriz", "data": "2025-09-21", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "83-2025-09-21-07h-Divino", "data": "2025-09-21", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "83-2025-09-21-09h-Matriz", "data": "2025-09-21", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-21-09h-SaoJose", "data": "2025-09-21", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
  { "id": "83-2025-09-21-17h-CentroPastoral", "data": "2025-09-21", "horario": "17hs", "local": "Centro de Pastoral (Admissão de Adultos na Catequese)", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-21-17h-Divino", "data": "2025-09-21", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "83-2025-09-21-17h-PqSaoJoao", "data": "2025-09-21", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
  { "id": "83-2025-09-21-19h-Matriz", "data": "2025-09-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-21-19h-NPqIracema", "data": "2025-09-21", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" },
  { "id": "83-2025-09-22-19h-SerraPeladaBandeira", "data": "2025-09-22", "horario": "19hs", "local": "Serra Pelada (Festa de Santa Terezinha)", "padre": "Padre Ivan" },
  { "id": "83-2025-09-23-Pirapora", "data": "2025-09-23", "horario": "", "local": "Pirapora (Festa de São Francisco)", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-24-19h-MissaFamilias", "data": "2025-09-24", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },
  { "id": "83-2025-09-24-19h-MororoBandeira", "data": "2025-09-24", "horario": "19hs", "local": "Mororó (Festa de São Francisco)", "padre": "Padre Ivan" },
  { "id": "83-2025-09-25-19h-MaeRainha", "data": "2025-09-25", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-25-19h-SaoBeneditoBandeira", "data": "2025-09-25", "horario": "19hs", "local": "São Benedito (Festa de São Benedito)", "padre": "Padre Ivan" },
  { "id": "83-2025-09-26-19h-TangueiraFesta", "data": "2025-09-26", "horario": "19hs", "local": "Tangueira (Festa de Nossa Sra. da Piedade)", "padre": "Padre Rafael" },
  { "id": "83-2025-09-26-19h-ConegoPinto", "data": "2025-09-26", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Ivan" },
  { "id": "83-2025-09-27-17h-SantaDulce", "data": "2025-09-27", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-27-17h-Abrigo", "data": "2025-09-27", "horario": "17hs", "local": "Abrigo", "padre": "Padre Ivan" },
  { "id": "83-2025-09-27-19h-OutraBanda", "data": "2025-09-27", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-27-19h-SaoBeneditoFesta", "data": "2025-09-27", "horario": "19hs", "local": "São Benedito (Festa)", "padre": "Padre Rafael" },
  { "id": "83-2025-09-27-19h-RosarioBandeira", "data": "2025-09-27", "horario": "19hs", "local": "Rosário (Festa de Nossa Sra. do Rosário)", "padre": "Padre Ivan" },
  { "id": "83-2025-09-28-07h-Divino", "data": "2025-09-28", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "83-2025-09-28-07h-Matriz", "data": "2025-09-28", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "83-2025-09-28-08h15-BatismoMatriz", "data": "2025-09-28", "horario": "08:15hs", "local": "Batismo na Matriz", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-28-09h-Matriz", "data": "2025-09-28", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-28-15h30-SantosDumont", "data": "2025-09-28", "horario": "15:30hs", "local": "Santos Dumont", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-28-17h-PqSaoJoao", "data": "2025-09-28", "horario": "17hs", "local": "Parque São João", "padre": "Padre Eudásio" },
  { "id": "83-2025-09-28-17h-CentroPastoral", "data": "2025-09-28", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
  { "id": "83-2025-09-28-17h-Divino", "data": "2025-09-28", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "83-2025-09-28-19h-Matriz", "data": "2025-09-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "83-2025-09-28-19h-NPqIracema", "data": "2025-09-28", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
  { "id": "83-2025-09-30-19h-AbrigoTriduo", "data": "2025-09-30", "horario": "19hs", "local": "Abrigo (Tríduo de São Francisco)", "padre": "Padre Rafael" }
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