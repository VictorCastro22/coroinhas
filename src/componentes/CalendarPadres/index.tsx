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
    { id: "84-2025-02-08-19h-MissaVotiva", data: "2025-02-08", horario: "19h", local: "Matriz (Missa Votiva de N. Sra. da Penha)", padre: "Padre Eudásio" },

    { id: "85-2025-02-09-07h-Matriz", data: "2025-02-09", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "86-2025-02-09-07h-Divino", data: "2025-02-09", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "87-2025-02-09-09h-Matriz", data: "2025-02-09", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "88-2025-02-09-17h-CentroDePastoral", data: "2025-02-09", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "89-2025-02-09-17h-Divino", data: "2025-02-09", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "90-2025-02-09-19h-MatrizNovoVigario2", data: "2025-02-09", horario: "19h", local: "Matriz (Apresentação do Novo Vigário Paroquial)", padre: "Padre Rafael" },
    { id: "91-2025-02-09-19h-MatrizNovoVigario", data: "2025-02-09", horario: "19h", local: "Matriz (Apresentação do Novo Vigário Paroquial)", padre: "Padre Eudásio" },
    { id: "92-2025-02-09-19h-NovoParqueIracema", data: "2025-02-09", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "93-2025-02-10-28-Ferias", data: "2025-02-10", horario: "28-02-2025", local: "FÉRIAS", padre: "Padre Eudásio" },
  ];

  return (
    <div>
      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6">
        Calendário de Missas
      </h1>
      {escalas.map((escala) => (
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
