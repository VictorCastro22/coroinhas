import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../../../firebaseConfig";
import CardEscala from "../../../components/CardEscala";
import ModalAddCoroinha from "../../../components/ModalAddCoroinha";
import coroinhas from "../../../dados/coroinhas"; 

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const CalendarioPadresDivino: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedCoroinha, setSelectedCoroinha] = useState<string>("");
  const [selectionCounts, setSelectionCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchCoroinhas = async () => {
      const querySnapshot = await getDocs(collection(db, "coroinhas"));
      const coroinhasData: { [key: string]: Coroinha[] } = {};
      const counts: { [key: string]: number } = {};

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const cardId = data.cardId;
        if (!coroinhasData[cardId]) coroinhasData[cardId] = [];
        coroinhasData[cardId].push({
          id: doc.id,
          nome: data.nome,
          foto: data.foto,
        });
        counts[data.nome] = (counts[data.nome] || 0) + 1;
      }

      setCoroinhas(coroinhasData);
      setSelectionCounts(counts);
    };

    fetchCoroinhas();
  }, []);

  const handleSubmitCoroinha = async () => {
    if (!selectedCard || !selectedCoroinha) return;

    try {
      const coroinha = coroinhas.find(c => c.id === selectedCoroinha);
      if (!coroinha) return;

      const docRef = await addDoc(collection(db, "coroinhas"), {
        nome: coroinha.nome,
        cardId: selectedCard,
        foto: coroinha.foto,
      });

      const novosCoroinhas = [
        ...(coroinhasData[selectedCard] || []),
        { id: docRef.id, nome: coroinha.nome, foto: coroinha.foto },
      ];
      setCoroinhas({ ...coroinhasData, [selectedCard]: novosCoroinhas });

      setSelectionCounts({ 
        ...selectionCounts, 
        [coroinha.nome]: (selectionCounts[coroinha.nome] || 0) + 1 
      });

      setSelectedCard(null);
      setSelectedCoroinha("");
    } catch (error) {
      console.error("Erro ao adicionar coroinha:", error);
    }
  };  

  const handleDeleteCoroinha = async (cardId: string, coroinhaId: string) => {
    try {
      await deleteDoc(doc(db, "coroinhas", coroinhaId));

      const novosCoroinhas = coroinhasData[cardId].filter(
        (coroinha) => coroinha.id !== coroinhaId
      );
      setCoroinhas({ ...coroinhasData, [cardId]: novosCoroinhas });
    } catch (error) {
      console.error("Erro ao deletar coroinha:", error);
    }
  };

  const escalas = [
    { id: "80-2025-05-29-19h-Divino", data: "2025-05-29", horario: "19h", local: "Parque São João", padre: "Padre João Paulo" },
    { id: "80-2025-05-06-19h-PSJ", data: "2025-05-06", horario: "19h", local: "Parque São João", padre: "Padre Edvando" },
    { id: "80-2025-05-05-19h-PSJ", data: "2025-05-0", horario: "19h", local: "Parque São João", padre: "Padre João Paulo" },
    { id: "80-2025-05-05-19h-PSJ", data: "2025-05-0", horario: "19h", local: "Parque São João", padre: "Padre João Paulo" },
    { id: "80-2025-05-05-19h-PSJ", data: "2025-05-0", horario: "19h", local: "Parque São João", padre: "Padre João Paulo" },
    { id: "80-2025-05-05-19h-PSJ", data: "2025-05-0", horario: "19h", local: "Parque São João", padre: "Padre João Paulo" },
    { id: "80-2025-05-05-19h-PSJ", data: "2025-05-0", horario: "19h", local: "Parque São João", padre: "Padre João Paulo" },

  ];

  return (
    <div>
      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6">
        Calendário das Missas
      </h1>


      {escalas.map((escala) => (
        <CardEscala
          key={escala.id}
          padre={escala.padre}
          data={escala.data}
          horario={escala.horario}
          local={escala.local}
          coroinhas={coroinhasData[escala.id] || []}
          onAddCoroinha={() => setSelectedCard(escala.id)}
          onDeleteCoroinha={(id) => handleDeleteCoroinha(escala.id, id)}
        />
      ))}

      <ModalAddCoroinha
        isOpen={!!selectedCard}
        coroinhas={coroinhas}
        onSubmit={handleSubmitCoroinha}
        onClose={() => setSelectedCard(null)}
        selectedCoroinha={selectedCoroinha}
        setSelectedCoroinha={setSelectedCoroinha}
        selectionCounts={selectionCounts}
      />

    </div>
  );
};

export default CalendarioPadresDivino;