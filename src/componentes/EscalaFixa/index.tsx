import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../CardEscala";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const EscalaFixa: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});

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
    { id: "1-2024-11-24-17h-Centro-de-Pastoral", data: "2024-11-24", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "2-2024-11-24-17h-Divino", data: "2024-11-24", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "1-2024-11-24-19h-Matriz", data: "2024-11-24", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "2-2024-11-24-19h-Parque-São-João", data: "2024-11-24", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "1-2024-11-26-19h-São-Benedito", data: "2024-11-26", horario: "19h", local: "São Benedito", padre: "Padre Eudásio" },
    { id: "2-2024-11-26-19h-São-Pedro", data: "2024-11-26", horario: "19h", local: "São Pedro", padre: "Padre Ivan" },
    { id: "1-2024-11-27-19h-Cônego-Pinto", data: "2024-11-27", horario: "19h", local: "Cônego Pinto", padre: "Padre Eudásio" },
    { id: "2-2024-11-27-19h-Santos-Dumont", data: "2024-11-27", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "1-2024-11-28-19h-Mãe-Rainha", data: "2024-11-28", horario: "19h", local: "Mãe Rainha", padre: "Padre Eudásio" },
    { id: "2-2024-11-28-19h-Campo-Delta", data: "2024-11-28", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },
    { id: "2-2024-11-29-19h-Rosário", data: "2024-11-29", horario: "19h", local: "Rosário", padre: "Padre Ivan" },
    { id: "2-2024-11-30-19h-Matriz", data: "2024-11-30", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "1-2024-11-30-20h-Casamento-na-Matriz", data: "2024-11-30", horario: "20h", local: "Casamento na Matriz", padre: "Padre Eudásio" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="w-full mb-6">
        <img src="/logo-coroinha.jpeg" alt="Logo Coroinha" className="w-full h-32 md:h-48 lg:h-64 object-cover" />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">
        Escala Fixa
      </h1>

      {escalas.map((escala) => (
        <CardEscala
          key={escala.id}
          padre={escala.padre}
          data={escala.data}
          horario={escala.horario}
          local={escala.local}
          coroinhas={coroinhasData[escala.id] || []}
          onAddCoroinha={() => {}}
          onDeleteCoroinha={() => {}}
          isPublicView={true} 
        />
      ))}
    </div>
  );
};

export default EscalaFixa;
