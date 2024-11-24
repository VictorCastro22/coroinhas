import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../../firebaseConfig";

import CardEscala from "../CardEscala";
import ModalAddCoroinha from "../ModalAddCoroinha";

interface Coroinha {
  id: string;
  nome: string;
}

const CalendarioPadres: React.FC = () => {
  const [coroinhas, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchCoroinhas = async () => {
      const querySnapshot = await getDocs(collection(db, "coroinhas"));
      const coroinhasData: { [key: string]: Coroinha[] } = {};
    
      // Usando for...of ao invés de forEach
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const cardId = data.cardId;
        if (!coroinhasData[cardId]) coroinhasData[cardId] = [];
        coroinhasData[cardId].push({ id: doc.id, nome: data.nome });
      }
    
      setCoroinhas(coroinhasData);
    };

    fetchCoroinhas();
  }, []);

  
  const handleSubmitCoroinha = async (nome: string) => {
    if (!selectedCard) return;

    try {
      
      const docRef = await addDoc(collection(db, "coroinhas"), {
        nome,
        cardId: selectedCard,
      });

      
      const novosCoroinhas = [
        ...(coroinhas[selectedCard] || []),
        { id: docRef.id, nome },
      ];
      setCoroinhas({ ...coroinhas, [selectedCard]: novosCoroinhas });

      setSelectedCard(null);
    } catch (error) {
      console.error("Erro ao adicionar coroinha:", error);
    }
  };

  
  const handleDeleteCoroinha = async (cardId: string, coroinhaId: string) => {
    try {
      
      await deleteDoc(doc(db, "coroinhas", coroinhaId));

      
      const novosCoroinhas = coroinhas[cardId].filter(
        (coroinha) => coroinha.id !== coroinhaId
      );
      setCoroinhas({ ...coroinhas, [cardId]: novosCoroinhas });
    } catch (error) {
      console.error("Erro ao deletar coroinha:", error);
    }
  };

  const escalas = [
    { id: "1", data: "2024-11-24", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "2", data: "2024-11-24", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "2", data: "2024-11-24", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "1", data: "2024-11-24", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "1", data: "2024-11-26", horario: "19h", local: "São Benedito", padre: "Padre Eudásio" },
    { id: "2", data: "2024-11-26", horario: "19h", local: "São Pedro", padre: "Padre Ivan" },
    { id: "1", data: "2024-11-27", horario: "19h", local: "Cônego Pinto", padre: "Padre Eudásio" },
    { id: "2", data: "2024-11-27", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "1", data: "2024-11-28", horario: "19h", local: "Mãe Rainha", padre: "Padre Eudásio" },
    { id: "2", data: "2024-11-28", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },
    { id: "2", data: "2024-11-29", horario: "19h", local: "Rosário", padre: "Padre Ivan" },
    { id: "2", data: "2024-11-30", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "2", data: "2024-11-30", horario: "20h", local: "Casamento na Matriz", padre: "Padre Eudásio" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">
        Calendário de Serviço
      </h1>

      {escalas.map((escala) => (
        <CardEscala
          key={escala.id}
          padre={escala.padre}
          data={escala.data}
          horario={escala.horario}
          local={escala.local}
          coroinhas={coroinhas[escala.id] || []}
          onAddCoroinha={() => setSelectedCard(escala.id)}
          onEditCoroinha={(id) => alert(`Editar coroinha com ID ${id} no card ${escala.id}`)}
          onDeleteCoroinha={(id) => handleDeleteCoroinha(escala.id, id)}
        />
      ))}

      <ModalAddCoroinha
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        onSubmit={handleSubmitCoroinha}
      />
    </div>
  );
};

export default CalendarioPadres;